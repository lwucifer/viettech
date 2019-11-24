<template>
    <view class="body">
        <view class="flex2 no-box">
            <view v-if="!repayment" class="flex1 no-data flex-center">
                <view class="input-line">
                    <text>{{$t('bus.meiYouHuanKuanXinXiTiShi')}}</text>
                </view>
                <view class="input-line">
                    <button size="mini" class="primary" type="primary" @tap="onApply">{{ $t('common.apply2') }}</button>
                </view>
            </view>
            <view v-if="repayment" class="flex1">
                <view class="input-line inner input-flex">
                    <text>{{$t('bus.jieKuanXinXi')}}</text>
                    <label class="flex1"></label>
                    <label class="rfix text-link" @tap="onDetail">{{$t('common.detail')}}</label>
                </view>
                <view class="input-group inner">
                    <view class="input-row input-flex border">
                        <label class="title long">{{$t('bus.yingHuanJinge')}}</label>
                        <label class="flex1">{{amount}}</label>
                        <label class="rfix">({{$t('common.currency')}})</label>
                    </view>
                    <view class="input-row input-flex border">
                        <label class="title long">{{$t('bus.yingHuanShiJian')}}</label>
                        <label class="flex1">{{timeStr}}</label>
                    </view>
                </view>
            </view>
        </view>
        <view class="flex1">
            <view class="input-line">
                <view class="input-row inner">{{$t('bus.huanKuanFangShiTiShi')}}</view>
            </view>
            <uni-list class="input-line">
                <navigator url="method/transfer">
                    <uni-list-item :title="$t('bus.yingHangZhuanZhang')" show-extra-icon="true" :extra-icon="{type: 'navigate'}"></uni-list-item>
                </navigator>
                <uni-list-item :title="$t('bus.ziZhuHuanKuan')" show-extra-icon="true" :extra-icon="{type: 'navigate'}" @tap="onThird"></uni-list-item>
                <navigator url="method/zalo">
                    <uni-list-item :title="$t('bus.zaloHuanKuan')" show-extra-icon="true" :extra-icon="{type: 'navigate'}"></uni-list-item>
                </navigator>
                <navigator url="method/epay">
                    <uni-list-item :title="$t('bus.epayHuanKuan')" show-extra-icon="true" :extra-icon="{type: 'navigate'}"></uni-list-item>
                </navigator>
            </uni-list>
        </view>
        <view class="flex1"></view>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    import uniList from '@/components/uni-list/uni-list.vue'
    import uniListItem from '@/components/uni-list-item/uni-list-item.vue'

    import util from '@/util/util.js'
    import busService from '@/services/business.js';

    export default {
        data() {
            return {
                repayment: false,
                id: "",
                borrowId: "",
                amount: "0",
                timeStr: "",
                penaltyDay: '0',
                penaltyAmout: '0',
                message: '',
            }
        },
        components: {
            uniList,
            uniListItem
        },
        computed: {
            ...mapState(["userId", "isLogin", "auth"])
        },
        methods: {
            ...mapMutations(["pageView"]),
            onInit() {
                var that = this;
                if (that.isLogin) {
                    busService.borrowInfo({ userId: that.userId }, function (obj, msg, code) {
                        if (!util.isEmpty(obj)) {
                            var currentDt = new Date(parseInt(obj["repayTime"])); //new Date(parseInt(obj["repayTime"])).toLocaleString().replace(/:\d{1,2}$/, ' ');
                            
                            that.repayment = true;
                            that.id = obj["id"];
                            that.borrowId = obj["borrowId"];

                            that.amount = obj["amount"];
                            that.timeStr = currentDt.getFullYear() + '-' + (currentDt.getMonth() + 1) + '-' + currentDt.getDate();

                            that.penaltyDay = obj["penaltyAmout"];
                            that.penaltyAmout = obj["penaltyAmout"];
                        }
                    })

                }
            },
            onDetail() {
                var that = this;
                if (!util.isEmpty(that.borrowId)) {
                    uni.navigateTo({
                        url: '/pages/business/borrow/detail?borrowId=' + that.borrowId
                    });
                }
            },
            onApply() {
                var that = this;
                busService.canBorrow({ userId: that.userId, token: util.getToken() });
            },
            onThird() {
                var that = this;
                if (!util.isEmpty(that.borrowId)) {
                    uni.navigateTo({
                        url: '/pages/business/repayment/method/third?borrowId=' + that.borrowId
                    });
                } else {
                    util.tip(that.$t('bus.meiYouHuanKuanXinXiTiShi'));
                }
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
    .no-box {
        display: flex;
    }

    .no-data {
        display: flex;
        flex-direction: column;
    }
</style>
