/*** store.js ***/

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//node {
// name, //gateway,remote,light,zlight
// addr,
// IEEEAddr,
// 
// }
const state = {
    nodes:[] 
}

const mutations = {
    SAVE_NODE (state,node){
	state.nodes.push(node)
	localStorage.setItem("nodes",state.nodes)
    },
   DELETE_NODE (state, name) {
       index = state.nodes.findIndex((node)=>{
       return node.name == name});
      delete state.nodes[index];
      localStorage.setItem("nodes",state.nodes);
   },
    SEND_DATAPOINT(
}

export default new Vuex.Store({
  state,
  mutations
})
