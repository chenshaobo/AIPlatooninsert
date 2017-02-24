//节点类
import {
    protoType
} from "./proto.js";
import Controller from "./controller.js";
import Utils from "./utils.js";
class Node {
    constructor({
        ieeeAddr,
        nwkAddr,
      childNodes = [],
      nodeName =""
    } = {}) {
        this.ieeeAddr = ieeeAddr;
      this.nwkAddr = nwkAddr;
      this.nwkAddrInt = Node.getNwkAddrInt(nwkAddr);
        this.childNodes = childNodes;
      this.nodeName = nodeName;
    }
    static getNwkAddrInt(nwkAddr) {
      var nwkAddrArray = Utils.hexToBytes(nwkAddr);
        return (nwkAddrArray[0] << 8) + nwkAddrArray[1];
    }


    appendChildNodes(childNodes) {
        //        device.log("defore append"+ JSON.stringify(this.childNodes));
        this.childNodes = this.childNodes.concat(childNodes);
        //        device.log("after append" + JSON.stringify(this.childNodes) +"\n"+JSON.stringify(childNodes));
    }

    queryChildNodes() {
        var cmd = protoType.QUERY_NODES_REQ.cmd;
        var nwkAddrInt = this.nwkAddrInt;
        Controller.sendCMD(cmd, function(msg) {
            msg.UInt16BE(nwkAddrInt);
            msg.UInt8(0x01);
            msg.UInt8(0x00);
        });
    }
    queryNodeName() {
        //FE 0D 29 00 FD 00 00 FD 00 00 06 02 00 00 00 04 00 24
        var cmd = protoType.SET_NODE_REQ.cmd;
        var nwkAddrInt = this.nwkAddrInt;
        Controller.sendCMD(cmd, function(msg) {
            msg.UInt8(0xFD); //AppEndPoint
            msg.UInt16BE(nwkAddrInt); //nwkAddr
            msg.UInt8(0xFD); //DestEndPoint
            msg.UInt16BE(0x00); //clusterID
            msg.UInt8(0x06); //msglen
            msg.UInt8(0x02); //addrMode
            msg.UInt8(0x00);
            msg.UInt8(0x00);
            msg.UInt8(0x00);
            msg.UInt16BE(0x0400);
        });
    }
  queryNodeBindTables(){
    var cmd = protoType.QUERY_NODE_BIND_REQ.cmd;
    var nwkAddrInt = this.nwkAddrInt;
    Controller.sendCMD(cmd,function(msg){
      msg.UInt16BE(nwkAddrInt);
      msg.UInt8(0x00);
    });
  }
  setNodeName(nodeName){
    this.nodeName = nodeName;
  }
}

export default Node;
