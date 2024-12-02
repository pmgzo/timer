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
  return state === ButtonState.started ? (
    <button
      className="p-3 rounded bg-yellow-400 hover:bg-yellow-600"
      onClick={toggle}
    >
      Pause
    </button>
  ) : state === ButtonState.paused ? (
    <button
      className="p-3 rounded bg-green-700 hover:bg-green-800"
      onClick={toggle}
    >
      Resume
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
