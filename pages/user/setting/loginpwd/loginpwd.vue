<template>
    <view class="body">
        <view class="input-group inner">
            <view class="input-row border input-flex">
                <label class="title">{{$t('user.yuanMiMa')}}</label>
                <m-input type="password" displayable v-model="oldPwd" :placeholder="$t('tip.qingShuRuYuanMiMa')"></m-input>
            </view>
            <view class="input-row border">
                <label class="title">{{$t('user.xinMiMa')}}</label>
                <m-input type="password" displayable v-model="newPwd" :placeholder="$t('tip.qingShuRuXinMiMa')"></m-input>
            </view>
            <view class="input-row border">
                <label class="title long">{{$t('user.queRenMiMa')}}</label>
                <m-input type="password" displayable v-model="newPwd2" :placeholder="$t('tip.qingShuRuQueRenMiMa')"></m-input>
            </view>
        </view>
        <view class="input-line inner">
            <label>{{$t('tip.miMaShuoMing')}}</label>
        </view>
        <view class="input-line inner">
            <button type="primary" class="primary" @tap="onSubmit">{{$t('common.submit')}}</button>
        </view>
    </view>
</template>


<script>
    import mInput from '@/static/components/m-input.vue';

    import util from '@/util/util.js'
    import userService from '@/services/user.js';

    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
        data() {
            return {
                oldPwd: '',
                newPwd: '',
                newPwd2: ''
            }
        },
        components: {
            mInput
        },
        computed: mapState(["userId"]),
        methods: {
            ...mapMutations(["pageAuth"]),
            onInit() {
                var that = this;
            },
            onSubmit() {
                var that = this;
                
                userService.editLoginPwd(that.$data, function (obj,msg,code) {
                    util.tip(msg, {
                        over() {
                            uni.switchTab({
                                url: '/pages/main/main'
                            });
                        }
                    })
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
</style>
