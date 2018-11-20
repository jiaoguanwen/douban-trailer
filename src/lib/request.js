import axios from 'axios'
import { message } from 'antd'

const defaultAxiosConf = {
  timeout: 5000
}

// TODO 这是什么玩意儿？
const _request = (params = {}, fn = () => {}) => {
  return axios({ ...defaultAxiosConf, ...params })
    .then(res => {
      // 这个定义的对象里面的属性为什么能直接用？相当于声明了一个变量。在浏览器端，这些变量不会挂载在window对象上，node中一样
      const { success, data, err, code } = res.data

      if (code === 401) {
        window.location.href = '/'

        return
      }

      if (success) {
        fn(false)

        return data
      }

      throw err
    })
    .catch(err => {
      fn(false)

      console.log(err)
      message.error(String(err || '网络错误'))
    })
}

export default param => {
  const type = typeof param

  if (type === 'function') {
    param(true)

    return obj => _request(obj, param)
  }

  if (type === 'object' && type !== null) {
    return _request(param)
  }
}
