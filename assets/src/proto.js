import Utils from "./utils.js";
import Controller from "./controller.js";
const startFrame = 254;
const protoType = {
    QUERY_NODES_REQ: {
        cmd: 0x2501,
        name: 'QUERY_NODES_REQ'
    },
    QUERY_NODES_RES: {
        cmd: 0x4581,
        name: 'QUERY_NODES_REQ'
    },
    SET_NODE_REQ: {
        cmd: 0x2900,
        name: 'NODE_INFO_REQ'
    },
    SET_NODE_RES: {
        cmd: 0x4900,
        name: 'NODE_INFO_RES'
    },
    QUERY_NODE_BIND_REQ: {
        cmd: 0x2533,
        name: 'QUERY_NODE_BIND_REQ'
    },
    QUERY_NODE_BIND_RES: {
        cmd: 0x4583,
        name: 'QUERY_NODE_BIND_RES'
    },
    SET_NODE_BIND_REQ: {
        cmd: 0x2521,
        name: 'SET_NODE_BIND_REQ'
    },
    SET_NODE_BIND_RES: {
        cmd: 0x45A1,
        name: 'SET_NODE_BIND_REQ'
    },
    SET_NODE_UNBIND_REQ: {
        cmd: 0x2522,
        name: 'SET_NODE_UNBIND_REQ'
    },
    SET_NODE_UNBIND_RES: {
        cmd: 0x45A2,
        name: 'SET_NODE_UNBIND_RES'
    }
};



class Proto {
    constructor(len, cmd, data) {
        this.Len = data.length;
        this.data = data;
        //this.cmd = cmd;
        this.cmd = (cmd[0] << 8) + cmd[1];
        var cmdInfo = parseType(cmd);
        this.cmdName = cmdInfo.name;
    }
    /*
      数组去除头和尾再进行异或校验
      */
    static checkFCS(byteAarray) {
        var xorResult = 0;
        for (var i = 1; i < byteAarray.length - 1; i++) {
            xorResult = byteAarray[i] ^ xorResult;
        }
        console.log("xorResult = " + xorResult,
            "length= " + byteAarray.length,
            "orgin = " + byteAarray[byteAarray.length - 1]);
        return xorResult == byteAarray[i + 1];
    }
    static doHandle(cmd,data) {
        var tmp;
        var result = "success";
        device.log("enter doHandle:" + cmd);
        switch (cmd) {
            case protoType.QUERY_NODES_REQ.cmd:
                tmp = protoType.QUERY_NODES_REQ;
            result = Controller.doQueryNodes(data);
            break;
            case protoType.QUERY_NODES_RES.cmd:
                tmp = protoType.QUERY_NODES_RES;
            break;
            case protoType.SET_NODE_REQ.cmd:
                tmp = protoType.SET_NODE_REQ;
            result = Controller.doSetNode(data);
            break;
            case protoType.SET_NODE_RES.cmd:
                tmp = protoType.SET_NODE_RES;
            break;
            case protoType.QUERY_NODE_BIND_REQ.cmd:
                tmp = protoType.QUERY_NODE_BIND_REQ;
            result = Controller.doQueryNodeBind(data);
            break;
            case protoType.SET_NODE_RES.cmd:
                tmp = protoType.SET_NODE_RES;
            break;
            case protoType.SET_NODE_REQ.cmd:
                tmp = protoType.SET_NODE_REQ;
            result = Controller.doSetNode(data);
            break;
            case protoType.SET_NODE_UNBIND_RES.cmd:
                tmp = protoType.SET_NODE_BIND_RES;
            break;
            case protoType.SET_NODE_UNBIND_REQ.cmd:
                tmp = protoType.SET_NODE_BIND_REQ;
            result = Controller.doSetNodeBind(data);
            break;
            case protoType.QUERY_NODE_BIND_RES.cmd:
                tmp = protoType.QUERY_NODE_BIND_RES;
            break;
        }
        device.log("DoHandle: " + JSON.stringify(tmp) + "\nresult is:" + result);
        return result;
    }
    static handle(byteArray) {
        if (byteArray[0] != startFrame) {
            throw 'Data not start with SOF';
        }
        if (this.checkFCS(byteArray)) {
            throw 'FCS not match';
        }
        var len = byteArray[1];
        var cmd = (byteArray[2] << 8) + byteArray[3];
        var data = byteArray.slice(4, 4 + len);
        this.doHandle(cmd,data);
    }
    static handleBase64(base64) {
        return this.handle(Utils.Base64ToByteArray(base64));
    }
    static marshal(cmd, dataArray) {
        var msg = new BufferMaker();
        msg.UInt8(startFrame);
        msg.UInt8(0); //len
        msg.UInt8(cmd);
        if (cb) {
            cb(msg);
        }
        msg.UInt8(0); //fcs
        var buffer = msg.make();
        var xorResult = 0;
        for (var i = 4; i < buffer.length - 1; i++) {
            xorResult = buffer[i] ^ xorResult;
        }
        buffer[i + 1] = xorResult;
        return buffer;
    }
}

export default Proto;
export {protoType};
