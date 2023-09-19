import { $, QRL, component$ } from "@builder.io/qwik";

export type BoardProps = {
  removedFlags: number;
  wantToRemove: number;
  onClickFlag$: QRL<(idx: number) => void>;
};

export const Board = component$(
  ({ removedFlags, wantToRemove, onClickFlag$ }: BoardProps) => {
    const _onClickFlag = $((idx: number) => {
      if (idx <= removedFlags) return;
      if (idx > removedFlags + 3) return;

      onClickFlag$(idx);
    });

    return (
      <div class="board">
        {Array.from({ length: 21 }).map((_, idx) => (
          <button
            key={idx}
            class="flag"
            onClick$={() => {
              _onClickFlag(idx + 1);
            }}
            aria-disabled={idx + 1 <= removedFlags}
            aria-selected={
              idx + 1 > removedFlags && idx + 1 <= wantToRemove + removedFlags
            }
          >
            <Flag />
          </button>
        ))}
      </div>
    );
  }
);

const Flag = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M349.565 98.783C295.978 98.783 251.721 64 184.348 64c-24.955 0-47.309 4.384-68.045 12.013a55.947 55.947 0 0 0 3.586-23.562C118.117 24.015 94.806 1.206 66.338.048 34.345-1.254 8 24.296 8 56c0 19.026 9.497 35.825 24 45.945V488c0 13.255 10.745 24 24 24h16c13.255 0 24-10.745 24-24v-94.4c28.311-12.064 63.582-22.122 114.435-22.122 53.588 0 97.844 34.783 165.217 34.783 48.169 0 86.667-16.294 122.505-40.858C506.84 359.452 512 349.571 512 339.045v-243.1c0-23.393-24.269-38.87-45.485-29.016-34.338 15.948-76.454 31.854-116.95 31.854z"></path>
    </svg>
  );
};
