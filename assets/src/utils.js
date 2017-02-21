/**
 * Created by lx on 17/2/8.
 */

// Convert a hex string to a byte array
const hexChar = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

function byteToHex(b) {
    return hexChar[(b >> 4) & 0x0f] + hexChar[b & 0x0f];
}
class Utils {
    static hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
    }

    static Base64ToByteArray(base64) {
        var binaryString = window.atob(base64);
        var len = binaryString.length;
        var bytes = new Uint8Array(len);
        console.log(base64,binaryString);
        for (var i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }
    static toHexString(byteArray) {
        //console.log("to hex: " + JSON.stringify(byteArray));
        var s = "0x";
        for (var i = 0; i < byteArray.length; i++) {
            var b = byteArray[i];
            var v = hexChar[(b >> 4) & 0x0f] + hexChar[b & 0x0f];
            s = s + v;
        }
        return s;
    }
    static toHex(byteArray){
        var s = "";
        for (var i = 0; i < byteArray.length; i++) {
            var b = byteArray[i];
            var v = hexChar[(b >> 4) & 0x0f] + hexChar[b & 0x0f];
            s = s + v;
        }
        return s;
    }
}
export default Utils;
