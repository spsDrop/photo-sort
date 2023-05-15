import yargs from "https://deno.land/x/yargs@v17.0.1-deno/deno.ts";

interface Yargs<ArgvReturnType> {
  describe: (param: string, description: string) => Yargs<ArgvReturnType>;
  demandOption: (required: string[]) => Yargs<ArgvReturnType>;
  argv: ArgvReturnType;
}

interface UserArguments {
  sourcePath: string;
  targetPath: string;
  pattern: string;
  recursive: string;
  operation: string;
}

export const DefaultPattern = "{yyyy}/{mm} {m3m}/{fileName}";

export const args: UserArguments =
  (yargs(Deno.args) as unknown as Yargs<UserArguments>)
    .describe("sourcePath", "Source directory of photos")
    .demandOption(["sourcePath"])
    .describe("targetPath", "Target directory of photos")
    .demandOption(["targetPath"])
    .describe("pattern", `Pattern for output files. Default ${DefaultPattern}`)
    .describe("recursive", "Process sub-directories true/false. Default false")
    .describe("operation", "Operation to perform on found files copy/move. Default copy")
    .argv;
