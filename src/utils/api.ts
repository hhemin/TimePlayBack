import { routerKey } from 'vue-router';
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

interface GetUserParams {
  curPage: number,
  pageSize: number,
}

interface SetStatusParams {
  status:number,
  id:number
}

interface FixPasswordParams {
  password:string,
  newpassword:string,
  id:number,
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
// 加载管理员列表
const GetList = async (params:GetUserParams) => {
  return Axios('/admin/list',{
    method: 'post',
    responseType: 'json',
    data: params
  })
}

// 修改管理员状态
const SetStatus = async (params:SetStatusParams) => {
  return Axios('/admin/setstatus',{
    method: 'post',
    responseType: 'json',
    data: params
  })
}

const FixPassword = async (params:FixPasswordParams) => {
  return Axios('/admin/fixPassword', {
    method: 'post',
    responseType: 'json',
    data: params
  })
}
export {
  Login,
  AddUser,
  GetList,
  SetStatus,
  FixPassword
}