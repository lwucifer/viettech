//应用程序
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import langs from '@/store/langs.js'
import apis from '@/store/apis.js'
import util from '@/util/util.js'

const i18n=new VueI18n(langs);

const notice = function (input, success, error, opt) {
    var that = this;
    //if (!util.checkInput(input, 'application.notice')) {
    //    return;
    //}

    let params = {
        data: {
            //content:input.content
        },
        method: 'GET'
    }
    util.request(apis.APP_BORROW, params, success, error, opt);
}

const feedback = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input,'application.feedback')) {
        return;
    }

    if (util.isEmpty(input.content)) {
        util.toast(i18n.t('tip.qingShuRuNeiRong'));
        return;
    }

    let params = {
        data: {
            //content:input.content
        },
        method: 'POST'
    }

    util.request(apis.APP_FEEDBACK, params, success, error, opt);
}

const sms = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'application.sms')) {
        return;
    }

    if (util.isEmpty(input.type)) {
        util.tip(that.$t('tip.canShuCuoWu') + '[type]');
        return;
    }

    if (!util.isPhone(input.phone)) {
        util.toast(i18n.t('tip.qingShuRuZhengQueDeShouJiHao'));
        return;
    }

    var params = {
        data: {
            phone: input.phone,
            type: input.type,
        },
        method: 'POST'
    }
	if(params.data.type=="register"){
		params.data["sign"]=util.md5(input.phone+input.type,true)
	}
	
	var successCallback=function(obj,msg,code){
		if (obj.state == 10) {
			util.tip(msg);
			if(util.isFunction(success)){
				success(obj,msg,code);
			}
		} else {
			util.tip(obj["message"]||(msg||i18n.t('common.fail')))
		}
	}

    util.request(apis.APP_SMS, params, successCallback, error, opt);
}

const dictionary = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'application.dictionary')) {
        return;
    }

    if (util.isEmpty(input.type)) {
        util.toast(i18n.t('application.dictionary') + " type");
        return;
    }

    //type：BANK_TYPE
    let params = {
        data: {
            type: input.type
        }
    }
    util.request(apis.APP_DICTIONARY, params, success, error, opt);
}

const banktransfer = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'application.banktransfer')) {
        return;
    }

    if (util.isEmpty(input.type)) {
        util.toast(i18n.t('application.banktransfer') + " type");
        return;
    }
    //type:10
    let params = {
        data: {
            type: input.type
        }
    }
    util.request(apis.APP_TRANSFER, params, success, error, opt);
}

const confirmdatas = function (input, success, error, opt) {
    var that = this;
    if (!util.checkInput(input, 'application.confirmdatas')) {
        return;
    }

    //type = SOCIAL || YYS
    if (util.isEmpty(input.type)) {
        util.toast(i18n.t('tip.canShuCuoWu') + "[type]");
        return;
    }

    let params = {
        data: {
            type: input.type,
            userId: input.userId,
            client: input.client
        },
        method:"POST"
    }

    util.request(apis.APP_CONFIRMDATASOURCE, params, success, error, opt);
}

const protocols = function (input, success, error, opt) {
    var that = this;

    //if (!util.checkInput(input, 'application.protocols')) {
    //    return;
    //}

    //if (util.isEmpty(input.type)) {
    //    util.toast(i18n.t('application.dictionary') + " type");
    //    return;
    //}

    //type：BANK_TYPE
    let params = {
        data: {
        },
        method:'GET'
    }
    util.request(apis.APP_PROTOCOLS, params, success, error, opt);
}

export default {
    notice,
    feedback,
    sms,
    dictionary,
    banktransfer,
    confirmdatas,
    protocols,
}