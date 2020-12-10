<template>
	<view class="user-setting">
		<uni-nav-bar :status-bar="true" :fixed="true">
			<view slot="left" class="map-navbar-display map-navbar-display-left" @click="back()">
				<image src="/static/img/common/blackBack.png" class="uni-nav-bar-img-msg"></image>
			</view>
			<view>
				<text>我喜欢的</text>
			</view>
		</uni-nav-bar>


		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }"
			 @click="tabClick(index)">
				{{ item.text }}
			</view>
		</view>
		
		<view class="content" v-for="(item, index) in navList" :key="index" v-if="tabCurrentIndex === index">
			<uni-card
				v-for="(item,index) in 5"
				:key="index"
			    mode="style" 
			    :is-shadow="true" 
			    thumbnail="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg" 
			>
			<view class="footer-box" style="display: flex;">
			    <view>喜欢</view>
			    <view>{{number}}</view>
			</view>
			</uni-card>
			
		</view>
	</view>
</template>

<script>
	import apiManager from '@/net/apiManager.js';
	export default {
		components: {

		},

		computed: {

		},
		data() {

			return {
				tabCurrentIndex: 0,
				navList: [{
						state: 0,
						text: '喜欢',
					},
					{
						state: 1,
						text: '收藏',
					},


				],
				number: "27.8万"
			}
		},
		onLoad() {
			this.tabCurrentIndex = 0;
		},
		methods: {
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}


	.user-nav-head-img {
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
		background-color: #000000;
		margin-bottom: 0upx;
	}

	.uni-nav-bar-img-msg {
		width: 29upx;
		height: 49upx;
		margin-left: 38upx;
	}


	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		position: relative;
		z-index: 10;
		margin-bottom: 20upx;
		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			position: relative;

			&.current {
				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 15upx;
					transform: translateX(-50%);
					width: 30px;
					height: 0;
					border-bottom: 2px solid red;
				}
			}
		}
	}


	.content{
		width: 100%;
		padding: 0 7upx;
		
	}
	/deep/ .uni-card--shadow{
		margin: 0upx;
		width: 32%;
		margin-left: 2upx;
		display: inline-block;
		border-radius: 9upx;
	}
	/deep/ .uni-card__content--pd{
		    width: 100%;
		    height: 40upx;
			line-height: 40upx;
		    display: flex;
			justify-content: flex-end;
			padding: 0upx;
			font-size: 15upx;
	}
	/deep/ .uni-card__thumbnailimage{
		height: 350upx;
	}
</style>
