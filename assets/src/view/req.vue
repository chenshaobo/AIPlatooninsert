<template>
    <div id="req">
    <div class="page-part">
    <mt-field label="发送自定义数据" placeholder="FE0000001" v-model="customHex" :value="customHex"></mt-field>
    <mt-button @click.native="handleClick(data)" :value="customHex">发送自定义数据{{ customHex }}</mt-button>
    </div>

    <div class="page-part">
	<mt-button @click.native="handleQueryNodes">查询节点列表</mt-button>
	
	</div>
	<div class="page-part">
	    <mt-button @click.native="handleTestFunc">单元测试</mt-button>
	    </div>
  </div>
</template>

<script>
    import Utils from "../utils.js";
    import {action} from '../controller.js';
   import Proto from "../proto.js";
    export default {
        name: 'req',
        data() {
            return {
                customHex: ""
            }
        },
        methods: {
            handleClick() {
                if (this.customHex != "") {
                    var tmp = new String(this.customHex);
                    var val = hexToBytes(tmp);
                    console.log("send ", val);
                    action(val);
                }
            },
            handleQueryNodes() {
                action("FE0425010000010021");
            },
	    handleTestFunc(){
		  var v = "/gQlAQAAAQAh";
	          var byteArray = Utils.Base64ToByteArray(v);
		  console.log(Array.apply([],byteArray).join(","));
		  var proto = Proto.Unmarshal(byteArray);
		  console.log(proto);
		var proto1 = Proto.UnmarshalBase64(v);
		console.log(proto1);
		console.log("unmarshal result " ,JSON.stringify(proto),JSON.stringify(proto1));
                console.log("tohexstring " ,Utils.toHexString(byteArray));
 device.log('serverPushData: ' + Utils.toHexString(Utils.Base64ToByteArray(v)));

	        window.alert("单元测试ok");
	    }
        }
    }
</script>
