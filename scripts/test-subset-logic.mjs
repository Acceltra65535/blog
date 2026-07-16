import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import subsetFont from 'subset-font';

async function getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
}

async function main() {
    const files = await getFiles(path.resolve('src'));
    const exts = ['.tsx', '.ts', '.css', '.md'];
    const validFiles = files.filter(f => exts.includes(path.extname(f)));
    
    let text = '';
    for (const file of validFiles) {
        text += await readFile(file, 'utf-8');
    }
    
    // Add some common characters just in case
    text += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:\'",.<>/?`~ ';

    // unique chars
    const uniqueChars = Array.from(new Set(text)).join('');
    console.log(`Unique characters length: ${uniqueChars.length}`);
    
    // Test subsetting one font
    const fontBuffer = await readFile('fonts/NotoSansSC.woff2');
    const subsetBuffer = await subsetFont(fontBuffer, uniqueChars, { targetFormat: 'woff2' });
    console.log(`Original NotoSansSC length: ${fontBuffer.length}`);
    console.log(`Subset NotoSansSC length: ${subsetBuffer.length}`);
}

main().catch(console.error);
