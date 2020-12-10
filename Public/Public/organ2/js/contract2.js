$(function(){
	for(var p in json_fee){
		$("<option value='"+json_fee[p]['pmf_id']+"'>"+json_fee[p]['pmf_name']+"</option>").appendTo($("#pmf_id"));
	} 
	fee($("#pmf_id").val());
	$("#pmf_id").change(function(){
		fee($(this).val());	
	});
	$(".text_float").keyup(function(event) {$(this).val($(this).val().replace(/[^1234567890.]+/g,''));})
	$(".text_percent").keyup(function(event) {
		var thisvalue=$(this).val().replace(/[^1234567890.]+/g,'');
		if(thisvalue>100){thisvalue=100;}
		$(this).val(thisvalue);
	})
	$(".text_int").keyup(function(event) {$(this).val($(this).val().replace(/[^1234567890]+/g,''));})
	$("input").blur(function(){
		var objname="."+$(this).attr("name");
		if($(objname).val()==""){
			$(objname).val($(this).val());
		}
	})
	$(".readonlay").attr("readonly","readonly");
	$("input[name='discount_fee']").on("ifChecked", function(event){	
		if($("input[name='discount_fee']:checked").val()=="1"){
			$(".discount_html").show();
			$(".discount_html input").addClass("required");
		}else{
			$(".discount_html").hide();
			$(".discount_html input").removeClass("required");
		}
	})
	if($("input[name='discount_fee']:checked").val()=="1"){
		$(".discount_html").show();
	}
	if(json_fee.length==1){
		$("#com_mct_pmt_type").hide();	
	}
})
//费率
function fee(id){
	for(var p in json_fee){
		if(id==json_fee[p]['pmf_id']){
			var str='';
			var n='';
				str+='<input type="text" id="fee" name="fee" value="'+json_fee[p]['pmf_max_fee']+'" class="txt w2 required" style="width:1.5rem !important;"> % ';
				if(json_fee[p]['pmf_max_fee']!=json_fee[p]['pmf_min_fee']){
					str+='('+json_fee[p]['pmf_min_fee']+'% - '+json_fee[p]['pmf_max_fee']+'%)';
				}
				if(parseInt(json_fee[p]['pmf_limit'])>0){
					str+='&nbsp;<input class="txt w2" style="width:2rem !important;" type="text" id="pmf_limit" name="pmf_limit" value="'+(json_fee[p]['pmf_limit']/100)+'"> '+caps;
				}else{
					str+='<input type="hidden" id="pmf_limit" name="pmf_limit" value="">';	
				}
				str+='';		
			
			$("#fee_html").html(str);	
		}
	}
}
//多层级select处理(json对象，无素对象，json层级,初始值)
function ConSelect(json,obj,num,dVal){
		//先创建初始表单
		var html='';
		for (var i=0;i<num;i++){
			html+='<select name="'+obj+'_select[]" rows="'+i+'" class="'+obj+'_select"><option value="">'+str_select+'</option></select>';
		}
		$("#"+obj).after(html);
		//给第一个select赋值
		$.each(json,function(key,value){ 
			if(num==1){
				$("<option value='"+value[1]+"' id='"+value[0]+"'>"+value[1]+"</option>").appendTo($("."+obj+"_select").eq(0));
			}else{
				$("<option value='"+key+"'>"+key+"</option>").appendTo($("."+obj+"_select").eq(0));	
			}
		});	
		//事件处理
		for (var i=0;i<num;i++){
			$("."+obj+"_select").eq(i).change(function(){
				var thisValue=$(this).val();//当前表单值
				var thisRows=$(this).attr("rows");//当前表单值序列
				$("#"+obj).val('');//清除目标值
				//重置同级后无素所有值
				$(this).nextAll().empty();
				$("<option value=''>...</option>").appendTo($(this).nextAll());	
				//下一个表单
				var nextObj=$(this).next();
				//如果是最后一个select,直接赋值
				if(thisRows==num-1){
					$("#"+obj).val($(this).find("option:selected").attr("id"));
					return;
				}
				//表单赋值
				if(thisRows==0){
					var newjson=json[thisValue];
				}else if(thisRows==1){
					var newjson=json[$("."+obj+"_select").eq(0).val()][thisValue];	
				}else if(thisRows==2){
					var newjson=json[$("."+obj+"_select").eq(0).val()][$("."+obj+"_select").eq(1).val()][thisValue];	
				}else if(thisRows==3){
					var newjson=json[$("."+obj+"_select").eq(0).val()][$("."+obj+"_select").eq(1).val()][$("."+obj+"_select").eq(2).val()][thisValue];	
				}
				if(thisRows==num-2){
					$.each(newjson,function(key,value){
						$("<option value='"+value[1]+"' id='"+value[0]+"'>"+value[1]+"</option>").appendTo($(nextObj));
					})	
				}else{
					$.each(newjson,function(key,value){
						$("<option value='"+key+"'>"+key+"</option>").appendTo($(nextObj));
					})
				}
			})
		}
		//初始值处理
		if(dVal!=""){ 
			for (var i=0;i<num;i++){
				$("."+obj+"_select").eq(i).val(dVal[i]);
				$("."+obj+"_select").eq(i).change();
			}
		}
}
//自动生成合同编号
function con_id_auto_create(){
	$.ajax({ 
		type: 'get', 
		url: '/Contract/con_id_auto_create', 
		cache: false,
		async: true,
		dataType: 'html', 
		success: function (data) {	
			$("#code").val(data);
		}
	})
}


