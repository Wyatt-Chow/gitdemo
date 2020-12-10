
export function buildRequestURL (baseURL, payload){
  if (payload) {
    baseURL += '?';
    for (const i in payload) {
      if (payload[i] !== undefined) {
        baseURL += i;
        baseURL += '=';
        baseURL += payload[i];
        baseURL += '&';
      }
    }
  }
  return baseURL;
};
//加载动画函数
export function showload (isLoad){
  
  isLoad = true;console.log(isLoad)
  setTimeout(() => {
    isLoad = false;
  }, 10000);
};
//利用当前时间生成yyyymmddhhmmss这样的字符串
function pad2(n) { return n < 10 ? '0' + n : n }
export function generateTimeReqestNumber() {
  let date = new Date();
  return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());
}
//yyyy-MM-dd string时间格式 转 yyyyMMdd
export function
toDataTime(dateStr) {
  let timeStr = dateStr.split('-').join('');
  return timeStr;
}
//yyyy-MM-dd HH:mm:ss string时间格式 转 yyyyMMddHHmmss
export function toData(dateStr) {
  let reg = /-| |:/g;
  let timeStr = dateStr.replace(reg,'');
  return timeStr;
}
//时间戳转YYYY-MM-dd HH:mm:ss
export function formatUnixtimestamp (unixtimestamp){
  let date = new Date(unixtimestamp);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let minute = date.getMinutes();
  let second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;

}

//字符串时间转yyyy-mm-dd hh:mm:ss
export function toTime(dateStr) {
  let timeStr = dateStr.substring(0,4)+'-'+dateStr.substring(4,6)+'-'+dateStr.substring(6,8)+' '+dateStr.substring(8,10)+':'+dateStr.substring(10,12)+':'+dateStr.substring(12,14);
  return timeStr;
}
//乘法丢精度转换
export function toNum(num1, num2) {
  let baseNum = 0;
  try {
    baseNum += num1.toString().split(".")[1].length;
  } catch (e) {
  }
  try {
    baseNum += num2.toString().split(".")[1].length;
  } catch (e) {
  }
  return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
};
//身份证之展示前后四位
export function toHideIDNum(idNum) {
    let timeStr = idNum.substring(0,4)+'******'+idNum.substring(14,18);
  return timeStr;
}
