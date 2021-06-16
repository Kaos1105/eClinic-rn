import Reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-community/async-storage'

Reactotron
  .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({ host: '192.168.0.104' }) // controls connection & communication settings
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate|127.0.0.1|192.168.0.104:19000/,
    },
  }) // add all built-in react native plugins
  .connect() // let's connect!