import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

const fonts = [
    { name: 'IoskeleyMono-Regular.woff2', woff2: 'IoskeleyMono-Regular.woff2' },
    { name: 'IoskeleyMono-Bold.woff2',    woff2: 'IoskeleyMono-Bold.woff2' },
    { name: 'NotoSansSC.woff2',           woff2: 'NotoSansSC.woff2' }
];

async function getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
}

async function main() {
    const outDir = new URL('../generated-fonts/', import.meta.url);
    await mkdir(outDir, { recursive: true });

    // Collect all unique characters used in the project
    const srcDir = fileURLToPath(new URL('../src', import.meta.url));
    const files = await getFiles(srcDir);
    const exts = ['.tsx', '.ts', '.css', '.md'];
    const validFiles = files.filter(f => exts.includes(path.extname(f)));
    
    let text = '';
    for (const file of validFiles) {
        text += await readFile(file, 'utf-8');
    }
    
    // Include all basic ASCII characters to ensure English/code renders correctly
    text += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:\'",.<>/?`~ \\n\\t';
    
    const uniqueChars = Array.from(new Set(text)).join('');

    for (const font of fonts) {
        const outFileName = font.woff2;
        console.log(`Subsetting ${font.name} → ${outFileName}`);

        let srcPath;
        try {
            srcPath = fileURLToPath(new URL('../fonts/' + font.name, import.meta.url));
        } catch (e) {
            console.error(`  Could not resolve ${font.name}: ${e.message}`);
            continue;
        }

        try {
            const fontBuffer = await readFile(srcPath);
            const subsetBuffer = await subsetFont(fontBuffer, uniqueChars, { targetFormat: 'woff2' });
            
            await writeFile(
                new URL('../generated-fonts/' + outFileName, import.meta.url),
                subsetBuffer
            );
        } catch (e) {
            console.error(`  ⚠ ${font.name}: ${e.message}`);
        }
    }

    console.log('Done!');
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
