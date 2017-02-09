import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import Tarbar from './tarbar.vue'
import TarbarContainer from './tarbarContainer.vue'

Vue.use(MintUI);
Vue.component(MintUI.Tabbar.name,MintUI.Tabbar);
Vue.component(MintUI.TabItem.name,MintUI.TabItem);
Vue.component(MintUI.TabContainer.name,MintUI.TabContainer);
Vue.component(MintUI.TabContainerItem.name, MintUI.TabContainerItem);
new Vue({
  el: '#app',
  render: h => h(App)
});

new Vue({
  el:'#tarbar',
  data: {
    barItems:[
      {name: "我的"},
    ]
  },
  render: h => h(Tarbar)
});

// new Vue({
//       el:'#tarbarContainer',
//       data: {},
//       render: h => h(TarbarContainer)
// });
