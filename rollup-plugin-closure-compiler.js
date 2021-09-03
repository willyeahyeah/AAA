const ClosureCompiler = require('google-closure-compiler').compiler;
// import { compiler as ClosureCompiler} from 'google-closure-compiler';
import fs from 'fs';

export default function closure(flags = {}) {
  return {
    name: 'closure-compiler',
    writeBundle(options, bundle) {

      const closureCompiler = new ClosureCompiler({
        js: [
          options.file,
        ],
        ...{
          compilation_level: 'SIMPLE',
          language_in: 'ECMASCRIPT_2020',
          module_resolution: 'NODE',
          warning_level: 'QUIET',
        },
        ...flags
      });

      closureCompiler.run((exitCode, stdOut, stdErr) => {
        if (stdErr) {
          console.error(`Exit code: ${exitCode}`, stdErr);
        }
        else {
          fs.writeFileSync(options.file, stdOut);

          if (!options.sourcemap) {
            fs.unlinkSync(flags.create_source_map)
          }
        }
      });

    }
  };
}
