import {Module} from 'vuex';
import {AdminState} from './data';
import * as Type from './type'
import {GetList} from '@/utils/api'

const state:AdminState = {
  pageinfo: {
    curPage:1,// 加载条数
    pageSize:10,// 一页多少条记录
    username:'',// 用户名称参数
  },
  datalist:'',// 获取的数据
  total:0,// 数据总数
}
const admin:Module<any,any> = {
  namespaced: true,
  state,
  actions: {
   async [Type.GET_ADMIN_LIST]({commit,state},value:string) {
    let {data:data} =  await GetList(state.pageinfo)
    console.log(data.data)
    commit(Type.GET_ADMIN_LIST,data.data)
    state.total = data.total
   },
  },
  mutations: {
    [Type.GET_ADMIN_LIST](state,list) {
      state.datalist = list
    },
    [Type.PAGE_INFO](state,value) {
      state.pageinfo = {...state.pageinfo,...value}
    }
  }
}
export default admin