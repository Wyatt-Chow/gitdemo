<script>
import {SESSION_STORAGE_USER} from "@/utils/ConstUtils.js"
  const colorList = [
    '#F9F900',
    '#6FB7B7',
    '#9999CC',
    '#B766AD',
    '#B87070',
    '#FF8F59',
    '#FFAF60',
    '#FFDC35',
    '#FFFF37',
    '#B7FF4A',
    '#28FF28',
    '#1AFD9C',
    '#00FFFF',
    '#2894FF',
    '#6A6AFF',
    '#BE77FF',
    '#FF77FF',
    '#FF79BC',
    '#FF2D2D',
    '#ADADAD'
  ]
  let aid = null;
  if(JSON.parse(sessionStorage.getItem(SESSION_STORAGE_USER))){
    aid = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_USER)).AID;
  }else{
    aid = '002'
  }
  const topheaders = () =>{
  
    return  {headers: {
      'Content-Type':'application/json;charset=utf-8',
      'AID':JSON.parse(sessionStorage.getItem(SESSION_STORAGE_USER))?JSON.parse(sessionStorage.getItem(SESSION_STORAGE_USER)).appId:'002',
      'SID':'00000',
    }}
  }

  export default
  {
    colorList,
    topheaders,
  }
</script>
