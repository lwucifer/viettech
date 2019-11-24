<template>
    <view class="body">
        <view class="input-group inner">
            <view class="input-row border input-flex">
                <label class="title">{{$t('user.suoShuYinHang')}}</label>
                <text>{{bankName}}</text>
            </view>

            <view class="input-row border input-flex">
                <label class="title long">{{$t('user.zhangHaoKaHao')}}</label>
                <text>{{charShow}}</text>
            </view>
        </view>
        <view class="input-line inner">
            <label class="inline">
                <view>{{ $t('user.yingHangKaoBangDingMiaoShu1')}}</view>
                <view>{{ $t('user.yingHangKaoBangDingMiaoShu2')}}</view>
                <view>{{ $t('user.yingHangKaoBangDingMiaoShu3')}}</view>
            </label>
        </view>
        <view class="input-line inner">
            <button type="primary" class="primary" :disabled="btnDisable" @tap="onBind">{{btnText}}</button>
        </view>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    import mInput from '@/static/components/m-input.vue'

    import util from '@/util/util.js'
    import userService from '@/services/user.js';

    export default {
        data() {
            var that = this;
            return {
                bankName: '',
                bankCard: '',
                charShow: '',
                btnDisable: true,
                btnText: that.$t('common.certiret')
            }
        },
        components: {
            mInput
        },
        computed: {
            ...mapState(["userId", "auth"])
        },
        methods: {
            ...mapMutations(["pageAuth"]),
            onInit() {
                var that = this;
                if (!util.isAuth(that.auth.bankCardState)) {
                    uni.redirectTo({
                        url: '../profile'
                    });
                    return;
                }
                userService.getBanks({ userId: that.userId }, function (obj, msg, code) {
                    that.bankName = obj["bank"];
                    that.bankCard = obj["cardNo"];
                    if (!util.isEmpty(that.bankCard)) {
                        that.charShow = that.bankCard.slice(0, 2) + '**** ****' + that.bankCard.slice(-4);
                    }

                    //≈–∂œ «∑Òƒ‹Ω‚∞Û
                    userService.canRebindingBank({ userId: that.userId }, function () {
                        that.btnDisable = false;
                    }, function () {
                        that.btnDisable = true;
                    })
                });
            },
            onBind() {
                var that = this;
                userService.canRebindingBank({ userId: that.userId }, function () {
                    uni.navigateTo({ url: 'edit' });
                })
            }
        },
        onLoad: function () {
            var that = this;
        },
        onShow: function () {
            var that = this;
            that.pageAuth({ callback: that.onInit });
        }
    }
</script>

<style>
</style>

