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
    import Controller from '../controller.js';
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
                    device.log("send custom data:" + this.customHex);
                    Controller.sendHex(val);
                }
            },
            handleQueryNodes() {
                Controller.sendHex("FE0425010000010021");
            },
	    handleTestFunc(){
		  var v = "/gQlAQAAAQAh";
	          var byteArray = Utils.Base64ToByteArray(v);
		  console.log(Array.apply([],byteArray).join(","));
		  var result = Proto.handle(byteArray);
		  console.log(result);
		var result1= Proto.handleBase64(v);
		console.log(result1);
		console.log("result " ,JSON.stringify(result),JSON.stringify(result1));
                console.log("tohexstring " ,Utils.toHexString(byteArray));
 device.log('serverPushData: ' + Utils.toHexString(Utils.Base64ToByteArray(v)));

	        window.alert("单元测试ok");
	    }
        }
    }
</script>
