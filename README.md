# node-sh1106

Node.js library to interact with a SH1106 display controller, written in TypeScript. This library is designed to be used with a Raspberry Pi, but may be supported by other devices.

This library is largely based on the Python libraries [luma.core](https://github.com/rm-hull/luma.core) and [luma.oled](https://github.com/rm-hull/luma.oled).

Currently only SPI is supported. This means that you need to run it with `sudo` for it to work. I²C support may be added in the future.

## Installation

```
yarn add sh1106
```

## Usage

```typescript
import { SH1106 } from 'sh1106';

const pad = (input: number): string => {
  return ('0' + input).slice(-2);
};

const getDate = () => {
  const date = new Date();

  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

const device = new SH1106();

setInterval(() => {
  // Clear the canvas
  device.canvas.clear();
  
  // Draw the current time at [1, 1] with a size of 2
  device.canvas.text(1, 1, getDate(), 2);
  
  // Update the display
  device.refresh();
}, 1000);
```

See [Mrtenz/binary-pixel-map](https://github.com/Mrtenz/binary-pixel-map#binary-pixel-map) for documentation on the canvas.

## API

```typescript
new SH1106(width: number = 128, height: number = 64);
```
