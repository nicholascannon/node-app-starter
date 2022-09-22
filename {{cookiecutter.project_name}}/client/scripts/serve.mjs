import esbuild from 'esbuild';

const port = 3000;

esbuild
    .serve(
        {
            port,
            servedir: './public',
            onRequest: ({ method, path, status, timeInMS }) => {
                console.log(`[${method}] ${path} ${status} (${timeInMS}ms)`);
            },
        },
        {
            entryPoints: ['./src/index.tsx'],
            entryNames: '[ext]/[name]',
            outdir: './public',
            bundle: true,
            sourcemap: true,
            format: 'esm',
            tsconfig: './tsconfig.json',
        }
    )
    .then(() => console.log(`Serving at http://localhost:${port}`));
