import { component$, useSignal } from "@builder.io/qwik";
import { Game } from "~/game/game";

export const HomeScreen = component$(() => {
  const isPlaying = useSignal(true);

  if (isPlaying.value) {
    return <Game />;
  }
  return (
    <>
      <h1>Hey you!</h1>
      <p>
        21 Flags is a game for 2 players. Each player takes turns to remove 1,
        2, or 3 flags from the pile. The player who removes the last flag wins.
        <br />
        You can play against a friend or against the computer.
      </p>
      <button>VS computer</button>
      <button
        onClick$={() => {
          isPlaying.value = true;
        }}
      >
        VS friend
      </button>
    </>
  );
});
