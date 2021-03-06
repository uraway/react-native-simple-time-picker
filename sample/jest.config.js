module.exports = {
  preset: 'react-native',
  testRegex: '/__tests__/.*.test.(js|ts|tsx)?$',
  transformIgnorePatterns: ['node_modules/?!(@react-native-picker/picker)'],
  setupFiles: ['./__tests__/setup.js'],
};
