import { clear } from "./render";
import { Clock } from "./Clock";
import { InspectableMachine } from "./StackMachine";

export interface Parser<E> {
    parse(input: string): E;
}

export interface Compiler<E, I> {
    compile(expression: E): void;
    getInstructions(): readonly I[];
}

export interface Renderer<I, V, M extends InspectableMachine<I, V>> {
    machine: M;

    load(instructions: readonly I[]): void;
    step(): void;
    reset(): void;
}

const enum State {
    Initial,
    Ready,
    Running,
    Halted,
    Error,
}

type SetState = (action: State | ((s: State) => State)) => void;

export function useClockMachine(advance: (setState: SetState) => void, onStateChange: (s: State) => void) {
    let state: State;

    const setState: SetState = (action) => {
        const nextState = typeof action === "function" ? action(state) : action;
        if (nextState === state) return;
        state = nextState;
        if (state === State.Running) {
            clock.start();
        } else {
            clock.stop();
        }
        onStateChange(state);
    };

    const clock = new Clock(2, () => {
        advance(setState);
    });

    return setState;
}

export function buildExample<ES, E, I, V, C extends Compiler<E, I>, M extends InspectableMachine<I, V>>(
    id: string,
    Parser: new () => Parser<ES>,
    Compiler: new () => C,
    Renderer: new (container: HTMLElement) => Renderer<I, V, M>,
    elaborate: (expression: ES) => E,
    toHtml: (container: HTMLElement, expression: ES) => void,
    getFinalExpression?: (compiler: C, machine: M) => ES,
) {
    const input = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(`#${id}__input`)!;
    const parsedOutput = document.querySelector<HTMLPreElement>(`#${id}__parsed`)!;
    const errorMessage = document.querySelector<HTMLPreElement>(`#${id}__errors`)!;
    const haltedMessage = getFinalExpression ? document.querySelector<HTMLPreElement>(`#${id}__halted`)! : null;

    const parser = new Parser();
    const compiler = new Compiler();
    const renderer = new Renderer(document.querySelector(`#${id}`)!);

    const loadButton = document.querySelector<HTMLButtonElement>(`#${id}__load-btn`)!;
    const runButton = document.querySelector<HTMLButtonElement>(`#${id}__run-btn`)!;
    const stepButton = document.querySelector<HTMLButtonElement>(`#${id}__step-btn`)!;
    const resetButton = document.querySelector<HTMLButtonElement>(`#${id}__reset-btn`)!;

    const advance = (setState: SetState) => {
        try {
            renderer.step();
        } catch (e) {
            errorMessage.innerText = String(e);
            setState(State.Error);
            return;
        }
        if (renderer.machine.hasHalted) {
            if (getFinalExpression && haltedMessage) {
                clear(haltedMessage);
                toHtml(haltedMessage, getFinalExpression(compiler, renderer.machine));
            }
            setState(State.Halted);
        }
    };

    const setState = useClockMachine(advance, (state) => {
        runButton.innerText = state === State.Running ? "Pause" : "Run";
        runButton.disabled = state === State.Initial || state === State.Halted || state === State.Error;
        stepButton.disabled =
            state === State.Initial || state === State.Running || state === State.Halted || state === State.Error;
        resetButton.disabled = state === State.Initial;
    });

    loadButton.addEventListener("click", () => {
        try {
            const parsed = parser.parse(input.value);
            clear(parsedOutput);
            toHtml(parsedOutput, parsed);
            const expr = elaborate(parsed);
            compiler.compile(expr);
            renderer.load(compiler.getInstructions());
            if (haltedMessage) clear(haltedMessage);
            clear(errorMessage);
            setState(State.Ready);
        } catch (e) {
            clear(parsedOutput);
            errorMessage.innerText = String(e);
            setState(State.Error);
        }
    });
    runButton.addEventListener("click", () =>
        setState((state) => (state === State.Running ? State.Ready : State.Running)),
    );
    stepButton.addEventListener("click", () => advance(setState));
    resetButton.addEventListener("click", () => {
        renderer.reset();
        if (haltedMessage) clear(haltedMessage);
        clear(errorMessage);
        setState(State.Ready);
    });

    setState(State.Initial);
}
