import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

//jwt
import jwt from '../static/libs/jwt/index.js'
import md5 from 'blueimp-md5'

//underscore
import _ from '../static/libs/underscore/underscore.js'
import _str from '../static/libs/underscore/underscore.string.js'
import _str2 from '../static/libs/underscore/underscore.util.strings2.js'
_.mixin(_str.exports())
_.mixin(_str2)


//i18n/langs
import langs from '@/store/langs.js'
const i18n = new VueI18n(langs);

//host,keys
// const API_HOST = "http://127.0.0.1/"  		        //测试
// const RES_HOST = "http://127.0.0.1/" 				//资源
const API_HOST = "https://wapkvay.vaytiendi.com" 		//正式
const RES_HOST = "https://wapkvay.vaytiendi.com"         //资源
const APP_VERSION = '1.6';                                  //版本


const SECRET_KEY = 'BCFFE4852D42A12318C907B20A491EA6'
const SIGNIN_KEY = "KEY_SINGIN"
const USERS_KEY = 'KEY_USER'
const TOKEN_KEY = "KEY_TOKEN"

var plusRegex = /\+/g;
var spaceRegex = /\%20/g;
var bracketRegex = /(?:([^\[]+))|(?:\[(.*?)\])/g;

var urlEncode = function (s) {
    return encodeURIComponent(s).replace(spaceRegex, '+');
};
var urlDecode = function (s) {
    return decodeURIComponent(s.replace(plusRegex, '%20'));
};
var _buildParams = function (prefix, val, top, split, encoding) {
    split = split || '&'
    if (encoding != false) {
        encoding = true;
    }
    if (_.isUndefined(top)) top = true;
    if (_.isArray(val)) {
        return _.map(val, function (value, key) {
            return _buildParams(top ? key : prefix + '[]', value, false, split, encoding);
        }).join(split);
    } else if (_.isObject(val)) {
        return _.map(val, function (value, key) {
            return _buildParams(top ? key : prefix + '[' + key + ']', value, false, split, encoding);
        }).join(split);
    } else {
        if (encoding) {
            return urlEncode(prefix) + '=' + urlEncode(val);
        } else {
            return prefix + '=' + val;
        }
    }
};

var _network_fail = function () {
    return i18n.t('common.network') + i18n.t('common.request') + i18n.t('common.fail');
}
var _request_error = function () {
    return i18n.t('common.request') + i18n.t('common.error');
}

//util
var _util = _;
_util.jwt = jwt;
//var token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkwMzk4NWE3LTUxNDctNDNlZS05MzZjLTQ2OThkMWJhNjhiZCIsIm5vIjoiMTAwMDAwMDAxIiwiYWNjb3VudCI6IldlaXhpbjgyZjBhNjI1MzZhOTQ3NzZhMGNkMWYyZGYzZTdmYjdkIiwibW9iaWxlcyI6IiIsImVtYWlscyI6IiIsIm5hbWUiOiLmlL7niZvlqIMiLCJhdmF0YXIiOiJodHRwczovL3d4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9EWUFJT2dxODNlcm44QjNKRDVVZGhGeFFOMGhwZGVUdFhaQ2lhQ3dub05KWDFwdVZacGliZXlIdzRudHlpYk5RSHYwS24wd2hmSlZsalhHVzl4N09pYnhvRHcvMTMyIiwicm9sZXMiOiIiLCJvcmdhbml6ZSI6IiIsImVtcGxveWUiOiIiLCJwYXJlbnQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJ1bmluSUQiOiJvRS12bTVlZ3h1YmxZVmRKVXlRSFUzOWFIeENJIiwib3BlbklkIjoib0Utdm01ZWd4dWJsWVZkSlV5UUhVMzlhSHhDSSIsIm5vbmNlc3RyIjoiMzM5MzZiMWJjNmNlNDZiZGEwZDZiZDE5NWNhMmQ5MmQiLCJzdGF0dXMiOiLmraPluLgiLCJpc3MiOiJVVEhDZW50ZXIiLCJhdWQiOiIxMDAwMDAifQ.9G6CifxAC-o8fQcUu1EZPFBp8GebMq_kJBxyYg1XwBc';
//console.log(util.jwt(token));

//const
_util.RESOURCE = RES_HOST;
_util.PROTOCOL_REG = RES_HOST + "/h5/protocol_register.jsp";        //注册协议   https://wapkvay.xcany.com/h5/protocol_register.jsp
_util.PROTOCOL_BORROW = RES_HOST + "/h5/protocol_borrow.htm";       //借款协议   https://wapkvay.xcany.com/h5/protocol_borrow.htm?userId=15061&amount=2000000&limit=8&fee=600000.0
_util.PROTOCOL_HELP = RES_HOST + "/h5/help.jsp";                    //帮助中心   https://wapkvay.xcany.com/h5/help.jsp

_util.INVITE = RES_HOST + "/h5/invite.jsp";                         //邀请页面   https://wapkvay.xcany.com/h5/invite.jsp
_util.INVITERULE = RES_HOST + "/h5/help.jsp";                       //邀请规则   https://wapkvay.xcany.com/h5/invite_rule.jsp

_util.THIRDPAYMENT = function (borrowId) { return API_HOST+"/h5/payment/baokim.htm?borrowId=" + (borrowId || "");}

_util.SELECTFIRST = function () { return { code: "0", value: i18n.t('tip.qingXuanZe') };};

_util.HOST = function () { return API_HOST; }

var _empty = _util.isEmpty;
_util.isEmpty = function (obj) {
    if (obj == null) return true;
    if (obj == "") return true;
    if (obj == 0) return true;
    if (obj == "00000000-0000-0000-0000-000000000000") return true;
    if (_.isFunction(obj)) return false;
    if (_.isString(obj)) return false;
    if (_.isFinite(obj)) return false;
    if (_.isNumber(obj)) return false;
    if (_.isBoolean(obj)) return false;
    if (_.isDate(obj)) return false;
    return _empty(obj)
}

_util.apiSuccess = function (res, success, error) {
    var that = this;
    if (that.isEmpty(res)) {
        error(_network_fail())
        return;
    }
    var result = res["data"] || {};
    if (that.isString(res["data"])) {
        result = JSON.parse(res["data"]);
    }

    var code = result["code"] || -1;
    var msg = result["msg"] || "";
    var obj = result["data"] || null;

    if (code == 200) {
        success(obj, msg, code);
    }
    else if (code == 410 || code == 413) {
        _util.tip(msg || i18n.t('common.loginfail'), {
            over: function () {
                that.toLogin();
            }
        })
    }
    else {
        msg = msg || _request_error();
        msg = msg + " [" + code + "]";
        error(msg, code);
    }
}

_util.apiFail = function (res, error) {
    error(_network_fail())
}

_util.dictionary = {
    bank: 'BANK_TYPE',
    enduation: 'EDUCATIONAL_STATE',
    marry: 'MARITAL_STATE',
    forme: 'KINSFOLK_RELATION',
    contact: 'CONTACT_RELATION'
}

_util.isPhone = function (obj) {
    return (obj || "").length > 2;
};

_util.isAccount = function (obj) {
    return (obj || "").length > 2;
}

_util.isPassword = function (obj) {
    return (obj || "").length > 2;
}

_util.isCode = function (obj) {
    return (obj || "").length > 2;
}

_util.isName = function (obj) {
    return (obj || "").length > 2;
}

_util.isBank = function (obj) {
    return (obj || "").length > 2;
}

_util.isBankCard = function (obj) {
    return (obj || "").length > 2;
}

_util.isIdcard = function (obj) {
    return (obj || "").length > 2;
}

_util.isEmail = function (obj) {
    return (obj || "").length > 2;
}

_util.isSelectEmpty = function (obj) {
    var that = this;
    return that.isEmpty(obj);
}

_util.isAuth = function (auth) {
    var that = this;
    auth = auth || 0;
    auth = parseInt(auth);

    //auth==10  //未完善
    //auth==30  //已完善
    //other     //完善中
    return auth == 30;
}

_util.checkInput = function (input, method) {
    var that = this;
    if (that.isEmpty(input)) {
        method = method || "";
        if (!that.isEmpty(method)) {
            method = "/" + method;
        }
        that.tip(i18n.t('tip.canShuCuoWu') + '[input' + method + ']');
        return false;
    }
    return true;
}

_util.canBorrow = function (auth) {
    var that = this;

    //TODO: 是否可以借款，状态判断
    //workInfoState,contactState,idState,phoneAuth,realNameState
    if (auth["realNameState"] == 30 &&
        auth["bankCardState"] == 30) {
        return true;
    }
    return false;
}

_util.toLogin = function () {
    var that = this;
    uni.navigateTo({
        url: '/pages/account/account'
    });
}

_util.toBorrow = function (login, auth) {
    var that = this;
    if (!login) {
        that.toLogin();
        return;
    }
    if (that.canBorrow(auth)) {
        uni.navigateTo({
            url: '/pages/business/borrow/apply'
        });
    }
    else {
        uni.navigateTo({
            url: '/pages/user/profile/profile'
        });
    }
}


_util.urlEncode = urlEncode;

_util.urlDecode = urlDecode;

_util.extend2 = function (obj, source) {
    var that = this;
    obj = obj || {};
    if (source) {
        for (var key in source) {
            var value = source[key];
            if (that.isObject(value) && !that.isArray(value) && !that.isFunction(value)) {
                value = that.extend2(obj[key] || {}, value);
            }
            obj[key] = value;
            //key 未区分大小写
            //console.log(obj[key], typeof (key), key, obj.hasOwnProperty(key));
        }
    }
    return obj;
};

_util.random = function (randomFlag, min, max) {
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
            'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];

    // 随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}

_util.toQuery = function (obj, split, encoding) {
    return _buildParams('', obj, undefined, split, encoding);
}

_util.md5 = function (content, isKey) {
    if (isKey) {
        return md5(SECRET_KEY + content) || "";
    }
    return md5(content) || ""
}

_util.secret = function (data, token) {
    var that = this;
    data = data || {};
    data["versionNumber"] = that.getVersion();

    var keys = that.sortBy(that.keys(data) || []);

    var model = {};
    for (var i = 0; i < keys.length; i++) {
        model[keys[i]] = data[keys[i]];
    }

    //不进行编码 javascript md5 与 javascript 处理中文及urlencoding后的值有区虽
    var query = "";
    if (!that.isEmpty(model)) {
        query = that.toQuery(model, "|", false);
    }

    var content = SECRET_KEY + (token || "") + query;

    var secret = md5(content) || "";

    return secret;
}

_util.Uint8ArrayToString = function (fileData) {
    var dataString = "";
    for (var i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
    }

    return dataString
}

_util.toPickers = function (arr, label, start) {
    arr = arr || [];
    label = label || "value";
    start = start || 0;
    for (var i = 0; i < arr.length; i++) {
        arr[i]["label"] = arr[i][label];
        arr[i]["value"] = i+start;//arr[i][vKey];
    }
    return arr;
}

_util.toMoney=function(obj, num) {
    var that = this;

    num = num > 0 && num <= 20 ? num : 0;

    if (!that.isEmpty(obj)) {
        obj = (obj+'').replace(/\,/g, "") + "";
    }

    if (num > 0) {
        obj = parseFloat((obj + "").replace(/[^\d\.-]/g, "")).toFixed(num) + ""; 
    } else {
        obj = (obj + "").replace(/[^\d\.-]/g, "") + "";
    }

    let valStr = "";
    var varArr = obj.split(".")[0].split("").reverse();
    for (var i = 0; i < varArr.length; i++) {
        valStr += varArr[i] + ((i + 1) % 3 == 0 && (i + 1) != varArr.length ? "," : "");
    }

    let decStr = "";
    const decArr = obj.split(".")[1];
    if (!that.isEmpty(decArr)) {
        decStr = "." + decArr;
    }

    return valStr.split("").reverse().join("") + decStr;

}


_util.toast = function (msg, opt) {
    var that = this;
    var options = that.extend({
        title: msg,
        icon: "none",
        duration: 1500
    }, opt);

    //自定义增加over属性
    //描术这：结束后(duration/1500) ，执行 complete 及 over 回调
    var over = options["over"];
    if (that.isFunction(over)) {
        var complete = options["complete"] || function () { };
        var duration = options["duration"] || 1500;
        options["complete"] = function () {
            setTimeout(function () {
                complete();
                over();
            }, duration)
        }
    }
    uni.showToast(options);
};

_util.tip = function (msg, opt) {
    var that = this;
    that.toast(msg, opt);
}

_util.success = function (msg, opt) {
    var that = this;
    that.toast(msg + i18n.t("common.success"), opt);
}

_util.fail = function (msg, opt) {
    var that = this;
    that.toast(msg + i18n.t("common.fail"), opt);
}

_util.error = function (msg, opt) {
    var that = this;
    that.toast(msg + i18n.t("common.error"), opt);
}

_util.confirm = function (content, success, cancel) {
    var that = this;
    uni.showModal({
        title: i18n.t('common.tip'),
        confirmText: i18n.t('common.confirm'),
        cancelText: i18n.t('common.cancel'),
        content: content,
        success: function (res) {
            if (res.confirm) {
                if (that.isFunction(success)) {
                    success();
                }
            } else if (res.cancel) {
                if (that.isFunction(cancel)) {
                    cancel();
                }
            }
        }
    });
};

_util.request = function (path, params, success, error, opt) {
    var that = this;

    //params
    params = params || {};

    //data
    var data = params["data"] || {};

    //url
    var url = "";
    if (path.indexOf('http://') > -1 || path.indexOf('https://') > -1) {
        url = path;
    } else {
        url = API_HOST + "/api" + path;
    }
    if (that.isEmpty(url)) {
        that.toast(_request_error() + "(null)");
        return;
    }

    //method
    var method = params["method"] || "GET";

    //header
    var header = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    //error
    error = error || function (res, code) {
        res = res || "";
        code = code || -1;
        that.toast(res);
    };

    //options
    var options = that.extend2({
        loading: false,
        url: url,
        method: method,
        header: header,
        data: data,
        success: function (res) { that.apiSuccess(res, success, error); },
        fail: function (res) { that.apiFail(res, error); }
    }, opt);

    //token
    var token = ((options["header"]["token"]) || that.getToken()) || "";
    if (!that.isEmpty(token) && token != "0") {
        //token = "Bearer " + token;
        options["header"]["token"] = token;
    }

    //sign
    var sign = (options["header"]["signMsg"]) || "";
    if (that.isEmpty(sign)) {
        sign = that.secret(options["data"], token);
    }
    if (!that.isEmpty(sign)) {
        options["header"]["signMsg"] = sign || "";
    }

    //loading
    if (options["loading"]) {
        if (that.isFunction(options["complete"])) {
            var _call = options["complete"];
            options["complete"] = function (res) {
                uni.hideLoading();
                _call(res);
            }
        } else {
            options["complete"] = function () {
                uni.hideLoading();
            }
        }
        var tip = '正在请求';
        if (that.isString(options["loading"])) {
            tip = options["loading"] || tip;
        }
        uni.showLoading({
            title: tip,
            mask: true
        });
    }

    //request
    uni.request(options);
};

_util.upload = function (path, params, success, error, opt) {
    var that = this;

    //params
    params = params || {};

    //data
    var data = params["data"] || {};

    //url
    var url = "";
    if (path.indexOf('http://') > -1 || path.indexOf('https://') > -1) {
        url = path;
    } else {
        url = API_HOST + "/api" + path;
    }
    if (that.isEmpty(url)) {
        that.toast(_request_error() + "(null)");
        return;
    }

    //header
    var header = {};

    //error
    error = error || function (res, code) {
        res = res || "";
        code = code || -1;
        that.toast(res);
    };

    //options
    var options = that.extend2({
        loading: false,
        url: url,
        header: header,
        name: "file",
        filePath: null,
        formData: {},
        success: function (res) { that.apiSuccess(res, success, error); },
        fail: function (res) { that.apiFail(res, error); }
    }, opt);

    //token
    var token = ((options["header"]["token"]) || that.getToken()) || "";
    if (!that.isEmpty(token) && token != "0") {
        //token = "Bearer " + token;
        options["header"]["token"] = token;
    }

    //sign
    var sign = that.secret(data, token);
    if (!that.isEmpty(sign)) {
        options["header"]["signMsg"] = sign || "";
    }

    //loading
    if (options["loading"]) {
        if (that.isFunction(options["complete"])) {
            var _call = options["complete"];
            options["complete"] = function (res) {
                uni.hideLoading();
                _call(res);
            }
        } else {
            options["complete"] = function () {
                uni.hideLoading();
            }
        }
        var tip = i18n.t('tip.zhengZaiShangChuan');
        if (that.isString(options["loading"])) {
            tip = options["loading"] || tip;
        }
        uni.showLoading({
            title: tip,
            mask: true
        });
    }

    //files
    if (that.isEmpty(options["files"]) && that.isEmpty(options["filePath"])) {
        that.error("file");
        return;
    }

    //data
    if (!that.isEmpty(data)) {
        options["formData"] = data;
    }

    //request
    uni.uploadFile(options);
};

_util.download = function (path, params, success, error, opt) {
    var that = this;

    //params
    params = params || {};

    //data
    var data = params["data"] || {};

    //url
    var url = "";
    if (path.indexOf('http://') > -1 || path.indexOf('https://') > -1) {
        url = path;
    } else {
        url = API_HOST + "/api" + path;
    }
    if (that.isEmpty(url)) {
        that.toast(_request_error() + "(null)");
        return;
    }

    //header
    var header = {};

    //error
    error = error || function (res, code) {
        res = res || "";
        code = code || -1;
        that.toast(res);
    };

    //options
    var options = that.extend2({
        loading: false,
        url: url,
        header: header,
        formData: {},
        success: function (res) {
            if (res.statusCode === 200) {
                success(res.tempFilePath, 0, res);
            } else {
                that.apiFail(res, error);
            }
        },
        fail: function (res) { that.apiFail(res, error); }
    }, opt);

    //token
    var token = ((options["header"]["token"]) || that.getToken()) || "";
    if (!that.isEmpty(token) && token != "0") {
        //token = "Bearer " + token;
        options["header"]["token"] = token;
    }

    //sign
    var sign = that.secret(data, token);
    if (!that.isEmpty(sign)) {
        options["header"]["signMsg"] = sign || "";
    }

    //loading
    if (options["loading"]) {
        if (that.isFunction(options["complete"])) {
            var _call = options["complete"];
            options["complete"] = function (res) {
                uni.hideLoading();
                _call(res);
            }
        } else {
            options["complete"] = function () {
                uni.hideLoading();
            }
        }
        var tip = i18n.t('tip.zhengZaiShangChuan');
        if (that.isString(options["loading"])) {
            tip = options["loading"] || tip;
        }
        uni.showLoading({
            title: tip,
            mask: true
        });
    }

    //data
    if (!that.isEmpty(data)) {
        options["formData"] = data;
    }

    //request
    uni.downloadFile(options);
};


_util.getVersion = function () {
    return APP_VERSION;
};

_util.getSignin = function () {
    var that = this;
    try {
        let ret = uni.getStorageSync(SIGNIN_KEY);
        if (!that.isEmpty(ret)) {
            return ret;
        }
    } catch (e) {
        //TODO handle the exception
    }
    return null;
};

_util.getUser = function () {
    var that = this;
    try {
        let ret = uni.getStorageSync(USERS_KEY);
        if (!that.isEmpty(ret)) {
            return ret;
        }
    } catch (e) {
        //TODO handle the exception
    }
    return null;
};

_util.getToken = function () {
    var that = this;
    try {
        let ret = uni.getStorageSync(TOKEN_KEY);
        if (!that.isEmpty(ret)) {
            return ret;
        }
    } catch (e) {
        //TODO handle the exception
    }
    return null;
};

_util.setSession = function (signin, user) {
    var that = this;
    try {
        var token = signin["token"] || "";
        if (!that.isEmpty(signin) && !that.isEmpty(user) && !that.isEmpty(token)) {
            uni.setStorageSync(SIGNIN_KEY, signin);
            uni.setStorageSync(USERS_KEY, user);
            uni.setStorageSync(TOKEN_KEY, token);
        }
        else {
            uni.removeStorageSync(SIGNIN_KEY);
            uni.removeStorageSync(USERS_KEY);
            uni.removeStorageSync(TOKEN_KEY);
        }
    } catch (e) {
        console.log(e);
        // error
    }
}

_util.clearSession = function () {
    var that = this;
    try {
        uni.removeStorageSync(SIGNIN_KEY);
        uni.removeStorageSync(USERS_KEY);
        uni.removeStorageSync(TOKEN_KEY);
    } catch (e) {
        // error
    }
}

_util.getAuthText = function (status) {
    var that = this;
    status = status || 0;
    status = parseInt(status);

    if (status == 10) {
        return i18n.t("common.certino");//未认证
    }
    if (status == 30) {
        return i18n.t("common.certiyes");//已认证
    }
    return i18n.t("common.certiing");  //认证中
}

_util.borrowStatusText = function (status) {
    var text = i18n.t('bus.borrowStatus' + status);
    if (text.indexOf('bus.borrowStatus') > -1) {
        return status || "error";
    }
    return text;
}

_util.getClient = function () { return "10"; }

export default _util; 
