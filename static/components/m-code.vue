<template>
    <view class="m-code-view">
        <label @click="onGetCode">{{ cutdownText }}</label>
    </view>
</template>

<script>

    import util from '@/util/util.js'
    import appService from '@/services/application.js'

    export default {
        components: {
        },
        props: {
            phone: String,
            type: String,
        },
        model: {
            prop: 'value',
            event: 'input'
        },
        data() {
            return {
                isCutdown: false,
                cutdownText: "",
            }
        },
        created: function (e) {
            var that = this;
            that.isCutdown = false;
            that.cutdownText = that.$t('tip.huoQuYanZhengMa');
        },
        methods: {
            onGetCode() {
                var that = this;
                var type = that.type || "";
                if (util.isEmpty(type)) {
                    util.tip(that.$t('tip.canShuCuoWu') + '[type]');
                    return;
                }

                if (!that.isCutdown) {
                    that._send();
                }
            },
            _send: function () {
                var that = this;
                var input = {
                    phone: that.phone || "",
                    type: that.type || ""
                };

                appService.sms(input, function (obj, msg, code) {
                    //obj.state == 10 success/error
                    //util.tip(obj.message);
                    that._loop();
                })
            },
            _loop: function () {
                var that = this;
                that.isCutdown = true;
                var max = 60;
                var interval = setInterval(function () {
                    max--;
                    if (max <= 0) {
                        clearInterval(interval);
                        interval = null;
                        that._rest();
                    } else {
                        that.cutdownText = max + ' ' + that.$t('common.second');
                    }
                }, 1000);
            },
            _rest: function () {
                var that = this;
                that.cutdownText = that.$t('tip.chongXingHuoQu');
                that.isCutdown = false;
            }
        }
    }
</script>

<style>
    .m-code-view {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 10rpx;
    }

        .m-code-view label {
            display: block;
            flex: 1;
            text-align: center;
        }
</style>
