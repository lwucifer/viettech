<template>
	<view class="body">
		<view>
            <uni-list>
                <navigator url="loginpwd/loginpwd">
                    <uni-list-item :title="$t('user.loginPwd')" show-extra-icon="true" :extra-icon="{type: 'contact'}"></uni-list-item>
                </navigator>
                <!--<navigator url="tradepwd/tradepwd">
                    <uni-list-item :title="$t('user.tradePwd')" show-extra-icon="true" :extra-icon="{type: 'contact'}"></uni-list-item>
                </navigator>-->
                <navigator url="../../content/feedback/feedback">
                    <uni-list-item :title="$t('common.feedback')" show-extra-icon="true" :extra-icon="{type: 'contact'}"></uni-list-item>
                </navigator>
                <uni-list-item :title="$t('common.currentVer')" show-extra-icon="true" :extra-icon="{type: 'contact'}" showArrow="false" showText="true" :text="'v'+version"></uni-list-item>
            </uni-list>
		</view>
		<view class="input-line inner">
			<button type="primary" class="primary" @tap="onLogout">{{ $t('user.logout2') }}</button>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'

	import util from '@/util/util.js'
	import accountService from '@/services/account.js';

	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {}
		},
		components: {
			uniList,
			uniListItem
		},
		computed: {
            ...mapState(["isLogin","version"])
		},
		methods: {
            ...mapMutations(["pageAuth","logout"]),
			onLogout() {
                var that = this;
                util.confirm(that.$t('user.shiFouTuiChuDengLu'), function () {
                    that.logout({
                        callback() {
                            uni.switchTab({
                                url: '/pages/main/main'
                            });
                        }
                    });
                })
                
			},
		},
		onLoad() {
			var that = this;
		},
		onShow: function() {
			var that = this;
			that.pageAuth();
		}
	}
</script>

<style>

</style>
