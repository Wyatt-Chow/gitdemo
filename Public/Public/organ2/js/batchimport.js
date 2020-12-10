function batchstatus(ftype){
	$.ajax({ 
		type: 'get', 
		cache: false,
		async: true,
		url: '/batchimport/'+ftype+'_import_status', 
		success: function (data){
			if(data=='ok'){
				document.location.reload();
			}else{
				$("#job_tips").html(data);
				setTimeout(function(){batchstatus(ftype);},100);	
			}
		}
	})
}

function batchreset(ftype){
	layer.load();
	$.ajax({ 
		type: 'get', 
		url: '/batchimport/'+ftype+'_reset', 
		success: function (data) {
			layer.closeAll();
			batchstatus(ftype);
		}
	})
}

function batchclean(ftype){
	layer.load();
	$.ajax({ 
		type: 'get', 
		cache: false,
		async: true,
		url: '/batchimport/'+ftype+'_clean', 
		success: function (data) {
			layer.closeAll();
			batchstatus(ftype);
		}
	})
}