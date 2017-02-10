<template>
  <div id="req">
    <div class="part">
    <mt-field label="发送自定义数据" placeholder="FE0000001" v-model="customHex" :value="customHex"></mt-field>
    <mt-button @click.native="handleClick(data)" :value="customHex">发送自定义数据{{ customHex }}</mt-button>
    </div>
  </div>
</template>

<script>
var utils = require('utils');
export default{
       name: 'req',
       data(){
	return{
	customHex: "" 
	}
       },
       methods:{
	handleClick(){
		if (this.customHex != ""){
	        var tmp = new String(this.customHex); 
		var val = utils.hexToBytes(tmp);
		console.log("send ",val);
		Action(hexToBytes(val));
		}
	}
       }
}
</script>