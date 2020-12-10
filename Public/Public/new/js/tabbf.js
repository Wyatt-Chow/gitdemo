
//快速进件修改
//客户经理

//商户类型选择
$(".shoptype .radiobox li").on('click',function(){

	if(!$(this).hasClass('active')){
		if($(this).hasClass('isshop')){
			$(".licence").fadeIn()
			$('#bl_no,#bl_sdate,#bl_edate').addClass('required')
			$('.uploadimg>.newupload .pic_box>input').addClass('required').eq(6).removeClass('required').end().eq(8).removeClass('required');
			$('#bl_pics,.uploadimg>.newupload .pic_box').show()
		}else{
			$(".licence").fadeOut()
            $('#bl_no').removeClass('required')
			$('#bl_sdate').removeClass('required')
			$('#bl_edate').removeClass('required')
			$('#bl_pics,.uploadimg>.newupload .pic_box').hide()
			$('.uploadimg>.newupload .pic_box>input').removeClass('required').eq(1).addClass('required').end().eq(2).addClass('required');
			$('.uploadimg>.newupload .pic_box').eq(1).show().end().eq(2).show()
		}
		$(this).addClass('active').find('input').attr('checked','true').end().siblings().removeClass('active').find('input').removeAttr('checked')
	}
})
//结算账户人身份
$(".relationbox li").on('click',function(){
	if(!$(this).hasClass('active')){
		if($(this).hasClass('relation')){
			$(".relation-info").fadeIn()
			$("#licence_pic2").siblings('span').prepend('<i>*</i>')
			$("#licence_pic2,.relation-info input").addClass('required')
		}else{
			$(".relation-info").fadeOut()
			$("#licence_pic2").siblings('span').find('i').remove()
			$("#licence_pic2").removeClass('required')
		}
		$(this).addClass('active').find('input').attr('checked','true').end().siblings().removeClass('active').find('input').removeAttr('checked')
	}
})
// 单选框选择
$(".relation-info .radiobox li,.leadsex li,.accounttype li").on('click',function(){
	if(!$(this).hasClass('active')){
		$(this).addClass('active').find('input').attr('checked','true').end().siblings().removeClass('active').find('input').removeAttr('checked')
	}
})
	$('.accounttype li').on('click', function () {
		if($(this).hasClass('relation')){
			$('.table2 .relashow,.relation-info').hide()

		}else {
			$('.table2 .relashow').show()
			if($('.relationbox .relation ').hasClass('active')){
				$('.relation-info').show()
			}
		}
	});
	//开通支付合同
	$(".payser .payhead .checkbox").bind('click',function(){
		var check = $(this).siblings('input').prop('checked');
		var thisclass = $(this).siblings('input').prop('class')
		var thisindex= thisclass.split('_')[1];
		console.log(thisclass)
		if(check){
			$(this).siblings('input').attr('checked',false)
			$(this).removeClass('active')
			$('.paytype'+thisindex).hide()
			$('.paytype'+thisindex).find('input').removeClass('required')
		}else{
			$(this).siblings('input').attr('checked',true)
			$(this).addClass('active')
			$('.paytype'+thisindex).show()
			$('.paytype'+thisindex).find('input').addClass('required')
		}
	});
$('.paytype .rateinput').on('keyup', function () {
	var minnum = $(this).siblings('span').find('em').eq(0).text()*1000;
	var maxnum = $(this).siblings('span').find('em').eq(1).text()*1000;
	var thisval =$(this).val()*1000;
	if(thisval<=maxnum&&thisval>=minnum){
		$(this).parent().find('i').hide()
	}else {
		$(this).parent().find('i').show()
	}
})
//打开添加反洗钱
$(".open_antipop").on('click',function(){
	$(".antipop").show()
	if($(".relationbox .relation").hasClass('active')){
		$(".antipop .account").show()
	}
})
$(".antipop .close").on('click',function(){
	$(".antipop").hide()
})
//行政许可证明注意事项
$(".uploadimg  .newupload .note").hover(function(){
	$(".uploadimg  .newupload .hint").show()
},function(){
	$(".uploadimg  .newupload .hint").hide()
})
//自动生成合同编号
function con_id_auto_create(idname){
	var id = idname;
	$.ajax({
		type: 'get',
		url: '/Merchant/con_id_auto_create',
		cache: false,
		async: true,
		dataType: 'html',
		success: function (data) {

			$("#code"+id).val(data);
		}
	})
}
//模糊搜索
var kehuarr=$admin;
var serbox = $(".fuzzy_search .searbox");
//去左右空格;
function Trim(str,is_global)
{
	var result;
	result = str.replace(/(^\s+)|(\s+$)/g,"");
	if(is_global.toLowerCase()=="g")
	{
		result = result.replace(/\s/g,"");
	}
	return result;
}
$(".cli-mge").on('keyup',function(){
	var thisval = Trim($(this).val(),"g");
	var newarr =[];
	if(thisval.length>0){
		var reg = new RegExp(thisval);
		for (var i=0;i<kehuarr.length;i++) {
			if(reg.test(kehuarr[i])) {
				newarr.push(kehuarr[i])
			}
		}
		serbox.html('');
		for(var j=0;j<newarr.length;j++){
			serbox.show()
			var thisdom = '<div class="mgname index'+j+'">'+newarr[j]+'</div>';
			serbox.append(thisdom)
		}
	}else{
		serbox.hide()
	}
})



//客户经理
$(".cli-mge").on('focus',function(){
	$(".fuzzy_search .searbox").width($(".fuzzy_search input").width()+8)
	//上下选择名称
	var index=-1;
	var newarr =[];
	var blurval=0;
	if($(this).val().length>=0){
		var reg = new RegExp($(this).val());
		for (var i=0;i<kehuarr.length;i++) {
			if(reg.test(kehuarr[i])) {
				newarr.push(kehuarr[i])
			}
		}
		serbox.html('');
		if(newarr.length>6){
			newarr.length =6;
		}
		for(var j=0;j<newarr.length;j++){
			serbox.show()
			var thisdom = '<div class="mgname index'+j+'">'+newarr[j]+'</div>';
			serbox.append(thisdom)
		}
	}
	//上下方向键控制方向
	$(".cli-mge").on('keyup',function(event){
		var mgname = $(".fuzzy_search .mgname");
		var max = mgname.length-1;
		if(event.keyCode==38&&!$(".fuzzy_search .searbox").is(":hidden")){
			if(index>0){
				index--
			}
			mgname.eq(index).css('background','#ccc')
		}else if(event.keyCode==40&&!$(".fuzzy_search .searbox").is(":hidden")){
			if(index<max){
				index++
			}
			mgname.eq(index).css('background','#ccc');
		}else if(event.keyCode==13&&!$(".fuzzy_search .searbox").is(":hidden")){
			var thisval = mgname.eq(index).text();
			$(".fuzzy_search .cli-mge").val(thisval)
			serbox.html('').hide()
			index = -1;

		}
	})
	//阻止回车提交表单
	$(".cli-mge").on('keydown',function(event){
		if(event.keyCode==13){
			return false;
		}
	})

	//点选名称
	$(document).on('click','.fuzzy_search .mgname',function(){
		var thisval = $(this).text();
		console.log(thisval)
		$(".fuzzy_search .cli-mge").val(thisval)
		$(".fuzzy_search .searbox").hide();
		index=-1;
	})
	//失焦事件
	$(".cli-mge").on('blur',function(){
			setTimeout(function () {
				$(".fuzzy_search .searbox").hide()

			},300)
		index = -1;
	})
})

//上传其他资料
$('#filePicker').on('click',function(){
	if($('.otherinfo .list').is(":hidden")){
		$('.otherinfo .list').show()
	}else {
		$('.otherinfo .list').hide()
	}
})

//客服电话绑定
$(".leadphone").on('keyup',function(){
	var thisval = $(this).val();
	$(".csphone").val(thisval)
})
//日历
if($('.datetimepicker10').length>0 || $('.datetimepicker20').length>0){
	var newdate;
	//jQuery.datetimepicker.setLocale('zh');
	$('.datetimepicker10').datetimepicker({
		timepicker: false,
		format: 'Y-m-d',
		//minDate:"2016/12/08",
		onSelectDate:function(){
			newdate = $('.datetimepicker10').val().split('-').join('/');
			$('.datetimepicker20').datetimepicker({
				timepicker: false,
				format: 'Y-m-d',
				minDate:newdate
			})
		}
	})
}
if($('.datetimepicker30').length>0 || $('.datetimepicker40').length>0){
	var newdate;
	//jQuery.datetimepicker.setLocale('zh');
	$('.datetimepicker30').datetimepicker({
		timepicker: false,
		format: 'Y-m-d',
		//minDate:"2016/12/08",
		onSelectDate:function(){
			newdate = $('.datetimepicker30').val().split('-').join('/');
			$('.datetimepicker40').datetimepicker({
				timepicker: false,
				format: 'Y-m-d',
				minDate:newdate
			})
		}
	})
}

