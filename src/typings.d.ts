/**
 * Very incomplete and/or inaccurate definitions for `node-rpio`. Made specifically for this project.
 * https://github.com/jperkin/node-rpio
 */
declare module 'rpio' {
  interface Options {
    gpiomem?: boolean;
    mapping?: 'physical' | 'gpio';
  }

  type PinState = 0x0 | 0x1;
  export const LOW: PinState;
  export const HIGH: PinState;

  type SelectMode = 0x0 | 0x1 | 0x2;
  export const INPUT: SelectMode;
  export const OUTPUT: SelectMode;
  export const PWN: SelectMode;

  type PullState = 0x0 | 0x1 | 0x2;
  export const PULL_OFF: PullState;
  export const PULL_DOWN: PullState;
  export const PULL_UP: PullState;

  type PollState = 0x1 | 0x2 | 0x3;
  export const POLL_LOW: PollState;
  export const POLL_HIGH: PollState;
  export const POLL_BOTH: PollState;

  export const PIN_PRESERVE = 0x0;
  export const PIN_RESET = 0x1;

  export function init(options: Options): void;

  export function open(pin: number, type: any, pullState?: PullState): void;

  export function write(pin: number, state: PinState): void;

  export function poll(pin: number, callback: (pin: number) => void): void;

  export function read(pin: number): PinState;

  type ResetState = 0x0 | 0x1;
  export function close(pin: number, reset?: ResetState): void;

  export function spiBegin(): void;

  export function spiChipSelect(chip: number): void;

  export function spiSetCSPolarity(chip: number, state: PinState): void;

  export function spiSetClockDivider(divider: number): void;

  export function spiSetDataMode(mode: 0 | 1 | 2 | 3): void;

  export function spiTransfer(buffer: Buffer, responseBuffer: Buffer, length: number): void;

  export function spiWrite(buffer: Buffer, length: number): void;

  export function spiEnd(): void;
}
