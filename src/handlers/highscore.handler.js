import { getHighScore} from '../models/highscore.model.js';

export const highScoreHandler = (userId, payload) => {
  const { highScore } = payload;
  const currentHighScore = getHighScore(userId);

  if (highScore > currentHighScore) {
    setHighScore(userId, highScore);
    return { status: 'success', message: 'High score updated' };
  }

  return { status: 'success', message: 'No update needed' };
};
