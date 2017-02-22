/**
 * Created by lx on 17/2/8
 */
import Utils from "./utils.js";
import Proto from "./proto.js";
import Node from "./node.js";
import Bus from "./bus.js";
import {
  findNodeByIeeeAddr,findNodeByNwkAddr,saveNode
} from "./vuex/store.js";
var store = require('store');
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
    static sendCMD(cmd, cb) {
        this.send(Proto.marshal(cmd, cb));
    }
    static sendHex(val) {
        var dataArray = Utils.hexToBytes(val);
        this.send(dataArray);
    }
    static send(dataArray) {
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
    static doSaveNode(data) {
        device.log("doSaveNodes:" + JSON.stringify(data));
        //@todo use binary libray to parse
        status = data[0];
        if (status == 0x00) {
            var ieeeAddr = Utils.toHex(data.slice(1, 9));
            var nwkAddr = Utils.toHex(data.slice(9, 11));
            var startIndex = data[11];
            var NumAssocDev = data[12];
            var node = findNodeByIeeeAddr(ieeeAddr);
            device.log("local node is:" + JSON.stringify(node));
            if (!node) {
                node = new Node({
                    ieeeAddr: ieeeAddr,
                    nwkAddr: nwkAddr
                });
            }
            if (startIndex == 0) {
                node.childNodes = [];
            }
            var childNodes = new Array();
            for (var i = 0; i < NumAssocDev; i++) {
                var s = 13 + i;
                var e = 13 + i + 2;
                var childNwkAddr = Utils.toHex(data.slice(s, e));
                var childNode = new Node({
                    ieeeAddr: [],
                    nwkAddr: childNwkAddr
                });
                childNodes[i] = childNwkAddr;
                //@todo queryChildNodes change to static func
                childNode.queryChildNodes();
            }
            node.appendChildNodes(childNodes);
            node.queryNodeName();

            device.log("start add node" + JSON.stringify(node));
            Bus.$emit('add-node', node);
        }
        return [];
    }
    static doSetNodeRes(data) {
        device.log("doSetNode");
      console.log(data);
        var DestAddr = Utils.toHex(data.slice(1, 3));
        var DestEndPoint = data[3];
      var clusterID = Utils.toHex(data.slice(4, 6));
                                  var attrID = Utils.toHex(data.slice(10, 12));
        var childCMD = clusterID + attrID;
        device.log("childCMD:" + childCMD);
        switch (childCMD) {
            case "00000400":
                this.doSetNodeName(DestAddr, data.slice(14, 31));
                break;
            case "00600200":
                break; //set node light ok
        }
    }
    static doSetNodeName(DestAddr, dataArray) {
        var lastIndex = dataArray.findIndex(function(e) {
            return e === 0x20;
        });
        var nodeName = String.fromCharCode.apply(null, dataArray.slice(1, lastIndex + 1));
      //device.log("lastIndex" + lastIndex.toString()+"nodeName"+nodeName + "data:"+ JSON.stringify(dataArray));
        var node = findNodeByNwkAddr(DestAddr);
        if (!node) {
            return;
        }
        node.setNodeName(nodeName);
      device.log(JSON.stringify(node));
        saveNode(node, store.get('nodes'));
    }
    static doQueryNodeBindRes(data) {
        device.log("doQueryNodeBind");
    }
    static doSetNodeBindRes(data) {
        device.log("doSetNodeBind");
    }
}
export default Controller;
