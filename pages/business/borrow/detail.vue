<template>
    <view class="body">
        <view v-if="steps.length > 0">
            <view class="input-line inner">
                <label class="inline">
                    <text>{{$t('bus.jingDuXinXi')}}</text>
                </label>
            </view>
            <view class="input-group inner">
                <steps direction="column" :data="steps"
                       :active="stepsActive">
                </steps>
            </view>
        </view>

        <view>
            <view class="input-line inner">
                <label class="inline">
                    <text>{{$t('bus.jieKuanXinXi')}}</text>
                </label>
            </view>
            <view class="input-group inner">
                <view class="input-row border">
                    <label class="title">{{$t('bus.jingKuanJinge')}}</label>
                    <label class="inline">{{amount}} {{$t('common.currency')}}</label>
                </view>
                <view class="input-row border">
                    <label class="title">{{$t('bus.fuWuFei')}}</label>
                    <label class="inline">{{fee}} {{$t('common.currency')}}</label>
                </view>
                <view class="input-row border">
                    <label class="title">{{$t('bus.jieKuanShiChang')}}</label>
                    <label class="inline">{{timeLimit}} {{$t('bus.timesu')}}</label>
                </view>
                <view class="input-row border">
                    <label class="title">{{$t('bus.jieKuanShiJian')}}</label>
                    <label class="inline">{{borrowDt}}</label>
                </view>
                <view class="input-row border">
                    <label class="title long">{{$t('user.zhangHaoKaHao')}}</label>
                    <label class="inline">{{cardId}}</label>
                </view>
            </view>
        </view>

        <view v-if="repays.length > 0">
            <view class="input-line inner">
                <label class="inline">
                    <text>{{$t('bus.huanKuanXinXi')}}</text>
                </label>
            </view>
            <view class="input-group inner">
                <view class="input-row input-flex border" v-for="item in repays">
                    <label class="title long">{{item.repayTimeStr }}</label>
                    <view class="inline flex1">{{item.amount}}  {{$t('common.currency')}}</view>
                    <view class="rfix">{{item.state=='20'?$t('bus.borrowStatus30'):''}}</view>
                </view>
            </view>
        </view>

        <!--<view class="input-line">
            <uni-card v-for="item in repays">
                <view class="card" :key="item.id" :id="item.id">
                    <view class="left">
                        <view class="inner">{{$t('bus.huanKuaiChengGong')}}</view>
                    </view>
                    <view class="right">
                        <view class="inner">{{item.amount}}  {{$t('common.currency')}}</view>
                        <view class="inner">{{item.repayTimeStr }}</view>
                    </view>
                </view>
            </uni-card>
        </view>-->

        <!--<view class="input-line inner">
            <button type="primary" class="primary" :disabled="btnDisabled" @tap="OnRepayment">{{$t('bus.huanKuan')}}</button>
        </view>-->

        <view class="input-line inner"></view>
    </view>
</template>

<script>
    import uniCard from "@/components/uni-card/uni-card.vue"

    import mInput from '@/static/components/m-input.vue'
    import steps from '@/static/components/m-steps.vue'

    import util from '@/util/util.js'
    import appService from '@/services/application.js'
    import userService from '@/services/user.js';
    import busService from '@/services/business.js';

    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
        data() {
            return {
                query: { borrowId: "" },
                steps: [],
                stepsActive: 0,
                repays: [],
                amount: 0,
                fee: 0,
                timeLimit: 0,
                borrowDt: '',
                bankName: '测试固定',
                cardId:'',
                btnDisabled: true
            }
        },
        components: {
            mInput,
            uniCard,
            steps
        },
        computed: {
            ...mapState(["userId", "auth"])
        },
        methods: {
            ...mapMutations(["pageAuth"]),
            onInit() {
                var that = this;
                var borrowId = that.query.borrowId || "";
                if (util.isEmpty(borrowId)) {
                    util.tip(that.$t('tip.canShuCuoWu') + "[borrowId]");
                    return;
                }

                busService.borrowGet({ userId: that.userId, borrowId: borrowId }, function (obj, msg, code) {
                    that.amount = obj.amount;;
                    that.fee = obj.fee;
                    that.timeLimit = obj.timeLimit;
                    that.borrowDt = obj.createTime;
                    //that.bankName = obj.bankName
                    that.cardId = obj.cardId;
                    that.btnDisabled = false;
                })
                busService.borrowProgress({ userId: that.userId, borrowId: borrowId }, function (obj, msg, code) {
                    var setps = obj.list || [];
                    util.each(setps, function (item) {
                        item["title"] = item["str"];
                        item["tag"] = item["createTime"];
                        item["desc"] = item["remark"];
                        return item;
                    });
                    that.steps = setps;
                    that.repays = obj.repay || [];
                })

            },
            OnRepayment() {
                var that = this;
            }
        },
        onLoad: function (options) {
            var that = this;
            options = options || {};
            that.query = options;
        },
        onShow: function () {
            var that = this;
            that.pageAuth({ callback: that.onInit });
        }
    }
</script>

<style>
</style>

