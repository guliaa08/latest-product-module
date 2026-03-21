import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { PageBody } from "../../components/common/Layout";
import { useSelector } from "react-redux";

export default function AddQuantityModal({
  quantity,
  setQuantity,
  onSave,
  item,
  enterQuantityWarning,
}) {
  const { appColor } = useSelector((state) => state?.productAppTheme);
  return (
    <>
      <PageBody>
        <View style={styles.modalContainer}>
          <Pressable>
            <View
              style={{
                height: 4,
                width: 91,
                borderRadius: 16,
                backgroundColor: appColor.grey.disabled,
                alignSelf: "center",
              }}
            ></View>
          </Pressable>
          <View style={styles.productCard}>
            <Image
              source={{ uri: item.productImage }}
              style={styles.productImage(appColor)}
              resizeMode="cover"
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName(appColor)} numberOfLines={2}>
                {item.productName}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Text style={styles.productWeight(appColor)}>
                  {item.productWeight}
                </Text>
                <Text
                  style={{
                    height: 12,
                    lineHeight: 8,
                    fontSize: 10,
                    fontWeight: "500",
                    color: "#C5C5C5",
                  }}
                >
                  .
                </Text>
                <Text style={styles.productCategory(appColor)}>
                  {item.categoryName}
                </Text>
              </View>
              <Text style={styles.sku(appColor)}>SKU: {item.sku}</Text>
            </View>
          </View>
          {item.physicalCount && (
            <View>
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 18,
                  color: appColor.text.regular,
                }}
              >
                Already on Shelf:{" "}
                <Text style={{ fontWeight: 700 }}>
                  {" "}
                  {item.physicalCount}
                </Text>{" "}
              </Text>
            </View>
          )}

          <View style={styles.quantityInputContainer}>
            <Text style={{ color: appColor.text.regular }}>
              Add Quantity On Shelf
            </Text>
            <View
              style={{
                height: 42,
                borderRadius: 6,
                gap: 10,
                borderWidth: 1,
                borderColor: appColor.grey.border,
              }}
            >
              <TextInput
                style={{
                  width: "100%",
                  fontSize: 14,
                  lineHeight: 18,
                  paddingBottom: 0,
                  color: appColor.text.regular,
                }}
                value={quantity}
                keyboardType="numeric"
                onChangeText={(text) => setQuantity(text)}
                placeholder={item.physicalCount ? `${item.physicalCount}` : `0`}
              />
              {enterQuantityWarning && (
                <View style={{ marginTop: 5 }}>
                  <Text style={{ color: "#ff0000", fontWeight: 500 }}>
                    Enter Quantity
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.saveButtonContainer}>
            <Pressable
              onPress={onSave}
              style={[
                { backgroundColor: appColor.primaryColor.fill },
                styles.saveButtonContainer,
              ]}
            >
              <Text style={styles.saveButton}>Save</Text>
            </Pressable>
          </View>
        </View>
      </PageBody>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    height: 308,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: "100%",
    gap: 16,

    paddingHorizontal: 16,
    paddingTop: 5,
  },
  productImage: (appColor) => [
    {
      width: 56,
      height: 56,
      borderWidth: 1,
      borderColor: appColor.grey.border,
      borderRadius: 8,
    },
  ],
  productCard: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",

    margin: 8,
    // borderRadius: 12,
    overflow: "hidden",
    height: 72,

    gap: 16,
    borderColor: "#F1F1F1",
  },
  productInfo: {
    padding: 12,
    justifyContent: "space-between",
  },
  productName: (appColor) => [
    {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: 700,
      color: appColor.text.dark,
    },
  ],
  productCategory: (appColor) => [
    {
      fontSize: 10,
      lineHeight: 12,

      color: appColor.text.light,
      marginBottom: 8,
    },
  ],
  bottomRow: {
    paddingTop: 4,
    height: 20,
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  productPrice: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 400,
  },
  productPriceStike: {
    fontSize: 10,
  },

  productWeight: (appColor) => [
    {
      fontSize: 10,
      color: appColor.text.light,
    },
  ],
  productCategory: (appColor) => [
    {
      fontSize: 10,
      fontWeight: 500,
      lineHeight: 12,
      color: appColor.text.light,
    },
  ],
  sku: (appColor) => [
    {
      fontSize: 10,
      lineHeight: 12,
      fontWeight: 500,
      color: "#808080",
    },
  ],

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stockText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },

  quantityInputContainer: {
    gap: 4,
    height: 64,
    width: "100%",
  },
  saveButtonContainer: {
    borderRadius: 8,
    paddingVertical: 12,
    // paddingHorizontal:16,
    gap: 10,
    height: 40,
  },
  saveButton: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 600,
  },
});
