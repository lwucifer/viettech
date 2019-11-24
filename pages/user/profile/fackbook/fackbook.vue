<template>
    <view>
        <!--<web-view :src="url"></web-view>-->
        <iframe src="https://m.facebook.com/login.php?skip_api_login=1&api_key=1408704019243131&kid_directed_site=0&app_id=1408704019243131&signed_next=1&next=https%3A%2F%2Fm.facebook.com%2Fv2.10%2Fdialog%2Foauth%3Fclient_id%3D1408704019243131%26redirect_uri%3Dhttps%253A%252F%252Fvn.dotconnect.io%252Fauthorize_api%252Fthird_service%252Ffacebook%252Fcollect%26state%3D59ae5c1ca6b94db4af826d52cb3471a8%26scope%3Demail%2Bpublic_profile%2Buser_friends%2Buser_status%2Buser_managed_groups%2Buser_events%2Buser_posts%2Buser_birthday%2Buser_photos%2Buser_hometown%2Buser_likes%2Buser_location%26ret%3Dlogin%26fbapp_pres%3D0%26logger_id%3D7ee83ded-3885-4e4b-81d9-535a5133a756&cancel_url=https%3A%2F%2Fvn.dotconnect.io%2Fauthorize_api%2Fthird_service%2Ffacebook%2Fcollect%3Ferror%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied%26state%3D59ae5c1ca6b94db4af826d52cb3471a8%23_%3D_&display=touch&locale=zh_CN&refsrc=http%3A%2F%2Flocalhost%2F&_rdr" style="width:100%; height:100%;"></iframe>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    import util from '@/util/util.js'
    import appService from '@/services/application.js'
    import userService from '@/services/user.js'

    export default {
        data() {
            return {
                type: 'SOCIAL',
                client: util.getClient(),
                url: ""
            }
        },
        components: {
        },
        computed: {
            ...mapState(["userId", "auth"])
        },
        methods: {
            ...mapMutations(["pageAuth"]),
            onInit() {
                var that = this;
                appService.confirmdatas({ ...that.$data, userId: that.userId }, function (obj, msg, code) {
                    if (!util.isEmpty(obj.url)) {
                        that.url = obj.url;
                    }
                });
            }
        },
        onLoad: function () {
            var that = this;
        },
        onShow: function () {
            var that = this;
            that.pageAuth({ callback: that.onInit });
        }
    }
</script>
<style>
</style>

