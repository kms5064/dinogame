import { CLIENT_VERSION } from './Constants.js';

const socket = io('http://localhost:3000', {
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

export { sendEvent, gameAssetsData };


//반대로 여기서는 프론트에 소켓을 만들어줌