<template>
    <div id="req">
    <div class="page-part">
    <mt-field label="发送自定义数据" placeholder="FE0000001" v-model="customHex" :value="customHex"></mt-field>
    <mt-button @click.native="handleClick(data)" :value="customHex">发送自定义数据{{ customHex }}</mt-button>
    </div>

    <div class="page-part">
	<mt-button @click.native="handleQueryNodes">查询节点列表</mt-button>
	<p id="nodeList">{{ nodes }} </p>
	</div>
  
	<div class="page-part">
	    <mt-button @click.native="handleTestFunc">单元测试</mt-button>
	    </div>
	<div class="page-part">
	    <mt-button @click.native="handleClear">清除localStorage</mt-button>
	    </div>


  </div>
</template>

<script>
    import Utils from "../utils.js";
    import Controller from '../controller.js';
   import Proto from "../proto.js";
import store from "../vuex/store.js";
import {setNodes} from "../vuex/action.js";
import Bus from "../bus.js";
var localStore = require('store');
    export default {
        name: 'req',
        store: store,
        data() {
            return {
                customHex: ""
            }
            
        },
        vuex:{
            getters: {
                nodes: state => JSON.stringifg(state.nodes),
                },
            actions:{
                setNodes
            }
        },
        methods: {
            saveNodes(){
                Bus.$on('add-node',function(node){
                    store.commit('SAVE_NODE',node);
                });
                },
            handleClear(){
                localStore.clear();
                device.log("清除本地数据成功");
                },
            handleClick() {
                if (this.customHex != "") {
                    device.log("send custom data:" + this.customHex);
                    Controller.sendHex(val);
                }
            },
            handleQueryNodes() {
                localStore.clear();
                Controller.sendHex("FE0425010000010021");
                this.saveNodes();
            },
	    handleTestFunc(){
       localStore.clear();
       this.saveNodes();
		  var v = "/gQlAQAAAQAh";
	          var byteArray = Utils.Base64ToByteArray(v);
		  var result = Proto.handle(byteArray);
		var result1= Proto.handleBase64(v);
          var queryNodesRes = Proto.handleHex("FE134581001239FC0A004B120000000003F7EE5BD7DBA5BB");
	        window.alert("单元测试ok");
	    }
        }
    }
</script>
