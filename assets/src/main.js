import Vue from 'vue';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css'
import Vuex from 'vuex';
import VueRouter from 'vue-router';
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(MintUI);
Vue.config.devtools = true;

import app from './app.vue';
import req from './view/req.vue';


const routes = [{
    path: '/req',
    component: req
}];
const router = new VueRouter({
    linkActiveClass: 'active',
    routes
});
new Vue({
    el: 'app',
    render: h => h(app),
    router
});
