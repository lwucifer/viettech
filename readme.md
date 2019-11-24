## Install Node Package

 cnpm init -y
 cnpm install vue-i18n
 cnpm install blueimp-md5
 cnpm install google-maps

## 使用框架、插件 说明

### uni.scss 文件


### uni-list-item 组件 修改右侧可显示内容

**修改内容：**

在 `` uni-list-item.vue `` 中 props 修改 增加

```javascript
	showText: { //是否显示文本内容
		type: [Boolean, String],
		default: false
	},
	text: String //文本内容
```
 
在 `` uni-list-item.vue `` 中 templte 修改 右侧外层包裹 增加 显示判断

```javascript
	--  || showText === true || showText === 'true'
	<view class="uni-list-cell__extra" v-if="showBadge === true || showBadge === 'true' || showArrow === true || showArrow === 'true'||showSwitch === true || showSwitch === 'true'  || showText === true || showText === 'true'">
```

在 `` uni-list-item.vue `` 中 templte 修改 右侧显示内容 增加 显示内容

```javascript
	<view v-if="showText === true || showText === 'true'">{{text}}</view>
```

**使用方式：**

在 ``template`` 中使用组件 , 注意 showArrow="false"

```html
<uni-list-item title="我的邀请码" show-extra-icon="true" :extra-icon="{type: 'flag'}" showArrow="false" showText="true" text="测试下"></uni-list-item>
```



### m-input 修改图标

修改 m-input 原图标组件库 m-icon 变更新图标组件库 uni-icon

**使用方式：**

在 ``script`` 中引用组件 

```javascript
import uniIcon from "@/components/uni-icon/uni-icon.vue"
export default {
    components: {uniIcon}
}
```

在 ``template`` 中使用组件

```html
<uni-icon type="contact" size="30"></uni-icon>
```

实际效果参考：[https://github.com/dcloudio/uni-ui](https://github.com/dcloudio/uni-ui)


### Google 地图说明

 google-maps  在云平台，控制中心启用 Google Maps Javascript Api 、 Geocoding API


### mpvue-picker 组件 修改(显示时，可指定值，达到取消时不设置效果)

**修改内容：**

在 `` mpvuePicker `` 中 show 方法增加 参数 val,并修改非初始加值时，判断val，设置pickerValue值

```javascript
	
	show(val) {
                setTimeout(() => {
                    if (this.pickerValueArrayChange || this.modeChange) {
                        this.initPicker(this.pickerValueArray);
                        this.showPicker = true;
                        this.pickerValueArrayChange = false;
                        this.modeChange = false;
                    } else {
                        this.showPicker = true;
                        if (val) { 
                            this.pickerValue = val;
                        }
                    }
                }, 0);
            }

```