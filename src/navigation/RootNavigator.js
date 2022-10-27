import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../view/Home/Home";
import Login from "../view/Login/Login";
import { CurvedBottomBar } from "react-native-curved-bottom-bar";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import AppDrawerContains from "./AppDrawerContains";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import AppRightDrawerScreen from "./AppRightDrawerScreen";
import AddPost from "../view/AddPost/AddPost";
import { StyleSheet, Animated, TouchableOpacity } from "react-native";

import colors from "../theme/colors";
import Favorite from "../view/Favorite/Favorite";
import Settings from "../view/Settings/Settings";
import Offer from "../view/Offer/Offer";
const Stack = createNativeStackNavigator();
const AppDrawerStack = createDrawerNavigator();
const AppRightDrawer = createDrawerNavigator();

const RootNavigator = () => {
  const _renderIcon = (routeName, selectedTab) => {
    let icon = "";

    switch (routeName) {
      case "Home":
        icon = "home";
        break;
      case "Offer":
        icon = "local-offer";
        break;
      case "Favorite":
        icon = "favorite";
        break;
      case "Settings":
        icon = "settings";
        break;
    }
    return (
      <MaterialIcons
        name={icon}
        size={25}
        color={routeName === selectedTab ? colors.red : colors.white}
      />
    );
  };

  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };
  const AppRightDrawerNavigator = () => {
    const navigation = useNavigation();
    return (
      <AppRightDrawer.Navigator
        id="RightDrawer"
        drawerContent={(props) => <AppRightDrawerScreen {...props} />}
        screenOptions={{
          headerShown: false,
          drawerPosition: "right",
          drawerType: "front",
        }}
      >
        <AppRightDrawer.Screen
          options={{
            headerBackVisible: false,
            headerShadowVisible: false,

            drawerIcon: () => null,
            headerStyle: {
              backgroundColor: "primary",
            },
          }}
          name="Home"
          component={HomeNavigator}
        />
        <AppRightDrawer.Screen component={AddPost} name="AddPost" />
      </AppRightDrawer.Navigator>
    );
  };

  const HomeNavigator = () => {
    return (
      <CurvedBottomBar.Navigator
        strokeWidth={0.5}
        strokeColor="#d5eded"
        height={55}
        circleWidth={55}
        bgColor={colors.primary}
        initialRouteName="Home"
        borderTopLeftRight
        screenOptions={() => ({
          headerShown: false,

        })}
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View style={styles.btnCircle}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
              }}
              onPress={() => navigate("AddPost")}
            >
              <Entypo name="plus" color="gray" size={25} />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBar.Screen name="Home" position="LEFT" component={Home} />
        <CurvedBottomBar.Screen
          name="Offer"
          position="LEFT"
          component={Offer}
        />
        <CurvedBottomBar.Screen
          name="Favorite"
          position="RIGHT"
          component={Favorite}
        />
        <CurvedBottomBar.Screen
          name="Settings"
          position="RIGHT"
          component={Settings}
        />
      </CurvedBottomBar.Navigator>
    );
  };
  const AppNavigator = () => {
    return (
      <AppDrawerStack.Navigator
        id="LeftDrawer"
        // icon={() => <Image src={require("./../assets/basement.png")} />}
        screenOptions={{
          headerShown: false,
          labelStyle: {
            fontSize: 16,
          },
          drawerPosition: "left",
          drawerType: "slide",
          drawerIcon: () => null,
        }}
        drawerContent={(props) => <AppDrawerContains {...props} />}
      >
        <AppDrawerStack.Screen
          component={AppRightDrawerNavigator}
          name="AppRightDrawer"
        />
      </AppDrawerStack.Navigator>
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="Login" component={Login} /> */}
      <Stack.Screen name="App" component={AppNavigator} />
    </Stack.Navigator>
  );
};
export default RootNavigator;

export const styles = StyleSheet.create({
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 4,
    bottom: 30,
  },
});
