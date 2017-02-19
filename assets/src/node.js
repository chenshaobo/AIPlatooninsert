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
        this.childNodes.concat(childNodes);
    }

    queryChildNodes(){
        var cmd = protoType.QUERY_NODE_REQ.cmd;
        var data = [this.nwkAddr[0],this.nwkAddr[1],0x01,0x00];
        Controller.sendCMD(cmd,data);
    }

}

export default Node;
