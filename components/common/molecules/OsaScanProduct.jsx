import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function OsaScanProduct({
  photo,
  title,
  sku,
  weight,
  onAddManually,
  onScan,
  itemsOnShelf
}) {

  

  return (
    <View>
      
      {/* Product Card */}
      <View style={styles.productsCard}>
        <Image
          source={{ uri: photo }}
          style={styles.productImage}
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.weight}>{weight}</Text>
          <Text style={styles.sku}>SKU: {sku}</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        {itemsOnShelf &&
       
            <View style={[styles.itemsOnShelf, styles.button,{borderWidth:0}]}>
                <Text style={styles.itemsOnShelfText}>On Shelf:<Text style={{fontWeight:"bold"}}> {itemsOnShelf}</Text></Text>
            </View>
       
        }
        <Pressable style={styles.button} onPress={onAddManually}>
          <Icon name="add" size={16} color="blue" />
          <Text style={styles.buttonText}>Add {!itemsOnShelf && "manually"}</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={onScan}>
          <Icon name="qr-code-scanner" size={16} color="blue" />
          <Text style={styles.buttonText}>Scan</Text>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  productsCard: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
  },

  detailsContainer: {
    justifyContent: "center",
    flex: 1,
  },

  buttons: {
    flexDirection: "row",
    gap: 8,
    height: 40,
    width: "100%",
  },

  button: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 6,
    borderWidth: .5,
    borderRadius: 8,
    height: 40,
    flexDirection: "row",
    alignItems: "center"
  },

  productImage: {
    height: 56,
    width: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f1f1f1"
  },

  title: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
    color: "#454545",
  },

  weight: {
    fontWeight: "500",
    fontSize: 10,
    lineHeight: 12,
    color: "#454545",
  },

  sku: {
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 12,
    color: "#808080",
  },

  buttonText: {
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 16,
    color: "#2D64B8"
  },
  itemsOnShelf:{
    height:40,
    borderRadius:8,
    gap:8,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#fcfcfc",
    borderRadius:10


  },
  itemsOnShelfText:{
    fontSize:12,
    fontWeight:400,
    lineHeight:16,
    height:16,
    color:"#454545",
  }

});