import { PixelMap } from 'binary-pixel-map';
import {
  init,
  spiBegin,
  spiEnd,
  close,
  spiChipSelect,
  spiSetClockDivider,
  open,
  OUTPUT,
  LOW,
  write,
  HIGH
} from 'rpio';
import { writeCommand, writeData } from './spi';
import { get } from './settings';
import {
  CHARGEPUMP,
  DC_PIN,
  DISPLAYALLON_RESUME,
  DISPLAYOFF,
  DISPLAYON,
  MEMORYMODE,
  NORMALDISPLAY,
  RST_PIN,
  SETCOMPINS,
  SETCONTRAST,
  SETDISPLAYCLOCKDIV,
  SETDISPLAYOFFSET,
  SETHIGHCOLUMN,
  SETLOWCOLUMN,
  SETMULTIPLEX,
  SETPRECHARGE,
  SETSEGMENTREMAP,
  SETVCOMDETECT
} from './constants';

export class SH1106 {
  readonly width: number;
  readonly height: number;
  readonly canvas: PixelMap;

  constructor(width = 128, height = 64) {
    this.width = width;
    this.height = height;
    this.canvas = new PixelMap(width, height);

    this.initialize();
  }

  /**
   * Turn the display on.
   */
  show(): void {
    writeCommand(DISPLAYON);
  }

  /**
   * Turn the display off.
   */
  hide(): void {
    writeCommand(DISPLAYOFF);
  }

  /**
   * Set the contrast.
   * @param level
   */
  contrast(level: number): void {
    writeCommand(SETCONTRAST, level);
  }

  /**
   * Close the device.
   */
  close() {
    spiEnd();
    close(DC_PIN);
    close(RST_PIN);
  }

  /**
   * Write the current canvas to the display.
   */
  refresh(): void {
    const imageData = this.canvas.toArray().reverse();
    const pixelsPerPage = this.width * 8;
    const buffer = Buffer.alloc(this.width);

    let setPageAddress = 0xb0;
    for (let y = 0; y < 8 * pixelsPerPage; y += pixelsPerPage) {
      writeCommand(setPageAddress, 0x02, 0x10);
      setPageAddress++;

      const offsets: number[] = [];
      for (let i = 0; i < 8; i++) {
        offsets.push(y + this.width * i);
      }

      for (let x = 0; x < this.width; x++) {
        buffer[x] =
          (+imageData[x + offsets[0]] && 0x01) |
          (+imageData[x + offsets[1]] && 0x02) |
          (+imageData[x + offsets[2]] && 0x04) |
          (+imageData[x + offsets[3]] && 0x08) |
          (+imageData[x + offsets[4]] && 0x10) |
          (+imageData[x + offsets[5]] && 0x20) |
          (+imageData[x + offsets[6]] && 0x40) |
          (+imageData[x + offsets[7]] && 0x80);
      }

      writeData(...buffer);
    }
  }

  private initialize(): void {
    // Initialize GPIO
    init({
      gpiomem: false,
      mapping: 'gpio'
    });

    open(DC_PIN, OUTPUT);
    open(RST_PIN, OUTPUT);
    write(RST_PIN, LOW);
    write(RST_PIN, HIGH);

    spiBegin();
    spiChipSelect(0);
    spiSetClockDivider(32);

    const settings = get(this.width, this.height);

    // Initialize controller
    writeCommand(
      DISPLAYOFF,
      MEMORYMODE,
      SETHIGHCOLUMN,
      0xb0,
      0xc8,
      SETLOWCOLUMN,
      0x10,
      0x40,
      SETSEGMENTREMAP,
      NORMALDISPLAY,
      SETMULTIPLEX,
      settings.multiplex,
      DISPLAYALLON_RESUME,
      SETDISPLAYOFFSET,
      settings.displayoffset,
      SETDISPLAYCLOCKDIV,
      0xf0,
      SETPRECHARGE,
      0x22,
      SETCOMPINS,
      0x12,
      SETVCOMDETECT,
      0x20,
      CHARGEPUMP,
      0x14
    );

    // Set contract and turn on display
    this.contrast(0x7f);
    this.show();
  }
}
