import httpManager from './httpManager.js';

export default {

	// 文件上传
	fileUpload(type, fileList, fileNameList,callback,headImgName=0) {
		let self = this;
		if(fileList.length == 0){
			uni.hideLoading();
			uni.showModal({
				content: '上传文件列表为空',
				showCancel: false
			});
			return;
		}
		var requestTask = httpManager.request({
			url: '/', //请求后台签名地址。
			data:{
				key:headImgName
			}
			}).then(function(res) {
			if (res.data.data) {
				var data = res.data.data;
				var  filePathList = [];
				var count = 0;
				console.log(fileNameList,'fileNameList')
				for(var i = 0;i<fileList.length; i++){
					var fileSrc = fileList[i];
					var fileName = fileNameList[i]
					uni.uploadFile({
						url:'https://',
						filePath: fileSrc,  
						fileType: type,
						name: 'file',
						//header:{'token':data.token},
						formData: {
							key: fileName,  //文件名
							token:data.token,
						},
						success: res => {
							if(res.data && res.statusCode == 200){
								var qiNiuResData = JSON.parse(res.data);
							}
							if(qiNiuResData.key){
								filePathList = filePathList.concat(data.domain + qiNiuResData.key);
							}
							count++;
							if(count == fileList.length){
								if(callback){
									let arr = [];
									for (let i=0;i<fileNameList.length;i++) {
										arr.push('http://'+fileNameList[i]);
									}
									callback(arr,type);
								}
							}
						},
						fail: (error) => {
							console.log('upload qniu failed error is:',error);
							if(callback){
								callback(filePathList,type);
							}
						}
					});
				}
			} else {
				uni.hideLoading();
				uni.showModal({
					content: err,
					showCancel: false
				});
			}
		}).catch(err => {
			console.log('上传返回消息错误:', err);
			uni.hideLoading();
			uni.showModal({
				content: err,
				showCancel: false
			});
		})
	},
	
	//发布
	publishToServer(fileType,pathList,content,posX,posY,addr,callback,storeId){
		httpManager.request({
			url: '/',
			data: {
				synopsis: content, //内容
				image: pathList, //图片路径
				type: fileType, //发布类型 图片0、视频1
				medai: pathList, //媒体id
				a_x: posX, //坐标X 纬度 33.8
				a_y: posY, //坐标y  经度 140
				addr_tag: addr, //地址文字标签 '广东深圳'
				hide_type: 0 ,//0公开,1好友，2私有
				cid:storeId,
			},
			method: 'POST',
		}).then(function(res) {
			console.log('发布返回消息结果res:', res);
			console.log('res.data==', res.data);
			//uploadData.updateImageUrlList = [];
			uni.hideLoading();
			if (res.data.code == 200) {
				uni.showToast({
					icon: 'success',
					title: "发布成功",
					duration: 1000
				})
				console.log('/pages/index/index.vue')
				uni.switchTab({
					url:'/pages/index/index'
				})
				callback();
			} else {
				uni.showToast({
					icon: 'success',
					title: "发布失败",
					duration: 1000
				})
			}
		}).catch(err => {
			console.log('发布返回消息错误:', err);
		})
	},
	
	_getSuffix(filename) {
		let pos = filename.lastIndexOf('.');
		let suffix = '';
		if (pos != -1) {
			suffix = filename.substring(pos);
		}
		return suffix;
	},
	getFileName(filename) {
		return (
			new Date().getTime() +
			Math.random()
				.toString(36)
				.substring(3, 20) +
			this._getSuffix(filename)
		);
	}
}
