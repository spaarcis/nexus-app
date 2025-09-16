import { ImgGradint, nextStation, profileImg } from "@/assets/images/image";
import { CarouselCard } from "@/components/shear/Carousel";
import CustomButton from "@/components/shear/CustomButton";
import { CardSkeleton } from "@/components/skeleton/CardSkeleton";
import {
  IconCleander,
  IconDower,
  IconHand,
  Iconhoure,
  IconLoction,
  IconNotification,
  IconSeaall,
  IconsExplore,
  IconTime,
} from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import {
  useNewly_addedQuery,
  usePopular_zoneQuery,
} from "@/redux/apiSlices/home/homeSlice";
import { _HIGHT, _Width } from "@/utils/utils";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { router, useNavigation } from "expo-router";
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

const Home = () => {
  const navigation = useNavigation();
  const { data: populer, isLoading: populerLoading } = usePopular_zoneQuery({});
  const { data: newlyData, isLoading: newlyLoading } = useNewly_addedQuery({});
  return (
    <View style={tw` flex-1`}>
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

      <ScrollView contentContainerStyle={tw` px-6 py-9 `}>
        {/* header */}
        <View>
          <View style={tw`flex-row items-center justify-between  gap-3`}>
            <View style={tw`flex-row items-center gap-3`}>
              <TouchableOpacity
                onPress={() => {
                  (navigation as any)?.openDrawer();
                }}
              >
                <SvgXml xml={IconDower} />
              </TouchableOpacity>
              <Text style={tw`text-primary font-poppinsSemiBold text-2xl`}>
                Hi, Suuu
              </Text>
              <SvgXml xml={IconHand} />
            </View>
            <View style={tw`flex-row gap-3 mt-2  items-center `}>
              <TouchableOpacity
                onPress={() => router.push("/(allPages)/notifications")}
              >
                <SvgXml xml={IconNotification} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/Main/Homes/Profile")}
              >
                <Image source={profileImg} style={tw`w-11 h-11`} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw`flex-row gap-3 mt-1  items-center px-7`}>
            <SvgXml xml={IconLoction} />
            <Text style={tw`text-secondary font-poppins `}>
              Los Angles, USA
            </Text>
          </View>
        </View>
        {/* Explore banner */}
        <View style={tw`text-primary overflow-hidden rounded-[40px] mt-10`}>
          <BlurView style={tw` p-5`} intensity={10} tint="light">
            <Text
              style={tw`text-primary text-lg font-poppinsSemiBold text-center`}
            >
              Explore Gaming Rooms. Easily find setups nearby by game, time or
              location.
            </Text>

            <TouchableOpacity
              style={tw` relative mt-4`}
              // onPress={() => router.push("/Main/Homes/explore")}
              onPress={() =>
                router.push({
                  pathname: "/Toaster",
                  params: { res: "this is a massage" },
                })
              }
            >
              <CustomButton />
              <SvgXml
                style={tw`absolute right-[30%] top-4`}
                xml={IconsExplore}
              />
            </TouchableOpacity>
          </BlurView>
        </View>
        {/* Carousel  Popular Zone  */}
        <View style={tw`flex-row items-center justify-between pt-3 pb-3 `}>
          <Text style={tw`text-primary text-lg font-poppinsBold`}>
            Popular Zone
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/(allPages)/popularZone");
            }}
          >
            <SvgXml xml={IconSeaall} />
          </TouchableOpacity>
        </View>
        {populerLoading ? (
          <CardSkeleton />
        ) : (
          <CarouselCard data={populer?.data?.data} />
        )}

        <View
          style={[
            tw``,
            {
              width: _Width * 0.3,
            },
          ]}
        ></View>
        <Text style={tw`text-primary py-2 text-lg font-poppinsBold`}>
          Your Next Station
        </Text>
        {/* Your Next Station */}
        <View style={tw`mb-4`}>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/details/BookingsDetails/[id]",
                params: {
                  id: 4,
                  status: "Upcoming",
                },
              })
            }
            style={tw`mb-2`}
          >
            <BlurView
              style={tw` p-5 border  rounded-3xl overflow-hidden flex-row items-center gap-4`}
              intensity={10}
              tint="light"
            >
              <Image
                source={nextStation}
                style={[tw`h-20 w-20 rounded-2xl`, {}]}
              ></Image>
              <View style={tw`flex-1 items-start  justify-center`}>
                <Text style={tw`text-white font-bold text-lg`}>
                  Mumba Esport House
                </Text>

                {/* Date and Time */}
                <View style={tw`flex-row items-center mt-1 gap-1`}>
                  <SvgXml xml={IconCleander} />
                  <Text style={tw`text-white ml-2`}>9 June, 2025</Text>
                  <SvgXml xml={IconTime} />
                  <Text style={tw`text-white ml-1`}>10:00 AM</Text>
                </View>

                {/* Duration and Location */}
                <View style={tw`flex-row items-center mt-1 gap-1`}>
                  <SvgXml xml={Iconhoure} />
                  <Text style={tw`text-white ml-2`}>2 - Hour</Text>
                  <SvgXml xml={IconLoction} />
                  <Text style={tw`text-white ml-1`}>New York, USA</Text>
                </View>
              </View>
            </BlurView>
          </TouchableOpacity>
        </View>
        {/* Carousel Newly Added */}
        <View style={tw`flex-row items-center justify-between `}>
          <Text style={tw`text-primary pb-3 text-lg font-poppinsBold`}>
            Newly Added
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/(allPages)/afterFilterPage");
            }}
          >
            <SvgXml xml={IconSeaall} />
          </TouchableOpacity>
        </View>

        <View style={tw`mb-32`}>
          {newlyLoading ? (
            <CardSkeleton />
          ) : (
            <CarouselCard data={newlyData?.data.data} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
