;
import tw from "@/lib/tailwind";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Text, TouchableOpacity, View } from "react-native";


function CustomDrawerContent(props: DrawerContentComponentProps) {

  return (
    <DrawerContentScrollView
      showsVerticalScrollIndicator={false}
      {...props}
      style={tw``}
    >
      {/* Header Section */}
      <View style={tw`flex-row items-center justify-between pb-5`}>
        <Text style={tw`dark:text-primary text-2xl font-normal`}>
          NEXUS
        </Text>
        <TouchableOpacity
          onPress={() => props?.navigation?.closeDrawer()}
          style={tw`bg-primary dark:bg-darkPrimary p-6 rounded-full`}
        >
          {/* <SvgXml xml={colorScheme === "dark" ? IconCloseDark : IconClose} /> */}
        </TouchableOpacity>
      </View>

      {/* User Profile Section */}
      <View style={tw`bg-primary dark:bg-darkPrimary rounded-xl p-4 mb-4`}>
        <Text style={tw`dark:text-primary text-lg font-semibold`}>
          Christiano Ronaldo
        </Text>
      </View>

      {/* Menu Items */}
      <View style={tw`flex-col gap-2`}>
        <TouchableOpacity
          style={tw`flex-row items-center p-4 rounded-lg bg-primary dark:bg-darkPrimary`}
          onPress={() => {
            props.navigation.closeDrawer();
            // router.push("/favorites");
          }}
        >
          {/* <SvgXml xml={colorScheme === "dark" ? IconUserProfileDark : IconUserProfile} /> */}
          <Text style={tw`dark:text-primary ml-4 text-lg`}>Favorite Zone</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-row items-center p-4 rounded-lg bg-primary dark:bg-darkPrimary`}
          onPress={() => {
            props.navigation.closeDrawer();
            // router.push("/change-password");
          }}
        >
          {/* <SvgXml xml={colorScheme === "dark" ? IconSettingDark : IconSetting} /> */}
          <Text style={tw`dark:text-primary ml-4 text-lg`}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-row items-center p-4 rounded-lg bg-[#FFDDDD]`}
          onPress={() => {
            props.navigation.closeDrawer();
            router.push("/(auth)/Login");
          }}
        >
          {/* <SvgXml xml={IconLogout} /> */}
          <Text style={tw`text-[#FF3737] ml-4 text-lg`}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const Drawerlayout = () => {


  return (

    <Drawer

      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: "Home",
          title: "overview",
        }}
      />
    </Drawer>

  );
};

export default Drawerlayout;
