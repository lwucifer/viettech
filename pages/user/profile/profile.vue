<template>
    <view class="body">
        <view>
            <uni-list>
                <view data-url="realname/realname" data-type="realname" @tap="onGoTo">
                    <uni-list-item :title="$t('user.shiMingXingXi')" show-extra-icon="true" :extra-icon="{type: 'contact'}"
                                   :note="realname.descript" showArrow="true" showText="true" :text="realname.status"></uni-list-item>
                </view>
                <view data-url="member/member" data-type="member" @tap="onGoTo">
                    <uni-list-item :title="$t('user.geRenXingXi')" show-extra-icon="true" :extra-icon="{type: 'contact'}"
                                   :note="member.descript" showArrow="true" showText="true" :text="member.status"></uni-list-item>
                </view>
                <view data-url="work/work" data-type="work" @tap="onGoTo">
                    <uni-list-item :title="$t('user.gongZuoXingXi')" show-extra-icon="true" :extra-icon="{type: 'contact'}"
                                   :note="work.descript" showArrow="true" showText="true" :text="work.status"></uni-list-item>
                </view>
                <view data-url="bank/edit" data-type="bank" @tap="onGoTo">
                    <uni-list-item :title="$t('user.yingHangXinXi')" show-extra-icon="true" :extra-icon="{type: 'contact'}"
                                   :note="bank.descript" showArrow="true" showText="true" :text="bank.status"></uni-list-item>
                </view>
                <view :data-url="mobileUrl" data-type="mobile" @tap="onGoTo">
                    <uni-list-item :title="$t('user.yunYingShangXingXi')" show-extra-icon="true" :extra-icon="{type: 'contact'}"
                                   :note="mobile.descript" showArrow="true" showText="true" :text="mobile.status"></uni-list-item>
                </view>
                <!--<view data-url="fackbook/fackbook" data-type="fackbook" @tap="onGoTo">
                    <uni-list-item :title="$t('user.fackbookXingXi')" show-extra-icon="true" :extra-icon="{type: 'contact'}"
                                   :note="fackbook.descript" showArrow="true" showText="true" :text="fackbook.status"></uni-list-item>
                </view>-->
            </uni-list>
        </view>
        <view class="input-line inner">
            <button type="primary" class="primary" @tap="onApply" :disabled="btnDisabled">{{ btnText }}</button>
        </view>
    </view>
</template>

<script>
    import uniList from '@/components/uni-list/uni-list.vue'
    import uniListItem from '@/components/uni-list-item/uni-list-item.vue'

    import util from '@/util/util.js'
    import userService from '@/services/user.js';
    import busService from '@/services/business.js';

    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
        data() {
            return {
                realname: { status: "", descript: "" },
                member: { status: "", descript: "" },
                work: { status: "", descript: "" },
                bank: { status: "", descript: "" },
                mobile: { status: "", descript: "" },
                fackbook: { status: "", descript: "" },
                btnText: '',
                btnDisabled: false,
                btnUrl: '#',
                mobileUrl:''
            }
        },
        components: {
            uniList,
            uniListItem
        },
        computed: {
            ...mapState(["userId", "auth"])
        },
        methods: {
            ...mapMutations(["pageAuth", "authen"]),
            onInit() {
                var that = this;

                //userService.getMobileUrl({ userId: that.userId }, function (obj, msg, code) {
                //    if (util.isEmpty(obj.url)) {
                //        util.tip(that.$t('common.fail') + ' url');
                //    } else {
                //        that.mobileUrl = 'mobile/mobile?' + util.toQuery(obj);
                //    }
                //})
                that.mobileUrl = "mobile/mobile";

                that.authen({
                    callback: function (obj) {
                        that.realname.status = util.getAuthText(obj.realNameState);
                        that.member.status = util.getAuthText(obj.contactState);
                        that.work.status = util.getAuthText(obj.workInfoState);//
                        that.bank.status = util.getAuthText(obj.bankCardState);
                        that.mobile.status = util.getAuthText(obj.phoneState);//
                        that.fackbook.status = util.getAuthText(obj.faceState);//

                        busService.canBorrow({ userId: that.userId, token: util.getToken() }, function (obj, profile, authen, url, text) {
                            that.btnText = text;
                            that.btnUrl = url;
                        }, function (obj, profile, authen, url, text) {
                            if (!profile) {
                                that.btnDisabled = true;
                                return;
                            }
                            that.btnText = text;
                            that.btnUrl = url;
                        })
                    }
                });
            },
            onApply(e) {
                var that = this;
                if (that.btnUrl.indexOf('business/repayment/repayment') > -1) {
                    uni.switchTab({ url: that.btnUrl });
                }
                else {
                    uni.navigateTo({ url: that.btnUrl });
                }
            },
            onGoTo(e) {
                var that = this;
                var type = e.currentTarget.dataset.type;
                var url = e.currentTarget.dataset.url;

                ////打开页面-仅 debugger
                //uni.navigateTo({
                //    url: url
                //});
                //return;

                //去认证
                var authStatus = function (module, status, premodule, prestatus) {
                    if (status == "10") {
                        if (!util.isEmpty(premodule) && !util.isEmpty(prestatus)) {
                            if (prestatus != "30") {
                                util.tip(that.$t("common.certibefore") + (premodule || ""));
                                return;
                            }
                        }

                        if (type == 'mobile' && util.isEmpty(that.mobileUrl)) {
                            util.tip(that.$t("common.loading"));
                            return;
                        } 

                        //去认证
                        uni.navigateTo({
                            url: url
                        });
                    } else if (status == "30") {
                        //已认证
                        util.tip((module || "") + " " + that.$t("common.certiyes"));
                    } else {
                        //认证中

                        //方式1：提示
                        //util.tip((module || "") + that.$t("common.certiing"));

                        //方式2：跳转
                        uni.navigateTo({
                            url: url
                        });
                    }
                }

                switch (type) {
                    case "realname":
                        authStatus(that.$t('user.shiMingXingXi'), that.auth.realNameState);
                        break;
                    case "member":
                        authStatus(that.$t('user.geRenXingXi'), that.auth.contactState, that.$t('user.shiMingXingXi'), that.auth.realNameState);
                        break;
                    case "work":
                        authStatus(that.$t('user.gongZuoXingXi'), that.auth.workInfoState, that.$t('user.geRenXingXi'), that.auth.contactState);
                        break;
                    case "bank":
                        authStatus(that.$t('user.yingHangXinXi'), that.auth.bankCardState, that.$t('user.gongZuoXingXi'), that.auth.workInfoState);
                        break;
                    case "mobile":
                        authStatus(that.$t('user.yunYingShangXingXi'), that.auth.phoneState, that.$t('user.yingHangXinXi'), that.auth.bankCardState);
                        break;
                    case "fackbook":
                        authStatus(that.$t('user.fackbookXingXi'), that.auth.faceState, that.$t('user.yunYingShangXingXi'), that.auth.phoneState);
                        break;
                    default:
                        break;
                }
            }
        },
        onLoad() {
            var that = this;
            that.realname.descript = "";
            that.member.descript = "";
            that.work.descript = "";
            that.bank.descript = "";
            that.mobile.descript = "";
            that.fackbook.descript = "";
        },
        onShow: function () {
            var that = this;
            that.pageAuth({ callback: that.onInit });
        },
        onBackPress(event) {
            //返回 event = { form: backbutton | navigateBack }
            uni.switchTab({ url: "/pages/main/main" });
            return true;  
        }
    }
</script>

<style>
</style>
