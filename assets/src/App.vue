<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="myhome">
        </mt-tab-container-item>
        <mt-tab-container-item id="devices">
        </mt-tab-container-item>
        <mt-tab-container-item id="discovery">
          <div class="page-part">
             <req></req>
          </div>
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
        <img slot="icon" src222="./assets/devices.png">
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
    export default {
        data() {
            return {
                selected: '我的'
            };
        },
      components:{
           req
        }
    };
</script>

<style>
  .page-tabbar {
    overflow: hidden;
    height: 100vh;
  }
  .page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 100px;
  }
</style>
