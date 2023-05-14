import template from "sky/string-template";
import * as path from "deno-std/path/mod.ts";
import { DefaultPattern, args } from "./src/args.ts";
import { collectFiles } from "./src/collectFiles.ts";
import { getCreationData } from "./src/getCreationDate.ts";

const filesToProcess = await collectFiles(args.sourcePath, args.subdirs === "true");

console.log(`Processing file information for ${filesToProcess.length} file(s)`)
const fileData = await Promise.all(
  filesToProcess.map(getCreationData),
);

const operations = fileData.map((data) => ({
  to: path.join(
    args.targetPath,
    template(args.pattern || DefaultPattern, data),
  ),
  from: data?.filePath,
}));

console.log(`Moving ${filesToProcess.length} file(s)`)
operations.forEach((operation, i) => {
  if (i % 100 === 0) {
    console.log(`Progress ${Math.floor(i/filesToProcess.length * 100)}%`)
  }
  if (operation.from) {
    const dir = path.dirname(operation.to);
    try {
      Deno.statSync(dir);
    } catch (e) {
      Deno.mkdirSync(dir, { recursive: true });
    }
    Deno.renameSync(operation.from, operation.to);
  }
});
