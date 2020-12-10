<template>
	<view class="user-setting">
		<uni-nav-bar :status-bar="true" :fixed="true">
			<view slot="left" class="map-navbar-display map-navbar-display-left" @click="back()">
				<image src="/static/img/common/blackBack.png" class="uni-nav-bar-img-msg"></image>
			</view>
			<view slot="right" class="map-navbar-display map-navbar-display-right" @click="saveUserInfo()">
				<text>保存</text>
			</view>
		</uni-nav-bar>
		<view class="user-nav">
			<view class="user-nav-msg">
				<view class="user-nav-msg-one border-bottom">
					<view class="user-nav-msg-one-text">
						<view class="user-nav-msg-one-text-tips">头像</view>
						<cpimg ref="cpimg" @result="cpimgOk" @err="cpimgErr" :size="500" :maxWidth="1000" :ql="0.9" type=""></cpimg>
						<view class="user-nav-msg-one-text-name">
							<image v-bind:src="headerUrl" mode="aspectFill" class="user-nav-head-img" @click="changeHearImage"></image>
						</view>
					</view>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>

				<view class="user-nav-msg-one border-bottom">
					<view class="user-nav-msg-one-text">
						<view class="user-nav-msg-one-text-tips">昵称</view>
						<view class="user-nav-msg-one-text-name">
							<!-- <text class="user-nav-msg-one-text-name">nickname</text> -->
							<input class="user-nav-input" type="text" v-model.trim="nickName" maxlength="8" value="nickName" />
						</view>
					</view>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
				<view class="user-nav-msg-one border-bottom">
					<view class="user-nav-msg-one-text">
						<view class="user-nav-msg-one-text-tips">性别</view>
						<picker class="user-nav-msg-one-text-name" mode="selector" :value="sexIndex" :range="sexArray" @change="bindSexChange">
							<text class="user-nav-msg-one-text-name">{{this.sexArray[this.sexIndex]}}</text>
						</picker>
					</view>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>

				<view class="user-nav-msg-one border-bottom">
					<view class="user-nav-msg-one-text">
						<view class="user-nav-msg-one-text-tips">生日</view>
						<picker class="user-nav-msg-one-text-name" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<text class="user-nav-msg-one-text-name">{{date}}</text>
						</picker>
					</view>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>

				<view class="user-nav-msg-one border-bottom">
					<view class="user-nav-msg-one-text">
						<view class="user-nav-msg-one-text-tips">地区</view>
						<Region class="user-nav-msg-one-text-name" @change="changeRegion" :defaultValue="area"></Region>
					</view>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
			</view>
		</view>
		<echo-cropper ref="echo" @closeHeadEdit="closeHeadEdit" @openHeadEdit="openHeadEdit" v-show="isEditHead"></echo-cropper>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	import apiManager from '@/net/apiManager.js';
	import cpimg from "@/components/user-center/cpimg.vue";
	import Region from '@/components/user-center/region.vue';
	import EchoCropper from '@/components/echo-cropper/echo-cropper.vue';
	export default {
		components: {
			cpimg: cpimg,
			Region: Region,
			EchoCropper:EchoCropper,
		},
		
		computed: {
			...mapState(['userCenterInfo']),
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end')
			}
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				headerUrl: '',
				nickName: '',
				userPhone: '',
				date: currentDate,
				area: null,
				areaStr: '',
				upLoadFileName: '',
				upLoadFileUrl: '',
				avatarUrl: "/static/img/personCenter/testHead.jpg",
				sexIndex: 0,
				sexArray: ['女', '男'],
				isEditHead: false //头像剪辑框显示
			}
		},
		onLoad() {
			this.headerUrl = this.userCenterInfo ? this.userCenterInfo.avatar : avatarUrl;
			// this.nickName = this.userCenterInfo.nickName;
			// this.userPhone = this.userCenterInfo.phone;
			//this.sexIndex = this.userCenterInfo.sex;
			if (this.userCenterInfo.birthday) {
				this.date = this.timestampToTime(this.userCenterInfo.birthday);
			};
			if (this.userCenterInfo.addres) {
				this.area = this.userCenterInfo.address.split(' ');
				this.area = this.trimSpace(this.area)
			};
			console.log(this.userCenterInfo);
			this.headerUrl = "/static/img/personCenter/testHead.jpg"
		},
		methods: {
			openHeadEdit() {
				console.log(123)
				this.isEditHead = true;
			},
			closeHeadEdit(val) {
				this.isEditHead = false;
				if (val) {
					var fileSuffix = val.file;
					console.log(fileSuffix)
					this.upLoadFileName = 'user_head/' + this.userPhone + fileSuffix
					console.log(this.upLoadFileName)
					this.headerUrl=val.img;
					this.upLoadFileUrl = val.img;
				}
			},
			/**
			 * 选择省市区
			 * @param {Array(Object)} region 省市区数据
			 */
			changeRegion(region) {
				console.log('选择的省市区数据：', region);
				//let newArea = this.trimSpace(region)

				if (region.length > 0) {
					let newArea = ''
					for (let i = 0; i < region.length; i++) {
						if (i == region.length - 1) {
							newArea = newArea + region[i].name
						} else {
							newArea = newArea + region[i].name + ' '
						}
					}
					if (newArea) {
						this.areaStr = newArea
						this.area = newArea.split(' ');
					}
				}
			},
			bindSexChange: function(e) {
				this.sexIndex = e.target.value;
			},

			bindDateChange: function(e) {
				this.date = e.target.value
				console.log('change time e value', e.target.value)
			},

			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			getDate(type) {
				console.log(type);
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type == 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			
			changeHearImage() {
				this.$refs.echo.getImage();
			},
			
			cpimgOk(imageSrc) {
				console.log(imageSrc)
				this.headerUrl = imageSrc;
				this.upLoadFileUrl = imageSrc;
			},

			cpimgErr(imageSrc) {
				console.log('cpimg error src is:', imageSrc);
			},
			timestampToTime(timestamp) {
				var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes() + ':';
				var s = date.getSeconds();
				return Y + M + D;
			},

			//数组去除空值
			trimSpace(array) {
				for (var i = 0; i < array.length; i++) {
					if (array[i] == " " || array[i] == "" || array[i] == null || typeof(array[i]) == "undefined") {
						array.splice(i, 1);
						i = i - 1;
					}
				}
				return array;
			},

			saveUserInfo() {
				let fileList = [];
				let fileNameList = [];

				if (this.upLoadFileName && this.upLoadFileUrl) {
					fileList.push(this.upLoadFileUrl);
					fileNameList.push(this.upLoadFileName);
					apiManager.fileUpload('image', fileList, fileNameList, this.savetoServer, this.upLoadFileName)
				} else {
					this.savetoServer(fileList)
				}
			},

			savetoServer(filePathList, type) {
				let userAvatar = '';
				if (filePathList.length != 0) {
					userAvatar = filePathList[0];
				}
				let self = this;
				var timeStp = Date.parse(this.date) / 1000;
				let opt = {
					url: "/user/edit",
					data: {
						nickname: this.nickName,
						avatar: userAvatar,
						sex: this.sexIndex, //0女 1男
						birthday: timeStp,
						addres: this.areaStr
					},
					method: 'POST',
				}
				this.$http.request(opt).then(function(res) {
					if (res.data.status == 200) {
						let Storage = {
							nickname: self.nickName,
							avatar: userAvatar,
							isUpdate: true
						}
						uni.setStorage({
							key: 'avatrmsg',
							data: Storage,
							success() {
								uni.showToast({
									icon: 'none',
									position: 'bottom',
									title: '保存成功'
								});
								self.back();
							},
							fail() {
								uni.showToast({
									icon: 'none',
									position: 'bottom',
									title: '保存失败'
								});
							}
						})
					} else {
						// uni.showToast({
						// 	icon: 'none',
						// 	position: 'bottom',
						// 	title: '保存失败'
						// });
						self.back();
					}
				}).catch(err => {
					console.log('发布返回消息错误:', err);
					uni.hideLoading();
					uni.showModal({
						content: err,
						showCancel: false
					});
				})
			}
		}
	}
</script>

<style>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}

	.user-nav-top {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0 36upx;
		box-sizing: border-box;
		margin-bottom: 76upx;
		margin-top: 36upx;
	}

	.user-nav-top-title {
		font-size: 58upx;
		font-weight: 600;
		color: rgba(0, 0, 0, 1);
	}

	.user-nav-top-img-all {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 24upx;
		font-weight: 400;
		color: rgba(193, 195, 196, 1);
	}

	.user-nav-head-img {
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
		background-color: #000000;
		margin-bottom: 0upx;
	}

	.user-nav-msg {
		width: 100%;
		padding-left: 92upx;
		box-sizing: border-box;
	}

	.user-nav-msg-one {
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 20upx;
		box-sizing: border-box;
	}

	.border-bottom {
		border-bottom: 1px solid rgba(219, 219, 219, 1);
	}

	.user-nav-msg-one-text {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.user-nav-msg-one-text-tips {
		/* float: left; */
		width: 100upx;
		font-size: 26upx;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
	}

	.user-nav-msg-one-text-name {
		width: 100%;
		flex: 1;
		font-size: 36upx;
		font-weight: 600;
		color: rgba(0, 0, 0, 1);
		display: flex;
		flex-direction: column;
		/* justify-content:end; */
		align-items: flex-end;
		/* margin-right: 80upx; */
	}

	.user-nav-input {
		width: 100%;
		display: flex;
		align-items: flex-end;
		/* margin-left: 300upx; */
		text-align: right;
	}

	.user-nav-msg-one-text-area {
		font-size: 30upx;
		font-weight: 600;
		color: rgba(0, 0, 0, 1);
		margin-left: 130upx;
	}

	.uni-nav-bar-img-msg {
		width: 29upx;
		height: 49upx;
		margin-left: 38upx;
	}

	.map-navbar-display-right {
		font-size: 30upx;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
	}

	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 22upx;
		color: #000;
		text-align: right;
		font-family: texticons;
		font-weight: 600;
	}
</style>
