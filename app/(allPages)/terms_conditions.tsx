import { ImgGradint } from "@/assets/images/image"
import { _HIGHT, _Width } from "@/utils/utils"
import { ImageBackground } from "expo-image"
import { router } from "expo-router"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SvgXml } from "react-native-svg"
import tw from "twrnc"

// Back arrow icon
const BackIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
`

// Document icon
const DocumentIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" fill="#10B981" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
`

const TermsConditions = ({ navigation }: any) => {
    return (
        <View style={tw`flex-1`}>
            <ImageBackground
                source={ImgGradint}
                style={{
                    width: _Width,
                    height: _HIGHT,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "#000000"

                }}
            />

            {/* Header */}
            <View style={tw`pt-12 px-6 pb-6`}>
                <TouchableOpacity onPress={() => router.back()} style={tw`flex-row items-center mb-6`}>
                    <SvgXml xml={BackIcon} width={24} height={24} />
                    <Text style={tw`text-white text-lg ml-2 font-poppinsMedium`}>Back</Text>
                </TouchableOpacity>

                <View style={tw`flex-row items-center mb-2`}>
                    <SvgXml xml={DocumentIcon} width={24} height={24} />
                    <Text style={tw`text-white text-2xl font-poppinsBold ml-3`}>Terms & Conditions</Text>
                </View>

                <Text style={tw`text-gray-400 text-sm font-poppinsRegular`}>Updated July 17, 2025</Text>
            </View>

            {/* Content */}
            <ScrollView style={tw`flex-1 px-6`} showsVerticalScrollIndicator={false}>
                {/* Section 1 */}
                <View style={tw`mb-8`}>
                    <Text style={tw`text-white text-lg font-poppinsBold mb-4`}>1. Using our service</Text>
                    <Text style={tw`text-gray-300 text-base font-poppinsRegular leading-6`}>
                        Lorem ipsum dolor sit amet consectetur. Volutpat purus nunc tellus lorem adipiscing. Convallis at mi
                        dictumst nulla amet. Ipsum consequat vel donec ut amet ante semper. Amet tempus tellus aliquam volutpat enim
                        dolor tristique.
                    </Text>
                </View>

                {/* Section 2 */}
                <View style={tw`mb-8`}>
                    <Text style={tw`text-white text-lg font-poppinsBold mb-4`}>2. Your account</Text>
                    <Text style={tw`text-gray-300 text-base font-poppinsRegular leading-6`}>
                        Lorem ipsum dolor sit amet consectetur. Volutpat purus nunc tellus lorem adipiscing. Convallis at mi
                        dictumst nulla amet. Ipsum consequat vel donec ut amet ante semper. Amet tempus tellus aliquam volutpat enim
                        dolor tristique.
                    </Text>
                </View>

                {/* Section 3 */}
                <View style={tw`mb-8`}>
                    <Text style={tw`text-white text-lg font-poppinsBold mb-4`}>3. Payment procedure</Text>
                    <Text style={tw`text-gray-300 text-base font-poppinsRegular leading-6`}>
                        Lorem ipsum dolor sit amet consectetur. Volutpat purus nunc tellus lorem adipiscing. Convallis at mi
                        dictumst nulla amet. Ipsum consequat vel donec ut amet ante semper. Amet tempus tellus aliquam volutpat enim
                        dolor tristique.
                    </Text>
                </View>

                <View style={tw`h-20`} />
            </ScrollView>
        </View>
    )
}

export default TermsConditions
