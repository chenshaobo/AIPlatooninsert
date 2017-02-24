<template>
  <div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/req">测试</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/my">我的</router-link>
      </div>
    </div>
   
  </div>
</template>
<script>
    export default {
        data() {
            return {
                selected: '我的'
            };
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
border-1px($color)
  position: relative
  &:after
    display: block
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    border-top: 1px solid $color
    content: ' '
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>