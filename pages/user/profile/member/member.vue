<template>
    <view class="body">
        <view class="input-line inner">
            <label class="inline">
                <text>{{$t('user.geRenXingXi')}}</text>
            </label>
        </view>
        <view class="input-group inner">
            <view class="input-row border">
                <label class="title">{{$t('user.youXiangDiZhi')}}</label>
                <m-input type="text" :placeholder="$t('tip.qingShuRu')+$t('user.youXiangDiZhi')" v-model="email"></m-input>
            </view>
            <view class="input-row border input-flex">
                <label class="title long">{{$t('user.zuiGaoXueLi')}}</label>
                <view class="inline">
                    <view class="input-flex flex1" @click="onEnduationShow"> {{ enduationText }} </view>
                    <mPicker ref="enduationPicker" mode="selector" :pickerValueArray="enduations" :pickerValueDefault="[enduationIndex]" @onConfirm="onEnduationConfirm"></mPicker>
                </view>
            </view>
            <view class="input-row border input-flex">
                <label class="title long">{{$t('user.hunYinZhuangTai')}}</label>
                <view class="inline">
                    <view class="input-flex flex1" @click="onMarryShow"> {{ marryText }} </view>
                    <mPicker ref="marryPicker" mode="selector" :pickerValueArray="marrys" :pickerValueDefault="[marryIndex]" @onConfirm="onMarryConfirm"></mPicker>
                </view>
            </view>
            <view class="input-row border">
                <label class="title">{{$t('user.xianJuDiZhi')}}</label>
                <m-input type="text" :placeholder="$t('tip.qingShuRu')+$t('user.xianJuDiZhi')" v-model="liveAddress"></m-input>
            </view>
            <view class="input-row border">
                <label class="title auto"></label>
                <view class="bline flex1">
                    <m-input type="text" :placeholder="$t('tip.qingShuRu')+$t('user.xiangXiDiZhi')" v-model="liveAddress1"></m-input>
                </view>
            </view>
        </view>

        <view class="input-line inner">
            <label class="inline">
                <text>{{$t('user.zhiXiQingShu')}}</text>
            </label>
        </view>
        <view class="input-group inner">
            <view class="input-row border input-flex">
                <label class="title">{{$t('user.guanXi')}}</label>
                <view class="inline">
                    <view class="input-flex flex1" @click="onFormeShow"> {{ formeText }} </view>
                    <mPicker ref="formePicker" mode="selector" :pickerValueArray="formes" :pickerValueDefault="[formeIndex]" @onConfirm="onFormeConfirm"></mPicker>
                </view>
            </view>
            <view class="input-row border">
                <label class="title">{{$t('user.xingMing')}}</label>
                <m-input type="text" :placeholder="$t('tip.qingShuRu')+$t('user.xingMing')" v-model="formeName"></m-input>
            </view>
            <view class="input-row border">
                <label class="title">{{$t('user.dianHua')}}</label>
                <m-input type="text" :placeholder="$t('tip.qingShuRu')+$t('user.dianHua')" v-model="formePhone"></m-input>
            </view>
            <view class="input-row border">
                <label class="title">{{$t('user.diZhi')}}</label>
                <m-input type="text" :placeholder="$t('tip.qingShuRu')+$t('user.diZhi')" v-model="formeAddress"></m-input>
            </view>
        </view>

        <view class="input-line inner">
            <label class="inline">
                <text>{{$t('user.jingJiLianXiRen')}}</text>
            </label>
        </view>
        <view class="input-group inner">
            <view class="input-row border input-flex">
                <label class="title">{{$t('user.guanXi')}}</label>
                <view class="inline">
                    <view class="input-flex flex1" @click="onContactShow"> {{ contactText }} </view>
                    <mPicker ref="contactPicker" mode="selector" :pickerValueArray="contacts" :pickerValueDefault="[contactIndex]" @onConfirm="onContactConfirm"></mPicker>
                </view>
            </view>
            <view class="input-row border">
                <label class="title">{{$t('user.xingMing')}}</label>
                <m-input type="text" :placeholder="$t('tip.qingShuRu')+$t('user.xingMing')" v-model="contactName"></m-input>
            </view>
            <view class="input-row border">
                <label class="title">{{$t('user.dianHua')}}</label>
                <m-input type="text" :placeholder="$t('tip.qingShuRu')+$t('user.dianHua')" v-model="contactPhone"></m-input>
            </view>
            <view class="input-row border">
                <label class="title">{{$t('user.diZhi')}}</label>
                <m-input type="text" :placeholder="$t('tip.qingShuRu')+$t('user.diZhi')" v-model="contactAddress"></m-input>
            </view>
        </view>

        <view class="input-line inner">
            <button type="primary" class="primary" :disabled="btnDisabled" @tap="onApply">{{$t('common.certiapply')}}</button>
        </view>
        <view class="input-line inner"></view>
        <mLocation @success="onLocation"></mLocation>
    </view>
</template>

<script>
    import mInput from '@/static/components/m-input.vue'
    import mPicker from "@/static/components/m-picker/m-picker.vue"
    import mLocation from '@/static/components/m-location.vue';

    import util from '@/util/util.js'
    import appService from '@/services/application.js'
    import userService from '@/services/user.js';

    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
        data() {
            return {
                email: '',
                enduations: [],
                enduationIndex: 0,
                enduationText: '',
                marrys: [],
                marryIndex: 0,
                marryText: '',
                liveAddress: '',
                liveAddress1: '',
                liveCoordinate: '0,0',
                formes: [],
                formeIndex: 0,
                formeText: '',
                formeName: '',
                formePhone: '',
                formeAddress: '',
                contacts: [],
                contactIndex: 0,
                contactText: '',
                contactName: '',
                contactPhone: '',
                contactAddress: '',

                btnDisabled: false
            }
        },
        components: {
            mInput,
            mPicker,
            mLocation
        },
        computed: {
            ...mapState(["userId", "auth"])
        },
        methods: {
            ...mapMutations(["pageAuth"]),
            onInit() {
                var that = this;

                var _load = function () {
                    appService.dictionary({ type: util.dictionary.enduation }, function (obj, msg, code) {
                        that.enduations = obj["educationalStateList"] || [];
                        that.enduations.unshift(util.SELECTFIRST());
                        that.enduations = util.toPickers(that.enduations);
                        that.enduationIndex = 0;
                        that.enduationText = that.enduations[that.enduationIndex]["label"];
                    })
                    appService.dictionary({ type: util.dictionary.marry }, function (obj, msg, code) {
                        that.marrys = obj["maritalStateList"] || [];
                        that.marrys.unshift(util.SELECTFIRST());
                        that.marrys = util.toPickers(that.marrys);
                        that.marryIndex = 0;
                        that.marryText = that.marrys[that.marryIndex]["label"];
                    })
                    appService.dictionary({ type: util.dictionary.forme }, function (obj, msg, code) {
                        that.formes = obj["kinsfolkRelationList"] || [];
                        that.formes.unshift(util.SELECTFIRST());
                        that.formes = util.toPickers(that.formes);
                        that.formeIndex = 0;
                        that.formeText = that.formes[that.formeIndex]["label"];
                    })
                    appService.dictionary({ type: util.dictionary.contact }, function (obj, msg, code) {
                        that.contacts = obj["contactRelationList"] || [];
                        that.contacts.unshift(util.SELECTFIRST());
                        that.contacts = util.toPickers(that.contacts);
                        that.contactIndex = 0;
                        that.contactText = that.contacts[that.contactIndex]["label"];
                    })
                }

                if (util.isAuth(that.auth.contactState)) {
                    util.confirm(that.$t('user.geRenXingXi') + that.$t('tip.yiRenZhengShiFouChongXiuRenZheng'), function () {
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
                userService.saveMember({ ...that.$data, userId: that.userId }, function (obj, msg, code) {
                    util.tip(msg || (that.$t('common.apply')), {
                        over() {
                            uni.redirectTo({
                                url: '../profile'
                            });
                        }
                    });
                });
            },
            onEnduationShow(e) {
                var that = this;
                that.$refs.enduationPicker.show([that.enduationIndex]);
            },
            onEnduationConfirm(e) {
                var that = this;
                that.enduationIndex = parseInt(e.value[0]);
                that.enduationText = that.enduations[that.enduationIndex]["label"];
            },
            onMarryShow(e) {
                var that = this;
                that.$refs.marryPicker.show([that.marryIndex]);
            },
            onMarryConfirm(e) {
                var that = this;
                that.marryIndex = parseInt(e.value[0]);
                that.marryText = that.marrys[that.marryIndex]["label"];
            },
            onFormeShow(e) {
                var that = this;
                that.$refs.formePicker.show([that.formeIndex]);
            },
            onFormeConfirm(e) {
                var that = this;
                that.formeIndex = parseInt(e.value[0]);
                that.formeText = that.formes[that.formeIndex]["label"];
            },
            onContactShow(e) {
                var that = this;
                that.$refs.contactPicker.show([that.contactIndex]);
            },
            onContactConfirm(e) {
                var that = this;
                that.contactIndex = parseInt(e.value[0]);
                that.contactText = that.contacts[that.contactIndex]["label"];
            },
            onLocation(e) {
                var that = this;
                if (util.isEmpty(e)) {
                    return;
                }
                that.liveAddress = e["text"] || "";
                that.liveCoordinate = (e["latitude"] || "0") + ',' + (e["longitude"] || "0");
            }
        },
        onShow: function () {
            var that = this;
            that.pageAuth({ callback: that.onInit });
        }
    }
</script>

<style>
</style>

