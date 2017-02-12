import Vue from 'vue'
import {Tabbar,TabItem,TabContainer,TabContainerItem,Button,Field} from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import './utils.js'
import './controller.js'
import Req from './view/req.vue'
//Vue.use(MintUI);
Vue.component(Tabbar.name,Tabbar);
Vue.component(TabItem.name,TabItem);
Vue.component(TabContainer.name,TabContainer);
Vue.component(TabContainerItem.name,TabContainerItem);
Vue.component(Button.name, Button);
Vue.component(Field.name, Field);


new Vue({
  el: '#req',
  render: h => h(Req)
});

