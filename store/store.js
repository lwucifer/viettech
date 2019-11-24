import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n'
Vue.use(Vuex)
Vue.use(VueI18n)


import langs from '@/store/langs.js'
import util from '@/util/util.js'
import accountService from '@/services/account.js'
import userService from '@/services/user.js'

const i18n = new VueI18n(langs);
const DEFAULT_QUOTA = 10000
const TOLOGIN = function () {
    uni.navigateTo({
        url: '/pages/account/account'
    });
}

let _inputData = function (input) {
    return input && input["data"] ? input["data"] : {};
}
let _inputCallback = function (input) {
    return input && input["callback"] && typeof input["callback"] == 'function' ? input["callback"] : function () { }
}

let _pageInit = function (state, input) {

    //初始化结束，所有网络异步讲求完成后，再执行callback
    //eg:同进有5个异步请求，5个状态都完成后再执行
    var initStats = {
        loginCheck: false,
        //otherCheck:true
    }

    var initCallback = function () {
        //initstatus 所有装态都 true 才执行 initStats.loginCheck == true || initStats.xxxx == true
        if (initStats.loginCheck == true)
        {
            //页面回调
            _inputCallback(input)();

            //如果必须登录,跳转至登录页
            var must = input["login"] || false;
            if (must && !state.isLogin) {
                TOLOGIN();
            }
        }
    }

    //登录状态，用户资料
    var loginCheckCallback = function () {
        initStats.loginCheck = true;
        initCallback();
    }
    if (!state.isLogin) {
        var signin = util.getSignin();
        var user = util.getUser();
        var token = util.getToken();

        if (!util.isEmpty(signin) && !util.isEmpty(user) && !util.isEmpty(token)) {
            _loginSet(state, signin, user, loginCheckCallback);
        } else {
            loginCheckCallback();
        }
    } else {
        loginCheckCallback();
    }

    //其它信息...
}

let _loginSet = function (state, signin, user, callback) {

    if (util.isEmpty(signin) || util.isEmpty(user)) {
        _loginClear(state);
        return;
    }

    var userId = user["userId"] || null, token = signin["token"] || null;

    if (util.isEmpty(userId) || util.isEmpty(token)) {
        _loginClear(state);
        return;
    }

    //仅判断/设置 登录相关
    state.isLogin = true;
    state.userId = userId;
    state.userName = user["idNo"];
    state.account = user;
    state.token = token;

    var _complete = function () {
        util.setSession(signin, user);
        if (util.isFunction(callback)) {
            callback();
        }
    }

    //设置个人资料(每次打开页面，请求)
    _profile(state, token, userId, _complete);
}
let _loginClear = function (state) {
    util.clearSession();

    state.isLogin = false;
    state.userId = "";
    state.userName = "";
    state.account = {};
    state.token = "";

    state.auth = {};
    state.invitationCode = "";
    state.quota = DEFAULT_QUOTA;
    state.borrow = DEFAULT_QUOTA;
    state.nopaid = null;
}
let _profile = function (state, token, userId, complete) {
    if (util.isEmpty(token) || util.isEmpty(userId)) {
        return;
    }

    //最终的成功 or 第一次出错(后面不执行) 都需执行结束回调 
    var _successOrErrorCallback = function () {
        if (util.isFunction(complete)) {
            complete();
        }
    }

    var _error = function (msg) {
        //账号状态处理提示隐藏，直接置为未登录
        //util.tip(msg || "error");
        _loginClear(state);
        _successOrErrorCallback();
    }

    userService.my({ userId: userId }, function (obj, msg, code) {
        //auth
        //bankCardState: "30"
        //contactState: "30"
        //creditTotal: 1000000  //总额度
        //creditUnused: 0       //未使用的额度
        //creditUsed: 1000000   //已使用的额度
        //invitationCode: "gXeVEH"
        //phone: "0839888318"

        state.invitationCode = obj["invitationCode"] || "";
        state.quota = obj["creditTotal"] || 0;
        state.borrow = obj["creditUnused"] || 0;//creditUsed,creditUnused
        state.nopaid = null;

        userService.auth({ userId: userId }, function (obj, msg, code) {
            state.auth = obj;
            _successOrErrorCallback();
        }, _error, { header: { token: token } });
    }, _error, { header: { token: token } });
}

let developTest = function () {
    var signin = {
        userId: 12813,
        token: "suMyZvjwoOKmMl2Nk6avEa9scd98xkmq"
    };
    var user = {
        age: 23,
        backImg: "http://api.khovay.com//readFile.htm?path=https://yuenanjiedai.oss-cn-hongkong.aliyuncs.com/kvay/faceID/201909/1567745202304_backImg.jpg",
        blackReason: "",
        companyCoordinate: "",
        companyName: "Ndnsbsbsbs",
        companyPhone: "5454884",
        contactsCount: 798,
        contactsRepeatName: 12,
        contactsRepeatPhone: 5,
        education: "Dưới THCS",
        email: "Hoatqtq.92@gmail.com",
        frontImg: "http://api.khovay.com//readFile.htm?path=https://yuenanjiedai.oss-cn-hongkong.aliyuncs.com/kvay/faceID/201909/1567745202245_frontImg.jpg",
        id: 205451,
        idNo: "085287444",
        liveAddr: "Mễ Trì, Mễ Trì, Từ Liêm, Hà Nội, Việt Nam",
        liveCoordinate: "21.017493,105.781873",
        liveDetailAddr: "Mễ Trì, Mễ Trì, Từ Liêm, Hà Nội, Việt Nam",
        livingImg: "http://api.khovay.com//readFile.htm?path=https://yuenanjiedai.oss-cn-hongkong.aliyuncs.com/kvay/faceID/201909/1567745202223_sdkImg.jpg",
        marryState: "03",
        ocrImg: "http://api.khovay.com//readFile.htm?path=null",
        payType: "3",
        phone: "0839888318",
        phoneVoiceCount: 0,
        realName: "Nguyen thi hoa",
        registerAddr: "上海市宝山区淞南镇逸仙路2890号华滋奔腾大厦",
        registerCoordinate: "121.49403999999998,31.33687",
        salary: "Trên 15 triệu",
        sex: "Nam",
        state: "20",
        userId: 12813,
        workingYears: "Dưới 1 năm"
    };
    _loginSet(state, signin, user);
}

let store = new Vuex.Store({
    state: {
        version: util.getVersion(),
        isLogin: false,
        userId: "",
        userName: "",
        token: "",
        account: {},

        auth: {},               //审核状态
        invitationCode: "",     //邀请码
        quota: DEFAULT_QUOTA,   //借款额度
        borrow: DEFAULT_QUOTA,  //可用额度
        nopaid: null,           //未还清贷款Id
    },
    mutations: {
        pageView(state, input) {
            var that = this;
            input = input || {};
            input["login"] = false;
            _pageInit(state, input);
        },
        pageAuth(state, input) {
            var that = this;
            input = input || {};
            input["login"] = true;
            _pageInit(state, input);
        },
        login(state, input) {
            var that = this;
            accountService.signin(_inputData(input), function (obj, msg, code) {
                var signin = obj;
                userService.get({ userId: signin.userId }, function (obj, msg, code) {
                    _loginSet(state, signin, obj, function () {
                        _inputCallback(input)();
                    });
                }, null, { header: { token: signin.token } });
            });

            //开发测试，防止接口连不通登录不了
            //_developTest();
            //_inputCallback(input)();
        },
        auto(state, input) {
            var that = this;
            var data = _inputData(input);
            var userId = data["userId"]
            var token = data["token"];
            userService.get({ userId: userId }, function (obj, msg, code) {
                _loginSet(state, { userId: userId, token: token }, obj, function () {
                    _inputCallback(input)();
                });
            }, null, { header: { token: token } });
        },
        logout(state, input) {
            _loginClear(state);
            _inputCallback(input)();
        },
        authen(state, input) {
            userService.auth({ userId: state.userId }, function (obj, msg, code) {
                state.auth = obj;
                _inputCallback(input)(obj);
            });
        }
    }
})

export default store;
