//节点类
import {protoType} from "./proto.js";
import Controller from "./controller.js";
import Utils from "./utils.js";
class Node {
    constructor({ieeeAddr,nwkAddr,childNodes=[]}={}){
        this.ieeeAddr = ieeeAddr;
        this.nwkAddr =nwkAddr;
        this.childNodes = childNodes;
    }


    appendChildNodes(childNodes){
//        device.log("defore append"+ JSON.stringify(this.childNodes));
        this.childNodes = this.childNodes.concat(childNodes);
//        device.log("after append" + JSON.stringify(this.childNodes) +"\n"+JSON.stringify(childNodes));
    }

    queryChildNodes(){
        var cmd = protoType.QUERY_NODES_REQ.cmd;
        var nwkAddr = this.nwkAddr;
        console.log(this.nwkAddr);
        Controller.sendCMD(cmd,function(msg){
            msg.UInt16BE(Utils.hexToBytes(nwkAddr));
            msg.UInt8(0x01);
            msg.UInt8(0x00);
        });
    }
}

export default Node;
