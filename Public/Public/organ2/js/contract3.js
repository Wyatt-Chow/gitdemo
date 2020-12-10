
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
		var newarr = [];
		//事件处理
		for (var i=0;i<num;i++){
			$("."+obj+"_select").eq(i).change(function(){
				var thisValue=$(this).val();//当前表单值
				var thisRows=$(this).attr("rows");//当前表单值序列
				newarr.push(thisValue)
				$("#"+obj).val('');//清除目标值
				//重置同级后无素所有值
				$(this).nextAll().empty();
				$("<option value=''>...</option>").appendTo($(this).nextAll());	
				//下一个表单
				var nextObj=$(this).next();
				//如果是最后一个select,直接赋值
				if(thisRows==num-1){
					$("#"+obj).val($(this).find("option:selected").attr("id"));
					$(this).siblings(".abc").val(newarr)
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


