import axios from 'axios'
import { Message, MessageBox } from 'element-ui'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: '', // url = baseURL + requestURL
  withCredentials: true, // 在跨域请求时发送cookies
  timeout: 5000 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做的
    // if (store.getters.token) {
    //   // 让每一个请求都带上token
    //   // 例如 ['X-Token'],请根据实际情况修改
    //   config.headers["X-Token"] = getToken();
    // }
    return config
  },
  error => {
    // 在请求错误时做的
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /** 判断请求状态通过自定义状态码
   * 当然也可以通过http状态码
   */
  response => {
    const res = response.data

    // 如果自定义状态码不等于 20000，返回error
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: 不合法 token; 50012: 其它客户端登录; 50014: token 过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登录
        MessageBox.confirm('您已经退出登录了，您可以取消继续留在本页面，或者重新登录', '登出确认', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
