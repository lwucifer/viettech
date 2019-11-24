//账号模块
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import langs from '@/store/langs.js'
import apis from '@/store/apis.js'
import util from '@/util/util.js'

import appService from '@/services/application.js'

const i18n = new VueI18n(langs);

const get = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'user.get')) {
        return;
    }

    if (util.isEmpty(input.userId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    let params = {
        data: {
            userId: input.userId,
        }
    }

    util.request(apis.USER_GET, params, success, error, opt);
}

const my = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'user.my')) {
        return;
    }

    let params = {
        data: {
            //userId: input.userId,
        },
        method: 'POST'
    }

    util.request(apis.USER_MY, params, success, error, opt);
}

const auth = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'user.auth')) {
        return;
    }

    if (util.isEmpty(input.userId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    let params = {
        data: {
            userId: input.userId,
        }
    }

    util.request(apis.USER_AUTH, params, success, error, opt);
}

const editLoginPwd = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'user.editloginpwd')) {
        return;
    }

    if (!util.isPassword(input.oldPwd)) {
        util.toast(i18n.t('tip.qingShuRuZhengQueDeYuanMiMa'));
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
            oldPwd: util.md5(input.oldPwd),
            newPwd: util.md5(input.newPwd)
        }
    }

    util.request(apis.USER_EDITLOGINPWD, params, success, error, opt);
}

const editTradePwd = function (input, success, error, opt) {

}

const getMobileUrl = function (input, success, error, opt) {
    var data = {
        ...input,
        type: 'YYS',
        client: util.getClient(),
    }
    appService.confirmdatas(data, success, error, opt);
}


const checkFackimage = function (input, success, error, opt) {
    var that = this;

    if (!util.checkInput(input, 'user.checkfackimage')) {
        return;
    }

    if (util.isEmpty(input.userId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    if (util.isEmpty(input.file)) {
        util.toast(i18n.t('tip.qingXuanZeHuoPaiSheTuPian'));
        return;
    }

    let params = {
        data: {
            userId: input.userId,
        }
    }

    util.upload("/act/faceauth/pictureReception2.htm", params, success, error, util.extend2({
        name: "sdkImg",
        filePath: input.file
    }, opt));
}

const saveFaceauth = function (input, success, error, opt) {
    var that = this;

    if (!util.checkInput(input, 'user.savefaceauth')) {
        return;
    }

    if (util.isEmpty(input.userId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    if (util.isEmpty(input.name)) {
        util.toast(i18n.t('tip.qingXuanZeShangChuanLeiXing'));
        return;
    }

    if (util.isEmpty(input.file)) {
        util.toast(i18n.t('tip.qingXuanZeHuoPaiSheTuPian'));
        return;
    }

    let params = {
        data: {
            userId: input.userId,
            filePath: input.filePath
        }
    }

    util.upload("/act/faceauth/pictureReception2.htm?userId=" + input.userId, params, success, error, util.extend2({
        name: input.name,
        filePath: input.file
    }, opt));
}

const getRealname = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'user.getrealname')) {
        return;
    }

    if (util.isEmpty(input.userId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    let params = {
        data: {
            userId: input.userId,
        }
    }

    util.request(apis.USER_REALNAMEGET, params, success, error, opt);
}

const saveRealname = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'user.saverealname')) {
        return;
    }

    if (util.isEmpty(input.userId)) {
        util.tip(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    if (!util.isName(input.name)) {
        util.tip(i18n.t('tip.qingShuRuYouXiaoDeZhengShiXingMing'));
        return;
    }

    if (!util.isIdcard(input.idcard)) {
        util.tip(i18n.t('tip.qingShuRuYouXiaoDeShenFenZhengHao'));
        return;
    }

    if (util.isEmpty(input.sex)) {
        util.tip(i18n.t('tip.qingShuRuYouXiaoDe') + i18n.t('user.xingBie'));
        return;
    }

    if (util.isEmpty(input.birthday)) {
        util.tip(i18n.t('tip.qingShuRuYouXiaoDe') + i18n.t('user.chuShengRiQi'));
        return;
    }

    let params = {
        data: {
            name: input.name,
            idNo: input.idcard,
            sex: input.sex,
            birthday: input.birthday,
            userId: input.userId
        },
        method: 'POST'
    }

    util.request(apis.USER_REALNAMESAVE, params, success, error, opt);
}

const saveMember = function (input, success, error, opt) {
    var that = this;

    if (!util.checkInput(input, 'user.savemember')) {
        return;
    }

    if (util.isEmpty(input.userId)) {
        util.tip(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    if (!util.isEmail(input.email)) {
        util.tip(i18n.t('tip.qingShuRuYouXiaoDe') + i18n.t('user.youXiangDiZhi'));
        return;
    }

    if (util.isEmpty(input.liveAddress)) {
        util.tip(i18n.t('tip.qingShuRu') + i18n.t('user.xianJuDiZhi'));
        return;
    }

    //if (util.isEmpty(input.liveAddress1)) {
    //    util.tip(i18n.t('tip.qingShuRu') + i18n.t('user.xiangXiDiZhi'));
    //    return;
    //}

    if (util.isSelectEmpty(input.enduationText)) {
        util.tip(i18n.t('tip.qingShuRuYouXiaoDe') + i18n.t('user.zuiGaoXueLi'));
        return;
    }

    if (util.isSelectEmpty(input.marryText)) {
        util.tip(i18n.t('tip.qingShuRuYouXiaoDe') + i18n.t('user.hunYinZhuangTai'));
        return;
    }

    if (util.isSelectEmpty(input.formeText)) {
        util.tip(i18n.t('tip.qingShuRuYouXiaoDe') + i18n.t('user.zhiXiQingShu'));
        return;
    }
    if (util.isEmpty(input.formeName)) {
        util.tip(i18n.t('tip.qingShuRuYouXiaoDe') + i18n.t('user.zhiXiQingShu') + i18n.t('user.xingMing'));
        return;
    }
    if (!util.isPhone(input.formePhone)) {
        util.tip(i18n.t('tip.qingShuRuYouXiaoDe') + i18n.t('user.zhiXiQingShu') + i18n.t('user.dianHua'));
        return;
    }
    if (util.isEmpty(input.formeAddress)) {
        util.tip(i18n.t('tip.qingShuRuYouXiaoDe') + i18n.t('user.zhiXiQingShu') + i18n.t('user.diZhi'));
        return;
    }


    if (util.isSelectEmpty(input.contactText)) {
        util.tip(i18n.t('tip.qingShuRuYouXiaoDe') + i18n.t('user.jingJiLianXiRen'));
        return;
    }
    if (util.isEmpty(input.contactName)) {
        util.tip(i18n.t('tip.qingShuRuYouXiaoDe') + i18n.t('user.jingJiLianXiRen') + i18n.t('user.xingMing'));
        return;
    }
    if (!util.isPhone(input.contactPhone)) {
        util.tip(i18n.t('tip.qingShuRuYouXiaoDe') + i18n.t('user.jingJiLianXiRen') + i18n.t('user.dianHua'));
        return;
    }
    if (util.isEmpty(input.contactAddress)) {
        util.tip(i18n.t('tip.qingShuRuYouXiaoDe') + i18n.t('user.jingJiLianXiRen') + i18n.t('user.diZhi'));
        return;
    }

    var types = "10,20"
    var rels = ((input.formes[input.formeIndex] || {})["label"] || "") + "," + ((input.contacts[input.contactIndex] || {})["label"] || "");
    var names = input.formeName + ',' + input.contactName;
    var phones = input.formePhone + ',' + input.contactPhone;
    var address = input.formeAddress + ',' + input.contactAddress;

    let params = {
        data: {
            email: input.email,
            education: input.enduations[input.enduationIndex]["label"] || "",
            marryState: input.marrys[input.marryIndex]["label"] || "",
            liveAddr: input.liveAddress,
            liveCoordinate: input.liveCoordinate, 
            detailAddr: input.liveAddress1,
            relation: rels,
            name: names,
            phone: phones,
            codeName: address,
            type: types,
            userId: input.userId
        },
        method: 'POST'
    }

    util.request(apis.USER_MEMBERSAVE, params, success, error, opt);
}

const saveWork = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'user.savework')) {
        return;
    }

    if (util.isEmpty(input.userId)) {
        util.tip(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    if (util.isEmpty(input.name)) {
        util.tip(i18n.t('tip.qingShuRuYouXiaoDe') + i18n.t('user.gongSiMingCheng'));
        return;
    }

    if (util.isEmpty(input.phone)) {
        util.tip(i18n.t('tip.qingShuRuYouXiaoDe') + i18n.t('user.gongSiDianHua'));
        return;
    }

    if (util.isEmpty(input.seniority)) {
        util.tip(i18n.t('tip.qingShuRuYouXiaoDe') + i18n.t('user.gongZuoNianXian'));
        return;
    }

    if (util.isEmpty(input.salary)) {
        util.tip(i18n.t('tip.qingShuRuYouXiaoDe') + i18n.t('user.xinZi'));
        return;
    }

    if (util.isEmpty(input.liveArea)) {
        util.tip(i18n.t('tip.qingShuRu') + i18n.t('user.gongSiDiZhi'));
        return;
    }

    //if (util.isEmpty(input.liveAddress)) {
    //    util.tip(i18n.t('tip.qingShuRu') + i18n.t('user.xiangXiDiZhi'));
    //    return;
    //}


    let params = {
        data: {
            companyName: input.name,
            companyPhone: input.phone,
            workingYears: input.seniority,
            salary: input.salary,
            companyAddr: input.liveArea,
            //companyDetailAddr: input.liveAddress,
            companyCoordinate: "0,0",
            userId: input.userId,
        },
        method: 'POST'
    }

    util.request(apis.USER_WORKSAVE, params, success, error, opt);
}

const getBanks = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'user.getbanks')) {
        return;
    }

    if (util.isEmpty(input.userId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    let params = {
        data: {
            userId: input.userId,
        }
    }

    util.request(apis.USER_BANKSGET, params, success, error, opt);
}

const saveBank = function (input, success, error, opt) {
    var that = this;

    if (!util.checkInput(input, 'user.getbanks')) {
        return;
    }

    if (util.isEmpty(input.userId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    if (!util.isBank(input.bank)) {
        util.toast(i18n.t('tip.qingXuanZeYouXiaoDeYingHang'));
        return;
    }

    if (!util.isCode(input.card)) {
        util.toast(i18n.t('tip.qingShuRuYouXiaoDeYingHangKaHao'));
        return;
    }

    if (!util.isName(input.name)) {
        util.toast(i18n.t('tip.qingShuRuYouXiaoDeMingCheng'));
        return;
    }

    if (!util.isPhone(input.phone)) {
        util.toast(i18n.t('tip.qingShuRuZhengQueDeShouJiHao'));
        return;
    }

    if (!util.isCode(input.code)) {
        util.toast(i18n.t('tip.qingShuRuZhengQueDeDuanXinYanZhengMa'));
        return;
    }

    let params = {
        data: {
            bank: input.bank,
            cardNo: input.card,
            msgCode: input.code,
            userId: input.userId,
        },
        method: 'POST'
    }

    util.request(apis.USER_BANKSAVE, params, success, error, opt);
}

const saveBank2 = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'user.getbanks')) {
        return;
    }

    if (util.isEmpty(input.userId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    if (!(input.bankTypeIndex == 0 || input.bankTypeIndex == 1)) {
        util.toast(i18n.t('tip.qingXuanZeYouXiaoDe') + i18n.t('user.zhangHuLeiXing'));
        return;
    }

    if (!util.isBank(input.bank)) {
        util.toast(i18n.t('tip.qingXuanZeYouXiaoDe') + i18n.t('user.suoShuYinHang'));
        return;
    }

    if (util.isEmpty(input.name)) {
        util.toast(i18n.t('tip.qingShuRuYouXiaoDe') + i18n.t('user.chiKaRen'));
        return;
    }

    if (!util.isBankCard(input.card)) {
        util.toast(i18n.t('tip.qingShuRuYouXiaoDe') + i18n.t('user.zhangHaoKaHao'));
        return;
    }

    let params = {
        data: {
            bankNo: input.bank,
            cardNo: input.card,
            accType: input.bankTypeIndex,
            userId: input.userId,
        },
        method: 'POST'
    }

    util.request(apis.USER_BANKSAVE2, params, success, error, opt);
}

const canRebindingBank = function (input, yes, no) {
    var that = this;

    if (!util.checkInput(input, 'user.canrebindingbank')) {
        return;
    }

    if (util.isEmpty(input.userId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    if (util.isFunction(yes)) {
        yes();
    }

    //TODO: 是否可以解梆银行卡

    //if (util.isFunction(no)) {
    //    no();
    //}
}

const profitAmount = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'user.profitamount')) {
        return;
    }

    if (util.isEmpty(input.userId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    let params = {
        data: {
            userId: input.userId,
        }
    }

    util.request(apis.USER_PROFITAMOUNT, params, success, error, opt);
}

const getProductTime = function (input, success, error, opt) {
    var that = this;

    if (util.isEmpty(input.userId)) {
        util.toast(i18n.t('tip.canShuCuoWu') + " userId");
        return;
    }

    let params = {
        data: {
            userId: input.userId,
        }
    }

    util.request(apis.PRODUCT_TIME, params, success, error, opt);
}

export default {
    get,
    my,
    auth,
    editLoginPwd,
    checkFackimage,
    saveFaceauth,
    getMobileUrl,
    getRealname,
    saveRealname,
    saveWork,
    saveMember,
    getBanks,
    saveBank,
    saveBank2,
    canRebindingBank,
    profitAmount,
    getProductTime
}