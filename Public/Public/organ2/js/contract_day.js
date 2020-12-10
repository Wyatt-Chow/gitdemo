function selectmct(mct_no){
	url='/Contractday/merchant?mct_no='+mct_no;
	$.ajax({ 
		type: 'get', 
		url: url, 
		cache: false,
		async: true,
		dataType: 'json', 
		success: function (result) {
			mctInfo(result);
		}, 
		error: function(){
			layer.msg(server_busy)
		} 
	});
}

function mctInfo(result){
	if(result['errcode']>0){
		layer.msg(result['msg']);
		return false;
	}else{
		if(JSONLength(result['data']['organ'])>1){
			var selectorg=new Array();
			$.each(result['data']['organ'],function(key,value) {	
				selectorg.push(value['org_name']);	
			 });
			layer.msg(d0_select_organ, {
				time: 60000, 
				btn: selectorg,
				yes:function(){var i=0;$.each(result['data']['organ'],function(key,value) {i=i+1;if(i==1){init_content(result['data'],value);layer.closeAll();}})},
				btn2:function(){var i=0;$.each(result['data']['organ'],function(key,value) {i=i+1;if(i==2){init_content(result['data'],value);layer.closeAll();}})},
				btn3:function(){var i=0;$.each(result['data']['organ'],function(key,value) {i=i+1;if(i==3){init_content(result['data'],value);layer.closeAll();}})},
				btn4:function(){var i=0;$.each(result['data']['organ'],function(key,value) {i=i+1;if(i==4){init_content(result['data'],value);layer.closeAll();}})},
				btn5:function(){var i=0;$.each(result['data']['organ'],function(key,value) {i=i+1;if(i==5){init_content(result['data'],value);layer.closeAll();}})}
			});
		}else{
			$.each(result['data']['organ'],function(key,value) {
				init_content(result['data'],value);
			});
			layer.closeAll();
		}
	};	
};

function JSONLength(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};
function init_content(data,obj){
	$("#org_no").val(obj['org_no']);
	$("#mct_no").val(data['mct_no']);
	$("#mct_name").html(data['mct_name']);
	$("#brand_name").html(data['brand_name']);
	$("#fee").val(obj['fee']);
	$("#bank_fee").val(obj['bank_fee']/100);
	$("#other_fee").val(obj['other_fee']/100);
	$("#mct_amount").val(obj['mct_amount']/100);
	if(obj['need_check']=='1'){
		$("#need_check").html(d0_yes);
	}else{
		$("#need_check").html(d0_no);
	}
	$("#open_remark").html(obj['limit_open_remark']);
	if(obj['limit_open']=='1'){
		if(obj['limit_pass']=='1'){
			$("#open_remark").append('<br/><span class="red">'+d0_pass+'</span>');	
		}else{
			$("#open_remark").append('<br/><span class="red">'+d0_no_pass+'</span>');		
		}
		$("#mct_open_remark").html(obj['mct_limit_open_remark']);	
		$("#open_remark_area").show();		
	}else{
		$("#mct_open_remark").html('');	
		$("#open_remark_area").hide();		
	}
	var html='';
	$.each(obj['payment'],function(key,value) {
		html+='<label><input checked type="checkbox" name="pmt_id[]" value="'+value['pmt_id']+'">'+value['pmt_internal_name']+'</label>'
	})
	$("#payment_list").html(html);
	$('.checkbox input,.checkbox2 input').iCheck({checkboxClass: 'icheckbox_minimal-orange',radioClass: 'iradio_minimal-orange'})
}