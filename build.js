const { build } = require("esbuild");
const { cpSync, readdirSync, statSync } = require("fs");
const { join, relative, extname } = require("path");

const SRC = "src";
const OUT = "js";

const jsFiles = [];
const tsFiles = [];

function walk(root) {
    const allFilePaths = readdirSync(root, { recursive: true }).map((path) =>
        join(root, path),
    );
    for (let i = 0; i < allFilePaths.length; i++) {
        const filePath = allFilePaths[i];
        if (extname(filePath) === ".ts") {
            tsFiles.push(filePath);
        } else if (extname(filePath) === ".js") {
            jsFiles.push(filePath);
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
        format: "esm",
        target: "es2020",
    }).catch((e) => {
        console.error(e);
        process.exit(1);
    });
}
