<template>
	<view class="body content">
        <view class="flex1 textarea-main">
            <textarea class="textarea-input" maxlength="160" auto-height :placeholder="$t('tip.yiJianFanKuiMiaoShu')" v-model="content" @input="onInput"></textarea>
         </view>
        <view class="flex2">
            <view class="input-line inner">
                <view>{{ words }}/160</view>
            </view>
            <view class="input-line">
                <button type="primary" class="primary" @tap="onSubmit">{{$t('common.submit')}}</button>
            </view>
        </view>
        <view class="flex1"></view>
	</view>
</template>


<script>
	import util from '@/util/util.js'
	import appService from '@/services/application.js';

	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				words: 0,
                content: ''
			}
		},
		components: {
		},
		computed: mapState(["userId"]),
		methods: {
            ...mapMutations(["pageAuth"]),
            onInit() {
                var that = this;
            },
            onInput(e) {
                var that = this;
                that.words = e.detail.cursor;
            },
            onSubmit() {
                var that = this;
                
                appService.feedback(that.$data, function (obj, msg, code) {
                    that.content = "";
                    that.words = 0;
                    util.tip(msg, {
                        over() {
                            uni.switchTab({
                                url: '/pages/user/user'
                            });
                        }
                    })
                });
			}
		},
		onLoad() {
			var that = this;
		},
		onShow: function() {
            var that = this;
            that.pageAuth({ callback: that.onInit });
		}
	}
</script>

<style>
    .textarea-main {
        background: #f3f4f7;
        border: 1upx solid #d8d8d8;
    }
    .textarea-input {
        display: flex;
        width: auto;
        padding: 20upx;
    }
</style>
