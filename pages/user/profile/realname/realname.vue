<template>
    <view class="body">
        <view class="input-group inner">
            <view class="input-row border input-flex">
                <label class="title">{{$t('user.geRenZhengJian')}}</label>
                <view class="flex1 input-flex" @tap="onFrontSelect">
                    <image class="card" src="../../../../static/img/card_front.png" mode="center"></image>
                    <label class="inner">{{frontImg==''?$t('common.front'):$t('common.hasSelect')}}</label>
                </view>
                <view class="flex1 input-flex" @tap="onReverseSelect">
                    <image class="card" src="../../../../static/img/card_front.png" mode="center"></image>
                    <label class="inner">{{backImg==''?$t('common.reverse'):$t('common.hasSelect')}}</label>
                </view>
            </view>
            <view class="input-row border input-flex">
                <label class="title long">{{$t('user.renLianShiBie')}}</label>
                <view class="flex1  input-flex" @tap="onFaceSelect">
                    <view class="input-flex">
                        <uni-icons type="scan"></uni-icons>
                    </view>
                    <label class="inner">{{facePath==''?'':$t('common.hasSelect')}}</label>
                </view>
            </view>
            <view class="input-row border input-flex">
                <label class="title">{{$t('user.zhengShiXingMing')}}</label>
                <m-input type="text" :placeholder="$t('tip.qingShuRuZhengShiXingMing')" v-model="name"></m-input>
            </view>
            <view class="input-row border">
                <label class="title">{{$t('user.shenFenZhengHao')}}</label>
                <m-input type="text" :placeholder="$t('tip.qingShuRuShenFenZhengHao')" v-model="idcard"></m-input>
            </view>
            <view class="input-row border">
                <label class="title long">{{$t('user.chuShengRiQi')}}</label>
                <view class="input-flex flex1" @click="onBirthdayShow"> {{birthday}} </view>
                <mPicker ref="birthdayPicker" mode="dateSelector" :pickerValueDefault="new Date(birthday)"  @onConfirm="onBirthdayConfirm"></mPicker>
            </view>
            <view class="input-row border">
                <label class="title">{{$t('user.xingBie')}}</label>
                <view class="input-flex flex1" @click="onSexShow"> {{sex}} </view>
                <mPicker ref="sexPicker" mode="selector" :pickerValueArray="sexs" :pickerValueDefault="[sexIndex]"  @onConfirm="onSexConfirm"></mPicker>
            </view>
        </view>
        <view class="input-line inner">
            <label class="inline">
                <text>{{$t('user.shiMingXingXiTiShi1')}}</text>
            </label>
        </view>
        <view class="input-line inner">
            <button type="primary" class="primary" @tap="onApply" :disabled="btnDisabled">{{$t('common.certiapply')}}</button>
        </view>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    import uniIcons from "@/components/uni-icons/uni-icons.vue"
    import mPicker from "@/static/components/m-picker/m-picker.vue"
    import mInput from '@/static/components/m-input.vue'
    import mCode from '@/static/components/m-code.vue';

    import util from '@/util/util.js'
    import appService from '@/services/application.js'
    import userService from '@/services/user.js'

    export default {
        data() {
            var that = this;
            var nowDt = new Date();
            var sexs = util.toPickers([
                util.SELECTFIRST(),
                { code: '1' , value: that.$t('common.sex1')},
                { code: '2' , value: that.$t('common.sex2')}
            ]);
            return {
                name: '',
                idcard: '',
                sexs: sexs,
                sex: that.$t('tip.qingXuanZe') + '',
                sexIndex: 0,
                birthday: (nowDt.getFullYear() + "-" + (nowDt.getMonth() + 1) + "-" + nowDt.getDate()),
                btnDisabled: true,
                faceStatus: '',
                frontImg: "",
                backImg: "",
                faceImg: "",
                facePath: ""
            }
        },
        components: {
            uniIcons,
            mPicker,
            mInput,
            mCode
        },
        computed: {
            ...mapState(["userId", "auth"])
        },
        methods: {
            ...mapMutations(["pageAuth"]),
            onInit() {
                var that = this;
                that.faceStatus = that.auth.faceState;

                var _load = function () {
                    that.btnDisabled = false;
                }

                if (util.isAuth(that.auth.idState) && util.isAuth(that.auth.realNameState)) {
                    util.confirm(that.$t('user.zhengShiXingMing') + that.$t('tip.yiRenZhengShiFouChongXiuRenZheng'), function () {
                        _load();
                    }, function () {
                        uni.redirectTo({
                            url: '../profile'
                        });
                    })
                } else {
                    _load();
                }
            },
            onApply() {
                var that = this;

                var fackCallback = function (obj, msg, code) {
                    that.saveFaceAuth(function (obj2,msg2,code) {
                        util.tip((msg2||msg) || (that.$t('common.apply')), {
                            over() {
                                uni.redirectTo({
                                    url: '../profile'
                                });
                            }
                        });
                    });
                }

                that.saveRealName(fackCallback);
            },
            onBirthdayShow(e) {
                var that = this;
                that.$refs.birthdayPicker.show(new Date(that.birthday));
            },
            onBirthdayConfirm(e) {
                var that = this;
                that.birthday = e.label
            },
            onSexShow(e) {
                var that = this;
                that.$refs.sexPicker.show([that.sexIndex]);
            },
            onSexConfirm(e) {
                var that = this;
                that.sexIndex = parseInt(e.value[0]);
                that.sex = that.sexs[that.sexIndex]["label"];
            },
            onFrontSelect() {
                var that = this;
                uni.chooseImage({
                    count: 1,
                    sizeType: ['compressed'],
                    sourceType: ['camera'],
                    success: function (res) {
                        const filePath = res.tempFilePaths[0];
                        var input = {
                            userId: that.userId,
                            name: "frontImg",
                            file: filePath,
                            filePath: ""
                        };
                        userService.saveFaceauth(input, function (obj, msg, code) {
                            that.frontImg = JSON.stringify(msg);
                        });
                    }
                });
            },
            onReverseSelect() {
                var that = this;
                if (util.isEmpty(that.frontImg)) {
                    util.tip(that.$t('tip.qingShangChuanZhengJianZhengMianZhaoPian'))
                    return;
                }
                uni.chooseImage({
                    count: 1,
                    sizeType: ['compressed'],
                    sourceType: ['camera'],
                    success: function (chooseImageRes) {
                        const filePath = chooseImageRes.tempFilePaths[0];
                        var input = {
                            userId: that.userId,
                            name: "backImg",
                            file: filePath,
                            filePath: "{'filePath':[" + that.frontImg + "]}"
                        };
                        userService.saveFaceauth(input, function (obj, msg, code) {
                            that.backImg = JSON.stringify(msg);
                        });
                    }
                });
            },
            onFaceSelect() {
                var that = this;

                if (util.isEmpty(that.frontImg)) {
                    util.tip(that.$t('tip.qingShangChuanZhengJianZhengMianZhaoPian'))
                    return;
                }

                if (util.isEmpty(that.backImg)) {
                    util.tip(that.$t('tip.qingShangChuanZhengJianFanMianZhaoPian'))
                    return;
                }

                uni.chooseImage({
                    count: 1,
                    sizeType: ['compressed'],
                    sourceType: ['camera'],
                    success: function (chooseImageRes) {
                        that.facePath = chooseImageRes.tempFilePaths[0];
                    }
                });
            },
            getAuth(callback) {
                var that = this;
                userService.auth({ userId: that.userId }, function (obj, msg, code) {
                    that.faceStatus = status.faceAuth;
                    if (util.isFunction(callback)) {
                        callback(obj);
                    }
                })
            },
            saveFaceAuth(callback) {
                var that = this;
                if (util.isEmpty(that.frontImg)) {
                    util.tip(that.$t('tip.qingShangChuanZhengJianZhengMianZhaoPian'))
                    return;
                }
                if (util.isEmpty(that.backImg)) {
                    util.tip(that.$t('tip.qingShangChuanZhengJianFanMianZhaoPian'))
                    return;
                }
                var input = {
                    userId: that.userId,
                    name: "sdkImg",
                    file: that.facePath,
                    filePath: "{'filePath':[" + that.frontImg + "," + that.backImg + "]}"
                };

                userService.saveFaceauth(input, function (obj, msg, code) {
                    that.faceImg = JSON.stringify(msg);
                    if (util.isFunction(callback)) {
                        callback(obj);
                    }
                }, null, {
                        loading: that.$t('tip.zhengZaiShiBie')
                    });
            },
            saveRealName(callback) {
                var that = this;
                userService.saveRealname({ ...that.$data, userId: that.userId }, function (obj, msg, code) {
                    if (util.isFunction(callback)) {
                        callback(obj, msg, code);
                    }
                });
            }
        },
        onLoad: function () {
            var that = this;
            //防拍照等子页面返回时重置内容
            userService.get({ userId: that.userId }, function (obj, msg, code) {
                that.name = obj.realName;
                that.idcard = obj.idNo;
                that.birthday = obj["birthday"] || that.birthday;
                for (var i = 0; i < that.sexs.length; i++) {
                    if (that.sexs[i] == obj.sex) {
                        that.sexIndex = i;
                        that.sex = obj.sex;
                    }
                }
            })
        },
        onShow: function () {
            var that = this;
            that.pageAuth({ callback: that.onInit });
        }
    }
</script>
<style>
    .card {
        width: 42upx;
        height: 42upx;
        padding-left: 5upx;
    }
</style>

