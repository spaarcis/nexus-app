import tw from "@/lib/tailwind";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
  usePathname,
} from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const Toaster = () => {
  const { res } = useLocalSearchParams();
  const params = useGlobalSearchParams();
  const pathname = usePathname();

  React.useEffect(() => {
    const currentPath = pathname;

    const timer = setTimeout(() => {
      // check if user still on this modal page
      if (router.canGoBack() && pathname === currentPath) {
        router.back();
      }
    }, Number(params?.time) || 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={tw``}>
      <View style={tw`bg-[#0c082c] justify-center items-center p-4 `}>
        <Text style={tw`text-sm font-poppinsMedium text-white`}>{res}</Text>
      </View>
    </View>
  );
};

export default Toaster;
