<template>
    <view class="body">
        <view class="input-line inner">
            <label class="inline">
                <text>{{$t('user.gongZuoXingXi')}}</text>
            </label>
        </view>
        <view class="input-group inner">
            <view class="input-row border">
                <label class="title">{{$t('user.gongSiMingCheng')}}</label>
                <m-input type="text" :placeholder="$t('tip.qingShuRu')+$t('user.gongSiMingCheng')" v-model="name"></m-input>
            </view>
            <view class="input-row border">
                <label class="title">{{$t('user.gongSiDianHua')}}</label>
                <m-input type="text" :placeholder="$t('tip.qingShuRu')+$t('user.gongSiDianHua')" v-model="phone"></m-input>
            </view>
            <view class="input-row input-flex border">
                <label class="title long">{{$t('user.gongZuoNianXian')}}</label>
                <m-input type="number" :placeholder="$t('tip.qingShuRu')+$t('user.gongZuoNianXian')" v-model="seniority"></m-input>
                <label class="rfix">{{$t('common.year')}}</label>
            </view>
            <view class="input-row input-flex border">
                <label class="title">{{$t('user.xinZi')}}</label>
                <m-input type="number" :placeholder="$t('tip.qingShuRu')+$t('user.xinZi')" v-model="salary"></m-input>
                <label class="rfix">{{$t('common.currency')}}</label>
            </view>
            <view class="input-row border">
                <label class="title">{{$t('user.gongSiDiZhi')}}</label>
                <m-input type="text" :placeholder="$t('tip.qingShuRu')+$t('user.gongSiDiZhi')" v-model="liveArea"></m-input>
            </view>
            <!--<view class="input-row border">
                <label class="title auto"></label>
                <m-input type="text" :placeholder="$t('tip.qingShuRu')+$t('user.xiangXiDiZhi')" v-model="liveAddress"></m-input>
            </view>-->
        </view>
        <view class="input-line inner">
            <button type="primary" class="primary" :disabled="btnDisabled" @tap="onApply">{{$t('common.certiapply')}}</button>
        </view>
    </view>
</template>

<script>
    import mInput from '@/static/components/m-input.vue'

    import util from '@/util/util.js'
    import appService from '@/services/application.js'
    import userService from '@/services/user.js';

    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
        data() {
            return {
                name: '',
                phone: '',
                seniority: "0",
                salary: "0",
                liveArea: "",
                liveAddress:"",
                btnDisabled: true
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

                var _load = function () {
                    //do:....
                    that.btnDisabled = false;
                }

                //if (util.isAuth(that.auth.contactState)) {
                //    util.confirm(that.$t('user.gongZuoXingXi') + that.$t('tip.yiRenZhengShiFouChongXiuRenZheng'), function () {
                //        _load();
                //    }, function () {
                //        uni.redirectTo({
                //            url: '../profile'
                //        });
                //    })
                //}
                _load();

            },
            onApply() {
                var that = this;

                userService.saveWork({ ...that.$data, userId: that.userId }, function (obj, msg, code) {
                    util.tip(msg || (that.$t('common.apply')), {
                        over() {
                            uni.redirectTo({
                                url: '../profile'
                            });
                        }
                    });
                });
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

