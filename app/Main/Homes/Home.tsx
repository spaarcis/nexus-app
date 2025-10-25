import {
  IconAvaterBorder,
  IconCleander,
  IconDower,
  IconHand,
  IconLoction,
  IconNotification,
  IconTime,
  Iconhoure,
  IconsExplore,
} from "@/Icons/Icons";
import {
  useNewly_addedQuery,
  useNext_stationQuery,
  usePopular_zoneQuery,
} from "@/redux/apiSlices/home/homeSlice";
import { _HIGHT, _Width } from "@/utils/utils";
import { router, useNavigation } from "expo-router";
import {
  ActivityIndicator,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ImgGradint } from "@/assets/images/image";
import { CarouselCard } from "@/components/shear/Carousel";
import CustomButton from "@/components/shear/CustomButton";
import { BokCardSkeleton } from "@/components/skeleton/BokCardSkeleton";
import { CardSkeleton } from "@/components/skeleton/CardSkeleton";
import tw from "@/lib/tailwind";
import { useUser_profileQuery } from "@/redux/apiSlices/authApiSlices";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import { useNotificationsQuery } from "@/redux/apiSlices/notifications/notificationsSlices";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

const Home = () => {
  const navigation = useNavigation();
  const { data: populer, isLoading: populerLoading } = usePopular_zoneQuery({});
  const { data: newlyData, isLoading: newlyLoading } = useNewly_addedQuery({});
  const { data: nextStation, isLoading: nextStationLoading } =
    useNext_stationQuery({});
  const fetchNotifications = useNotificationsQuery({});
  const notificationsCounter =
    fetchNotifications?.data?.data?.unread_notifications_count;

  const { data: user, isLoading } = useUser_profileQuery({});
  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-base`}>
        <ActivityIndicator size="large" color="#0c8ce9" />
        <Text style={tw`mt-4 text-lg font-poppins text-gray-700`}>
          Loading...
        </Text>
      </View>
    );
  }
  console.log(populer?.data?.data, "jone");

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

      <ScrollView contentContainerStyle={tw` px-6 py-6 `}>
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
              <Text style={tw`text-primary font-poppinsSemiBold text-lg`}>
                Hi,{" "}
                {user?.data?.name?.length > 8
                  ? user?.data?.name?.slice(0, 8) + "..."
                  : user?.data?.name}
              </Text>
              <SvgXml xml={IconHand} />
            </View>
            <View style={tw`flex-row gap-3 mt-2  items-center `}>
              <TouchableOpacity
                onPress={() => router.push("/(allPages)/notifications")}
              >
                <SvgXml xml={IconNotification} />
                {notificationsCounter > 0 && (
                  <View
                    style={tw`absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center`}
                  >
                    <Text style={tw`text-white text-xs font-bold`}>
                      {notificationsCounter?.length > 9
                        ? "9+"
                        : notificationsCounter}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/Main/Homes/Profile")}
                style={tw`relative  `}
              >
                <SvgXml xml={IconAvaterBorder} />
                <Image
                  source={user?.data?.avatar}
                  style={tw`w-9 left-1 top-1 rounded-full h-9 absolute `}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Explore banner */}
        <View style={tw`text-primary overflow-hidden rounded-[40px] mt-5`}>
          <BlurView style={tw` p-5`} intensity={10} tint="light">
            <Text
              style={tw`text-primary text-lg font-poppinsSemiBold text-center`}
            >
              Explore Gaming Rooms. Easily find setups nearby by game, time or
              location.
            </Text>

            <TouchableOpacity
              style={tw` relative mt-4`}
              onPress={() => router.push("/Main/Homes/explore")}
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
            <MaskedView
              maskElement={
                <Text
                  style={[
                    tw`text-base font-semibold`,
                    { backgroundColor: "transparent" },
                  ]}
                >
                  See All
                </Text>
              }
            >
              <LinearGradient
                colors={["#6523E7", "#023CE3CC", "#6523E7CC"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
              >
                <Text style={tw` font-semibold text-base opacity-0 `}>
                  See All
                </Text>
              </LinearGradient>
            </MaskedView>
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
        {nextStation?.data?.length > 0 && (
          <Text style={tw`text-primary py-2 text-lg font-poppinsBold`}>
            Your Next Station
          </Text>
        )}

        {/* Your Next Station */}
        {populerLoading ? (
          <BokCardSkeleton />
        ) : (
          nextStation?.data?.length > 0 && (
            <View style={tw`mb-4`}>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/details/BookingsDetails/[id]",
                    params: {
                      id: nextStation?.data?.id,
                      status: "Upcoming",
                    },
                  })
                }
                style={tw`mb-2`}
              >
                <View
                  style={tw`p-4 border bg-[#5E5E5E33]  rounded-3xl  flex-row items-center gap-4`}
                >
                  <Image
                    source={nextStation?.data?.room?.photo}
                    style={[tw`h-20 w-20 rounded-2xl`, {}]}
                  ></Image>
                  <View style={tw`flex-1 items-start  justify-center`}>
                    <Text style={tw`text-white  font-poppinsBold text-base`}>
                      {nextStation?.data?.room?.name}
                    </Text>

                    {/* Date and Time */}
                    <View style={tw`flex-row items-center mt-1 gap-1`}>
                      <SvgXml xml={IconCleander} />
                      <Text style={tw`text-white text-xs font-poppins ml-1`}>
                        {nextStation?.data?.booking_date}
                      </Text>
                      <SvgXml xml={IconTime} />
                      <Text
                        numberOfLines={1}
                        style={tw`flex-shrink text-white text-xs font-poppins ml-1`}
                      >
                        {nextStation?.data?.starting_time}
                      </Text>
                    </View>

                    {/* Duration and Location */}
                    <View style={tw`flex-row items-center mt-1 gap-1`}>
                      <SvgXml xml={Iconhoure} />
                      <Text style={tw`text-white text-xs font-poppins ml-1`}>
                        {nextStation?.data?.duration} Hour
                      </Text>
                      <SvgXml xml={IconLoction} />
                      <Text
                        numberOfLines={1}
                        style={tw`flex-shrink text-white text-xs font-poppins ml-1`}
                      >
                        {nextStation?.data?.provider?.address}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )
        )}
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
            <MaskedView
              maskElement={
                <Text
                  style={[
                    tw`text-base font-semibold`,
                    { backgroundColor: "transparent" },
                  ]}
                >
                  See All
                </Text>
              }
            >
              <LinearGradient
                colors={["#6523E7", "#023CE3CC", "#6523E7CC"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
              >
                <Text style={tw` font-semibold text-base opacity-0 `}>
                  See All
                </Text>
              </LinearGradient>
            </MaskedView>
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
