Navigator = null;
const setNavigator = (ref)=>{
    Navigator = ref;
}
const push = (path="", param={})=>{
    Navigator.history.push(path, param)
}
const replace = (path="", param={})=>{
    Navigator.history.replace(path, param)
}
export default {
    setNavigator,
    push,
    replace
}