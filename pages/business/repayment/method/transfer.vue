<template>
    <view class="body">
        <view class="wrapper">
            <view class="input-line">{{$t('bus.yingHangZhuanZHngShuoMing1')}}<label class="text-link ">{{$t('tip.biaoMingBeiZhu')}}</label></view>
            <view class="input-line">{{$t('tip.beiZhuGeShi')}}  <label class="text-link ">{{$t('bus.yingHangZhuanZHngShuoMing2')}}</label></view>
        </view>
        <view class="wrapper main">
            <view class="input-line">
                <text>{{$t('bus.shouKuanRen')}}：</text>
                <text>{{ name }}</text>
            </view>
            <view class="input-line">
                <text>{{$t('bus.shouKuanHang')}}：</text>
                <text>{{ bank }}</text>
            </view>
            <view class="input-line">
                <text>{{$t('user.yingHangKaHao')}}：</text>
                <text>{{ card }}</text>
            </view>
            <view class="input-line"></view>
            <view class="input-line">
                <button size="mini" class="primary" type="primary" @tap="onCopy">{{ $t('common.clickCopy') }}</button>
            </view>
            <view class="input-line"></view>
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

    export default {
        data() {
            return {
                account: '', //账户
                name: '', //收款人姓名
                bank: '', //收款行
                card: '', //银行卡
            }
        },
        components: {
        },
        computed: {
            ...mapState(["userName"])
        },
        methods: {
            ...mapMutations(["pageView"]),
            onInit() {
                var that = this;
                appService.banktransfer({ type: 10 }, function (obj, msg, code) {
                    that.account = obj.alipayAccount;
                    that.bank = obj.bank;
                    that.card = obj.bankCard;
                    that.name = obj.name;
                })
            },
            onCopy () {
                var that = this;
                var text = that.$t('bus.shouKuanRen') + '：' + that.name + ',   ' + that.$t('bus.shouKuanHang') + '：' + that.bank + ',   ' + that.$t('user.yingHangKaHao') + '：' + that.card;
                uni.setClipboardData({
                    data: text,
                    success: function (data) {
                        util.success(that.$t('common.copy'))
                    }, fail: function (err) {
                        util.error(that.$t('common.copy'))
                    }
                })
            }
        },
        onLoad() {
            var that = this;
        },
        onShow: function () {
            var that = this;
            that.pageView({ callback: that.onInit });
        }
    }
</script>

<style>
    .wrapper {
        padding: 50upx;
    }

    .main {
        background: #fff;
    }
</style>
