import fs from 'fs';

export default function truncate(flags = {}) {
  return {
    name: 'truncate',
    generateBundle(options, bundle) {
      // console.log('generateBundle:truncate', options, bundle, flags);
      flags.forEach(file => {
        console.log('truncate:', file);
        fs.truncate(file, 0, () => {})
      })
    }
  };
}
