export const setNodes = ({dispatch },nodes) =>{
    console.log("dispatch set nodes");
    dispatch('SAVE_NODE',nodes);
};
