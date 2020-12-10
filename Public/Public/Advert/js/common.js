$(function(){
	var h =($(window).height() - 60);
	$(".content,.main").css("height",h + "px");
	$(window).resize(function(){
		var h =($(window).height() - 60);
		$(".content,.main").css("height",h + "px");
	})
	//菜单开关
	//$(".close_menu").click(function(){
	//	var close_menu=getCookie('close_menu');
	//	if(close_menu=='show'){
	//		$("#pane").hide();
	//		$(".content").css({"padding-left":"0px"});
	//		$(".close_menu").css({"left":"0px","background-position":"-13px 0px"});
	//		SetCookie('close_menu','hide');
	//	}else{
	//		$("#pane").show();
	//		$(".content").css({"padding-left":"210px"});
	//		$(".close_menu").css({"left":"210px","background-position":"0px 0px"});
	//		SetCookie('close_menu','show');
	//	}
	//});
	//var close_menu=getCookie('close_menu');
	//if(close_menu=='hide'){
	//	$("#pane").hide();
	//	$(".content").css({"padding-left":"0px"});
	//	$(".close_menu").css({"left":"0px","background-position":"-13px 0px"});
	//	SetCookie('close_menu','hide');
	//}else{
	//	$("#pane").show()
	//	$(".content").css({"padding-left":"210px"});
	//	$(".close_menu").css({"left":"210px","background-position":"0px 0px"});
	//	SetCookie('close_menu','show');
	//}
	////最后点击的菜单
	//$("#pane ul li a").click(function(){
	//	SetCookie('last_menu',$(this).text());
	//})
	//var last_menu=getCookie('last_menu');
	//if(last_menu!=null){
	//	$("#pane ul li a").each(function(){
	//		if($(this).text()==last_menu){
	//			$(this).parents('ul').prev('h3').addClass("cur").next("ul").show();
	//			$(this).parents(".show_sub_menu").show();
	//			$(this).parents(".show_sub_menu").prev().addClass("cur");
	//		}
	//	})
	//}
	
	//菜单
	//$(".menu h3").click(function(){
	//	if($(this).next("ul").is(":hidden")){
	//			$(this).addClass("cur").next("ul").show();
	//		}else{
	//			$(this).removeClass("cur").next("ul").hide();
	//		};
	//});
	//$("a.ht_a").click(function(){
	//	if($(this).next(".show_sub_menu").is(":hidden")){
	//			$(this).addClass("cur").next(".show_sub_menu").show();
	//		}else{
	//			$(this).removeClass("cur").next(".show_sub_menu").hide();
	//		};
	//});
	//自定义滚动条
	$('#pane').perfectScrollbar({
	  wheelSpeed: 20,
	  wheelPropagation: false
	});
	//重新加载验证码
	$("#veryficodepic").click(function(){
		$(this).attr('src','/Verifycode?t='+Math.random());
	})
	//IE6、7低版本提示
	if (window.ActiveXObject) {
		var ua = navigator.userAgent.toLowerCase();
		var ie=ua.match(/msie ([\d.]+)/)[1]
		if(ie==6.0|ie==7.0){
		$("body").prepend("<div id='popDiv'>您使用的是较低版本浏览器，建议您使用IE8.0以上版本浏览器或者<a href='http://www.firefox.com.cn/download/'>firefox</a>、<a href='http://www.google.cn/intl/zh-CN/chrome/browser/desktop/index.html'>chrome</a>、<a href='http://chrome.360.cn/'>360极速</a>浏览器，获得更好的操作体验。<span></span></div>");
		}
	 }	
	 $("#popDiv span").click(function(){
	 	$("#popDiv").hide();
	 });
	//隔行变色特效
	if($('.tr_color').length>0){
		$("body").on({
			mouseover: function() {
				$(this).css({"background-color":"#fafafa"});
			},
			mouseout: function() {
				$(this).css({"background-color":"#ffffff"});
			}
		}, ".tr_color tbody tr"
		);
	}
	//select特效
	if($('.select').length>0 || $('.select2').length>0 || $('.select3').length>0){
		setTimeout(function(){try{$(".select select,.select2 select,.select3 select,.select4 select").selectbox();}catch(e){}},1000);
	}
	//checkbox特效
	if($('.checkbox input').length>0){
		setTimeout(function(){
		$('.checkbox input,.checkbox2 input').iCheck({
			checkboxClass: 'icheckbox_minimal-orange',
			radioClass: 'iradio_minimal-orange'
		})}
		,1000);
	}
	//日期选择控件
	if($('.datetimepicker').length>0 || $('.datetimepicker2').length>0){
		jQuery.datetimepicker.setLocale('zh');
		//$('.datetimepicker').datetimepicker({lang:'ch'});
		$('.datetimepicker').datetimepicker({
			timepicker:false,
			format:'Y-m-d'
		});
	
		$('.datetimepicker2').datetimepicker({
			timepicker:true,
			format:'Y-m-d H:i:s'
		});	
	}
	//语言切换
	$("span.en ").hover(function(){
		$(this).find(".show_en").slideDown(100);
	},function(){
		$(this).find(".show_en").slideUp(100);
	});

});
//切换标签
function setTab(name,cursel,n){
	for(i=1;i<=n;i++){
		var menu=document.getElementById(name+i);
		var con=document.getElementById("con_"+name+"_"+i);
		menu.className=i==cursel?"hover":"";
		con.style.display=i==cursel?"block":"none";
	}
}

//写入cookie
function SetCookie(name,value){
	var Days = 30; //此 cookie 将被保存 30 天
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();
}
///删除cookie
function delCookie(name){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null) document.cookie= name + "="+cval+";path=/;expires="+exp.toGMTString();
}
//读取cookie
function getCookie(name){
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null)
	return unescape(arr[2]);
	return null;
}
//上传图片后事件
function up_pic_obj(obj,pic,F_SERVER){
	if(pic==undefined || pic==''){return false;}
	$('#'+obj).val(pic);
	$('#'+obj+'-error').html('');
	//文件扩展名
	var file_ext=pic.substr(pic.lastIndexOf(".")+1).toUpperCase();
	var pic_exp=Array('JPG', 'GIF', 'PNG', 'JPEG');
	var ispic=false;
	for(var i=0,k=pic_exp.length;i<k;i++){ 
        if(pic_exp[i]==file_ext){
            ispic=true;
        }
    }
	if(F_SERVER==undefined || F_SERVER==''){
		if(ispic){
			$('#'+obj+'_pic').html('<a href="/upfile/files?f='+pic+'" data-lightbox="image-1" data-title="pic"><img style="float:left" height="80" width="120" src="/upfile/files?f='+pic+'"></a>');
		}else{
			$('#'+obj+'_pic').html('<a href="/upfile/files?f='+pic+'" style="display:block" title="'+file_ext+'" target="_blank"><img style="float:left" height="80" width="120" src="/Public/organ2/images/file.jpg"></a>')
		}
	}else{
		if(ispic){
			$('#'+obj+'_pic').html('<a href="'+F_SERVER+pic+'" data-lightbox="image-1" data-title="pic"><img style="float:left" height="80" width="120" src="'+F_SERVER+pic+'" onerror="this.src=\'/upfile/files?f='+pic+'\'"></a>');
		}else{
			$('#'+obj+'_pic').html('<a href="'+F_SERVER+pic+'" style="display:block" title="'+file_ext+'" target="_blank"><img style="float:left" height="80" width="120" src="/Public/organ2/images/file.jpg"></a>')
		}
	}
}
//上传证书后事件
function up_cert(obj,str){
	if(str==undefined || str==''){return false;}
	$('#'+obj).val(str);
	$('#'+obj+'_str').html('<span class="red">'+cert_upload_ok+'</span>');
}

//获得日期
function GetDateStr(AddDayCount) { 
	var dd = new Date(); 
	dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
	var y = dd.getFullYear(); 
	var m = dd.getMonth()+1;//获取当前月份的日期 
	var d = dd.getDate(); 
	return y+"-"+m+"-"+d; 
} 

//对话框
function actbox_confirm(url,actname,stay){
	layer.alert(actname, {
		icon:3,
		time: 0, //不自动关闭
		btn: [btn_ok, btn_cancel],
		yes: function(index){
			layer.load();
			if(stay){
				$.get(url,function(data){
					layer.msg(data['info'],{time: 4000,shift:4});
					if(data['status']==1){
					setTimeout(function(){parent.document.location.reload();},1000);
					}
				});
			}else{
				document.location.href=url;	
			}
			layer.closeAll();
			
		}
	});
}
//弹窗
function actbox(title,url){
	layer.open({
	  type: 2,
	  title: title,
	  skin: 'layui-layer-lan',
	  shadeClose: false,
	  shade: 0.8,
	  area: ['860px','365px'],
	  content: url
	});
}
//显示二维码
function qrcode_box(url){
	layer.open({
	  type: 2,
	  title: '',
	  skin: 'layui-layer-lan',
	  shadeClose: false,
	  shade: 0.8,
	  area: ['350px','350px'],
	  content:url
	});
}

//导出数据
function download_excel(button,form){
	$(button).attr('disabled','disabled');
	data=$(form).serialize();
	data+='&export=1';
	data=$(form).attr('action')+'?'+data;
	window.open(data);
	setTimeout(function(){
		$(button).removeAttr('disabled');	
	},5000);
}

//表单提交
function ttgValidata(form){
	//验证必填项不能为空
	var findError=false;
	$(".required").each(function(){
		if($(this).val()==''){
			if($('#GO_NOW').length>0 || $('#PARENT_RELOAD').length>0 || $('#DOCUMENT_RELOAD').length>0){
				layer.tips(input_tips($(this).attr('title')),$(this),{tipsMore: true,tips: [2, '#000000']});
			}else{
				layer.msg(input_tips($(this).attr('title')));
			}
			findError=true;
			return false;
		}
	});
	if(findError){return false;}
	$("input[type='password']").each(function(){
		var password_str=$(this).val();
		if(password_str!=''){
			var Regx = /^[A-Za-z0-9]*$/;
            if (Regx.test(password_str) && password_str.length>=6) {
            	$(this).val(hex_sha1(password_str));
            }else{
				findError=true;
				$("input[type='password']").each(function(){$(this).val('');});
				layer.msg(str_password);
                return false;
            }
		}
	});
	if(findError){return false;}
	if($(form).attr('ajax')=='true'){
		layer.msg('Please wait...');
		return false;	
	}
	//return true;
	$(form).attr('ajax','true');
	layer.load();
	data=$(form).serialize();
	url=$(form).attr('action');
	$.ajax({ 
		type: 'post', 
		url: url, 
		data:data, 
		cache: false,
		async: true,
		dataType: 'json', 
		success: function (data) {
			$(form).removeAttr('ajax');
			layer.closeAll(); 
			if(data['status']==1){
				if($('#GO_NOW').length>0){
					document.location.href=data['url'];
				}else if($('#PARENT_RELOAD').length>0){
					layer.msg(data['info'],{time: 0,shift:4});
					setTimeout(function(){parent.document.location.reload();},1000);
				}else if($('#DOCUMENT_RELOAD').length>0){
					layer.msg(data['info'],{time: 0,shift:4});
					setTimeout(function(){document.location.reload();},1000);	
				}else if($('#RESULT_DATA').length>0){
					try{ttgResultdata(data);}catch(e){alert('no function found')};
				}else{
					layer.msg(data['info'],{time: 0,shift:4});
					setTimeout(function(){document.location.href=data['url'];},1000);
				}
			}else{
				try{
					var json=eval(data['info']);
				}catch(e){
					var json='';
				}
				if(typeof(json[0])=="undefined"){
					layer.msg(data['info']);
				}else{
					try{
						error_check(json,form);
					}catch(e){
						layer.msg(json[0]);
					}
				}
			};
			$("input[type='password']").each(function(){
				$(this).val('');
			});
			$("#veryficodepic").click();
			return false;
		}, 
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			$(form).removeAttr('ajax');
			layer.closeAll(); 
			layer.alert(server_busy);
			//重置密码
			$("input[type='password']").each(function(){$(this).val('');});
			//重置验证码
			if($('#veryficodepic').length>0){veryficodepic();}
			return false;
		} 
	});			
	return false;
}
//上传图片后事件
function up_pic_obj3(obj,pic,F_SERVER){
	if(pic==undefined || pic==''){return false;}
	$('#'+obj).val(pic);
	$('#'+obj+'-error').html('');
	//文件扩展名
	var file_ext=pic.substr(pic.lastIndexOf(".")+1).toUpperCase();
	var pic_exp=Array('JPG', 'GIF', 'PNG', 'JPEG');
	var ispic=false;
	for(var i=0,k=pic_exp.length;i<k;i++){
		if(pic_exp[i]==file_ext){
			ispic=true;
		}
	}
	if(F_SERVER==undefined || F_SERVER==''){
		if(ispic){
			console.log(F_SERVER+pic);

			$('#'+obj+'_pic').html('<a href="/upfile3/files?f='+pic+'" data-lightbox="image-1" data-title="pic"><img style="float:left" height="108" width="170" src="/upfile3/files?f='+pic+'"></a>');
		}else{
			$('#'+obj+'_pic').html('<a href="/upfile3/files?f='+pic+'" style="display:block" title="'+file_ext+'" target="_blank"><img style="float:left" height="108" width="170" src="/Public/organ2/images/file.jpg"></a>')
		}
	}else{
		if(ispic){
			console.log(F_SERVER+pic);
			$('#'+obj+'_pic').html('<a href="'+F_SERVER+pic+'" data-lightbox="image-1" data-title="pic"><img style="float:left" height="108" width="170" src="'+F_SERVER+pic+'" onerror="this.src=\'/upfile3/files?f='+pic+'\'"></a>');
		}else{
			console.log(F_SERVER+pic);
			$('#'+obj+'_pic').html('<a href="'+F_SERVER+pic+'" style="display:block" title="'+file_ext+'" target="_blank"><img style="float:left" height="108" width="170" src="/Public/organ2/images/file.jpg"></a>')
		}
	}
	$("#"+obj).siblings('.img_mod').show();
	$("#"+obj).siblings('span').hide();
}
