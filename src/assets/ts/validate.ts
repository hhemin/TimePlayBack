/**
 * @Description 验证
 * */ 

/* 验证密码 6-20位，包含大小写字母和数字*/
export function validateVPassword (value:any) {
  let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,20}$/;
  return !reg.test(value) ? true : false;
}
