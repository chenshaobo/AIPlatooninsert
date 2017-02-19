/*** store.js ***/

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//node {
// name, //gateway,remote,light,zlight
// addr,
// IEEEAddr,
// 
// }
const state = {
    nodes: []
};
var store = require('store');
console.log(store.get('nodes') !== undefined,store.get('nodes'));
state.nodes = store.get('nodes') !== undefined ? store.get('nodes') : new Array();
console.log("nodes", state.nodes);
const mutations = {
    ['SAVE_NODE'](state, node) {
        state.nodes.find((e, index) => {
            if (e.ieeeAddrStr === node.ieeeAddrStr) {
                state.nodes.splice(index,1);
            }
        });
        state.nodes.push(node);
        device.log("--------save nodes" + JSON.stringify(state.nodes));
        store.set('nodes', state.nodes);
    },
    ['DELETE_NODE'](state, ieeeAddr) {
        var index = state.nodes.findIndex((node) => {
            return node.ieeeAddr == node.ieeeAddr;
        });
        delete state.nodes[index];
        store.set('nodes', state.nodes);
    }
};

const actions = {};
export default new Vuex.Store({
    state,
    mutations
});
