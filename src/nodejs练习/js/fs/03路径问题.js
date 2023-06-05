// node14之前 可以直接使用__dirname，node14以上需要引入

// 方法一
// import path from "path"
// const __dirname = path.resolve();

// 方法二
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('__dirname',__dirname);
console.log('__filename',__filename);
