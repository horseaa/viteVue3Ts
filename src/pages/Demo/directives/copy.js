import { ElMessage } from 'element-plus'
const vCopy = {
  /**
   * bind 钩子函数，第一次绑定时调用，可以在这里做初始化设置
   * el: 作用的 dom 对象
   * value: 传给指令的值，要 copy 的值
   */
  mounted(el) {
    el.handel = () => {
      console.log(el)
      if (!el.$value) {
        ElMessage({
          message: '无复制内容',
          type: 'warning'
        })
        return
      }
      const textarea = document.createElement('textarea')
      textarea.readOnly = 'readonly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-99999x'
      textarea.value = el.$value
      document.body.appendChild(textarea)
      textarea.select()
      textarea.setSelectionRange(0, textarea.value.length)
      const result = document.execCommand('Copy')
      if (result) {
        ElMessage({
          message: '复制成功',
          type: 'success'
        })
      }
      document.body.removeChild(textarea)
    }
    el.addEventListener('click', el.handel)
  },
  componentUpdated(el, { value }) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  beforeUnmount(el) {
    el.removeEventListener('click', el.handel)
  }
}

export default vCopy