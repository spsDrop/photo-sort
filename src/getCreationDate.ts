import exifr from "sky/exifr";
import * as path from "deno-std/path/mod.ts";

function padNum(num: number) {
  return num < 10 ? `0${num}` : num.toString();
}

export async function getCreationData(filePath: string) {
  const stat = await Deno.stat(filePath);
  let creationDate = stat.mtime ? new Date(stat.mtime) : undefined;
  if (filePath.match(/\.jpe?g/i)) {
    const exif = await exifr.parse(`file://${filePath}`);
    if (exif) {
      creationDate = new Date(exif.DateTimeOriginal || exif.createDate);
    } else {
      console.warn(`Failed to read exif for ${filePath}`);
    }
  }
  if (!creationDate) {
    console.warn(`Could not find the creation date for ${filePath}`);
    return;
  }
  const date = creationDate.getDate();
  const month = creationDate.getMonth() + 1;

  return {
    filePath,
    fileName: path.basename(filePath),
    extension: path.extname(filePath),
    dir: path.dirname(filePath),
    yyyy: creationDate.getFullYear(),
    mm: padNum(month),
    dd: padNum(date),
    m3m: creationDate.toString().slice(4, 7),
  };
}
