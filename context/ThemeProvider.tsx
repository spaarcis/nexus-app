import tw from "@/lib/tailwind";
import { SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const HI = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          paddingTop: HI.top,
          paddingBottom: HI.bottom,
          backgroundColor: tw.color("base"),
        },
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

export default ThemeProvider;
