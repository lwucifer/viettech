<template>
    <view class="body">
        <view class="wrapper main input-group">
            <view class="input-line">
                <text>{{$t('bus.huanKuanZongE')}}：</text>
                <text>{{ amount }}</text>
            </view>
            <view class="input-line">
                <text>{{$t('bus.huanKuanTiShi')}}：</text>
                <text>{{ timeStr }}</text>
            </view>
        </view>
        <view class="wrapper main input-group">
            <view class="input-line">
                <text class="title">{{$t('bus.shouKuanZhangHao')}}</text>
            </view>
            <view class="input-line">
                <text>{{$t('user.yingHangKaHao')}}：</text>
                <text>{{ card }}</text>
            </view>
            <view class="input-line">
                <text>{{$t('bus.shouKuanRen')}}：</text>
                <text>{{ name }}</text>
            </view>
            <view class="input-line">
                <text>{{$t('bus.shouKuanHang')}}：</text>
                <text>{{ bank }}</text>
            </view>
            <view class="input-line"></view>
            <view class="input-line input-flex">
                <button size="mini" class="primary" type="primary" @tap="onCopy">{{ $t('common.clickCopy') }}</button>
                <text class="text-link flex1 pd10" @tap="onDescript">{{$t('bus.huanKuanLiuCheng')}}</text>
            </view>
            <view class="input-line"></view>
        </view>
        <view class="wrapper">
            <view class="input-line">
                <text class="title">{{$t('common.tip2')}}</text>
            </view>
            <view class="input-line">{{$t('bus.epayHuanKuanTiShi1')}}</view>
            <view class="input-line">{{$t('bus.epayHuanKuanTiShi2')}}</view>
        </view>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    import util from '@/util/util.js'
    import appService from '@/services/application.js'
    import busService from '@/services/business.js'

    export default {
        data() {
            return {
                amount: '0',//还款总额
                timeStr: '',     //还款日期
                account: '',//....
                name: '', //收款人姓名
                bank: '', //收款行
                card: '', //银行卡
            }
        },
        components: {
        },
        computed: {
            ...mapState(["userId"])
        },
        methods: {
            ...mapMutations(["pageAuth"]),
            onInit() {

                var that = this;

                busService.repaymentEPAY({ userId: that.userId }, function (obj, msg, code) {
                    //that.account = obj[""] || "";
                    that.name = obj["accountName"] || "";
                    that.bank = obj["bankName"] || ""; //bankCode
                    that.card = obj["accountNo"] || "";
                }, function () {
                    util.toast(that.$t('bus.zhangHaoBuCunZi'), {
                        over: function () {
                            uni.switchTab({
                                url: '/pages/business/repayment/repayment'
                            });
                        }
                    })
                })

                busService.borrowInfo({ userId: that.userId }, function (obj, msg, code) {
                    if (!util.isEmpty(obj)) {
                        var currentDt = new Date(parseInt(obj["repayTime"])); //new Date(parseInt(obj["repayTime"])).toLocaleString().replace(/:\d{1,2}$/, ' ');
                        that.amount = util.toMoney(obj["amount"]);
                        that.timeStr = currentDt.getFullYear() + '-' + (currentDt.getMonth() + 1) + '-' + currentDt.getDate();
                    }
                }, function () {
                })
            },
            onCopy() {
                var that = this;
                var text = that.card;
                uni.setClipboardData({
                    data: text,
                    success: function (data) {
                        util.success(that.$t('common.copy'))
                    }, fail: function (err) {
                        util.error(that.$t('common.copy'))
                    }
                })
            },
            onDescript() {
                var that = this;
                uni.navigateTo({
                    url: 'epaydes'
                });
            }
        },
        onLoad() {
            var that = this;
        },
        onShow: function () {
            var that = this;
            that.pageAuth({ callback: that.onInit });
        }
    }
</script>

<style>
    .wrapper { padding: 50upx; }

    .main { background: #fff; }

    .title { font-size:16px; font-weight:bold;}

    .pd10 {padding:20upx;}
</style>
