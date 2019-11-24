export default {

    USER_ISPHONEEXIST: '/user/isPhoneExists.htm',//是否存在
    USER_LOGIN: '/user/login.htm', //登录
    USER_REGIST: '/user/register.htm', //注册
    USER_FINDEDITPWD: '/user/login/forgetPwd.htm', //忘记密码
    USER_EDITLOGINPWD: '/act/user/changeLoginPwd.htm', //登录密码

    USER_GET: '/act/mine/userInfo/getUserInfo.htm', //用户信息
    USER_MY: '/act/user/info.htm', //用户资料
    USER_AUTH: '/act/mine/userAuth/getUserAuth.htm', //审核状态
    USER_TRADEPWD: '/act/user/setTradePwd.htm', //交易密码
    USER_REALNAMEGET: '/act/mine/userAuth/getUserAuth.htm', //实名认证获取
    USER_REALNAMESAVE: '/act/mine/userInfo/realName/saveOrUpdate.htm', //实名认证保存
    USER_MEMBERSAVE: '/act/mine/contact/saveOrUpdate.htm', // 个人信息
    USER_WORKSAVE: '/act/mine/workInfo/saveOrUpdate.htm', // 工作信息
    USER_BANKSGET: '/act/mine/bankCard/getBankCardList.htm', ///银行卡获取
    USER_BANKSAVE: '/act/mine/bankCard/fuiouProtocolSign.htm', //银行卡认证
    USER_BANKSAVE2: '/act/mine/bankCard/baoKimAuthSign.htm', //银行卡认证2
    USER_PROFITAMOUNT: '/act/mine/profitAmount/find.htm', //我的奖金

    //act/mine/profitAmount/find.htm   我的奖金
    //act / user / inviteList.htm     邀请记录

    GET_VAlIDATEUSER: '/act/user/validateUser.htm', //保存交易密码下一步
    GET_RESETTRADEPWD: '/act/user/resetTradePwd.htm', //保存交易密码

    BUS_BORROWQUERY: '/act/mine/borrow/page.htm',//借款记录
    BUS_BORROWGET: '/act/borrow/findBorrow.htm',//借款信息
    BUS_BORROWINFO: '/act/borrow/repay/info.htm',//借款详细
    BUS_BORROWProgress: '/act/mine/borrow/findProgress.htm', //借款进度
    BUS_BORROWCOST: '/borrow/choice.htm',//借款计算,
    BUS_BORROWAPPLY: '/act/borrow/save.htm',//借款申请
    BUS_BORROWFIND: '/act/borrow/findAll.htm',//查询所有借款
    BUS_BORROWINDEX: '/borrow/findIndex.htm',//借款信息（默认）
    BUS_REPZALOQR: '/zalo/qr.htm',//获取Zalo二维码
    BUS_EPAY: '/act/pay/epay/virtualAccount.htm', //epay还款
    REP_AUTOPROTOCOL: '/act/borrow/repay/auto_protocol.htm', //确认还款


    APP_BORROW: '/borrow/listIndex.htm', //公告
    APP_CONFIRMDATASOURCE: '/act/mine/tongdunAndJxl/confirmDataSource.htm',//认证数据源
    APP_SMS: '/user/sendSms.htm', //验证码	
    APP_DICTIONARY: '/act/dict/list.htm', //数据字典
    APP_TRANSFER: '/act/borrow/repay/collectionInfo.htm',//银行卡转账           
    APP_FEEDBACK: '/act/mine/opinion/submit.htm', //意见反馈
    APP_PROTOCOLS: '/protocol/list.htm',


    HLIST: '/h5/list.htm',
    GETUSERNAME: '/act/mine/userInfo/getUserName.htm', //首页获取用户姓名
    REBIND: '/user/sendFuiouSms.htm', //获取info的绑定银行卡 获取验证码验证信息
    GET_AUTHIMG_LOGO: '/act/mine/userAuth/getAuthImgLogo.htm', ///马上申请		
    GET_SET_UP: '/act/user/getTradeState.htm', //请求设置页面					
    GET_REMARK_LIST: '/remark/list.htm', ///获取备注清单
    GET_NEED_DIVERT: '/act/needDivert.htm',
    GET_INFO_PHONE: '/act/mine/operator/operatorCredit.htm', //获取手机运营商认证信息
    GET_FACE: '/act/getOrcUdcreditUrl.htm', //人脸识别
    GET_ORDER: '/act/orderQuery.htm', //云慧眼认证结果数据查询接口
    GET_INFO_ZHIMA: '/actzm/mine/zhima/zhimaCredit.htm', //获取芝麻认证
    GET_INFO_TAOBAO: '/actzm/mine/zhima/taobaoCredit.htm', //获取淘宝认证


    PRODUCT_TIME: '/act/product/productList.htm',

}