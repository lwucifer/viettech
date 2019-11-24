import Vue from 'vue'
import App from './App'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import './js_sdk/ican-H5Api/ican-H5Api.js'

import store from '@/store/store'
import langs from '@/store/langs.js'

const i18n=new VueI18n(langs);

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype._i18n  = i18n

App.mpType = 'app'

const app = new Vue({
    store,
	i18n, 
    ...App 
})

app.$mount()

//Vue.mixin({
//    onLoad(e) {
//        console.log('load:', this, e);
//        const query = uni.createSelectorQuery().in(this);
//        query.selectAll('uni-picker').boundingClientRect(res => {
//            console.log("res:" + res);
//        }).exec();
//    }
//})

//0839888318
//abc123

//Nguyen thi hoa
//664468953
//1988-09-16
//Nam

//ocb “¯––’À∫≈
//9794480372101232