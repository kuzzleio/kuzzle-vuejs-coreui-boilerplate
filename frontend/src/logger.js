import VueLogger from 'vuejs3-logger';
const isProduction = process.env.NODE_ENV === 'production';

const options = {
  isEnabled: true,
  logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true
};

export default { logger: VueLogger, options };
