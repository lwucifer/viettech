<template>
    <view class="body">
        <view v-if="id==''" class="flex1 flex-center">
            <view class="nomsg">{{$t('bus.meiYouJieKuanJiLuTiShi')}}</view>
        </view>
        <view v-if="id!=''">
            <view class="input-line inner input-flex">
                <text>{{$t('bus.ningBengCiHuanKuanJingEYou')}}</text>
                <label class="flex1"></label>
                <label class="rfix text-link" @tap="onDetail">{{$t('common.detail')}}</label>
            </view>
            <view class="input-group inner">
                <view class="input-row input-flex border">
                    <label class="title long">{{$t('bus.yingHuanJinge')}}</label>
                    <label class="flex1">{{amount}}</label>
                    <label class="rfix">({{$t('common.currency')}})</label>
                </view>
                <view class="input-row input-flex border">
                    <label class="title long">{{$t('bus.yingHuanShiJian')}}</label>
                    <label class="flex1">{{timeStr}}</label>
                </view>
            </view>
            <view class="input-group inner">
                <view class="input-row input-flex border">
                    <label class="title long">{{$t('bus.yuQiShiJian')}}</label>
                    <label class="flex1">{{penaltyDay}}</label>
                    <label class="rfix">({{$t('bus.timesu')}})</label>
                </view>
                <view class="input-row input-flex border">
                    <label class="title long">{{$t('bus.yuQiZhiNaiJing')}}</label>
                    <label class="flex1">{{penaltyAmout}}</label>
                    <label class="rfix">({{$t('common.currency')}})</label>
                </view>
            </view>
           
            <view class="input-group inner" v-if="message!=''">
                <view class="input-row  input-flex  border">
                    <label class="title auto long"></label>
                    <label class="title auto">{{message}}</label>
                </view>
            </view>
            <view class="input-line inner">
                <label class="inline">
                    <view>{{ $t('bus.huanKuanTiShi1')}}</view>
                </label>
            </view>
            <view class="input-line flex-center">
                <button size="mini" class="primary" type="primary" @tap='onPayment'>{{ $t('bus.liJiHuanKuan') }}</button>
            </view>
        </view>
        <view class="input-line inner">
            <label class="inline">
                <view></view>
            </label>
        </view>
    </view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	import util from '@/util/util.js'
	import busService from '@/services/business.js';

	export default {
		data() {
			return {
				repayment: false,
                id: "",
                borrowId: "",
                amount: "0",
                timeStr: "",
				penaltyDay: '0',
				penaltyAmout: '0',
                message:'',
			}
		},
		components: {},
		computed: {
			...mapState(["userId", "token"])
		},
		methods: {
			...mapMutations(["pageAuth"]),
			onInit() {
				var that = this;
                busService.borrowInfo({
					userId: that.userId
                }, function (obj, msg, code) {
                    if (!util.isEmpty(obj)) {
                        var currentDt = new Date(parseInt(obj["repayTime"])); //new Date(parseInt(obj["repayTime"])).toLocaleString().replace(/:\d{1,2}$/, ' ');
						that.repayment = true;
                        that.id = obj["id"];
                        that.borrowId = obj["borrowId"];

                        that.amount = obj["amount"];
                        that.timeStr = currentDt.getFullYear() + '-' + (currentDt.getMonth() + 1) + '-' + currentDt.getDate();

                        that.penaltyDay = obj["penaltyAmout"];
                        that.penaltyAmout = obj["penaltyAmout"];

                        //that.message = msg;
					}
				})
            },
            onDetail() {
                var that = this;
                if (!util.isEmpty(that.borrowId)) {
                    uni.navigateTo({
                        url: '/pages/business/borrow/detail?borrowId=' + that.borrowId
                    });
                }
            },
			onPayment() {
                var that = this;

                busService.repaymentSave({ borrowId:that.borrowId}, function (obj, msg, code) {
				    msg = msg || (that.$t('common.submit') + that.$t('common.success'));
				    util.tip(msg, {
				        over() {
				            uni.switchTab({
				                url: '/pages/business/repayment/repayment'
				            });
				        }
				    })
				});
			}
		},
		onLoad() {
			var that = this;
		},
		onShow: function() {
			var that = this;
			that.pageAuth({
				callback: that.onInit
			});
		}
	}
</script>
