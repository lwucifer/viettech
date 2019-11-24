<template>
	<view class="body">
		<view class="flex1">
			<image class="img-view" src="../../../static/img/user_invite_1.png"></image>
		</view>
		<view class="flex2">
            <uni-list>
                <navigator url="invitefriend">
                    <uni-list-item :title="$t('user.yaoQingHaoYou')" show-extra-icon="true" :extra-icon="{type: 'contact'}"></uni-list-item>
                </navigator>
                <uni-list-item :title="$t('user.yaoQingJiLu')" show-extra-icon="true" :extra-icon="{type: 'contact'}"></uni-list-item>
                <uni-list-item :title="$t('user.woDeJiangJing')" show-extra-icon="true" :extra-icon="{type: 'contact'}" showArrow="false" showText="true" :text="$t('user.daiFanJiangJin')+' 0.0 '+$t('bus.yuan')"></uni-list-item>
            </uni-list>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'

	import util from '@/util/util.js'
	import userService from '@/services/user.js';

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
        computed: mapState(["userId"]),
        methods: {
            ...mapMutations(["pageAuth"]),
            onInit() {
                var that = this;
                //userService.profitAmount({ userId: that.userId }, function (obj, msg, code) {
                //    console.log(obj);
                //});
            }
        },
        onLoad() {
            var that = this;
        },
        onShow: function () {
            var that = this;
            that.pageAuth({ callback: that.onInit });
        }
	}
</script>

<style>

</style>
