<script>
    export default {
        onLaunch: function () {
            //console.log('App Launch');
        },
        onShow: function () {
            //console.log('App Show');
        },
        onHide: function () {
            //console.log('App Hide');
        }
    }
</script>

<style>

* { font-size: 24upx; font-family: 'Times New Roman' }

    /*每个页面公共css */
    page { min-height: 100%; display: flex; }

    /* #ifdef MP-BAIDU */
    page { width: 100%; height: 100%; display: block; }

    swan-template { width: 100%; min-height: 100%; display: flex; }

    /* 原生组件模式下需要注意组件外部样式 */
    custom-component { width: 100%; min-height: 100%; display: flex; }

    /* #endif */

    /* #ifdef MP-ALIPAY */
    page { min-height: 100vh; }

    /* #endif */

    /* 原生组件模式下需要注意组件外部样式 */
    m-input { width: 100%; min-height: 100%; display: flex; }

    m-code { width: 100%; min-height: 100%; display: flex; }


    .body { width: 100%; display: flex; flex-direction: column; background-color: #efeff4; color: #999; flex: 1; }

    .content { padding: 20upx; }

    .inner { padding: 0 20upx; }

    .input-flex { display: flex; align-items: center; }

    .input-line { position: relative; margin-top: 40upx; }

    .input-group { position: relative; margin-top: 40upx; background-color: #ffffff; }

        .input-group::before { position: absolute; right: 0; top: 0; left: 0; height: 1upx; content: ''; -webkit-transform: scaleY(.5); transform: scaleY(.5); background-color: #c8c7cc; }

        .input-group::after { position: absolute; right: 0; bottom: 0; left: 0; height: 1upx; content: ''; -webkit-transform: scaleY(.5); transform: scaleY(.5); background-color: #c8c7cc; }

    .input-row { display: flex; flex-direction: row; position: relative; }

        .input-row .title { width: 26%; height: 50upx; min-height: 50upx; padding: 15upx 0; padding-left: 30upx; line-height: 50upx; }
            .input-row .title.long { width:36%;}
            .input-row .title.half { width: 45%; }
            .input-row .title.auto { width: auto; padding: 15upx 0; }

        .input-row .inline { padding: 0 10upx; display: flex; align-items: center; }

        .input-row .bline {
            padding: 0 20upx;
            display: flex;
            align-items: center;
        }

        .input-row .ticon { /*width: 50upx; height: 50upx; min-height: 50upx;*/ padding: 30upx; /*line-height: 50upx;*/ color: #C8C7CC; }

        .input-row .rfix { width: 120upx; text-align: center }

        .input-row.border::after { position: absolute; right: 0; bottom: 0; left: 15upx; height: 1upx; content: ''; -webkit-transform: scaleY(.5); transform: scaleY(.5); background-color: #c8c7cc; }

        .input-row.border-lr { border-left: 1px #c8c7cc solid; border-right: 1upx #c8c7cc solid; }

    .card { display: flex; align-items:center;  }
        .card > .left {flex: 1 }
        .card > .right { }

    .flex1 { flex: 1; }

    .flex2 { flex: 2 }

    .flex3 { flex: 3 }

    .flex-center { display: flex; align-items: center; justify-content: center; }


    .img-view { width: 100%; height: 100%; }

    .text-link { color: #007AFF; }

    .text-flex-center { display: flex; justify-content: center; }

    button.primary { background-color: #0faeff; }

    .m-code-view.rfix { width: 240upx; }

</style>
