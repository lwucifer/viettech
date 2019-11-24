//业务模块
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import langs from '@/store/langs.js'
import apis from '@/store/apis.js'
import util from '@/util/util.js'

const i18n = new VueI18n(langs);

const borrowQuery = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'business.borrowquery')) {
        return;
    }

    if (util.isEmpty(input.userId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    let params = {
        data: {
            userId: input.userId,
            current: 1,
            pageSize: 100
        },
        method: 'post'
    }

    util.request(apis.BUS_BORROWQUERY, params, success, error, opt);
}

const borrowGet = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'business.borrowget')) {
        return;
    }

    if (util.isEmpty(input.userId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    if (util.isEmpty(input.borrowId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " borrowId");
        return;
    }

    let params = {
        data: {
            borrowId: input.borrowId,
            //userId: input.userId
        },
        method: 'POST'
    }

    util.request(apis.BUS_BORROWGET, params, success, error, opt);
}

const borrowInfo = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'business.borrowinfo')) {
        return;
    }

    if (util.isEmpty(input.userId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    let params = {
        data: {
            userId: input.userId
        },
        method: 'POST'
    }

    util.request(apis.BUS_BORROWINFO, params, success, error, opt);
}

const borrowProgress = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'business.borrowprogress')) {
        return;
    }

    if (util.isEmpty(input.userId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    if (util.isEmpty(input.borrowId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " borrowId");
        return;
    }

    let params = {
        data: {
            borrowId: input.borrowId,
            //userId: input.userId
        },
        method: 'POST'
    }

    util.request(apis.BUS_BORROWProgress, params, success, error, opt);
}

const borrowCost = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'business.borrowcost')) {
        return;
    }

    if (util.isEmpty(input.userId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    let params = {
        data: {
            userId: input.userId,
            amount: input.amount,
            timeLimit: input.timeLimit
        }
    }

    util.request(apis.BUS_BORROWCOST, params, success, error, opt);
}

const borrowApply = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'business.borrowapply')) {
        return;
    }

    if (util.isEmpty(input.userId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    let params = {
        data: {
            amount: input.amount,
            timeLimit: input.timeLimit,
            cardId: input.bankCard,
            address: input.address || "测试地址",
            coordinate: input.coordinate || "0",
            client: '10',
            ip: "127.0.0.1" || '',
            tradePwd: util.md5('123456')
        },
        method: 'POST'
    }

    util.request(apis.BUS_BORROWAPPLY, params, success, error, opt);
}

const borrowFind = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'business.borrowfind')) {
        return;
    }

    if (util.isEmpty(input.userId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    let params = {
        data: {
            userId: input.userId
        }
    }

    util.request(apis.BUS_BORROWFIND, params, success, error, opt);
}

const borrowIndex = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'business.borrowindex')) {
        return;
    }

    //if (util.isEmpty(input.userId)) {
    //    util.toast(i18n.t('tip.canShuCuoWu') + " userId");
    //    return;
    //}

    let params = {
        data: {
            userId: input.userId,
            token: input.token
        },
        method: 'GET'
    }

    util.request(apis.BUS_BORROWINDEX, params, success, error, opt);
}

const repaymentSave = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'business.repaymentsave')) {
        return;
    }

    if (util.isEmpty(input.userId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    let params = {
        data: {
            id: input.id,
            userId: input.userId,
            token: input.token,
            mobileType: 0,
            versionNumber: util.getVersion()
        },
        method: 'POST'
    }

    util.request(apis.REP_AUTOPROTOCOL, params, success, error, opt);
}

const repaymentZaloQR = function (input, success, error, opt) {
    var that = this;

    if (util.isEmpty(input.userId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    let params = {
        data: {
            userId: input.userId
        },
        method: 'GET'
    }

    util.request(apis.BUS_REPZALOQR, params, success, error, opt);
}

const repaymentEPAY = function (input, success, error, opt) {
    var that = this;

    if (util.isEmpty(input.userId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    let params = {
        data: {
            userId: input.userId
        },
        method: 'GET'
    }

    util.request(apis.BUS_EPAY, params, success, error, opt);
}

const canBorrow = function (input, yes, no) {
    input = input || {};
    var userId = input["userId"] || "";

    //未登录
    if (util.isEmpty(userId)) {
        util.toLogin();
        return;
    }

    //yes(数据，资料完善，借款审核，页面url,操作描术)
    yes = yes || function (obj, profile, authen, url, text) {
        if (url.indexOf('business/repayment/repayment') > -1) {
            uni.switchTab({ url: url });
        }
        else {
            uni.navigateTo({ url: url });
        }
    };

    //no(数据，资料完善，借款审核，页面url,操作描术)
    no = no || function (obj, profile, authen, url, text) {
        if (url.indexOf('business/repayment/repayment') > -1) {
            uni.switchTab({  url: url });
        }
        else {
            uni.navigateTo({ url: url });
        }
    }

    borrowIndex(input, function (obj, msg, code) {

        //资料
        if (obj["auth"]["qualified"] == 0) {
            no(obj, false, false, '/pages/user/profile/profile', i18n.t('common.perfect'))
            return;
        }

        //已借
        if (obj["auth"]["qualified"] == 1 && obj["isBorrow"] == true) {
            var borrowId = obj["borrowId"] || "";
            if (obj["borrow"]["state"] == 30) {
                //去还款
                //no(obj, true, true, '/pages/business/repayment/method/third?borrowId=' + borrowId, i18n.t('bus.huanKuanXinXi'));
                no(obj, true, true, '/pages/business/repayment/repayment', i18n.t('bus.huanKuanXinXi'));
            } else {
                //被拒（已借/申请被拒绝）isRepay,borrow["state"]
                no(obj, true, false, '/pages/business/borrow/detail?borrowId=' + borrowId, i18n.t('bus.jieKuanXinXi'));
            }
            return;
        }

        //借款
        if (obj["auth"]["qualified"] == 1 && obj["isBorrow"] == false) {
            yes(obj, true, true, '/pages/business/borrow/apply', i18n.t('common.apply2'))
            return;
        }

    });
}


export default {
    borrowQuery,
    borrowGet,
    borrowInfo,
    borrowProgress,
    borrowCost,
    borrowApply,
    borrowFind,
    borrowIndex,
    repaymentSave,
    repaymentZaloQR,
    repaymentEPAY,
    canBorrow

}