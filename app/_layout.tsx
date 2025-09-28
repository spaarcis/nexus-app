import ThemeProvider from "@/context/ThemeProvider";
import tw from "@/lib/tailwind";
import store from "@/redux/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { useDeviceContext } from "twrnc";

export default function RootLayout() {
  const [loaded] = useFonts({
    PoppinsBlack: require("@/assets/fonts/Poppins-Black.ttf"),
    PoppinsBlackItalic: require("@/assets/fonts/Poppins-BlackItalic.ttf"),
    PoppinsBold: require("@/assets/fonts/Poppins-Bold.ttf"),
    PoppinsBoldItalic: require("@/assets/fonts/Poppins-BoldItalic.ttf"),
    PoppinsExtraBold: require("@/assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsExtraBoldItalic: require("@/assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    PoppinsExtraLight: require("@/assets/fonts/Poppins-ExtraLight.ttf"),
    PoppinsExtraLightItalic: require("@/assets/fonts/Poppins-ExtraLightItalic.ttf"),
    PoppinsItalic: require("@/assets/fonts/Poppins-Italic.ttf"),
    PoppinsLight: require("@/assets/fonts/Poppins-Light.ttf"),
    PoppinsLightItalic: require("@/assets/fonts/Poppins-LightItalic.ttf"),
    PoppinsMedium: require("@/assets/fonts/Poppins-Medium.ttf"),
    PoppinsMediumItalic: require("@/assets/fonts/Poppins-MediumItalic.ttf"),
    PoppinsRegular: require("@/assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("@/assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsSemiBoldItalic: require("@/assets/fonts/Poppins-SemiBoldItalic.ttf"),
    PoppinsThin: require("@/assets/fonts/Poppins-Thin.ttf"),
    PoppinsThinItalic: require("@/assets/fonts/Poppins-ThinItalic.ttf"),
  });
  useDeviceContext(tw);
  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <Provider store={store}>
        <Stack
          screenOptions={{
            headerShown: false,
            statusBarStyle: "light",
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(allPages)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="Main" />
          <Stack.Screen name="details/RoomDetails/[id]" />
          <Stack.Screen name="details/SeatPosotion/[allData]" />
          <Stack.Screen name="details/BookingsDetails/[id]" />
          <Stack.Screen
            name="Toaster"
            options={{
              sheetAllowedDetents: "fitToContents",
              presentation: "formSheet",
            }}
          />
        </Stack>
      </Provider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
