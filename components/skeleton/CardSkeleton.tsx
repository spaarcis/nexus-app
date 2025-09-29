import { BlurView } from "expo-blur";
import SkeletonLoading from "expo-skeleton-loading";
import { View } from "react-native";

export const CardSkeleton = () => {
  return (
    <SkeletonLoading highlight={"#6523E7"}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <BlurView
          intensity={10}
          tint="light"
          style={{
            width: "100%",
            height: 150,
            backgroundColor: "#adadad",
            borderRadius: 10,
            overflow: "hidden",
          }}
        />
      </View>
    </SkeletonLoading>
  );
};
