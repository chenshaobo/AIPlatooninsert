/**
 * Created by lx on 17/2/8.
 */

function CheckApi(){
    device.checkApi({
        list : ['send', 'query','onServerPush'], // API列表
        onSuccess : function (ret) { // 检查结果
            device.log(JSON.stringify(ret));
        }
    });
}
function Action(val){
    device.send({
        datapoint : [{
            id : 100004100,
            value : val
        }],
       // vibrate : 1, // 1为发送时振动，可选
       // nfc : 1, // 1为近场通信方式，可选
        lifetime : 20, // 生命期，范围1到604800秒，可选
        onSuccess : function (ret) { // 发送成功回调
            device.log('onSuccess: ' + JSON.stringify(ret));
        },
        onAck : function (ret) { // 接收响应成功回调，蓝牙设备暂不支持
            device.log('onAck: ' + JSON.stringify(ret));
        },
        onError : function (ret) { // 发送失败回调
            device.log('onError: ' + JSON.stringify(ret));
        }
    });}
