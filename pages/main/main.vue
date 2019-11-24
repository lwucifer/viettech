<template>
    <view class="body">
        <swiper class="swiper flex1" indicator-dots="true" autoplay="false" interval="2000" duration="500">
            <swiper-item>
                <image class="img-view" src="../../static/img/index_banner_1.png"></image>
            </swiper-item>
            <<!--swiper-item>
                <image class="img-view" src="../../static/img/banner_3.png"></image>
            </swiper-item>
            <swiper-item>
                <image class="img-view" src="../../static/img/banner_4.jpg"></image>
            </swiper-item>-->
        </swiper>
        <view class="flex2 home-main">
            <view>
                <uni-notice-bar show-icon="true" single="true" :text="notice"></uni-notice-bar>
            </view>
            <view class="flex2 flex-center">
                <canvas canvas-id="borrowingArcbar" id="borrowingArcbar" class="charts1"></canvas>
            </view>
            <view class="flex1 flex-center">
                <button type="primary" class="primary apply" @tap="onBorrowing">{{ $t('common.apply2') }}</button>
            </view>
        </view>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    import uniIcons from "@/components/uni-icons/uni-icons.vue"
    import uniNoticeBar from "@/components/uni-notice-bar/uni-notice-bar.vue"
    import uCharts from '@/components/u-charts/u-charts.js';

    import util from '@/util/util.js'
    import appService from '@/services/application.js'
    import busService from '@/services/business.js'

    export default {
        data() {
            return {
                notice: "",
                borrowingArcbar: null,
                borrowingArcbarWidth: uni.upx2px(380), //这里要与样式的宽高对应
                borrowingArcbarHeight: uni.upx2px(380), //这里要与样式的宽高对应
                arcbarWidth: uni.upx2px(20), //圆弧进度图，进度条宽度,此设置可使各端宽度一致
                pixelRatio: 1,
            }
        },
        components: {
            uniNoticeBar
        },
        computed: {
            ...mapState(["isLogin", "auth","userId","userName", "quota", "borrow"])
        },
        methods: {
            ...mapMutations(["pageView", "canBorrowing"]),
            onInit() {
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
                        fontSize: 12 * that.pixelRatio
                    },
                    extra: {
                        arcbar: {
                            type: 'circle', //整圆类型进度条图
                            width: that.arcbarWidth * that.pixelRatio, //圆弧的宽度
                            startAngle: 0.5 //整圆类型只需配置起始角度即可
                        }
                    }
                });
            },
            onBorrowing() {
                var that = this;
                busService.canBorrow({ userId: that.userId, token: util.getToken() });
            }
        },
        onLoad() {
            var that = this;
            appService.notice({}, function (obj, msg, code) {
                obj = obj['list'] || [that.$t('common.nonotice')];
                that.notice = obj[0]['value'];
            })
        },
        onShow: function () {
            var that = this;
            that.pageView({ callback: that.onInit });
        }
    }
</script>

<style>
    .home-main {
        display: flex;
        flex-direction: column;
    }


    /*样式的width和height一定要与定义的cWidth和cHeight相对应*/
    .charts1 {
        position: absolute;
        width: 380upx;
        height: 380upx;
    }

    .apply {
        display: block;
        width: 380upx;
    }
</style>
