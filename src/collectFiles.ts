import * as path from "deno-std/path/mod.ts";

export async function collectFiles(dir: string, recursive: boolean) {
    let files: string[] = [];
    for await (const fileOrFolder of Deno.readDir(dir)) {
      if (
        fileOrFolder.isFile && fileOrFolder.name.match(/\.(jpe?g)|(png)|(gif)|(mp4)|(mpeg)$/i)
      ) {
        files.push(path.join(dir, fileOrFolder.name));
      }
      if (fileOrFolder.isDirectory && recursive) {
        const subDirFiles = await collectFiles(path.join(dir, fileOrFolder.name), recursive);
        files = files.concat(subDirFiles);
      }
    }
    return files;
  }
  