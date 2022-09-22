import * as fs from 'fs';
import * as path from 'path';

export const rsync = (inputDir, outputDir, { ignoredFiles, ignoreHidden }) => {
    for (let file of fs.readdirSync(inputDir)) {
        if (ignoreHidden && file.startsWith('.')) {
            continue;
        }
        if (ignoredFiles.includes(file)) {
            continue;
        }

        const inputPath = `${inputDir}/${file}`;
        const outputPath = `${outputDir}/${file}`;

        const isDir = fs.lstatSync(inputPath).isDirectory();
        if (isDir) {
            rsync(inputPath, outputPath, { ignoredFiles, ignoreHidden });
        } else {
            const outputDirPath = path.dirname(outputPath);
            const outputDirExists = fs.existsSync(outputDirPath);
            if (outputDirExists === false) {
                fs.mkdirSync(outputDirPath, { recursive: true });
            }

            fs.copyFileSync(inputPath, outputPath);
        }
    }
};
