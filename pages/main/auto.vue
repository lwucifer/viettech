<template>
    <view>
        {{$t('common.loading')}}<br />
        {{url}}[{{token}}][{{userId}}]
    </view>
</template>
<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    import util from '@/util/util.js'
    import appService from '@/services/application.js'

    export default {
        data() {
            return {
                url: "-1",
                token: "0",
                userId:"0"

            }
        },
        components: {
            //uniNoticeBar
        },
        computed: {
            //...mapState(["userName"])
        },
        methods: {
            ...mapMutations(["auto"]),//"pageView", 
            onInit() {
                var that = this;

                var ref = util.urlDecode(that.query["ref"] || "main");
                var userId = that.query["userId"]||"";
                var token = that.query["token"] || "";

                that.url = ref;
                that.token = token;
                that.userId = userId;


                if (util.isEmpty(userId) || util.isEmpty(token)) {
                    util.tip(util.toast(that.$t('tip.canShuCuoWu') + " userId/token"), {
                        duration: 800,
                        over() {
                            uni.switchTab({
                                url: 'main'
                            });
                        }
                    });
                    return;
                }

                that.auto({
                    data: {
                        userId: userId,
                        token: token
                    },
                    callback() {
                        if (ref.toLowerCase().indexOf('pages/main/main') > -1 ||
                            ref.toLowerCase().indexOf('pages/business/repayment/repayment') > -1 ||
                            ref.toLowerCase().indexOf('pages/user/user') > -1) {

                            uni.switchTab({ url: ref });
                        }
                        else {
                            uni.navigateTo({ url: ref });
                        }
                    }
                })
            },
            onLoad(options) {
                var that = this;
                options = options || {};
                that.query = options;
            },
            onShow() {
                var that = this;
                //that.pageView({ callback: that.onInit });
                that.onInit();
            }
        }
    }

</script>
<style>

</style>
