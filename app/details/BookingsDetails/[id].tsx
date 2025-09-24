import { ImgGradint } from "@/assets/images/image";
import CustomButton from "@/components/shear/CustomButton";
import {
  IconA1,
  IconCleander,
  IconContact,
  Iconhoure,
  IconLoction,
  IconStar,
  IconTime,
  IconVIP,
} from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import {
  useBooking_cancelMutation,
  useBooking_detailsQuery,
  useRatingsMutation,
} from "@/redux/apiSlices/bookingApi/bookingSlice";
import { _HIGHT, _Width } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Linking,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const BookingsDetails = () => {
  const { id, status } = useLocalSearchParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [visible, setVisible] = useState(false);
  const { data: booking_details, isLoading } = useBooking_detailsQuery(id);
  const [booking_cancel] = useBooking_cancelMutation();
  const [ratings] = useRatingsMutation();
  if (isLoading) {
    <View style={tw`flex-1 justify-center items-center `}>
      <ActivityIndicator size="large" color="#0c8ce9" />
      <Text style={tw`mt-4 text-lg font-poppins text-gray-700`}>
        Loading...
      </Text>
    </View>;
  }
  const handleRating = (selectedRating: number) => {
    setRating(selectedRating === rating ? 0 : selectedRating);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isFilled = starValue <= rating;
      return (
        <TouchableOpacity
          key={index}
          onPress={() => handleRating(starValue)}
          style={tw`mr-2 p-1`}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isFilled ? "star" : "star-outline"}
            size={32}
            color={isFilled ? "#FFA500" : "#6B7280"}
          />
        </TouchableOpacity>
      );
    });
  };
  console.log("booking_details", booking_details, "booking_details");

  const handleSubmitReview = async () => {
    if (rating > 0) {
      const data = {
        booking_id: id,
        rating: rating,
        review: reviewText,
      };
      const res = await ratings(data).unwrap();
      console.log(res);

      router.push({
        pathname: "/Toaster",
        params: { res: res.message },
      });
      setIsModalVisible(false);
      router.push("/Main/Homes/Home");
    } else {
      // Optional: Show error message if no rating is selected
      alert("Please select a rating before submitting");
    }
  };

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isModalVisible) {
      setRating(0);
      setReviewText("");
    }
  }, [isModalVisible]);

  const handleConfirm = async () => {
    try {
      const res = await booking_cancel(Number(id)).unwrap();
      console.log("Booking cancel response:", res);

      router.push({
        pathname: "/Toaster",
        params: { res: res.message },
      });
      setVisible(false);
    } catch (error) {
      router.push({
        pathname: "/Toaster",
        params: { res: (error as any)?.message || "An error occurred" },
      });
      setVisible(false);
    }
  };

  const handleCall = () => {
    const phoneNumber = booking_details?.data?.provider?.phone;
    console.log(phoneNumber);

    Linking.openURL(`tel:${phoneNumber}`);
  };

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
          backgroundColor: "#000000",
        }}
      />

      <ScrollView style={tw`flex-1 px-5`} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={tw`flex-row items-center justify-between mt-12 mb-6`}>
          <View style={tw`flex-row items-center justify-between w-full`}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={tw`flex-row items-center`}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
              <Text style={tw`text-white text-lg ml-1`}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCall}
              style={tw`flex-row items-center`}
            >
              <SvgXml xml={IconContact} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`bg-gray-800/50 rounded-2xl p-4 mb-6`}>
          <View style={tw`mb-6`}>
            <Image
              source={{
                uri: booking_details?.data?.provider?.gaming_zone,
              }}
              style={tw`w-full h-48 rounded-2xl`}
            />
          </View>
          <View style={tw`mb-6`}>
            <Text style={tw`text-white text-xl font-poppinsBold mb-4`}>
              {booking_details?.data?.provider?.gaming_zone_name}
            </Text>

            <View style={tw`flex-row items-center gap-1 mb-2`}>
              <SvgXml xml={IconLoction} />
              <Text style={tw`text-gray-400 font-poppins ml-1`}>
                {booking_details?.data?.provider?.address}
              </Text>
              <View style={tw`flex-row items-center ml-auto`}>
                <SvgXml xml={IconStar} />
                <Text style={tw`text-white font-poppins ml-1`}>
                  {booking_details?.data?.provider?.rating}
                </Text>
              </View>
            </View>

            <View style={tw`flex-row items-center`}>
              <SvgXml xml={IconTime} />
              <Text style={tw`text-gray-400 font-poppins ml-1`}>
                Operating hours
              </Text>
              <Text style={tw`text-white font-poppins ml-auto`}>
                {booking_details?.data?.provider?.opening_time} -{" "}
                {booking_details?.data?.provider?.closing_time}
              </Text>
            </View>
          </View>
        </View>

        <View style={tw`mb-8`}>
          <Text style={tw`text-white text-lg font-poppinsSemiBold mb-4`}>
            Booking Information
          </Text>
          <View style={tw`flex-row items-center justify-between mb-3`}>
            <View style={tw`flex-row items-center`}>
              <SvgXml xml={IconCleander} />
              <Text style={tw`text-gray-400 font-poppins ml-2`}>
                {booking_details?.data?.booking_date}
              </Text>
            </View>
          </View>

          <View style={tw`flex-row items-center justify-between mb-3`}>
            <View style={tw`flex-row items-center`}>
              <SvgXml xml={IconTime} />
              <Text style={tw`text-gray-400 font-poppins ml-2`}>
                {booking_details?.data?.starting_time}
              </Text>
            </View>
          </View>

          <View style={tw`flex-row items-center justify-between mb-3`}>
            <View style={tw`flex-row items-center`}>
              <SvgXml xml={Iconhoure} />
              <Text style={tw`text-gray-400 font-poppins ml-2`}>
                {booking_details?.data?.duration}- Hour
              </Text>
            </View>
          </View>

          <View style={tw`flex-row items-center justify-between mb-3`}>
            <View style={tw`flex-row items-center`}>
              <SvgXml xml={IconA1} />
              <Text style={tw`text-gray-400 font-poppins ml-2`}>
                {booking_details?.data?.pc_no}
              </Text>
            </View>
          </View>

          <View style={tw`flex-row items-center justify-between mb-4`}>
            <View style={tw`flex-row items-center`}>
              <SvgXml xml={IconVIP} />
              <Text style={tw`text-gray-400 font-poppins ml-2`}>
                {booking_details?.data?.room_name}
              </Text>
            </View>
          </View>

          <View style={tw`border-t border-gray-600 pt-4`}>
            <View style={tw`flex-row items-center justify-between`}>
              <Text style={tw`text-white text-lg  font-poppinsSemiBold`}>
                Paid:
              </Text>
              <Text style={tw`text-white text-xl font-poppinsBold`}>
                €{booking_details?.data?.have_to_pay}
              </Text>
            </View>
          </View>
        </View>
        {status === "Completed" ? (
          <TouchableOpacity
            style={tw` mb-8`}
            onPress={() => setIsModalVisible(true)}
          >
            <CustomButton title={"Rating & Review"} />
          </TouchableOpacity>
        ) : status === "Confirmed" ? (
          <View>
            <TouchableOpacity
              style={tw`bg-[#171823] mb-4 rounded-full`}
              onPress={() => setVisible(true)}
            >
              <Text
                style={tw`text-primary  flex w-full text-center text-lg py-[14px] font-poppinsBold`}
              >
                Cancel the booking!
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/details/RoomDetails/[id]")}
              style={tw`relative mb-8`}
            >
              <CustomButton title={"Reschedule"} />
            </TouchableOpacity>
          </View>
        ) : status === "Canceled" ? (
          <View style={tw`mb-8`}></View>
        ) : null}

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={tw`flex-1 bg-black/50 justify-center items-center px-6`}>
            <View
              style={tw`bg-black rounded-2xl p-6 w-full max-w-sm border border-gray-700`}
            >
              {/* Modal Header */}
              <View style={tw`flex-row items-center justify-between mb-6`}>
                <Text style={tw`text-white text-xl font-semibold`}>
                  Ratings & Review
                </Text>
                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#EF4444" />
                </TouchableOpacity>
              </View>
              {/* Rating Section */}
              <View style={tw`mb-6`}>
                <Text style={tw`text-white text-lg font-medium mb-3`}>
                  Rating {rating > 0 ? `(${rating}/5)` : ""}
                </Text>
                <View style={tw`flex-row justify-center`}>{renderStars()}</View>
              </View>

              {/* Review Section */}
              <View style={tw`mb-8`}>
                <Text style={tw`text-white text-lg font-medium mb-3`}>
                  Review
                </Text>
                <TextInput
                  style={tw`bg-[#5E5E5E33] rounded-xl p-4  text-white min-h-24 text-base`}
                  placeholder="Share your experience..."
                  placeholderTextColor="#6B7280"
                  multiline={true}
                  textAlignVertical="top"
                  value={reviewText}
                  onChangeText={setReviewText}
                />
              </View>

              {/* Action Buttons */}
              <View style={tw`gap-3`}>
                <TouchableOpacity
                  style={tw`bg-[#5E5E5E33] rounded-full py-3 items-center`}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={tw`text-red-500 text-lg font-medium`}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={tw`relative ${rating === 0 ? "opacity-50" : ""}`}
                  onPress={handleSubmitReview}
                  disabled={rating === 0}
                >
                  <CustomButton title={"Done"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          visible={visible}
          transparent
          animationType="fade"
          onRequestClose={() => setVisible(false)}
        >
          <View style={tw`flex-1 bg-black/50 justify-center items-center px-6`}>
            <View
              style={tw`bg-black rounded-2xl p-6 w-full max-w-sm border border-gray-700`}
            >
              {/* Title */}
              <Text
                style={tw`text-white text-xl font-poppinsBold text-center mb-2`}
              >
                Are you sure?
              </Text>

              {/* Subtitle */}
              <Text
                style={tw`text-gray-400 text-sm text-center font-poppins mb-6`}
              >
                You want to cancel the booking
              </Text>

              {/* Buttons */}
              <View style={tw`flex-row justify-between`}>
                <TouchableOpacity
                  onPress={handleConfirm}
                  style={tw`flex-1 bg-blue-600 rounded-full py-3 mr-3 items-center`}
                >
                  <Text style={tw`text-white font-poppinsBold`}>Yes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setVisible(false)}
                  style={tw`flex-1 bg-[#151515] rounded-full py-3 items-center`}
                >
                  <Text style={tw`text-red-500 font-poppinsBold`}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default BookingsDetails;
