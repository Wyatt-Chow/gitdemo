$(function(){
	
	var str_Province="<option value=''>...</option>";
	$.each(category_json, function(key,value){
		if(value.c==null && value.y==null){
			str_Province+="<option value='"+key+"'>"+key+"</option>";
		}
	});
	$(str_Province).appendTo($("#category_id_1"));
	$("<option value=''>...</option>").appendTo($("#category_id_2"));	
	$("<option value=''>...</option>").appendTo($("#category_id_3"));	
	
	$("#category_id_1").change(function(){
		$("#category_id_2").empty();
		$("#category_id_3").empty();
		$("<option value=''>...</option>").appendTo($("#category_id_2"));
		$("<option value=''>...</option>").appendTo($("#category_id_3"));	
		if($(this).val()==""){
			$("#category_id").val("");
			return;	
		}
		$("#category_id").val('');
		var pval=$(this).find("option:selected").text();
		var str="";
		//alert(category_json[pval].value);
		$.each(category_json[pval], function(key,value){
			str+="<option value='"+key+"'>"+key+"</option>";
		});
		
		$(str).appendTo($("#category_id_2"));
	})
	
	$("#category_id_2").change(function(){
		if($(this).val()==""){
			$("#category_id_3").empty();
			$("<option value=''>...</option>").appendTo($("#category_id_3"));
			$("#category_id").val($("#category_id_1").val());
			return;
		}
		$("#category_id_3").empty();
		$("#category_id").val('');
		var pval=$("#category_id_1").find("option:selected").text();
		var cval=$(this).find("option:selected").text();
		str="<option value=''>...</option>";
		$.each(category_json[pval][cval], function(key,value){
				str+="<option value='"+key+"'>"+key+"</option>";
		});
		$(str).appendTo($("#category_id_3"));	
		try{jSelect2Category()}catch(e){};
	})
	
	$("#category_id_3").change(function(){
		if($(this).val()==""){
			$("#category_id").val($("#category_id_2").val());
			return;
		}
		var pval=$("#category_id_1").find("option:selected").text();
		var cval=$("#category_id_2").find("option:selected").text();
		var yval=$("#category_id_3").find("option:selected").text();
		$.each(category_json[pval][cval][yval], function(key,value){
			$("#category_id").val(key);
			$("#category_licess").html(value);
		});
	})	
	setTimeout(function(){
		if($("#category_id").val()!=""){
			var category_id=$("#category_id").val();
			$.each(category_json, function(key,value){
				$.each(category_json[key], function(key2,value2){
				$.each(category_json[key][key2], function(key3,value3){
				$.each(category_json[key][key2][key3], function(key4,value4){
					if(key4==category_id){
						$("#category_id_1 option").each(function(){
							if($(this).text()==key){
								$(this).attr("selected",true);	
							}
						})
						$("#category_id_1").change();
						$("#category_id_2 option").each(function(){
							if($(this).text()==key2){
								$(this).attr("selected",true);	
							}
						})
						$("#category_id_2").change();	
						$("#category_id_3 option").each(function(){
							if($(this).text()==key3){
								$(this).attr("selected",true);	
							}
						})
						$("#category_id_3").change();											
					}
				})
				})
				})
			});
		}
		try{jSelect2Category()}catch(e){};
	},1000);
})

function jSelect2Category(){
	$(".select2 .selectbox").remove();
	$(".select2 .selectbox-wrapper").remove();
	$(".select2 select").selectbox();
	$("#category_id_1_container li").click(function(){
		var province=$(this).text();
		$("#category_id_1 option").each(function(){
			if($(this).text()==province){
				$(this).attr('selected',true);	
			}
		});
		$("#category_id_1").change();
		jSelect2Category();
	})	
	$("#category_id_2_container li").click(function(){
		var city=$(this).text();
		$("#category_id_2 option").each(function(){
			if($(this).text()==city){
				$(this).attr('selected',true);	
			}
		});
		$("#category_id_2").change();				
		jSelect2Category();
	})
	$("#category_id_3_container li").click(function(){
		var county=$(this).text();
		$("#category_id_3 option").each(function(){
			if($(this).text()==county){
				$(this).attr('selected',true);	
			}
		});
		$("#category_id_3").change();				
		jSelect2Category();
	})
}
