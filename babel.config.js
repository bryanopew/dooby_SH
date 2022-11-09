module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootpathPrefix: '~',
        rootPathSuffix: 'src',
      },
    ],
    'babel-plugin-styled-components',
    'react-native-reanimated/plugin',
  ],
};
