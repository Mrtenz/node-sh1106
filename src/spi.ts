import { HIGH, LOW, spiWrite, write } from 'rpio';

const MAX_TRANSFER_LENGTH: number = 4096;

export const writeCommand = (...bytes: number[]) => {
  // Set to command mode
  write(24, LOW);

  const buffer = Buffer.from(bytes);
  spiWrite(buffer, buffer.length);
};

export const writeData = (...bytes: number[]) => {
  // Set to data mode
  write(24, HIGH);

  let i = 0;
  while (i < bytes.length) {
    const buffer = Buffer.from(bytes.slice(i, i + MAX_TRANSFER_LENGTH));
    spiWrite(buffer, buffer.length);
    i += MAX_TRANSFER_LENGTH;
  }
};
