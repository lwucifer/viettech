<template>
	<view class="body">
		<view class="flex1">
			<view class="flex-center">
				<image src="../../../static/img/header.jpg" mode="center"></image>
			</view>
			<!-- <text class="text-flex-center text-link">{{$t('common.descript')}}</text> -->
		</view>
		<view class="flex2">
			<view class="input-line inner">
                <view class="input-row border input-row-flex ">
                    <uni-icons class="ticon" type="contact"></uni-icons>
                    <m-input type="text" focus clearable v-model="account" :placeholder="$t('tip.qingShuRuShouJiHao')"></m-input>
                </view>
                <view class="input-row border">
                    <uni-icons class="ticon" type="locked"></uni-icons>
                    <m-input type="password" displayable v-model="password" :placeholder="$t('tip.miMaShuoMing')"></m-input>
                </view>
			</view>
			<view class="input-line inner">
				<button type="primary" class="primary" @tap="onLogin">{{ $t('user.login') }}</button>
			</view>
			<view class="input-line input-flex inner" style="justify-content:space-between;">
				<label class="input-flex">
					<checkbox value="cb" checked="true" style="transform:scale(0.6)" />
					<text>{{$t('user.jiZhuShouJiHao')}}</text>
				</label>
				<label class="inline">
					<navigator :url="'../find/find?account='+account">
						<view>{{$t('user.forgetPwd')}}</view>
					</navigator>
				</label>
			</view>
		</view>
	</view>
</template>


<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import mInput from '@/static/components/m-input.vue';

    import util from '@/util/util.js'
	import service from '@/services/account.js';

	export default {
		data() {
			return {
				account: '',
				password: ''
			}
		},
        components: {
            uniIcons,
			mInput
		},
		computed: mapState(["userName"]),
		methods: {
            ...mapMutations(["pageView", "login"]),
            onInit() {
                var that = this;
            },
			onLogin() {
				var that = this;

				that.login({
					data: that.$data,
                    callback() {
                        util.success(that.$t("user.login"), {
                            duration:800,
                            over() {
                                uni.switchTab({
                                    url: '/pages/main/main'
                                });
                            }
                        });
					}
				});
			}
		},
		onLoad:function(option){
			var that=this;
			option=option||{};
			that.account=option["account"];
		},
		onShow: function() {
            var that = this;
            that.pageView({ callback: that.onInit });
		}
	}
</script>

<style>
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 20upx;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		width: 100upx;
		height: 100upx;
		border: 1upx solid #dddddd;
		border-radius: 100upx;
		margin: 0 40upx;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 60upx;
		height: 60upx;
		margin: 20upx;
	}
</style>
