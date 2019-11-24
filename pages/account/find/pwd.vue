<template>
    <view class="body">
        <view class="input-group inner">
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
    import accountService from '@/services/account.js';

    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
        data() {
            return {
                account: '',
                code: '',
                newPwd: '',
                newPwd2: ''
            }
        },
        components: {
            mInput
        },
        computed: mapState(["userName"]),
        methods: {
            ...mapMutations(["pageView"]),
            onInit() {
                var that = this;
            },
            onSubmit() {
                var that = this;

                accountService.findEditPwd(that.$data, function (obj, msg, code) {
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
        onLoad(options) {
            var that = this;
            options = options || {};
            that.account = options["account"] || "";
            that.code = options["code"] || "";
            if (util.isEmpty(that.account) || util.isEmpty(that.code)) {
                util.tip(that.$t('tip.canShuCuoWu') + "[account/code]", {
                    over() {
                        uni.navigateTo({
                            url: 'find?account=' + that.account
                        });
                    }
                })
            }
        },
        onShow: function () {
            var that = this;
            that.pageView({ callback: that.onInit });
        }
    }
</script>

<style>
</style>
