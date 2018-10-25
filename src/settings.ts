type SupportedSize = '128x128' | '128x64' | '128x32';

type Settings = {
  [key in SupportedSize]: {
    multiplex: number;
    displayoffset: number;
  }
};

const settings: Settings = {
  '128x128': {
    multiplex: 0xff,
    displayoffset: 0x02
  },
  '128x64': {
    multiplex: 0x3f,
    displayoffset: 0x00
  },
  '128x32': {
    multiplex: 0x20,
    displayoffset: 0x0f
  }
};

export const get = (width: number, height: number) => {
  const size = `${width}x${height}` as SupportedSize;
  if (settings[size]) {
    return settings[size];
  }
  throw new Error(`${size} is not supported`);
};
