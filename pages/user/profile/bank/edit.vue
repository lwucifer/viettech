<template>
    <view class="body">
        <view class="input-line inner">
            <label class="inline">
                <text>{{$t('user.yingHangKaTianJiaMiaoShu')}}</text>
            </label>
        </view>
        <view class="input-group inner">
            <view class="input-row border">
                <label class="title">{{$t('user.zhangHuLeiXing')}}</label>
                <view class="input-flex flex1" @click="onBankTypeShow"> {{ bankTypeText }} </view>
                <mPicker ref="bankTypePicker" mode="selector" :pickerValueArray="bankTypes" :pickerValueDefault="[bankTypeIndex]" @onConfirm="onBankTypeConfirm"></mPicker>
            </view>
            <view class="input-row border input-flex">
                <label class="title">{{$t('user.suoShuYinHang')}}</label>
                <view class="input-flex flex1" @click="onBankShow"> {{ bankText }} </view>
                <mPicker ref="bankPicker" mode="selector" :pickerValueArray="banks" :pickerValueDefault="[bankIndex]" @onConfirm="onBankConfirm"></mPicker>
            </view>
            <view class="input-row border input-flex">
                <label class="title">{{$t('user.chiKaRen')}}</label>
                <label class="input-flex flex1">{{name}}</label>
            </view>
            <view class="input-row border">
                <label class="title long">{{$t('user.zhangHaoKaHao')}}</label>
                <m-input type="text" :placeholder="$t('tip.qingShuRu')+$t('user.zhangHaoKaHao')" v-model="card"></m-input>
            </view>
        </view>
        <view class="input-line inner">
            <button type="primary" class="primary" :disabled="btnDisable" @tap="onApply">{{btnText}}</button>
        </view>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    import mInput from '@/static/components/m-input.vue'
    import mPicker from "@/static/components/m-picker/m-picker.vue"
    import mCode from '@/static/components/m-code.vue'

    import util from '@/util/util.js'
    import appService from '@/services/application.js'
    import userService from '@/services/user.js';

    export default {
        data() {
            var that = this;
            var bankTypes = util.toPickers([
                { code: '0', value: that.$t('user.yingHangZhangHao') },
                { code: '1', value: that.$t('user.yingHangKaHao') }
            ]);
            return {
                isAuth: false,
                bankTypes: bankTypes,//’À∫≈ « 0£¨ø®∫≈ « 1
                bankTypeIndex: 0,
                bankTypeText: that.$t('user.yingHangZhangHao'),
                banks: [],
                bankIndex: 0,
                bankText: '',
                bank: '',
                name: '',
                card: '',
                btnDisable: true,
                btnText: that.$t('common.certiapply')
            }
        },
        components: {
            mInput,
            mPicker,
            mCode
        },
        computed: {
            ...mapState(["userId", "auth"])
        },
        methods: {
            ...mapMutations(["pageAuth"]),
            onInit() {
                var that = this;

                var notRealNameAuthCallback = function () {
                    util.tip(that.$t("common.certibefore") + that.$t('user.shiMingXingXi'), {
                        over() {
                            uni.redirectTo({
                                url: '../profile'
                            });
                        }
                    });
                }

                if (!util.isAuth(that.auth.realNameState)) {
                    notRealNameAuthCallback();
                    return;
                }

                userService.get({ userId: that.userId }, function (obj, msg, code) {
                    that.name = obj.realName;
                    that.btnDisable = false;
                    that.loadBanks();
                }, null, {
                        complete() {
                            if (util.isEmpty(that.name)) {
                                notRealNameAuthCallback();
                            }
                        }
                    })
            },
            onApply() {
                var that = this;
                userService.saveBank2({ ...that.$data, userId: that.userId }, function (obj, msg, code) {
                    util.tip(msg || (that.$t('common.apply')), {
                        over() {
                            uni.redirectTo({
                                url: '../profile'
                            });
                        }
                    });
                });
            },
            onBankTypeShow(e) {
                var that = this;
                that.$refs.bankTypePicker.show([that.bankTypeIndex]);
            },
            onBankTypeConfirm(e) {
                var that = this;
                that.bankTypeIndex = parseInt(e.value[0]);
                that.bankTypeText = that.bankTypes[that.bankTypeIndex]["label"];
                that.loadBanks();
            },
            onBankShow(e) {
                var that = this;
                that.$refs.bankPicker.show([that.bankIndex]);
            },
            onBankConfirm(e) {
                var that = this;
                that.bankIndex = parseInt(e.value[0]);
                that.bankText = that.banks[that.bankIndex]["label"];
                that.bank = that.banks[that.bankIndex]["code"];
                console.log(that.bank);
            },
            loadBanks(type) {
                var that = this;
                type = type || that.bankTypeIndex;//’À∫≈ « 0(BAOKIM)£¨ø®∫≈ « 1(BAOKIM_CARD)
                appService.dictionary({ type: (type == 0 ? "BAOKIM" : "BAOKIM_CARD") }, function (obj, msg, code) {
                    that.banks = obj[(type == 0 ? "baokimList" : "baokimCardList")] || [];
                    that.banks.unshift(util.SELECTFIRST());
                    that.banks = util.toPickers(that.banks);
                    that.bankIndex = 0;
                    that.bankText = that.banks[that.bankIndex]["label"];
                    that.bank = that.banks[that.bankIndex]["code"];
                })
            }
        },
        onLoad: function () {
            var that = this;
        },
        onShow: function () {
            var that = this;
            that.pageAuth({ callback: that.onInit });
        },
        onBackPress(event) {
            uni.redirectTo({
                url: '../profile'
            });
            return true;
        }
    }
</script>

<style>
</style>

