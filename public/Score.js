import { sendEvent, gameAssetsData } from './Socket.js';

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  stageChange = true;

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
    this.currentStage = 1000; //스테이지 아이디
    this.scorePerStage = 1; //스코어 증가량
    this.score = 0; //현재 점수
    this.stages = 0; //현재 스테이지
    this.nextStageScore = 100; //다음 스테이지 필요 점수
  }

  
  update(deltaTime) {
    this.score += deltaTime * 0.001 * this.scorePerStage; //기존 score상승에 현재 스코어 상승량 곱해주기
    if (Math.floor(this.score) >= this.nextStageScore && this.stageChange) { //스코어 다음 스테이지 요구 조건 달성시 다음 스테이지 
      this.stageChange = false; // 한번만 스테이지가 바뀌게 하기위해 불리언 false
      this.stages += 1; //스테이지 증가 ->여기에 따라 다음 스테이지 수치를 찾아서 변경
      this.scorePerStage = gameAssetsData.stages.data[this.stages].scorePerSecond //스코어 상승량 바뀐 스테이지에 맞춰 변경
      this.nextStageScore = gameAssetsData.stages.data[this.stages +1].score //다음 스테이지의 스코어
      const targetStage = this.currentStage + 1; //targetStage 정의
      sendEvent(11, { //현재스테이지, 다음 스테이지 정보 서버로 전송
        currentStage: this.currentStage,
        targetStage: targetStage
      });
       //서버에서 검증이 완료되면
      this.currentStage += 1; //증가한 스테이지로 currentStage증가 
      this.stageChange = true;
    }
  }
  // update(deltaTime) {
  //   if (!this.stages && gameAssetsData) {
  //     this.stages = gameAssetsData.stages;
  //   }

  //   this.score += deltaTime * 0.001 * this.scorePerStage;
    
  //   if (Math.floor(this.score) >= this.nextStage && this.stageChange && this.stages) {
  //     const nextStageData = this.stages[this.currentStage];
  //     console.log(nextStageData);
      
  //     if (nextStageData) {
  //       this.stageChange = false;
  //       sendEvent(11, {
  //         currentStage: this.currentStage,
  //         targetStage: this.currentStage + 1,
  //         stageData: nextStageData
  //       });
        
  //       this.scorePerStage = nextStageData.scoreMultiplier;
  //       this.nextStage += nextStageData.scoreRequirement;
  //       this.stageChange = true;
  //       this.currentStage += 1;
  //     }
  //   }

  //   if (this.displayStage !== this.currentStage) {
  //     this.displayStage += (this.currentStage - this.displayStage) * this.stageTransitionSpeed;
  //   }
  // }

  getItem(itemId) {
    // 아이템 획득시 점수 변화
    // if(itemId === 1) {
    //   this.score += 10;
    // } else if(itemId === 2) {
    //   this.score += 20;
    // } else if(itemId === 3) {
    //   this.score += 30;
    // } else if(itemId === 4) {
    //   this.score += 40;
    // } else if(itemId === 5) {
    //   this.score += 50;
    // } else if(itemId === 6) {
    //   this.score += 60;
    // }
    this.score += gameAssetsData.items.data[itemId-1].score;
    sendEvent(12, { // 아이템 획득 정보 서버로 전송
      itemId: itemId
    });
  }

  reset() {
    this.score = 0;
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const stageX = 20 * this.scaleRatio;
    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);
    const stagePadded = Math.floor(this.stages + 1).toString().padStart(3, 0);

    this.ctx.fillText(`STAGE ${stagePadded}`, stageX, y);
    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}

export default Score;
