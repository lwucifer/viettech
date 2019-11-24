<template>
    <view class="body">
        <view class="input-group inner">
            <view class="input-row border">
                <uni-icons class="ticon" type="locked"></uni-icons>
                <m-input type="text" v-model="account" :placeholder="$t('tip.qingShuRuShouJiHao')"></m-input>
            </view>
            <view class="input-row border input-flex">
                <uni-icons class="ticon" type="contact"></uni-icons>
                <m-input type="text" focus clearable v-model="code" :placeholder="$t('tip.qingShuRuDuanXinYanZhengMa')"></m-input>
                <mCode class="rfix" :type='type' :phone="account"></mCode>
            </view>
        </view>
        <view class="input-line inner">
            <button type="primary" class="primary" @tap="onFind">{{ $t('user.zhaoHuiMiMa') }}</button>
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
                type:'findReg',
                account: '',
                code: ''
            }
        },
        components: {
            uniIcons,
            mInput,
            mCode
        },
        computed: mapState(["userName"]),
        methods: {
            ...mapMutations(["pageView"]),
            onInit() {
                var that = this;
            },
            onFind() {
                var that = this;

                accountService.findCheck(that.$data, function () {
                    uni.navigateTo({
                        url: 'pwd?account=' + that.account + '&code=' + that.code
                    });
                })

               
            }
        },
        onLoad: function (option) {
            var that = this;
            option = option || {};
            that.account = option["account"];
        },
        onShow: function () {
            var that = this;
            that.pageView({ callback: that.onInit });
        }
    }
</script>

<style>
</style>
