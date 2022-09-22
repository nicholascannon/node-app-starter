import * as fs from 'fs';
import esbuild from 'esbuild';
import { minify } from 'html-minifier';
import { rsync } from './utils.mjs';

let indexContent = fs.readFileSync('./public/index.html', 'utf-8');

const [head, bodyAndFooter] = indexContent.split('<link rel="stylesheet" href="css/index.css" />');
const [body, footer] = bodyAndFooter.split('<script src="js/index.js"></script>');

console.log('Building...');
const { metafile } = esbuild.buildSync({
    entryPoints: ['./src/index.tsx'],
    entryNames: '[ext]/[name]-[hash]',
    bundle: true,
    minify: true,
    treeShaking: true,
    splitting: true,
    format: 'esm',
    outdir: './dist',
    tsconfig: './tsconfig.json',
    metafile: true,
});

let scriptTags = '';
let cssTags = '';

if (metafile) {
    // the paths of the bundled js and css files
    const outputPaths = Object.keys(metafile.outputs);

    outputPaths.forEach((path) => {
        console.log(`Processing ${path}...`);

        const actualPath = path.replace('dist/', '');
        if (actualPath.endsWith('.js')) {
            scriptTags += `<script src="${actualPath}"></script>`;
        } else if (actualPath.endsWith('.css')) {
            cssTags += `<link rel="stylesheet" href="${actualPath}" />`;
        } else {
            console.warn(`Unrecognised output type: ${path}`);
        }
    });
}

console.log('Minifying html...');
const finalHtml = head + cssTags + body + scriptTags + footer;
const minifiedHtml = minify(finalHtml, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
});
fs.writeFileSync('./dist/index.html', minifiedHtml);

console.log('Copying static assets...');
rsync('./public', './dist', {
    ignoredFiles: ['index.html'],
    ignoreHidden: true,
});

console.log('Done!');
