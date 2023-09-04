import fs from 'node:fs/promises';
import path from 'node:path';

export const loadFile = (filepath: string) =>
  fs.readFile(path.join(__dirname, filepath)).then((d) => d.toString());
