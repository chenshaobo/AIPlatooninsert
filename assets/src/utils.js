/**
 * Created by lx on 17/2/8.
 */

// Convert a hex string to a byte array
function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

function Base64ToByteArray(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
}

function toBytesInt16 (num) {
    arr = new Uint8Array([
         (num & 0xff00) >> 8,
         (num & 0x00ff)
    ]);
    return arr;
}
export {hexToBytes,Base64ToByteArray};
