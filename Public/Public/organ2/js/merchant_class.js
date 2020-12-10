$(function(){
	//分类处理流程
	var str_clsid ="<option value=''>"+cls1_name+"</option>";
	var str_clsids="<option value=''>"+cls2_name+"</option>";
	$.each(mct_json, function(key,value){
		if(value.c==0){
			str_clsid+="<option value='"+value.a+"'>"+value.b+"</option>";
		}
	});	
	$(str_clsid).appendTo($("#select_bclsid"));
	$(str_clsids).appendTo($("#select_bclsids"));
	
	$("#select_bclsid").change(function(){
		var clsid=$(this).val();
		$("#cls_id").val(clsid);
		str_clsids="<option value=''>"+cls2_name+"</option>";
		
		$.each(mct_json, function(key,value){
			if(parseInt(value.c)==parseInt(clsid)){
				str_clsids+="<option value='"+value.a+"'>"+value.b+"</option>";
			}
		});
		$("#select_bclsids").empty();
		$(str_clsids).appendTo($("#select_bclsids"));
		
		try{jselectcls()}catch(e){};
	})
	
	$("#select_bclsids").change(function(){
		$("#cls_id").val($(this).val());
		try{jselectcls()}catch(e){};
		select_bclsid_add($("#select_bclsids option:selected").val());
	})	
	//营业执照类型
	$("#bl_type").change(function(){
		if($(this).val()=="1"){
			$(".nothree").hide();
		}else{
			$(".nothree").show();
		}
	})
	$("#bl_type").change();
	//账户类型
	$("input[name='account_type']").on('ifChecked', function(event){
		if($(this).val()=='1'){
			$(".act_boss_info").hide();	
			$("#act_id_info").hide();
			$("#account_id_no").removeClass('required');
			$("#licence_pic2").removeClass('required');
		}else{
			$(".act_boss_info").show();	
			if($("#account_boss_btn input:checked").val()=="2"){
				$("#act_id_info").show();
				$("#account_id_no").addClass('required');
			}
		}
	})
	if($("input[name='account_type']:checked").val()=="1"){
		$(".act_boss_info").hide();	
		$("#act_id_info").hide();
	}
	////结算账户人身份
	$("input[name='account_boss']").on('ifChecked', function(event){  
		if($(this).val()=='2'){
			$("#act_id_info").show();	
			$("#account_id_no").addClass('required');
			$("#licence_pic2").addClass('required');
		}else{
			$("#act_id_info").hide();
			$("#account_id_no").removeClass('required');	
			$("#licence_pic2").removeClass('required');
		}
		$('input').iCheck('update');
	})	
	if($("input[name='account_boss']:checked").val()=="2"){
		$("#act_id_info").show();	
		$("#account_id_no").addClass('required');
		$("#licence_pic2").addClass('required');
	}
	//证件重号验证
	$("#boss_id_no_check").click(function(){
		var data='boss_id_no='+$('#boss_id_no').val()+'&boss_id_type='+$('#boss_id_type').val();
		$.ajax({
				type: 'get', 
				url: '/merchant/check_no', 
				data:data, 
				cache: false,
				async: true,
				dataType: 'json', 
				success: function (data) {
					if(data['errcode']>0){
						layer.msg(data['msg']);
					}else{
						str='<div class="table">'+data['data']['check_result']+'</div>';
						layer.open({
						  type: 1,
						  title: false,
						  closeBtn: 1,
						  shadeClose: true,
						  skin: 'yourclass',
						  content:str
						});
					}
				}
		})
	})
	
	//国家
	var dcountry=$("#boss_id_country,#boss_id_country1").attr('alt');
	$.getJSON("/Me/country.json",function(data){ 
		var str='';
		if(dcountry==""){
			dcountry=data['default'];
		}
		$.each(data['country'], function(key,value){
			str+="<option value='"+key+"'";
			if(key==dcountry){
				str+=' selected';	
			}
			str+=">"+value+"</option>";
		});
		$(str).appendTo($("#boss_id_country,#boss_id_country1"));
	});	
	//职业
	var job=$("#title").attr('alt');
	$.getJSON("/Me/jobs.json",function(data){ 
		var str='';
		if(job==""){
			job=data['default'];
		}
		$.each(data['jobs'], function(key,value){
			str+="<option value='"+value+"'";
			if(value==job){
				str+=' selected';	
			}
			str+=">"+value+"</option>";
		});
		$(str).appendTo($("#title"));
	});	
	
	
	
	setTimeout(function(){
		if($("#clsid").length>0 && $("#clsid").val()!=""){
			var clsids=($('#clsid').val()).split(',');
			for (i=0;i<clsids.length ;i++ ){
				select_bclsid_add(clsids[i]);
			}
		}
		if($("#cls_id").length>0 && $("#cls_id").val()!=""){
			var cls_id=$("#cls_id").val();
			$.each(mct_json, function(key,value){
				if(parseInt(value.a)==parseInt(cls_id)){
					if(value.c=="0"){
						$("#select_bclsid option[value='"+cls_id+"']").attr('selected','selected');
						var str_clsids="<option value=''>"+cls2_name+"</option>";
						$.each(mct_json, function(key2,value2){
							if(parseInt(value2.c)==parseInt(value.a)){
								str_clsids+="<option value='"+value2.a+"'>"+value2.b+"</option>";
							}
						});
						$("#select_bclsids").empty();
						$(str_clsids).appendTo($("#select_bclsids"));
					}else{
						$("#select_bclsid option[value='"+value.c+"']").attr('selected','selected');
						var str_clsids="<option value=''>"+cls2_name+"</option>";
						$.each(mct_json, function(key2,value2){
							if(parseInt(value2.c)==parseInt(value.c)){
								str_clsids+="<option value='"+value2.a+"'>"+value2.b+"</option>";
							}
						});
						$("#select_bclsids").empty();
						$(str_clsids).appendTo($("#select_bclsids"));

						$("#select_bclsids option[value='"+cls_id+"']").attr('selected','selected');
					}
				}
			});
			
			$("#account_type input:checked").click();
		}		
		
	},20);
})
function select_bclsid_add(clsid){
	var selected_count=$("#select_bclsid_selected input").length;
	if(selected_count>=5){
		layer.alert(cls_select_tip);
		return;	
	};
	
	if(selected_count>0){
		var isfind=0;
		$("#select_bclsid_selected input").each(function(){
			if(parseInt(($(this).val().split(','))[1])==parseInt(clsid)){
				isfind=1;
				return;
			}	
		})
		if(isfind==1){return;}
	}
	
	$.each(mct_json, function(key,value){
		if(value.a==clsid && value.c>0){
			$("#select_bclsid_selected").append('<span><input type="hidden" name="clsid[]" value="'+value.c+','+value.a+'">'+value.b+'<a href="javascript:;">×</a></span>');
			return;
		}
	});
	
	$("#select_bclsid_selected a").click(function(){
		$(this).parent().remove();	
	})
}

function jselectcls(){
	$(".select .selectbox").remove();
	$(".select .selectbox-wrapper").remove();
	$(".select select").selectbox();
	$(".select2 .selectbox").remove();
	$(".select2 .selectbox-wrapper").remove();	
	$(".select2 select").selectbox();
	
	
}

function error_check(json,form){
	if(json[1]==6095){
		layer.alert(json[0], {
			icon:3,
			time: 0, //不自动关闭
			btn: [btn_ok, btn_cancel],
			yes: function(index){
				layer.closeAll();
				$("#check_card").val(2);
				$(form).submit();
			},
			cancel: function(index){
				$("#check_card").val(1);
			}
		});
	}else{
		layer.msg(json[0]);
	}
}