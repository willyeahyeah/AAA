const pathmap = {};
const classmap = {};
let pid = 0;
const azAZ=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

export function fileScopedCss ({filename, name, css, hash}) {
  // console.log('fileScopedCss', filename, name, css, hash);
  // console.log('hash(css)', hash(css))
  const key = filename;

  if (pathmap[key] == undefined) {
    pathmap[key] = pid++;
  }

  return azAZ[pathmap[key]];
}

export function simpleGetLocalIdent (context, localIdentName, localName, content) {
  // console.log('simpleGetLocalIdent', context, localIdentName, localName, content);
  const pathKey = context.resourcePath;
  const classKey = localIdentName.interpolatedName;
  // console.log(`pathmap[${pathKey}]`, pathmap[pathKey])
  if (pathmap[pathKey] == undefined) {
    pathmap[pathKey] = pid++;
  }

  if (classmap[pathKey] == undefined) {
    classmap[pathKey] = {};
    classmap[pathKey]['key'] = 0;
  }
  if (classmap[pathKey][classKey] == undefined) {
    classmap[pathKey][classKey] = classmap[pathKey]['key']++;
  }
  return azAZ[classmap[pathKey][classKey]] + '_' + azAZ[pathmap[pathKey]];
}
