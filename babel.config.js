module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            stores: './src/stores',
            models: './src/models',
            service: './src/service',
            navigations: './src/navigations',
            screen: './src/screens'
          }
        }], ["module:react-native-dotenv", {
          "moduleName": "@env",
          "path": ".env",
          "blacklist": null,
          "whitelist": null,
          "safe": false,
          "allowUndefined": true
        }]]
  };
};

