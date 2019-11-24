<template>
    <view class="body">
        <view class="text-line">
            <text>Bước 1: Nhấp vào copy số tài khoản</text>
        </view>
        <image class="img-line" src="../../../../static/img/epay1.png"></image>
        <view class="text-line">
            <text>Bước 2: Mở ứng dụng internet banking và chọn chuyển khoản ngoài ngân hàng</text>
        </view>
        <image class="img-line" src="../../../../static/img/epay2.png"></image>
        <view class="text-line">
            <text>Bước 3: Dán số tài khoản đã copy ở bước 1 vào phần tài khoản hưởng thụ. Và nhập tên tài khoản, số tiền như trong ứng dụng đã cung cấp.</text>
        </view>
        <image class="img-line" src="../../../../static/img/epay3.png"></image>
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
        onLoad: function (options) {
            var that = this;
            options = options || {};
        },
        onShow: function () {
            var that = this;
            that.pageView({ callback: that.onInit });
        }
    }
</script>
<style>
    .text-line, .img-line { padding: 50upx; }
</style>
