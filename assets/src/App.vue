<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <mt-tab-container class="page-tabbar-container" v-model="selected" :swipeable="true">
        <mt-tab-container-item id="myhome">
          <myhome></myhome>
        </mt-tab-container-item>
        <mt-tab-container-item id="devices">
        </mt-tab-container-item>
        <mt-tab-container-item id="discovery">
             <req></req>
        </mt-tab-container-item>
        <mt-tab-container-item id="my">
          </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="myhome">
        <img slot="icon" src="./assets/myhome.png">
        我家
      </mt-tab-item>
      <mt-tab-item id="devices">
        <img slot="icon" src="./assets/devices.png">
        设备
      </mt-tab-item>
      <mt-tab-item id="discovery">
        <img slot="icon" src="./assets/discovery.png">
        发现
      </mt-tab-item>
      <mt-tab-item id="my">
        <img slot="icon" src="./assets/my.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  import req from "./view/req.vue";
  import myhome from "./view/myhome.vue";
    export default {
        data() {
            return {
                selected: 'myhome'
            };
        },
      components:{
           req,myhome
        }
    };
</script>

<style>
  body{
   margin:0px;
  }
  .page-tabbar {
    background-color: #e7e7e7;
    overflow: scroll;
    height: 100vh;
    width: 100vw;
    margin: 0px;
  }
  .page-wrap {
    overflow: auto;
    height: 100%;
    width: 100%;
    padding-bottom: 30vh;
  }
</style>
