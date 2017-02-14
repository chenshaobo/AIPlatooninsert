import Utils from "./utils.js";
const startFrame = 254;
var protoType = {
    QUERY_NODES_REQ: {
        cmdType: 0x2501,
        name: 'QUERY_NODES_REQ'
    },
    QUERY_NODES_RES: {
        cmdType: 0x4581,
        name: 'QUERY_NODES_REQ'
    },
    SET_NODE_REQ: {
        cmdType: 0x2900,
        name: 'NODE_INFO_REQ'
    },
    SET_NODE_RES: {
        cmdType: 0x4900,
        name: 'NODE_INFO_RES'
    },
    QUERY_NODE_BIND_REQ: {
        cmdType: 0x2533,
        name: 'QUERY_NODE_BIND_REQ'
    },
    QUERY_NODE_BIND_RES: {
        cmdType: 0x4583,
        name: 'QUERY_NODE_BIND_RES'
    },
    SET_NODE_BIND_REQ: {
        cmdType: 0x2521,
        name: 'SET_NODE_BIND_REQ'
    },
    SET_NODE_BIND_RES: {
        cmdType: 0x45A1,
        name: 'SET_NODE_BIND_REQ'
    },
    SET_NODE_UNBIND_REQ: {
        cmdType: 0x2522,
        name: 'SET_NODE_UNBIND_REQ'
    },
    SET_NODE_UNBIND_RES: {
        cmdType: 0x45A2,
        name: 'SET_NODE_UNBIND_RES'
    }
};

function parseType(Type) {
    var tmp;
    switch (Type) {
        case protoType.QUERY_NODES_REQ.cmdType:
            tmp = protoType.QUERY_NODES_REQ;
        case protoType.QUERY_NODES_RES.cmdType:
            tmp = protoType.QUERY_NODES_RES;
    }
    console.log("parseType : " + Type + "'s cmdInfo is " + JSON.stringify(tmp));
    return tmp;
}

class Proto {
    constructor(len, cmd, data) {
        this.Len = data.length;
        this.data = data;
        this.cmd = cmd;
        var cmdType = (cmd[0] << 8) + cmd[1];
        this.cmdInfo = parseType(cmdType);
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
    static Unmarshal(byteArray) {
        if (byteArray[0] != startFrame) {
            throw 'Data not start with SOF';
        }
        if (this.checkFCS(byteArray)) {
            throw 'FCS not match'
        }
        var len = byteArray[1];
        var cmd = byteArray.slice(2, 4);
        var data = byteArray.slice(4, 4 + len);
        //console.log(len, cmd, data); 
        return new Proto(len, cmd, data);
    }
    static UnmarshalBase64(base64) {
        return this.Unmarshal(Utils.Base64ToByteArray(base64));
    }
}

export default Proto;
