import Axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'
// import router from '@/router'
import { ElMessage } from 'element-plus';
import {baseURL} from './config'


/**
 * get status code
 * @param {AxiosResponse} response Axios  response object
 */
// const getErrorCode2text = (response: AxiosResponse): string => {
//   /** http status code */
//   const code = response.status
//   /** notice text */
//   let Message = 'Request Error'
//   switch (code) {
//     case 400:
//       Message = 'Request Error'
//       break
//     case 401:
//       Message = 'Unauthorized, please login'
//       break
//     case 403:
//       Message = '拒绝访问'
//       break
//     case 404:
//       Message = '访问资源不存在'
//       break
//     case 408:
//       Message = '请求超时'
//       break
//     case 500:
//       Message = '位置错误'
//       break
//     case 501:
//       Message = '承载服务未实现'
//       break
//     case 502:
//       Message = '网关错误'
//       break
//     case 503:
//       Message = '服务暂不可用'
//       break
//     case 504:
//       Message = '网关超时'
//       break
//     case 505:
//       Message = '暂不支持的 HTTP 版本'
//       break
//     default:
//       Message = '位置错误'
//   }
//   return Message
// }

// console.log(baseURL)
const service = Axios.create({
  baseURL: baseURL,
  timeout: 10000,
  // headers: {
  //   'User-Type': 'bus'
  // }
})

/**
 * @description 请求发起前的拦截器
 * @returns {AxiosRequestConfig} config
 */
service.interceptors.request.use(async (config: AxiosRequestConfig)=> {
  if(config) {

  }else {

  }
  return config
})
/**
 * @description 响应收到后的拦截器
 * @returns {}
 */
service.interceptors.response.use(
   /** 请求响应成功 */
   async (response: AxiosResponse) => {
    console.log(response);
    if(response.status === 201) {
      // 如果接口有返回信息则使用接口的msg
      if(response.data?.msg) ElMessage.success({
        message: response.data.msg,
        type: 'success'
      });
      console.log(888)
      return Promise.resolve(response.data)
    } else {
      console.log(123)
      let msg:string = response.data?.data?.msg || response.data?.msg
      if(msg) {
        // getErrorCode2text(response.data.data)
        ElMessage.error(msg);
      }
      // getErrorCode2text(response.data.data)
      return Promise.reject(new Error(response.data))
    }
    // 请求返回成功状态
    // if (response.status === 201) {
    //   return Promise.resolve(response.data)
    // } else {
    //   // const __text = getErrorCode2text(response)
    //   return Promise.reject(new Error(__text))
    // }
  },
   /** 请求错误 */
   (error: AxiosError) => {
    let __emsg: string = error.message || ''
    if (error.message) {
      __emsg = error.message
    }
    if (error.response) {
      __emsg = error.response.data.msg
        ? error.response.data.msg
        : error.response.data.data
    }
    // timeout
    // if (__emsg.indexOf('timeout') >= 0) {
    //   __emsg = 'timeout'
    // }

    // if (error?.response?.status === 401) {
    //   if (router.currentRoute.value.path !== '/login') {
    //     Message.info('登录凭证已过期，请重新登录')
    //     router.push('/login')
    //   }
    //   return Promise.reject(new Error('401'))
    // }
    console.log(__emsg)
    ElMessage.error(__emsg);
    return Promise.reject(new Error(__emsg))
   }
)

export default service