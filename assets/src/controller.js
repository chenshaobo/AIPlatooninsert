/**
 * Created by lx on 17/2/8.
 */
import {
    hexToBytes
} from "./utils.js";

var id = 100004100;
var regGetData = false;
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
            id: id,
            type: 'bytearray',
            value: dataArray
        }],
        // vibrate : 1, // 1为发送时振动，可选
        // nfc : 1, // 1为近场通信方式，可选
        lifetime: 20, // 生命期，范围1到604800秒，可选
        onSuccess: function(ret) { // 发送成功回调
            device.log('send  ' + val + ' return ' + JSON.stringify(ret));
	    if (regGetData == false) {
		getData();
		regGetData = true;
	    }
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

var Base64Binary = {
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	
	/* will return a  Uint8Array type */
	decodeArrayBuffer: function(input) {
		var bytes = (input.length/4) * 3;
		var ab = new ArrayBuffer(bytes);
		this.decode(input, ab);
		
		return ab;
	},

	removePaddingChars: function(input){
		var lkey = this._keyStr.indexOf(input.charAt(input.length - 1));
		if(lkey == 64){
			return input.substring(0,input.length - 1);
		}
		return input;
	},

	decode: function (input, arrayBuffer) {
		//get last chars to see if are valid
		input = this.removePaddingChars(input);
		input = this.removePaddingChars(input);

		var bytes = parseInt((input.length / 4) * 3, 10);
		
		var uarray;
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		var j = 0;
		
		if (arrayBuffer)
			uarray = new Uint8Array(arrayBuffer);
		else
			uarray = new Uint8Array(bytes);
		
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		
		for (i=0; i<bytes; i+=3) {	
			//get the 3 octects in 4 ascii chars
			enc1 = this._keyStr.indexOf(input.charAt(j++));
			enc2 = this._keyStr.indexOf(input.charAt(j++));
			enc3 = this._keyStr.indexOf(input.charAt(j++));
			enc4 = this._keyStr.indexOf(input.charAt(j++));
	
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
	
			uarray[i] = chr1;			
			if (enc3 != 64) uarray[i+1] = chr2;
			if (enc4 != 64) uarray[i+2] = chr3;
		}
	
		return uarray;	
	}
}

function getData() {
    device.log("reg get data");
    device.onServerPush(function(data) {
            device.log("server push data" + JSON.stringify(data));
            if (data.key == 'DPPushNotify' && data.value) {
                device.query({
                        list: data.value.PropIDs,
                        onSuccess: function(ret) {
                            device.log('get data succes: ' + JSON.stringify(ret));
                           
                            ret.list.forEach(function(data) {
                                    device.log('value =' + data);
                                var hex = Base64.decode(data.val_list[0].val);
				//var hex = "1";
				var byteArray = Base64Binary.decodeArrayBuffer(data.val_list[0].val); 
                                    device.log('getData hex' + hex + 'byteArray ' + byteArray);
                            });
			}
                });
        }
    });

}
export {
    checkApi,
    action
};
