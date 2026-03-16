import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function AddQuantityModal({
  quantity,
  setQuantity,
  onSave,
  item,
  enterQuantityWarning,
}) {
  return (
    <>
      <View style={styles.modalContainer}>
        <Pressable>
          <View
            style={{
              height: 4,
              width: 91,
              borderRadius: 16,
              backgroundColor: "#C5C5C5",
              alignSelf: "center",
            }}
          ></View>
        </Pressable>
        <View
          style={styles.productCard}
          onPress={() =>
            navigation.navigate("ProductDetail", { product: item })
          }
        >
          <Image
            source={{ uri: item.productImage }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName} numberOfLines={2}>
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
              <Text style={styles.productWeight}>{item.productWeight}</Text>
              <Text
                style={{
                  height: 12,
                  fontWeight: "bold",
                  lineHeight: 8,
                  fontSize: 10,
                  fontWeight: 500,
                  color: "#C5C5C5",
                }}
              >
                .
              </Text>
              <Text style={styles.productCategory}>{item.categoryName}</Text>
            </View>
            <Text style={styles.sku}>SKU: {item.sku}</Text>
          </View>
        </View>
        {item.physicalCount && (
          <View>
            <Text style={{ fontSize: 14, lineHeight: 18 }}>
              Already on Shelf:{" "}
              <Text style={{ fontWeight: 700 }}>
                {" "}
                {item.physicalCount}
              </Text>{" "}
            </Text>
          </View>
        )}

        <View style={styles.quantityInputContainer}>
          <Text>Add Quantity On Shelf</Text>
          <View
            style={{
              height: 42,
              borderRadius: 6,
              gap: 10,
              borderWidth: 1,
              borderColor: "#f1f1f1",
            }}
          >
            <TextInput
              style={{
                width: "100%",
                fontSize: 14,
                lineHeight: 18,
                paddingBottom: 0,
              }}
              value={quantity}
              keyboardType="numeric"
              onChangeText={(text) => setQuantity(text)}
              placeholder={`${quantity}`}
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
            style={[{ backgroundColor: "#2D64B8" }, styles.saveButtonContainer]}
          >
            <Text style={styles.saveButton}>Save</Text>
          </Pressable>
        </View>
      </View>
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
    backgroundColor: "white",
    height: 308,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: "100%",
    gap: 16,

    paddingHorizontal: 16,
    paddingTop: 5,
  },
  productImage: {
    width: 56,
    height: 56,
    backgroundColor: "#e0e0e0",
    borderWidth: 1,
    borderColor: "#F1F1F1",
  },
  productCard: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
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
  productName: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 700,
    color: "#454545",
  },
  productCategory: {
    fontSize: 10,
    lineHeight: 12,

    color: "#999",
    marginBottom: 8,
  },
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

    // fontWeight: 'bold',
    // color: '#2196F3',
  },
  productPriceStike: {
    fontSize: 10,
  },

  productWeight: {
    fontSize: 10,
  },
  productCategory: {
    fontSize: 10,
    fontWeight: 500,
    lineHeight: 12,
    color: "#454545",
  },
  sku: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: 500,
    color: "#808080",
  },

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
