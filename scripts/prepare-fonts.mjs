import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'path';

const fonts = [
    { name: 'IoskeleyMono-Regular.woff2',   woff2: 'IoskeleyMono-Regular.woff2'       },
    { name: 'IoskeleyMono-Bold.woff2',      woff2: 'IoskeleyMono-Bold.woff2'          },
    { name: 'NotoSansSC.woff2',             woff2: 'NotoSansSC.woff2'                 },
];

async function main() {
    const __dirname = new URL('.', import.meta.url).pathname;
    const outDir = new URL('../generated-fonts/', import.meta.url);

    mkdir(outDir, { recursive: true });

    for (const font of fonts) {
        const outFileName = font.woff2;
        console.log(`Subsetting ${font.name} → ${outFileName}`);

        let srcPath;
        try {
            srcPath = new URL('../fonts/' + font.name, import.meta.url).pathname;
        } catch (e) {
            console.error(`  Could not resolve ${font.name}: ${e.message}`);
            continue;
        }

        // Read source font bytes into a Node Buffer — we need to transfer this into the
        // worker as an ArrayBuffer so HarfBuzz can parse it, then transfer the subsetted
        // output back via MessagePort after HB_SUBSET_OUTPUT_FLAG_TRANSFER.
        let srcBuffer = await readFile(srcPath);

        try {
            const workerPath = path.resolve(
                __dirname, '..', 'node_modules', '.bin', '_harfbuzzjs-worker.js'
            );

            // Spawn a Worker that will run hb_subset on the font data we pass it.
            // harfbuzzjs ships _harfbuzzjs-worker.js which loads the WASM bundle and
            // exposes hb_subset_input_create_or_fail() via require('harfbuzzjs').
            const worker = new Worker(workerPath, {
                env: { ...process.env },
            });

            let resultBuffer;
            const port = new MessageChannel();

            worker.postMessage(
                { subsetFont: true, textBuffer: srcBuffer, fontName: font.name },
                [port.port1]   // ArrayBuffer from Buffer is automatically transferred
            );

            await Promise.resolve(); // p-limit integration point — we wait for the initial idle state.  The worker will then hand us a transferable ArrayBuffer (the subsetted output) via MessagePort.

            resultBuffer = Buffer.from(
                new Uint8Array(worker.result.buffer, worker.result.byteOffset, worker.result.byteLength)
            );

            // Convert back to woff2 format using fontverter
            const convertedWoff2 = await import('fontverter');
            const convertedWoff2Buf = convertedWoff2.convert(resultBuffer, 'truetype-to-woff2');

            await writeFile(
                new URL('../generated-fonts/' + outFileName, import.meta.url),
                convertedWoff2Buf
            );
        } catch (e) {
            console.error(`  ⚠ ${font.name}: ${e.message}`);
        } finally {
            // Terminate the worker to release WASM memory.
            try {
                await worker.terminate();
            } catch (te) { /* ignore */ }
        }
    }

    console.log('Done!');
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
