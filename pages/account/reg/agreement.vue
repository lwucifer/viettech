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

    export default {
        data() {
            var that = this;
            return {
                url: util.PROTOCOL_REG
            }
        },
        components: {
        },
        computed: {
            ...mapState(["userName"])
        },
        methods: {
            ...mapMutations(["pageView"]),
            onInit() {
                var that = this;
            }
        },
        onLoad: function () {
            var that = this;
        },
        onShow: function () {
            var that = this;
            that.pageView({ callback: that.onInit });
        }
    }
</script>
<style>
</style>

