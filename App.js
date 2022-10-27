import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import { NativeBaseProvider,extendTheme } from "native-base";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./src/store";
import RootNavigator from "./src/navigation/RootNavigator";
import LoadingScreen from "./src/view/LoadingScreen.js/LoadingScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import nativeBaseTheme from "./src/theme/nativeBaseTheme";
const theme = extendTheme({
  ...nativeBaseTheme,
});
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FAFAFA",
  },
};
function App() {
  const [fontsLoaded] = useFonts({
    "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-BoldItalic": require("./assets/fonts/OpenSans-BoldItalic.ttf"),
    "OpenSans-ExtraBold": require("./assets/fonts/OpenSans-ExtraBold.ttf"),
    "OpenSans-ExtraBoldItalic": require("./assets/fonts/OpenSans-ExtraBoldItalic.ttf"),
    "OpenSans-Italic": require("./assets/fonts/OpenSans-Italic.ttf"),
    "OpenSans-Light": require("./assets/fonts/OpenSans-Light.ttf"),
    "OpenSans-LightItalic": require("./assets/fonts/OpenSans-LightItalic.ttf"),
    "OpenSans-Medium": require("./assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-MediumItalic": require("./assets/fonts/OpenSans-MediumItalic.ttf"),
    "OpenSans-SemiBold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-SemiBoldItalic": require("./assets/fonts/OpenSans-SemiBoldItalic.ttf"),
  });

  React.useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <StatusBar style="dark" />
          <NavigationContainer theme={MyTheme}>
            <RootNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
}
export default App;
