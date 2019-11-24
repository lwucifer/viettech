<template>
    <view class="body content">
        <view class="flex1">
            <view class="flex-center">
                <image src="../../static/img/header.jpg" mode="center"></image>
            </view>
        </view>
        <view class="flex2">
            <view class="input-group">
                <view class="input-row border border-lr">
                    <text class="title auto"></text>
                    <m-input class="m-input" type="text" clearable focus v-model="account" :placeholder="$t('tip.qingShuRuZhuCeDengLuShouJiHao')"></m-input>
                </view>
            </view>
            <view class="input-line">
                <button type="primary" class="primary" @tap="onNext">{{ $t('common.next') }}</button>
            </view>
        </view>
    </view>
</template>

<script>
    import mInput from '@/static/components/m-input.vue'

    import util from '@/util/util.js'
    import accountService from '@/services/account.js';

    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
        data() {
            return {
                account: ''//0839888318
            }
        },
        components: {
            mInput
        },
        computed: {
            ...mapState(["userName"])
        },
        methods: {
            ...mapMutations(["pageView"]),
            onInit() {
                var that = this;
            },
            onNext() {
                var that = this;

                accountService.isExist(that.$data, function (obj, msg, code) {
                    if (obj.isExists == "20") {
                        uni.navigateTo({
                            url: 'login/login?account=' + that.account,
                        });
                    }
                    else {
                        uni.navigateTo({
                            url: 'reg/reg?account=' + that.account,
                        });
                    }
                });
            }
        },
        onLoad: function (options) {
            var that = this;
        },
        onShow: function () {
            var that = this;
            that.pageView({ callback: that.onInit });
        },
        onBackPress(event) {
            uni.switchTab({
                url: '/pages/main/main'
            });
            return true;
        }
    }
</script>

<style>
</style>
