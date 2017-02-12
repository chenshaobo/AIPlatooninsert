<template>
  <div id="req">
    <div class="page-part">
    <mt-field label="发送自定义数据" placeholder="FE0000001" v-model="customHex" :value="customHex"></mt-field>
    <mt-button @click.native="handleClick(data)" :value="customHex">发送自定义数据{{ customHex }}</mt-button>
    </div>

    <div class="page-part">
	<mt-button @click.native="handleQueryNodes">查询节点列表</mt-button>
	
	</div>
  </div>
</template>

<script>
    import {
        hexToBytes
    } from '../utils.js';
    import {
        action
    } from '../controller.js';
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
                device.onServerPush(function(data) {
                    device.log(JSON.stringify(data));
                    if (data.key == 'DPPushNotify' && data.value) {
                        device.query({
                            list: data.value.PropIDs,
                            onSuccess: function(ret) {
                                device.log('onSuccess: ' + JSON.stringify(ret));
                                // do something
                            }
                        });
                    }
                });
            }
        }
    }
</script>
