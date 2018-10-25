/**
 * Byte constants for sh1106 commands.
 */
export const DISPLAYOFF = 0xae;
export const DISPLAYON = 0xaf;
export const DISPLAYALLON = 0xa5;
export const DISPLAYALLON_RESUME = 0xa4;
export const NORMALDISPLAY = 0xa6;
export const INVERTDISPLAY = 0xa7;
export const SETREMAP = 0xa0;
export const SETMULTIPLEX = 0xa8;
export const SETCONTRAST = 0x81;
export const CHARGEPUMP = 0x8d;
export const COLUMNADDR = 0x21;
export const COMSCANDEC = 0xc8;
export const COMSCANINC = 0xc0;
export const EXTERNALVCC = 0x1;
export const MEMORYMODE = 0x20;
export const PAGEADDR = 0x22;
export const SETCOMPINS = 0xda;
export const SETDISPLAYCLOCKDIV = 0xd5;
export const SETDISPLAYOFFSET = 0xd3;
export const SETHIGHCOLUMN = 0x10;
export const SETLOWCOLUMN = 0x00;
export const SETPRECHARGE = 0xd9;
export const SETSEGMENTREMAP = 0xa1;
export const SETSTARTLINE = 0x40;
export const SETVCOMDETECT = 0xdb;
export const SWITCHAPVCC = 0x2;

/**
 * GPIO pins.
 */
export const DC_PIN = 24;
export const RST_PIN = 25;
