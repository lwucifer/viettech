<template>
    <view class="body">
        <view v-if="nodata" class="flex1 flex-center">
            <view class="nomsg" v-if="nodata">{{$t('bus.meiYouJieKuanJiLuTiShi')}}</view>
        </view>
        <view v-if="!nodata">
            <uni-card class="input-line" v-for="item in list">
                <view class="card" :key="item.id" :id="item.id" @tap="onDetail">
                    <view class="left">
                        <view class="title">{{$t('bus.jingKuanJinge')}} ：{{ item.realAmount }} {{$t('bus.yuan')}}</view>
                        <view class="title">{{$t('bus.jieKuanShiChang')}} ：{{ item.timeLimit }} {{$t('bus.timesu')}}</view>
                        <view class="title">{{$t('bus.jieKuanShiJian')}} ：{{ item.creditTimeStr }}</view>
                    </view>
                    <view class="right">
                        <text class="text-link">{{ item.stateStr }}</text>
                    </view>
                </view>
            </uni-card>
        </view>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    import uniCard from "@/components/uni-card/uni-card"

    import util from '@/util/util.js'
    import busService from '@/services/business.js';

    export default {
        data() {
            return {
                nodata: true,
                list: []
            }
        },
        components: {
            uniCard,
        },
        computed: {
            ...mapState(["userId", "auth"])
        },
        methods: {
            ...mapMutations(["pageAuth"]),
            onInit() {
                var that = this;
                busService.borrowQuery({ userId: that.userId }, function (obj, msg, code) {
                    that.list = obj.list || [];
                    //util.each(that.list, function (item) {
                    //    item["stateName"] = util.borrowStatusText(item.state);
                    //    return item;
                    //});
                    that.nodata = that.list.length <= 0;
                })
            },
            onDetail(e) {
                var that = this;
                var id = e.currentTarget.id || "";
                if (util.isEmpty(id)) {
                    util.tip(that.$t('tip.canShuCuoWu') + "[id]");
                    return;
                }
                uni.navigateTo({
                    url: 'detail?borrowId=' + id
                });
            }
        },
        onLoad: function () {
            var that = this;
        },
        onShow: function () {
            var that = this;
            that.pageAuth({ callback: that.onInit });
        }
    }
</script>

<style>
    .title {
        padding:15rpx 0;
        font-size:1.2em;
    }

    .descript { padding: 15rpx 0; }
</style>

