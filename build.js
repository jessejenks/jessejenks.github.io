const { build } = require("esbuild");
const { cpSync, readdirSync, statSync } = require("fs");
const { join, relative, extname } = require("path");

const SRC = "src";
const OUT = "js";

const jsFiles = [];
const tsFiles = [];

function walk(root) {
    const stack = [root];
    while (stack.length > 0) {
        const path = stack.pop();
        if (statSync(path).isDirectory()) {
            const files = readdirSync(path);
            files.reverse()
            // only include entrypoint files if they exist
            if (files.includes("entrypoints")) {
                stack.push(join(path, "entrypoints"));
            } else if (files.includes("index.ts")) {
                stack.push(join(path, "index.ts"));
            } else {
                stack.push(...files.map(f => join(path, f)));
            }
        } else if (extname(path) === ".ts") {
            tsFiles.push(path);
        } else if (extname(path) === ".js") {
            jsFiles.push(path);
        }
    }
}

walk(SRC);

if (jsFiles.length > 0) {
    for (let i = 0; i < jsFiles.length; i++) {
        const dest = join(OUT, relative(SRC, jsFiles[i]));
        cpSync(jsFiles[i], dest);
    }
}
if (tsFiles.length > 0) {
    build({
        entryPoints: tsFiles,
        bundle: true,
        outdir: OUT,
        outbase: SRC,
        format: "iife",
        target: "es2020",
    }).catch((e) => {
        console.error(e);
        process.exit(1);
    });
}
