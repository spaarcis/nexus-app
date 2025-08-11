
import { IconBookings, IconBookingsActive, IconExplore, IconExploreActive, IconHome, IconHomeActive, IconProfiles, IconProfilesActive, IconTabBarCard } from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import { _Width } from "@/utils/utils";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useLinkBuilder } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router, Tabs } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const icons = {
    home: {
        active: IconHomeActive,
        inactive: IconHome,
    },
    explore: {
        active: IconExploreActive,
        inactive: IconExplore,
    },
    bookings: {
        active: IconBookingsActive,
        inactive: IconBookings,
    },
    Profile: {
        active: IconProfilesActive,
        inactive: IconProfiles,
    },
};

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const { buildHref } = useLinkBuilder();
    const { width } = Dimensions.get("window");
    const tabCount = state.routes.length;
    const tabWidth = width / tabCount;

    const translateX = useRef(new Animated.Value(0)).current;
    const [uploadModalVisible, setUploadModalVisible] = useState(false); // Fixed state initialization


    return (
        <View
            style={tw`flex-row absolute bottom-10 w-full justify-center items-center  bg-transparent `}
        >
            {/* <SvgXml xml={IconTabBarCard} /> */}
            <View style={tw`flex-row bg-[#312c44] opacity-70 gap-5 p-7 w-80 rounded-full `}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: "tabLongPress",
                            target: route.key,
                        });
                    };

                    if (route.name === "add") {
                        return (
                            <View key="add" style={tw`flex-1`} />
                        );
                    }

                    const iconSet = icons[route.name];

                    return (
                        <TouchableOpacity
                            key={route.name}
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarButtonTestID}
                            href={buildHref(route.name)}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={tw`flex-1 relative justify-center items-center ${isFocused ? "bg-black  p-2 rounded-full " : ""}`}
                        >
                            <SvgXml xml={isFocused ? iconSet.active : iconSet.inactive} />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tabs.Screen name="home" />
            <Tabs.Screen name="explore" />
            <Tabs.Screen name="bookings" />
            <Tabs.Screen name="Profile" />
        </Tabs>

    );
};

export default TabLayout;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    video: {
        width: _Width,
        height: 250,
    },
    blurContainer: {
        flex: 1,
        padding: 20,
        margin: 16,
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 20,
    },
});