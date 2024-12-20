import { getGameAssets } from '../init/assets.js';

export const itemGetHandler = (userId, payload) => {
  const { items } = getGameAssets();
  //받아온 id가 실제 있는 id인지 검증
  const item = items.data.find((item) => item.id === payload.itemId);
  if (!item) {
    return { status: 'fail', message: 'Invalid item ID' };
  }
  const itemStage = payload.currentStage;
  if(itemStage > item.id) {
    return { status: 'fail', message: 'Invalid item ID' };
  }

  // 검증 완료 코드!
  return { status: 'success', message: 'Item verified', itemId: item.id };
};

