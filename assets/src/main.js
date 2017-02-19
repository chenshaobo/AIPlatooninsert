import Vue from 'vue';
import MintUI from 'mint-ui';
import App from './App.vue';
import './utils.js';
import './controller.js';
import Req from './view/req.vue';
import Vuex from 'vuex';
Vue.use(Vuex);
Vue.use(MintUI);
Vue.config.devtools = true;

/*Vue.component(Tabbar.name,Tabbar);
Vue.component(TabItem.name,TabItem);
Vue.component(TabContainer.name,TabContainer);
Vue.component(TabContainerItem.name,TabContainerItem);
Vue.component(Button.name, Button);
Vue.component(Field.name, Field);
*/

new Vue({
  el: '#req',
  render: h => h(Req)
});

