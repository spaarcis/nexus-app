import { ImgGradint } from "@/assets/images/image"
import tw from "@/lib/tailwind"
import { _HIGHT, _Width } from "@/utils/utils"
import { type DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer"
import { ImageBackground } from "expo-image"
import { router } from "expo-router"
import { Drawer } from "expo-router/drawer"
import { Image, Text, TouchableOpacity, View } from "react-native"

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView showsVerticalScrollIndicator={false} {...props} style={tw`bg-slate-900 flex-1`}>
      {/* Background Image */}
      <ImageBackground
        source={ImgGradint}
        resizeMode="cover"
        style={{
          width: _Width,
          height: _HIGHT,
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "#000000"

        }}
      />
      {/* Header Section */}
      <View style={tw`flex-row items-center justify-between px-6 pt-5 pb-10`}>
        <View style={tw`flex-row items-center`}>
          <View style={tw`w-8 h-8 bg-gray-400 rounded mr-3`}>{/* Logo placeholder */}</View>
          <Text style={tw`text-white text-xl font-bold tracking-wider`}>NEXUS</Text>
        </View>
        <TouchableOpacity onPress={() => props?.navigation?.closeDrawer()} style={tw`p-2`}>
          <Text style={tw`text-red-500 text-xl font-bold`}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* User Profile Section */}
      <View style={tw`px-6 mb-8`}>
        <View style={tw`flex-row items-center mb-4`}>
          <View style={tw`w-12 h-12 rounded-full bg-gray-300 mr-3 overflow-hidden`}>
            <Image source={{ uri: "/diverse-profile-avatars.png" }} style={tw`w-full h-full`} />
          </View>
          <View>
            <Text style={tw`text-white text-lg font-semibold`}>Christiano Ronaldo</Text>
            <Text style={tw`text-gray-400 text-sm`}>sul234@gmail.com</Text>
          </View>
        </View>
      </View>

      {/* Account Section */}
      <View style={tw`px-6`}>
        <Text style={tw`text-white text-xl font-semibold mb-6`}>Account</Text>

        {/* Menu Items */}
        <View style={tw`flex-col gap-4`}>
          <TouchableOpacity
            style={tw`flex-row items-center py-3`}
            onPress={() => {
              props.navigation.closeDrawer()
              router.push("/(allPages)/favoriteZone");
            }}
          >
            <Text style={tw`text-gray-300 text-base`}>Favorite Zone</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center py-3`}
            onPress={() => {
              props.navigation.closeDrawer()
              router.push("/(auth)/ChangePassword")
            }}
          >
            <Text style={tw`text-gray-300 text-base`}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center py-3`}
            onPress={() => {
              props.navigation.closeDrawer()
              router.push("/(allPages)/terms_conditions");
            }}
          >
            <Text style={tw`text-gray-300 text-base`}>Terms & Conditions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center py-3`}
            onPress={() => {
              props.navigation.closeDrawer()
              router.push("/(allPages)/privacy_policy");
            }}
          >
            <Text style={tw`text-gray-300 text-base`}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center py-3`}
            onPress={() => {
              props.navigation.closeDrawer()
              // Handle delete account
            }}
          >
            <Text style={tw`text-red-500 text-base`}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Log Out Button */}
      <View style={tw`flex-1 justify-end px-6 pb-8`}>
        <TouchableOpacity
          style={tw`flex-row items-center py-4`}
          onPress={() => {
            props.navigation.closeDrawer()
            router.push("/(auth)/Login")
          }}
        >
          <Text style={tw`text-red-500 text-base mr-2`}>🚪</Text>
          <Text style={tw`text-red-500 text-base font-medium`}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  )
}

const DrawerLayout = () => {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: "Home",
          title: "overview",
        }}
      />
    </Drawer>
  )
}

export default DrawerLayout
