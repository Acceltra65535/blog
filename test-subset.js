import subsetFont from 'subset-font';
import fs from 'fs/promises';

async function test() {
    try {
        const fontBuffer = await fs.readFile('fonts/IoskeleyMono-Regular.woff2');
        const subsetBuffer = await subsetFont(fontBuffer, 'hello world', { targetFormat: 'woff2' });
        console.log('Subset length:', subsetBuffer.length);
    } catch (e) {
        console.error(e);
    }
}
test();
