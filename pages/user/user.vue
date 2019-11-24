<template>
    <view class="body">
        <view class="flex1 main">
            <view class="flex1 flex-center">
                <canvas canvas-id="borrowingArcbar" id="borrowingArcbar" class="charts1"></canvas>
            </view>
            <view class="flex-center">
                <text>{{$t('bus.sheYuKeJie')}} {{borrow}} {{$t('bus.yuan')}}</text>
            </view>
            <view class="flex-center">
            </view>
        </view>
        <view class="flex2">
            <uni-list class="input-line">
                <navigator url="../business/borrow/borrows">
                    <uni-list-item :title="$t('bus.jieKuanJiLu')" show-extra-icon="true" :extra-icon="{type: 'compose'}"></uni-list-item>
                </navigator>
                <navigator url="profile/profile">
                    <uni-list-item :title="$t('user.wanShanZiLiao')" show-extra-icon="true" :extra-icon="{type: 'person'}"></uni-list-item>
                </navigator>
                <view @tap="onGoBank">
                    <uni-list-item :title="$t('user.shouKuanYingHangKa')" show-extra-icon="true" :extra-icon="{type: 'navigate'}"></uni-list-item>
                </view>
                <navigator url="../content/help/help">
                    <uni-list-item :title="$t('common.helper')" show-extra-icon="true" :extra-icon="{type: 'help'}"></uni-list-item>
                </navigator>
            </uni-list>

            <uni-list class="input-line">
                <navigator url="invite/invite">
                    <uni-list-item :title="$t('user.woDeYaoQingMa')" show-extra-icon="true" :extra-icon="{type: 'flag'}" showArrow="false" showText="true" :text="invitationCode"></uni-list-item>
                </navigator>
                <navigator url="setting/setting">
                    <uni-list-item :title="$t('common.sheZhi')" show-extra-icon="true" :extra-icon="{type: 'gear'}"></uni-list-item>
                </navigator>
            </uni-list>
        </view>

    </view>
</template>

<script>
    import uniList from '@/components/uni-list/uni-list.vue'
    import uniListItem from '@/components/uni-list-item/uni-list-item.vue'

    import uCharts from '@/components/u-charts/u-charts.js';

    import util from '@/util/util.js'
    import accountService from '@/services/account.js';

    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
        data() {
            return {
                borrowingArcbar: null,
                borrowingArcbarWidth: uni.upx2px(280), //这里要与样式的宽高对应
                borrowingArcbarHeight: uni.upx2px(280), //这里要与样式的宽高对应
                arcbarWidth: uni.upx2px(18), //圆弧进度图，进度条宽度,此设置可使各端宽度一致
                pixelRatio: 1,
            }
        },
        components: {
            uniList,
            uniListItem
        },
        computed: {
            ...mapState(["useId", "userName", "invitationCode", "quota", "borrow","auth"])
        },
        methods: {
            ...mapMutations(["pageAuth"]),
            onInit () {
                var that = this;
                var Arcbar1 = {
                    series: [{
                        "name": that.$t('bus.eDu') + that.quota + " " + that.$t('bus.yuan'),
                        "data": (that.borrow / that.quota).toFixed(2),
                        "color": "#2fc25b"
                    }]
                };
                that.showArcbar(Arcbar1);
            },
            onGoBank() {
                var that = this;
                if (!util.isAuth(that.auth.bankCardState)) {
                    util.tip(that.$t("common.certibefore") + that.$t('user.yingHangXinXi'));
                    return;
                }
                uni.navigateTo({
                    url: 'profile/bank/bank'
                });
            },
            showArcbar(data) {
                var that = this;
                that.borrowingArcbar = new uCharts({
                    $this: that,
                    canvasId: "borrowingArcbar",
                    type: 'arcbar',
                    fontSize: 11,
                    legend: {
                        show: false
                    },
                    background: '#FFFFFF',
                    pixelRatio: that.pixelRatio,
                    series: data.series,
                    animation: true,
                    width: that.borrowingArcbarWidth * that.pixelRatio,
                    height: that.borrowingArcbarHeight * that.pixelRatio,
                    dataLabel: true,
                    title: {
                        name: Math.round(data.series[0].data * 100) + '%', //这里我自动计算了，您可以直接给任意字符串
                        color: data.series[0].color,
                        fontSize: 25 * that.pixelRatio
                    },
                    subtitle: {
                        name: data.series[0].name, //这里您可以直接给任意字符串
                        color: '#666666',
                        fontSize: 10 * that.pixelRatio
                    },
                    extra: {
                        arcbar: {
                            type: 'circle', //整圆类型进度条图
                            width: that.arcbarWidth * that.pixelRatio, //圆弧的宽度
                            startAngle: 0.5 //整圆类型只需配置起始角度即可
                        }
                    }
                });
            }
        },
        onLoad(options) {
            var that = this;
        },
        onShow: function () {
            var that = this;
            that.pageAuth({ callback: that.onInit });
        }
    }
</script>

<style>
    .main {
        display: flex;
        flex-direction: column;
    }

    /*样式的width和height一定要与定义的cWidth和cHeight相对应*/
    .charts1 { position: absolute; width: 280upx; height: 280upx; }
</style>
