function lnglat(t){
	var city=$("#City").val();
	var address=$("#address").val();
	if(city=="" || address==""){
		layer.alert(str_gps_tip);
		return false;	
	}else{
		if(t==1){
			actbox('','/shop/baidumap');
		}else{
			actbox('','/shop/amap');
		}
	}
}
function selectmct(mct_no){
	document.location.href='/Shop/add?mct_no='+mct_no;	
}