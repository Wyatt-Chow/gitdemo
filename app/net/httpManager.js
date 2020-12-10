import config from '../config/DCeZConfig.js'

export default {
	request(options, checkLogin = false, fullUrl = false, ) {
		if (!options) return;
		console.log('config.baseURL====',config.baseURL)
		if (!fullUrl) {
			options.url = config.baseURL + options.url;
		}
		console.log('options.url====',options.url)
		try {
			const token = uni.getStorageSync('token');
			if (token) {
				options.header = {
					'com-dcez-token': token
				};
			} else if (checkLogin) {
				uni.showModal({
					title: '提示',
					content: '请去登录',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.reLaunch({
								url: '/pages/login/login_quick.vue',
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			}
			// return;
		} catch (err) {
			console.log(err)
		}
		return new Promise((resolve, reject) => {
			console.log('5555555555555555555555555555',options.data)
			uni.request({
				// url: 'http://192.168.0.132:8000/common/appUserLogin/oneKeyLogin',
				url: options.url,
				data: options.data || {},
				header: options.header,
				method: options.method ||'GET',
				success(res) {
					// resolve(res);
					console.log('login res1==',res);
					console.log('login res2==',resolve(res));
					if (res.data.code === 1000) {
						uni.showModal({
							title: '提示',
							content: '请去登录',
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
									uni.reLaunch({
										url: '/pages/login/login_quick.vue',
									});
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
						uni.reLaunch({
							url: '/pages/login/login',
						});
					} else{
						console.log('3333333333333333333333')
						console.log(res)
						resolve(res);
					}
				},
				fail(ERR) {
					console.log('444444444444444')
					console.log(ERR)
					reject(ERR)
				}
			})
		})
	}
}
