<template>
	<view class="body">
		<view class="input-group inner">
            <view class="input-row border input-flex">
                <uni-icons class="ticon" type="contact"></uni-icons>
                <m-input type="text" focus clearable v-model="code" :placeholder="$t('tip.qingShuRuDuanXinYanZhengMa')"></m-input>
                <mCode class="rfix" type='register' :phone="account"></mCode>
            </view>
			<view class="input-row border">
                <uni-icons class="ticon" type="locked"></uni-icons>
				<m-input type="password" displayable v-model="password" :placeholder="$t('tip.miMaShuoMing')"></m-input>
			</view>
		</view>
        <view class="input-line inner">
            <view class="input-flex">
                <label class="input-flex">
                    <checkbox value="cb" checked="true" style="transform:scale(0.6)" />
                    <text>{{ $t('user.woYiYueDuBingTongYi') }}</text>
                </label>
                <text class="text-link" @tap="onAgreement">{{ $t('user.zhuCeXieYi') }}</text>
            </view>
        </view>
		<view class="input-line inner">
			<button type="primary" class="primary" @tap="onRegister">{{ $t('user.regist') }}</button>
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
    import mCode from '@/static/components/m-code.vue';

    import util from '@/util/util.js'
    import accountService from '@/services/account.js';

    export default {
        data() {
            return {
                account: '',
                password: '',
                code: '',
                client:'HTML5'
            }
        },
        components: {
            uniIcons,
			mInput,
			mCode
        },
        computed: mapState(["userName"]),
        methods: {
            ...mapMutations(["pageView", "login"]),
            onInit() {
                var that = this;
            },
            onRegister() {
                var that = this;

                accountService.regist(that.$data, function (obj, msg, code) {
                    var registOver = function () {
                        that.login({
                            data: {
                                account: that.account,
                                password: that.password
                            },
                            callback() {
                                uni.switchTab({
                                    url: '/pages/user/user'
                                });
                            }
                        });
                    }

                    if (!util.isEmpty(msg)) {
                        util.tip(msg, { over: registOver})
                    } else {
                        util.tip(util.success(that.$t('user.regist')), { over: registOver })
                    }
                })
            },
            onAgreement() {
                var that = this;
                uni.navigateTo({
                    url: '/pages/account/reg/agreement'
                });
            }
        },
        onLoad: function (option) {
            var that = this;
            option = option || {};
            that.account = option["account"];

            uni.getSystemInfo({
                success: function (res) {
                    if (/iOS/.exec(res.system)) {
                        res.system = 'iOS';
                        that.client = res.system;
                    } else if (/Android/.exec(res.system)) {
                        res.system = 'Android';
                        that.client = res.system;
                    } else {
                        that.client = 'web';
                    }
                }
            });
        },
        onShow: function () {
            var that = this;
            that.pageView({ callback:that.OnInit });
        }
	}
</script>

<style>

</style>
