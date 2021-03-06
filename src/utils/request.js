/**
 * 请求模块
 */
import axios from 'axios'
// 在非组件模块中获取 Store 必须通过这种方式
import store from '@/store/'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 处理完以后一定要把 config 返回, 否则请求就会停在这里
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器

// 导出
export default request
