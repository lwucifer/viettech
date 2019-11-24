<template>
    <view>
        <web-view :src="url"></web-view>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    import util from '@/util/util.js'
    import appService from '@/services/application.js'
    import userService from '@/services/user.js'

    export default {
        data() {
            return {
                url: "pages/loading/loading"
            }
        },
        components: {
        },
        computed: {
            ...mapState(["userId", "auth"])
        },
        methods: {
            ...mapMutations(["pageAuth"]),
            onInit() {
                var that = this;
                userService.getMobileUrl({ userId: that.userId }, function (obj, msg, code) {
                    if (util.isEmpty(obj.url)) {
                        util.tip(that.$t('common.fail') + ' url');
                    } else {
                        that.url = obj.url;
                    }
                })
            }
        },
        onLoad: function (options) {
            var that = this;
            options = options || {};
            //that.url = options["url"] || "";
        },
        onShow: function () {
            var that = this;
            that.pageAuth({ callback: that.onInit });
        }
    }
</script>
<style>
</style>

