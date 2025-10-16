import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BookingsDetails/[id]" />
      <Stack.Screen name="roomDetails/[id]" />
      <Stack.Screen name="SeatPosition/[allData]" />
    </Stack>
  );
};

export default _layout;
