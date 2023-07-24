import path from 'path'
const url = 'a/b/c/d.txt'
// basename 获取文件名
// 1.路径  2 （可选）拓展名，注意前面加.
const fullName = path.basename(url,'.txt')
console.log('fullName:',fullName);

// extname  获取扩展名

const fext = path.extname(url)
console.log('fext',fext);
