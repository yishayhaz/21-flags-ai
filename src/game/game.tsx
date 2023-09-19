import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";
import { getAiMoveAndLine, isOver } from "~/scripts";
import { Board } from "./board";

export type Turn = "player" | "computer";

export const Game = component$(() => {
  const removedFlags = useSignal(20);
  const wantToRemove = useSignal(0);
  const turn = useSignal<Turn>("player");
  const line = useSignal("Let's play");

  const onClickFlag = $((idx: number) => {
    wantToRemove.value = idx - removedFlags.value;
  });

  const startGame = $(() => {
    removedFlags.value = 0;
    wantToRemove.value = 0;
    line.value = "Let's play";
    turn.value = "player";
  });

  const playUserMove = $(() => {
    if (turn.value === "computer") return;

    removedFlags.value += wantToRemove.value;
    wantToRemove.value = 0;

    if (isOver(removedFlags.value)) {
      line.value = "GG! Will get you next time";
      return;
    }

    turn.value = "computer";
    const ai = getAiMoveAndLine(21 - removedFlags.value);

    wantToRemove.value = ai.move;
    line.value = ai.line;

    setTimeout(() => {
      removedFlags.value += wantToRemove.value;
      wantToRemove.value = 0;

      if (isOver(removedFlags.value)) {
        line.value = "Haha! You Lost!";
        return;
      }

      turn.value = "player";
    }, 1000);
  });

  useTask$(() => {
    startGame();
  });

  return (
    <>
      <div class="avatar-wrapper">
        <img
          src="https://cdn1.iconfinder.com/data/icons/cute-color-robot/32/cute_robot_emoji_evil_avatar_machine_emoticon-512.png"
          width={40}
          height={40}
          class="avatar"
        />
        <span>{line.value}</span>
      </div>
      <Board
        removedFlags={removedFlags.value}
        wantToRemove={wantToRemove.value}
        onClickFlag$={onClickFlag}
      />
      <div class="btns">
        <button
          class="btn"
          disabled={!wantToRemove.value || turn.value === "computer"}
          onClick$={playUserMove}
        >
          Play
        </button>
        <button onClick$={startGame} class="btn">
          Restart
        </button>
      </div>
      <p>
        On your turn, you can remove 1, 2 or 3 flags.
        <br />
        The player who removes the last flag wins.
      </p>
    </>
  );
});
