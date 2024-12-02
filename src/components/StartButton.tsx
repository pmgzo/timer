export enum ButtonState {
  started,
  paused,
  stopped,
}

interface StartButtonProps {
  state: ButtonState;
  toggle: () => void;
}

export default function StartButton({ state, toggle }: StartButtonProps) {
  return state === ButtonState.paused ? (
    <button
      className="p-3 rounded bg-yellow-400 hover:bg-yellow-600"
      onClick={toggle}
    >
      Paused
    </button>
  ) : (
    <button
      className="p-3 rounded bg-green-400 hover:bg-green-600"
      onClick={toggle}
    >
      Start
    </button>
  );
}
