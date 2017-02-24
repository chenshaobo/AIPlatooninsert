/*** store.js ***/

import Vue from 'vue';
import Vuex from 'vuex';
import Node from "../node.js";
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
        saveNode(node,state.nodes);
    },
    ['DELETE_NODE'](state, ieeeAddr) {
        var index = state.nodes.findIndex((node) => {
            return node.ieeeAddr == node.ieeeAddr;
        });
        delete state.nodes[index];
        store.set('nodes', state.nodes);
    }
};

export var findNodeByIeeeAddr = function(ieeeAddr){
    var nodes = store.get('nodes');
     if (!nodes){
        return false;
    }
    var nodeData = nodes.find((e,index) =>{
        return e.ieeeAddr === ieeeAddr;
    });
    return new Node(nodeData);
};
export var findNodeByNwkAddr = function(nwkAddr){
  var nodes = store.get('nodes');
  console.log(nodes);
  if (!nodes){
    return false;
  }
  var nodeData = nodes.find((e,index) =>{
    return e.nwkAddr === nwkAddr;
  });
  return new Node(nodeData);
};

export var saveNode = function(node,nodes){
  nodes.find((e, index) => {
    if (e.ieeeAddr === node.ieeeAddr) {
      nodes.splice(index,1);
    }
  });
  nodes.push(node);
  store.set('nodes', nodes);
  device.log("save node result:"+JSON.stringify(store.get('nodes')));
};
export var saveNodeDefault = function(node){
   var  nodes = store.get('nodes');
  saveNode(node,nodes);
}
const actions = {};
export default new Vuex.Store({
    state,
    mutations
});
