import Axios from './axios';

/**
 * @interface loginParams -登录参数
 * @property {string} username -用户名
 * @property {string} password -用户密码
 */
interface LoginParams {
  username: string
  password: string
}

interface AddUserParams {
  username: string
  password: string
}
// 登录
const Login = async (params: LoginParams) => {
  return Axios('/admin/login',{
    method: 'post',
    responseType: 'json',
    data: params
  })
}

// 添加管理员
const AddUser = async (params:AddUserParams) => {
  return Axios('/admin/register',{
    method: 'post',
    responseType: 'json',
    data: params
  })
}

export {
  Login,
  AddUser
}