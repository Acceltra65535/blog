import { readFile } from 'node:fs/promises';

/**
 * Convert a local SVG file to a data URI for use in RSC components.
 */
export async function inlineSvgDataUri(filePath: string): Promise<string> {
    const buffer = await readFile(filePath);
    return `data:image/svg+xml;base64,${buffer.toString('base64')}`;
}

/**
 * Convert a local binary file (PNG, JPG, etc.) to a data URI for use in RSC components.
 */
export async function inlineBinaryDataUri(
    filePath: string,
    mimeType: string,
): Promise<string> {
    const buffer = await readFile(filePath);
    return `data:${mimeType};base64,${buffer.toString('base64')}`;
}
