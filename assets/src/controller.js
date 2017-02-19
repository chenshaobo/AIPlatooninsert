/**
 * Created by lx on 17/2/8
 */
import Utils from "./utils.js";
import Proto from "./proto.js";
import Node from "./node.js";
import Bus from "./bus.js";
var id = 100004100;
var regReceive = false;
class Controller {
    static checkApi() {
        device.checkApi({
            list: ['send', 'query', 'onServerPush'], // API列表
            onSuccess: function(ret) { // 检查结果
                device.log(JSON.stringify(ret));
            }
        });
    }

    static sendHex(val) {
        var dataArray = Utils.hexToBytes(val);
        this.send(dataArray);
    }
    static send(dataArray){
        device.log("send:" + Utils.toHexString(dataArray));
        if (!regReceive) {
            this.receive();
            regReceive = true;
        }

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
                if (!regReceive) {
                    this.receive();
                    regReceive = true;
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

    static receive() {
        device.log("reg get data");
        device.onServerPush(function(data) {
            device.log("server push data" + JSON.stringify(data));
            if (data.key == 'DPPushNotify' && data.value) {
                device.query({
                    list: data.value.PropIDs,
                    onSuccess: function(ret) {
                        device.log('get data succes: ' + JSON.stringify(ret));
                        ret.list.forEach(function(data) {
                            device.log('value =' + JSON.stringify(data));
                            device.log('serverPushData: ' + Utils.toHexString(Utils.Base64ToByteArray(data.val_list[0].val)));
                            var result = Proto.handleBase64(data.val_list[0].val);
                            device.log('handle data  ' + JSON.stringify(result));
                        });
                    }
                });
            }
        });
    }
    static doSaveNode(data){
        console.log("doHndleQueryNodes:",data);
        status = data[0] ;
        if (status == 0x00){
            var ieeeAddr = data.slice(1,9);
            var nwkAddr = data.slice(9,11);
            var startIndex = data[11];
            var NumAssocDey = data[12];
            var node = new Node(ieeeAddr,nwkAddr);
            var childNodes = new Array();
            for (var i = startIndex;i < startIndex+NumAssocDey;i++){
                var childNode =  new Node([],nwkAddr);
                childNodes.push(nwkAddr);
                //@todo queryChildNodes change to static func
                childNode.queryChildNodes();
            }
            node.appendChildNodes(childNodes);
            Bus.$emit('add-node',node);
        }
        return [];
    }
    static doSetNodeRes(data){
        device.log("doSetNode");
    }
    static doQueryNodeBindRes(data){
        device.log("doQueryNodeBind");
    }
    static doSetNodeBindRes(data){
        device.log("doSetNodeBind");
    }
    }
export default Controller;
