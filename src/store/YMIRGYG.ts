import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
const myStore = defineStore('myStore', () => {
  const showMenu = ref(false); // 是否显示右键菜单
  const showDetail = ref(false); // 是否详情
  const blockInfo = reactive({
    STOCK_WGT: 0,
    MAT_CNAME: '',
    MAT_CODE: '',
    MAT_PILE_NO: '',
    STOCK_CODE: '',
    STOCK_PLACE_CODE: ''
  });
  const storeName = ref(''); //库名
  const matName = ref(''); //物料名
  const firstDblclick = ref(false);
  const secondDblclick = ref(false);
  // 设置手机设备信息
  const setShowMenu = (data: boolean) => {
    showMenu.value = data;
  };
  const setShowDetail = (data: boolean) => {
    showDetail.value = data;
  };
  const setMatName = (data: string) => {
    storeName.value = data;
  };
  const setStoreName = (data: string) => {
    matName.value = data;
  };
  const setFirstDblclick = (data: boolean) => {
    firstDblclick.value = data;
  };
  const setSecondDblclick = (data: boolean) => {
    secondDblclick.value = data;
  };
  const setBlockInfo = (data: any) => {
    blockInfo.STOCK_WGT = data.STOCK_WGT;
    blockInfo.MAT_CNAME = data.MAT_CNAME;
    blockInfo.MAT_CODE = data.MAT_CODE;
    blockInfo.MAT_PILE_NO = data.MAT_PILE_NO;
    blockInfo.STOCK_PLACE_CODE = data.STOCK_PLACE_CODE;
    blockInfo.STOCK_CODE = data.STOCK_CODE;
  };
  return {
    showMenu,
    storeName,
    matName,
    showDetail,
    blockInfo,
    firstDblclick,
    secondDblclick,
    setShowMenu,
    setShowDetail,
    setStoreName,
    setMatName,
    setBlockInfo,
    setFirstDblclick,
    setSecondDblclick
  };
});
export default myStore;
