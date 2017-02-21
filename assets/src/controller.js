/**
 * Created by lx on 17/2/8
 */
import Utils from "./utils.js";
import Proto from "./proto.js";
import Node from "./node.js";
import Bus from "./bus.js";
import {findNodeByIeeeAddr} from "./vuex/store.js";
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
    static sendCMD(cmd,cb){
        this.send(Proto.marshal(cmd,cb));
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
                        });
                    }
                });
            }
        });
    }
    static doSaveNode(data){
        device.log("doSaveNodes:" + JSON.stringify(data));
        status = data[0] ;
        if (status == 0x00){
            //@todo get local node
 
            var ieeeAddr = Utils.toHex(data.slice(1,9));
            var nwkAddr = Utils.toHex(data.slice(9,11));
            var startIndex = data[11];
            var NumAssocDev = data[12];
            var node = findNodeByIeeeAddr(ieeeAddr);
            device.log("local node is:" +JSON.stringify(node));
            if (!node){
                node = new Node({ieeeAddr: ieeeAddr,nwkAddr:nwkAddr});
            }
            if (startIndex == 0){
                node.childNodes = [];
            }
            var childNodes = new Array();
            for (var i = 0;i < NumAssocDev;i++){
                var s = 13 + i;
                var e = 13+i+2;
                var childNwkAddr = Utils.toHex(data.slice(s,e));
                var childNode =  new Node({ieeeAddr:[],nwkAddr:nwkAddr});
                childNodes[i+startIndex] = childNwkAddr;
                //@todo queryChildNodes change to static func
                childNode.queryChildNodes();
            }
            node.appendChildNodes(childNodes);
            //device.log("start add node" + JSON.stringify(node));
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
