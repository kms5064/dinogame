import { moveStageHandler } from './stage.handler.js';
import { gameEnd, gameStart } from './game.handler.js';
import { itemGetHandler } from './item.handler.js';
import { highScoreHandler } from './highscore.handler.js';

const handlerMappings = {
  2: gameStart,
  3: gameEnd,
  11: moveStageHandler,
  12: itemGetHandler,
  13: highScoreHandler,
};

export default handlerMappings;
