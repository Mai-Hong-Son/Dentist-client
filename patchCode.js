const fs = require('fs');
const packageJson = require('./package.json');

const reactNativeNavigationVersion = packageJson.dependencies['react-native-navigation'];

if (reactNativeNavigationVersion.match(/(>|\^|~)2\.\d+\.\d+/)) {
  console.log('react-native-navigation: Version 2');
} else {
  const patchConfig = [
    {
      filePath: 'node_modules/react-native-navigation/ios/RCCViewController.m',
      patches: [
        {
          src: `if (self.view != nil){
        RCTRootView *rootView = self.view;
        NSString *screenName = [rootView moduleName];`,
          transform: `//    if (self.view != nil){
//        RCTRootView *rootView = self.view;
//        NSString *screenName = [rootView moduleName];
      if ([self.view isKindOfClass:[RCTRootView class]]){
        NSString *screenName = [((RCTRootView *)self.view) moduleName];`
        },
        {
          src: `if (self.view != nil) {
        RCTRootView *rootView = self.view;`,
          transform: `//    if (self.view != nil) {
//        RCTRootView *rootView = self.view;

      if ([self.view isKindOfClass:[RCTRootView class]]) {
        RCTRootView *rootView = (RCTRootView *)self.view;`
        }
      ]
    },
    {
      filePath:
        'node_modules/react-native-navigation/android/app/src/main/java/com/reactnativenavigation/params/parsers/ScreenParamsParser.java',
      patches: [
        {
          src: 'result.timestamp = params.getDouble(KEY_TIMESTAMP);',
          transform: `Object timestampObj = params.get(KEY_TIMESTAMP);
        if(timestampObj instanceof Integer) {
            result.timestamp = ((int) timestampObj) * 1.0;
        }else if (timestampObj instanceof Double){
            result.timestamp = (double) timestampObj;
        }`
        }
      ]
    },
    {
      filePath: 'node_modules/react-native/local-cli/server/util/webSocketProxy.js',
      patches: [
        {
          src: `try {
      dest.send(message);
    } catch (e) {
      console.warn(e);
      // Sometimes this call throws 'not opened'
    }`,
          transform: `try {
      dest.send(message);
    } catch (e) {
      // console.warn(e);
      // Sometimes this call throws 'not opened'
    }`
        }
      ]
    },
    {
      filePath: 'node_modules/react-native-onesignal/android/build.gradle',
      patches: [
        {
          src: "exclude group: 'com.android.support'",
          transform: `exclude group: 'com.android.support'
        exclude group: 'com.google.android.gms'`
        }
      ]
    },
    {
      filePath: './node_modules/react-native-fbsdk/android/build.gradle',
      patches: [
        {
          src: 'com.facebook.android:facebook-android-sdk:4.+',
          transform: 'com.facebook.android:facebook-android-sdk:4.37.0'
        }
      ]
    }
  ];

  patchConfig.forEach(({ filePath, patches }) => {
    if (fs.existsSync(filePath)) {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          return console.log(err);
        }
        let result = data;
        patches.forEach(patch => {
          result = result.replace(patch.src, patch.transform);
        });
        if (result.length !== data.length) {
          console.log(
            result
              .split('\n')
              .map((line, index) => `${index + 1}\t${line}`)
              .join('\n')
          );

          // now write back
          fs.writeFile(filePath, result, 'utf8', err => {
            if (err) return console.log(err);
          });
        }
      });
    }
  });
}
