//账号模块
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import langs from '@/store/langs.js'
import apis from '@/store/apis.js'
import util from '@/util/util.js'

const i18n = new VueI18n(langs);

const isExist = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'account.isexist')) {
        return;
    }

    if (!util.isAccount(input.account)) {
        util.toast(i18n.t('tip.qingShuRuZhengQueDeShouJiHao'));
        return;
    }

    let params = {
        data: {
            phone: input.account
        }
    };

    util.request(apis.USER_ISPHONEEXIST, params, success, error, opt);
}

const regist = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'account.regist')) {
        return;
    }

    if (!util.isCode(input.code)) {
        util.toast(i18n.t('tip.qingShuRuZhengQueDeDuanXinYanZhengMa'));
        return;
    }
    if (!util.isAccount(input.account)) {
        util.toast(i18n.t('tip.qingShuRuZhengQueDeShouJiHao'));
        return;
    }
    if (!util.isPassword(input.password)) {
        util.toast(i18n.t('tip.qingShuRuZhengQueDeMiMa'));
        return;
    }

    let params = {
        data: {
            loginName: input.account,
            loginPwd: util.md5(input.password),
            vcode: input.code,
            blackBox: util.random(false, 32),
            client: input.client,
            agree: 1,
            registerAddr: '中文',
            registerCoordinate: '0'
        },
        method: 'POST'
    }

    util.request(apis.USER_REGIST, params, success, error, opt);
}

const signin = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'account.signin')) {
        return;
    }

    if (!util.isAccount(input.account)) {
        util.toast(i18n.t('tip.qingShuRuZhengQueDeShouJiHao'));
        return;
    }

    if (!util.isPassword(input.password)) {
        util.toast(i18n.t('tip.qingShuRuZhengQueDeMiMa'));
        return;
    }

    let params = {
        data: {
            loginName: input.account,
            loginPwd: util.md5(input.password),
            blackBox: util.random(false, 32)
        }
    }

    util.request(apis.USER_LOGIN, params, success, error, opt);
}

const findCheck = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'account.findcheck')) {
        return;
    }

    if (!util.isAccount(input.account)) {
        util.toast(i18n.t('tip.qingShuRuZhengQueDeShouJiHao'));
        return;
    }
    if (!util.isCode(input.code)) {
        util.toast(i18n.t('tip.qingShuRuZhengQueDeDuanXinYanZhengMa'));
        return;
    }

    success();
}

const findEditPwd = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'account.findpwd')) {
        return;
    }

    if (!util.isAccount(input.account)) {
        util.toast(i18n.t('tip.qingShuRuZhengQueDeShouJiHao'));
        return;
    }

    if (!util.isCode(input.code)) {
        util.toast(i18n.t('tip.qingShuRuZhengQueDeDuanXinYanZhengMa'));
        return;
    }

    if (!util.isPassword(input.newPwd)) {
        util.toast(i18n.t('tip.qingShuRuZhengQueDeXinMiMa'));
        return;
    }

    if (!util.isPassword(input.newPwd2)) {
        util.toast(i18n.t('tip.qingShuRuZhengQueDeQueRenMiMa'));
        return;
    }

    if (input.newPwd != input.newPwd2) {
        util.toast(i18n.t('tip.queRenMiMaCuoWu'));
        return;
    }

    let params = {
        data: {
            phone: input.account,
            newPwd: util.md5(input.newPwd),
            vcode: input.code
        },
        method: 'POST'
    }

    util.request(apis.USER_FINDEDITPWD, params, success, error, opt);
}

export default {
    isExist,
    regist,
    signin,
    findCheck,
    findEditPwd
}
