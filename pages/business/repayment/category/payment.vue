<template>
    <view class="content">
        <!-- 外面的大盒子开始 -->
        <view class="detail-style-box">
            <view class="detail-style-box-he">请选择还款方式</view>
            <!-- 还款方式盒子开始 -->
            <view class="delay-repay-style">
                <uni-list class="replay-cloud">
                    <uni-list-item title="自动还款" style="background: url(../../static/img/银联.png)no-repeat 45upx center;"></uni-list-item>
                    <uni-list-item title="银行卡转账" style="background: url(../../static/img/银联.png)no-repeat 45upx center;"></uni-list-item>
                    <uni-list-item title="支付宝转账" style="background: url(../../static/img/支付宝支付.png)no-repeat 45upx center;"></uni-list-item>
                </uni-list>
            </view>
            <!-- 还款方式盒子结束-->
            <!-- 备注开始 -->
            <view class="remarks">
                <view>备注</view>
                <view>
                    若在借款期间内未主动发起还款，则默认于还款日当天从绑定银行卡内自动扣除所有借款项，请保证在扣款之前账号内资金充足，主动还款请备注个人信息(姓名+注册手机号)
                </view>
            </view>
            <!-- 备注结束 -->
        </view>
        <!-- 外面的大盒子结束-->
    </view>
</template>

<script>
    import uniList from '@/components/uni-list/uni-list.vue';
    import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
    export default {
        components: {
            uniList,
            uniListItem
        },
        data() {
            return {};
        },
        methods: {}
    };
</script>

<style>
    .content {
        width: 100%;
        background: #f3f4f7;
    }

    .detail-style-box {
        width: 100%;
    }

    .detail-style-box-he {
        height: 70upx;
        width: 100%;
        line-height: 70upx;
        text-indent: 30upx;
    }

    .delay-repay-style {
        width: 100%;
    }

    .remarks {
        width: 90%;
        margin: 30upx auto;
    }

        .remarks > view {
            color: #999;
        }
</style>
