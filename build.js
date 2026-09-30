const fs = require("fs");
const path = require("path");
const { ZipArchive } = require("archiver");

const outputDir = path.join(__dirname, "build");
const outputFile = path.join(outputDir, "TaskManager-build.zip");

if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
}

fs.mkdirSync(outputDir);

const output = fs.createWriteStream(outputFile);
const archive = new ZipArchive({
    zlib: { level: 9 }
});

output.on("close", () => {
    console.log(`Build artefact created: ${outputFile}`);
    console.log(`Archive size: ${archive.pointer()} bytes`);
});

archive.on("error", (error) => {
    throw error;
});

archive.pipe(output);

archive.file("app.js", { name: "app.js" });
archive.file("package.json", { name: "package.json" });
archive.file("package-lock.json", { name: "package-lock.json" });
archive.file("eslint.config.js", { name: "eslint.config.js" });
archive.file("build.js", { name: "build.js" });

archive.directory("public/", "public");
archive.directory("tests/", "tests");

archive.finalize();