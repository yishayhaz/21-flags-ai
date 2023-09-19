export const scores = {
  win: 100,
  loss: -100,
  infinity: Infinity,
};

export const moves = [3, 2, 1];

export const minimax = (flags: number, isMax: boolean) => {
  if (isOver(flags)) {
    // is isMax now, it means the game ended last turn when isMax: false
    // that's why it's not good
    if (isMax) return scores.loss;
    return scores.win;
  }

  if (isMax) {
    let best = -scores.infinity;

    for (const move of moves) {
      const evl = minimax(flags - move, false);

      best = Math.max(evl, best);
    }

    return best;
  } else {
    let best = scores.infinity;

    for (const move of moves) {
      const evl = minimax(flags - move, true);

      best = Math.min(evl, best);
    }

    return best;
  }
};

export const getAiMove = (flags: number) => {
  for (const move of moves) {
    if (minimax(flags - move, false) === scores.win) {
      return move;
    }
  }
};

export const isOver = (flags: number) => flags <= 0;

export const lines = {
  win: [
    "Hehe! I got you!",
    "I will win!",
    "Loser!",
    "Say goodbye to your flags!",
  ],
  loss: [
    "Oh no!",
    "It's not looking good!",
    "It's not like I wanted to win or anything!",
    "I will get you next time!",
  ],
};

export const getAiMoveAndLine = (flags: number) => {
  const move = getAiMove(flags);

  if (typeof move === "undefined") {
    return {
      move: Math.floor(Math.random() * 3) + 1,
      line: lines.loss[Math.floor(Math.random() * lines.loss.length)],
    };
  }

  return {
    move,
    line: lines.win[Math.floor(Math.random() * lines.win.length)],
  };
};
