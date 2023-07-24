import { createRequire } from "module"
const require = createRequire(import.meta.url)
const zs = require('./09模块化')
console.log('zs:',zs);
