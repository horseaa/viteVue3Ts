import path from 'path'
const url = 'a/b/c/d.txt'
// basename ��ȡ�ļ���
// 1.·��  2 ����ѡ����չ����ע��ǰ���.
const fullName = path.basename(url,'.txt')
console.log('fullName:',fullName);

// extname  ��ȡ��չ��

const fext = path.extname(url)
console.log('fext',fext);
