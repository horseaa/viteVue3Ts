import { createRequire } from "module"
const require = createRequire(import.meta.url);
const fs = require('fs')
import path from 'path'
//    /s 匹配空字符  /S匹配非空字符  *前面内容匹配多次
const regStyle = /<style>[\s\S]*<\/style> /
const regScript = /<script>[\s\S]*<\/script> /