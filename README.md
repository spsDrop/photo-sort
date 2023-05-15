# photo-sort
Sorts photos by date into folders

## Example usages
### Copy
`deno task photo-sort --sourcePath . --targetPath .`
`deno task photo-sort-copy --sourcePath . --targetPath .`

### Move
`deno task photo-sort-move --sourcePath . --targetPath .`

## Options
--sourcePath  Source directory of photos                            [required]
--targetPath  Target directory of photos                            [required]
--pattern     Pattern for output files. Default {yyyy}/{mm} {m3m}/{fileName}
--recursive   Process sub-directories true/false. Default false
--operation   Operation to perform on found files copy/move. Default copy