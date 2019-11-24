<template>
    <view class="content">
        <!-- 外面的大盒子 -->
        <view class="delay-box">
            <!-- 延期还款详情开始 -->
            <view class="he-delay">延期还款详情</view>

            <!-- 延期还款详情 开始-->
            <view class="de-start">
                <view class="delay-detail" v-for="item in this.list" :key="item.id">
                    <view class="de-left">{{ item.title }}</view>
                    <view class="de-right">{{ item.desc }}</view>
                </view>
            </view>
            <!-- 延期还款详情 结束-->
            <!-- 下面的按钮开始 -->
            <view class="delay-btn"><button @tap="bindreplay">还款</button></view>

            <!-- 下面的按钮结束-->
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                list: [
                    { id: 1, title: '还款金额', desc: '300.0元' },
                    { id: 2, title: '逾期罚息', desc: '0.00元' },
                    { id: 3, title: '服务费(延期后)', desc: '300.00元' },
                    { id: 4, title: '延期天数', desc: '7天' },
                    { id: 5, title: '延期还款日', desc: '2019-2-26' },
                    { id: 6, title: '扣费银行', desc: '中国银行（1188）' },
                    { id: 7, title: '下期应还总额', desc: '1300.00元' }
                ]
            };
        },
        methods: {
            bindreplay() {
                uni.navigateTo({
                    url: 'delaystyle'
                });
            }
        },
        onLoad() { }
    };
</script>

<style>
    .content {
        background: #f3f4f7;
        width: 100%;
    }

    .delay-box {
        width: 100%;
    }

    .he-delay {
        height: 70upx;
        width: 100%;
        line-height: 70upx;
        text-indent: 30upx;
    }

    .de-start {
        margin-top: 10upx;
        margin-bottom: 10upx;
        background: #fff;
        width: 100%;
    }

    .delay-detail {
        height: 100%;
        width: 90%;
        margin: 0 auto;
        display: -webkit-flex;
        justify-content: space-between;
    }

    .de-left {
        width: 30%;
        height: 70upx;
        line-height: 70upx;
        text-align: left;
    }

    .de-right {
        width: 70%;
        height: 70upx;
        line-height: 70upx;
    }

    .delay-btn {
        height: 100upx;
        text-align: center;
        width: 100%;
        margin-top: 30upx;
    }

        .delay-btn > button {
            height: 70upx;
            width: 90%;
            background: #2683cf;
            color: #fff;
            font-size: 16upx;
            line-height: 70upx;
            text-align: center;
        }
</style>
