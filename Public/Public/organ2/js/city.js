$(function(){
	
	var str_Province="<option value=''>"+province_select+"</option>";
	$.each(cityjson, function(key,value){
		if(value.c==null && value.y==null){
			str_Province+="<option value='"+value.id+"'>"+value.p+"</option>";
		}
	});
	$(str_Province).appendTo($("#Province"));
	$("<option value=''>"+city_select+"</option>").appendTo($("#City"));	
	$("<option value=''>"+county_select+"</option>").appendTo($("#County"));	
	
	$("#Province").change(function(){
		$("#City").empty();
		$("#County").empty();
		$("<option value=''>"+city_select+"</option>").appendTo($("#City"));
		$("<option value=''>"+county_select+"</option>").appendTo($("#County"));	
		if($(this).val()==""){
			$("#Cityid").val("");
			return;	
		}
		$("#Cityid").val($(this).val());
		var pval=$(this).find("option:selected").text();
		var str="";
		$.each(cityjson, function(key,value){
			if(value.p==pval && value.y==null && value.c!=null){
				str+="<option value='"+value.id+"'>"+value.c+"</option>";
			}
		});
		
		$(str).appendTo($("#City"));
	})
	
	$("#City").change(function(){
		if($(this).val()==""){
			$("#County").empty();
			$("<option value=''>"+county_select+"</option>").appendTo($("#County"));
			$("#Cityid").val($("#Province").val());
			return;
		}
		$("#County").empty();
		$("#Cityid").val($(this).val());
		var cval=$(this).find("option:selected").text();
		str="<option value=''>"+county_select+"</option>";
		$.each(cityjson, function(key,value){
			if(value.c==cval && value.y!=null && value.p!=null){
				str+="<option value='"+value.id+"'>"+value.y+"</option>";
			}
		});
		$(str).appendTo($("#County"));	
		try{jSelect2City()}catch(e){};
	})
	
	$("#County").change(function(){
		if($(this).val()==""){
			$("#Cityid").val($("#City").val());
			return;
		}
		$("#Cityid").val($(this).val());
	})	
	setTimeout(function(){
		if($("#Cityid").val()!=""){
			var Cityid=$("#Cityid").val();
			$.each(cityjson, function(key,value){
				if(value.id==Cityid){
					$("#Province option").each(function(){
						if($(this).text()==value.p){
							$(this).attr("selected",true);	
						}
					})
					$("#Province").change();
					if(value.c!=null){
						$("#City option").each(function(){
							if($(this).text()==value.c){
								$(this).attr("selected",true);	
							}
						})
						$("#City").change();
						if(value.y!=""){
							$("#County option").each(function(){
								if($(this).text()==value.y){
									$(this).attr("selected",true);	
								}
							})
							$("#Cityid").val(Cityid);
						}
					}
				}
			});
		}
		try{jSelect2City()}catch(e){};
	},1000);
})

function jSelect2City(){
	$(".select2 .selectbox").remove();
	$(".select2 .selectbox-wrapper").remove();
	$(".select2 select").selectbox();
	$("#Province_container li").click(function(){
		var province=$(this).text();
		$("#Province option").each(function(){
			if($(this).text()==province){
				$(this).attr('selected',true);	
			}
		});
		$("#Province").change();
		jSelect2City();
	})	
	$("#City_container li").click(function(){
		var city=$(this).text();
		$("#City option").each(function(){
			if($(this).text()==city){
				$(this).attr('selected',true);	
			}
		});
		$("#City").change();				
		jSelect2City();
	})
	$("#County_container li").click(function(){
		var county=$(this).text();
		$("#County option").each(function(){
			if($(this).text()==county){
				$(this).attr('selected',true);	
			}
		});
		$("#County").change();				
		jSelect2City();
	})
}
