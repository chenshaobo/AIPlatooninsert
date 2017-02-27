<template>
  <div id="myhome" class="page">
   <!-- <div id="temperature" class="page-part">
      <img id="myimg" src="../assets/devices.png"> 
      <p class="temperature-number">{{ temperature }} °c</p>
      <p class="temperature-tittle">客厅温度</p>
    </div>-->

    <div id="pattern" class="page-part border">
      <div class="page-part-tittle">
        <span class="page-tittle"> 模式 </span>
        <img class="button-add" src="../assets/pattern_add_btn.png" width="25" height="25">
      </div>
    </div>

    <div id="connect" class="page-part border">
      <div class="page-part-tittle">
        <span class="page-tittle"> 模式 </span>
        <img class="button-add" src="../assets/pattern_add_btn.png" width="25" height="25">
      </div>
    </div>
   </div>
</template>


<script>
    export default {
        name: 'myhome',
        data: function() {
          return {
           temperature: "24"
          }
        }
    }
</script>
<style>
.page {
}
.page-part{
  height: 45vh;
  width: 100vw;
  background-color: white;
}
.page-part-tittle{
  padding-left:3vw;
  padding-right:3vw;
  padding-top:1vh;
  width:93%;
  height: 30%;
}
.button-add{
   display: inline-block;
				float: right;
 }
.border {
  margin-bottom: 3vh;
  border-radius:20px;
}
</style>
