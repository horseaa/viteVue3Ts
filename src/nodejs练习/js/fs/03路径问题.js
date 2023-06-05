// node14֮ǰ ����ֱ��ʹ��__dirname��node14������Ҫ����

// ����һ
// import path from "path"
// const __dirname = path.resolve();

// ������
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('__dirname',__dirname);
console.log('__filename',__filename);
