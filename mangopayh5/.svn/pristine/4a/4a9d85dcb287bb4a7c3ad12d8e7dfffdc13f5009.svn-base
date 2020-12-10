//带两位小数的正数或负数
export function nuberOne(str) {
  const reg =/^(([1-9]\d*)|(0))([.]\d{0,2})?$/;
  return reg.test(str)
}
//7位数字
export function nuber7(str) {
  const reg =/^[0-9]{1,7}$/
  return reg.test(str)
}
//数字
export function num(str) {
  const reg =/^[0-9]*$/
  return reg.test(str)
}
//金额
export function isvalidAmountmoney(str) {
  const reg =/^([1-9]\d*|0)(\.\d{1,2})?$/
  // /^[1-9]|([1-9](\.[1-9]{1,2}))|(0\.[1-9]{1,2})$/
    ///(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])|0?$)/
  return reg.test(str)
}
//正数，带两位小数 ^[0-9]+(.[0-9]{2})?$
export function isvalidFee(str) {
  const reg =/^\d{0,7}(\.\d{0,2})?$/
  ///^([0-9]{1,7})+(.[0-9]{1,2})?$/
  return reg.test(str)
}

//正数，带三位小数 ^[0-9]+(.[0-9]{2})?$
export function isvalidNuber(str) {
  const reg =/^(?:0\.\d{1,3}|[01](?:\.0)?)$/
  return reg.test(str)
}
//正数，带四位小数 ^[0-9]+(.[0-9]{2})?$
export function isvalidNubers(str) {
  const reg =/^[0-9]+(.[0-9]{1,4})?$/
  return reg.test(str)

}
//手机校验
export function isvalidPhone(str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(str)

}
// 中文、英文、数字但不包括下划线等符号
export function isvalidString(str) {
  const reg = /^[\u4E00-\u9FA5A-Za-z0-9]{0,20}$/
  return reg.test(str)

}
//账号校验(允许5-16字节，允许字母数字下划线)
export function isvalidAccount(str) {
  const reg = /^[a-zA-Z0-9_]{5,16}$/
  return reg.test(str)

}
// 密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)
export function isvalidPassWord(str) {
  const reg = /\w{6,16}$/
  return reg.test(str)
}
// 姓名(只能输入中文和英文)
export function isvalidName(str) {
  const reg = /^[\u4E00-\u9FA5A-Za-z]+$/
  return reg.test(str)
}
//最比率（只允许100以下的数字）
export function isvalidrate(str) {
  const reg = /^[0-9]*$/
  return reg.test(str)
}
