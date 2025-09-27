import { ImgGradint } from "@/assets/images/image";
import DeleteAccountModal from "@/components/shear/DeleteAccountModal";
import { IconLogo, IconLogoIcon, IconLogout } from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import { useLogoutMutation } from "@/redux/apiSlices/authApiSlices";
import { useUser_profileQuery } from "@/redux/apiSlices/home/homeSlice";
import { _HIGHT, _Width } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  type DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

interface CustomDrawerProps extends DrawerContentComponentProps {
  onDeleteAccount: () => void;
}

function CustomDrawerContent(props: CustomDrawerProps) {
  const { data: user, isLoading } = useUser_profileQuery({});
  const [logout] = useLogoutMutation();
  if (isLoading) {
    <View>
      <Text>loading...</Text>
    </View>;
  }
  const handleLogout = async () => {
    const res = await logout().unwrap();
    console.log(res, "logout status");
    if (res.status) {
      router.push("/(auth)/Login");
      AsyncStorage.removeItem("token");
      router.push({
        pathname: "/Toaster",
        params: { res: res.message },
      });
    }
  };
  return (
    <DrawerContentScrollView
      showsVerticalScrollIndicator={false}
      {...props}
      style={tw`bg-slate-900 flex-1`}
    >
      {/* Background Image */}
      <ImageBackground
        source={ImgGradint}
        style={{
          width: _Width,
          height: _HIGHT,
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "#000000",
        }}
      />
      {/* Header Section */}
      <View style={tw`flex-row items-center justify-between px-6 pt-5 `}>
        <View style={tw`flex-row items-center gap-3`}>
          <SvgXml xml={IconLogoIcon} />
          <SvgXml xml={IconLogo} />
        </View>
        <TouchableOpacity
          onPress={() => props?.navigation?.closeDrawer()}
          style={tw`p-2`}
        >
          <Text style={tw`text-red-500 text-xl font-bold`}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`flex-col justify-between h-full`}>
        {/* User Profile Section */}
        <View style={tw`px-6 py-12`}>
          <View style={tw`flex-row items-center mb-4`}>
            <View
              style={tw`w-12 h-12 rounded-full bg-gray-300 mr-3 overflow-hidden`}
            >
              <Image source={user?.data?.avatar} style={tw`w-full h-full`} />
            </View>
            <View>
              <Text style={tw`text-white text-lg font-semibold`}>
                {user?.data?.name ?? "User"}
              </Text>
              <Text style={tw`text-gray-400 text-sm`}>{user?.data?.email}</Text>
            </View>
          </View>
        </View>

        {/* Account Section */}
        <View style={tw`px-6`}>
          <Text style={tw`text-white text-xl font-semibold mb-6`}>Account</Text>

          {/* Menu Items */}
          <View style={tw`flex-col gap-4`}>
            <TouchableOpacity
              style={tw`flex-row items-center py-1`}
              onPress={() => {
                props.navigation.closeDrawer();
                router.push("/(allPages)/favoriteZone");
              }}
            >
              <Text style={tw`text-gray-300 text-base`}>Favorite Zone</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`flex-row items-center py-1`}
              onPress={() => {
                props.navigation.closeDrawer();
                router.push("/(auth)/ChangePassword");
              }}
            >
              <Text style={tw`text-gray-300 text-base`}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`flex-row items-center py-1`}
              onPress={() => {
                props.navigation.closeDrawer();
                router.push("/(allPages)/terms_conditions");
              }}
            >
              <Text style={tw`text-gray-300 text-base`}>
                Terms & Conditions
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`flex-row items-center py-1`}
              onPress={() => {
                props.navigation.closeDrawer();
                router.push("/(allPages)/privacy_policy");
              }}
            >
              <Text style={tw`text-gray-300 text-base`}>Privacy Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`flex-row items-center py-1`}
              onPress={() => {
                props.navigation.closeDrawer();
                props.onDeleteAccount();
              }}
            >
              <Text style={tw`text-red-500 text-base`}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Log Out Button */}
        <View style={tw`flex-1 justify-end px-6 mt-20`}>
          <TouchableOpacity
            style={tw`flex-row items-center py-4 gap-3`}
            onPress={() => {
              props.navigation.closeDrawer();
              handleLogout();
            }}
          >
            <SvgXml xml={IconLogout} />
            <Text style={tw`text-red-500 text-base font-medium`}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const DrawerLayout = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteAccount = async (password: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/(auth)/Login");
    } catch (error) {}
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password screen
    setShowDeleteModal(false);
    // router.push("/(auth)/ForgotPassword");
  };

  return (
    <>
      <Drawer
        drawerContent={(props) => (
          <CustomDrawerContent
            {...props}
            onDeleteAccount={() => setShowDeleteModal(true)}
          />
        )}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen
          name="Homes"
          options={{
            drawerLabel: "Home",
            title: "overview",
          }}
        />
      </Drawer>

      <DeleteAccountModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirmDelete={handleDeleteAccount}
        onForgotPassword={handleForgotPassword}
      />
    </>
  );
};

export default DrawerLayout;
