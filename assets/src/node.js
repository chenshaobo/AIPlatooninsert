//节点类
import {protoType} from "./proto.js";
import Controller from "./controller.js";
import Utils from "./utils.js";
class Node {
    constructor(ieeeAddr,nwkAddr){
        this.ieeeAddr = ieeeAddr;
        this.ieeeAddrStr = Utils.toHexString(ieeeAddr);
        this.nwkAddr =nwkAddr;
        this.nwkAddrStr = Utils.toHexString(nwkAddr);
        this.childNodes = [];
    }


    appendChildNodes(childNodes){
        device.log("defore append"+ JSON.stringify(this.childNodes));
        this.childNodes = this.childNodes.concat(childNodes);
        device.log("after append" + JSON.stringify(this.childNodes) +"\n"+JSON.stringify(childNodes));
    }

    queryChildNodes(){
        var cmd = protoType.QUERY_NODES_REQ.cmd;
        var nwkAddr = this.nwkAddr;
        console.log(this.nwkAddr);
        Controller.sendCMD(cmd,function(msg){
            msg.UInt8(nwkAddr[0]);
            msg.UInt8(nwkAddr[1]);
            msg.UInt8(0x01);
            msg.UInt8(0x00);
        });
    }
}

export default Node;
