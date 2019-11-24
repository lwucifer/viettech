 <template>
    <uni-popup :show="$data.__location__type === 'showpopup'" mode="fixed" @hidePopup="__location_togglePopup('')">
        <view class="popup-view">
            <text class="popup-title">需要用户授权位置权限</text>
            <view class="uni-flex popup-buttons">
                <button class="uni-flex-item" type="primary" open-type="__location_openSetting" @tap="__location_openSetting">设置</button>
                <button class="uni-flex-item" @tap="__location_togglePopup('')">取消</button>
            </view>
        </view>
    </uni-popup>
</template>

<script>
    //H5：在较新的手机浏览器上，H5 端获取定位信息，要求部署在 https 服务上，本地预览（localhost）仍然可以使用 http 协议。
    //H5：无 GPS 模块的 PC 设备使用 Chrome 浏览器的时候，位置信息是连接谷歌服务器获取的，国内用户可能获取位置信息失败。
    //H5：微信公众号可使用微信js sdk，详见

    import uniPopup from '@/components/uni-popup/uni-popup.vue'
    // #ifdef APP-PLUS
    import permision from "@/util/permission.js"
    // #endif

    import gmapApi  from 'google-maps'

    import util from '@/util/util.js'
    import appService from '@/services/application.js'

    //gmapApi.KEY = 'AIzaSyBBy6idynMeGd_Ptd0rTxB9QFNbhSqV51s';
    //gmapApi.KEY = 'AIzaSyDyCXRVa_x3HDYlWvyRDCq1Paw42SaP-tI';
    gmapApi.KEY = 'AIzaSyDC8Ghpz8iR5vrQXlz6OqCb0DTnxOfwh44';

    //GoogleMapsLoader.CLIENT = 'yourclientkey';
    //GoogleMapsLoader.VERSION = '3.14';
    //GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
    //GoogleMapsLoader.LANGUAGE = 'fr';
    //GoogleMapsLoader.REGION = 'GB';

    export default {
        components: {
            uniPopup
        },
        props: {
            //latlng: String,
            //location: String
        },
        model: {
            //prop: 'value',
            //event: 'input'
        },
        data() {
            var that = this;
            return {
                __location_value: null,
                __location__type: ''
            }
        },
        computed: {
        },
        created: function (e) {
            var that = this;
            that.__location_get();
        },
        methods: {
            __location_togglePopup(type) {
                var that = this;
                that.__location__type = type;
            },
            __location_showConfirm() {
                var that = this;
                that.__location__type = 'showpopup';
            },
            __location_hideConfirm() {
                var that = this;
                that.__location__type = '';
            },
            __location_getSetting: function () {
                return new Promise((resolve, reject) => {
                    uni.getSetting({
                        success: (res) => {
                            if (res.authSetting['scope.userLocation'] === undefined) {
                                resolve(0);
                                return;
                            }
                            if (res.authSetting['scope.userLocation']) {
                                resolve(1);
                            } else {
                                resolve(2);
                            }
                        }
                    });
                });
            },
            __location_openSetting: function () {
                var that = this;
                that.__location_hideConfirm();
                uni.openSetting({
                    success: (res) => {
                        if (res.authSetting && res.authSetting['scope.userLocation']) {
                            that.__location_do();
                        }
                    },
                    fail: (err) => { }
                })
            },
            __location_do() {
                var that = this;

                uni.getLocation({
                    //type:'wgs84',//默认为 wgs84 返回 gps 坐标，gcj02 返回国测局坐标
                    success: (res) => {
                        var latitude = res["latitude"] || null; //纬度，浮点数，范围为 - 90~90，负数表示南纬
                        var longitude = res["longitude"] || null;//经度，浮点数，范围为 - 180~180，负数表示西经
                        var accuracy = res["accuracy"] || null;//位置的精确度

                        that.__location_value = null;
                        if (!util.isEmpty(longitude) && !util.isEmpty(latitude) && !util.isEmpty(accuracy)) {
                            that.__location_value = {
                                latitude: latitude,
                                longitude: longitude,
                                accuracy: accuracy
                            }
                        }
                        gmapApi.load(function (google) {
                            //new google.maps.Map(el, options);
                            var latlng = new google.maps.LatLng(latitude, longitude);
                            var geocoder = new google.maps.Geocoder();
                            geocoder.geocode({ 'location': latlng }, function (results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                    //that.location = (results[0]['formatted_address']||'');
                                    var value = {
                                        ...that.__location_value,
                                        results: { ...results },
                                        text: (results[0]['formatted_address'] || ''),
                                    }
                                    that.$emit("success", value);
                                } else {
                                    util.tip('Geocode was not successful for the following reason: ' + status);
                                }
                            });
                        })
                    },
                    fail: (err) => {
                        // #ifdef MP-BAIDU
                        if (err.errCode === 202 || err.errCode === 10003) { // 202模拟器 10003真机 user deny
                            that.__location_showConfirm();
                        }
                        // #endif
                        // #ifndef MP-BAIDU
                        if (err.errMsg.indexOf("auth deny") >= 0) {
                            uni.showToast({
                                title: "访问位置被拒绝",
                                icon: 'none'
                            })
                        } else {
                            uni.showToast({
                                title: err.errMsg,
                                icon: 'none'
                            })
                        }
                        // #endif
                    }
                })
            },
            async __location_check() {
                let status = permision.isIOS ? await permision.requestIOS('location') :
                    await permision.requestAndroid('android.permission.ACCESS_FINE_LOCATION');

                if (status === null || status === 1) {
                    status = 1;
                } else if (status === 2) {
                    uni.showModal({
                        content: "系统定位已关闭",
                        confirmText: "设置",
                        success: function (res) {
                            if (res.confirm) {
                                permision.gotoiOSSetting();
                            }
                        }
                    })
                } else if (status.code) {
                    uni.showModal({
                        content: status.message
                    })
                } else {
                    uni.showModal({
                        content: "需要定位权限",
                        confirmText: "设置",
                        success: function (res) {
                            if (res.confirm) {
                                permision.gotoAppSetting();
                            }
                        }
                    })
                }

                return status;
            },
            async __location_get() {
                var that = this;
                //AIzaSyD0rR2j_eCcK__95-JqKpSagUb4ECUMDwU
                // #ifdef APP-PLUS
                let status = await that.__location_check();
                if (status !== 1) {
                    return;
                }
                // #endif
                // #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ
                let status = await that.__location_getSetting();
                if (status === 2) {
                    that.__location_showConfirm();
                    return;
                }
                // #endif
                that.__location_do();
            },
        }
    }
</script>

<style>
</style>
