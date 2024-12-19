import { getGameAssets } from '../init/assets.js';

export const itemGetHandler = (userId, payload) => {
  const { items } = getGameAssets();
  const item = items.data.find((item) => item.id === payload.itemId);
  if (!item) {
    return { status: 'fail', message: 'Invalid item ID' };
  }

  // 아이템이 유효한 경우 추가 로직을 여기에 작성할 수 있습니다.
  return { status: 'success', message: 'Item verified', itemId: item.id };
};

