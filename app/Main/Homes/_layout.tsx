
import { IconBookings, IconBookingsActive, IconExplore, IconExploreActive, IconHome, IconHomeActive, IconProfiles, IconProfilesActive } from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import { _Width } from "@/utils/utils";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useLinkBuilder } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React, { useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const icons = {
    Home: {
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
            <View>
                <BlurView style={tw`flex-row justify-between w-80 p-5 rounded-full overflow-hidden gap-6`} intensity={100} tint="dark">
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
                                <View key="add"  />
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
                                style={tw` flex-row  justify-center items-center ${isFocused ? "bg-black  p-2 rounded-full " : ""}`}
                            >
                                <SvgXml xml={isFocused ? iconSet.active : iconSet.inactive} />
                            </TouchableOpacity>
                        );
                    })}
                </BlurView>
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
            <Tabs.Screen name="Home" />
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