/**
 * Created by lx on 17/2/8.
 */
import {
    hexToBytes
} from "./utils.js";

function checkApi() {
    device.checkApi({
        list: ['send', 'query', 'onServerPush'], // API列表
        onSuccess: function(ret) { // 检查结果
            device.log(JSON.stringify(ret));
        }
    });
}

function action(val) {
    var dataArray = hexToBytes(val);
    device.send({
        datapoint: [{
            id: 100004100,
            type: 'bytearray',
            value: dataArray
        }],
        // vibrate : 1, // 1为发送时振动，可选
        // nfc : 1, // 1为近场通信方式，可选
        lifetime: 20, // 生命期，范围1到604800秒，可选
        onSuccess: function(ret) { // 发送成功回调
            device.log('send  ' + val + ' return ' + JSON.stringify(ret));
        },
        onAck: function(ret) { // 接收响应成功回调，蓝牙设备暂不支持
            device.log('send ' + val + ' onAck: ' + JSON.stringify(ret));
        },
        onError: function(ret) { // 发送失败回调
            device.log('send ' + val + ' onError: ' + JSON.stringify(ret));
        }
    });
}

var Base64 = require('js-base64').Base64;
function getData() {
    device.onServerPush(function(data) {
        device.log(JSON.stringify(data));
        if (data.key == 'DPPushNotify' && data.value) {
            device.query({
                list: data.value.PropIDs,
                onSuccess: function(ret) {
                    device.log('get data succes: ' + JSON.stringify(ret));
                    // do something
		    
                }
            });
        }
    });

}
export {
    checkApi,
    action
};
