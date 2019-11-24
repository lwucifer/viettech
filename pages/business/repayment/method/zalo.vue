<template>
    <view class="body">
        <view class="input-line inner">
            <label class="inline">
                <text>{{$t('bus.zaloHuanKuan')}}</text>
            </label>
        </view>
        <view class="input-group inner input-flex flex1">
            <view class="flex1 flex-center">
                <image style="width: 200px; height: 200px;" :src="src"></image>
            </view>
        </view>
    </view>
</template>

<script>
    import util from '@/util/util.js'
    import appService from '@/services/application.js'
    import userService from '@/services/user.js';
    import busService from '@/services/business.js';

    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
        data() {
            return {
                src: ''
            }
        },
        components: {
        },
        computed: {
            ...mapState(["userId", "auth"])
        },
        methods: {
            ...mapMutations(["pageAuth"]),
            onInit() {
                var that = this;
                var _load = function () {
                    busService.repaymentZaloQR({ userId: that.userId }, function (obj, msg, code) {
                        var src = obj["qrUrl"] || "";
                        if (util.isEmpty(src)) {
                            uti.tip('src is null')
                        }
                        else {
                            that.src = util.RESOURCE + src;
                        }
                    })
                }
                //if (util.isAuth(that.auth.contactState)) {
                //    util.confirm(that.$t('user.gongZuoXingXi') + that.$t('tip.yiRenZhengShiFouChongXiuRenZheng'), function () {
                //        _load();
                //    }, function () {
                //        uni.navigateTo({
                //            url: '../profile'
                //        });
                //    })
                //}
                _load();

            }
        },
        onShow: function () {
            var that = this;
            that.pageAuth({ callback: that.onInit });
        }
    }
</script>

<style>
</style>

