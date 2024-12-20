import { CLIENT_VERSION } from './Constants.js';

const socket = io(['http://3.39.192.229:3000', 'localhost:3000', 'http://http://jhk5064.shop:3000'], {
  query: {
    clientVersion: CLIENT_VERSION,
  },
});

let userId = null;
socket.on('response', (data) => {
  console.log(data);
});

socket.on('connection', (data) => {
  console.log('connection: ', data);
  userId = data.uuid;
});

// 소켓으로 assets파일 받아오기 여기 데이터 조회해서 프론트에서 assets파일 사용
let gameAssetsData = null; 
socket.on('gameAssets', (data) => {
  gameAssetsData = data;
});

const sendEvent = (handlerId, payload) => {
  socket.emit('event', {
    userId,
    clientVersion: CLIENT_VERSION,
    handlerId,
    payload,
  });
};

socket.on('highScore', (data) => {
  console.log('서버에서 받은 하이스코어:', data.highScore);
  localStorage.setItem('highScore', data.highScore); // 로컬 스토리지에 저장
});

export { sendEvent, gameAssetsData, socket};


//여기서는 프론트에 소켓을 만들어줌
