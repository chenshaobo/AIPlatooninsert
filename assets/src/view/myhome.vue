<template>
  <div id="myhome" class="page">
<div id="temperature" class="page-part">
      <img id="myimg" src="../assets/devices.png">
    </div>

    <mt-cell id="partten" class="page-part border">
      <p class="page-tittle"> 模式 </p>
    </mt-cell>

    <mt-cell id="connect" class="page-part border">
      <p class="page-tittle"> 高级联动 </p>
    </mt-cell>

     <mt-cell id="connect" class="page-part border">
      <p class="page-tittle"> 高级联动 </p>
    </mt-cell>
   </div>
</template>


<script>
    export default {
        name: 'myhome',
        data: function() {
            return {}
        }
    }
</script>
<style>
.page {
  width: 100%;
        background-color: #f5f5f5;
    }
.page-part{
  height: 30vh;
  width: 100vw;
  margin-bottom: 3vh;
  background-color: white;
}
.page-tittle{
  padding: 8px;
}
#myimg{ width: 100%; height: 100%; vertical-align: middle;}
.border {
  border: 2px;
  border-radius:20px;
}
</style>
