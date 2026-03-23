import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

export default function OsaScanProduct({
  photo,
  title,
  sku,
  weight,
  onAddManually,
  onScan,
  itemsOnShelf
}) {

  const {appColor:color}= useSelector(state=>state.productAppTheme)
  

  return (
    <View style={{
    // borderRadius:12,borderWidth:1, borderColor:color.grey.border,padding:12

    }}>
      
      {/* Product Card */}
      <View style={styles.productsCard(color)}>
        <Image
          source={{ uri: photo }}
          style={styles.productImage(color)}
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.title(color)}>{title}</Text>
          <Text style={styles.weight(color)}>{weight}</Text>
          <Text style={styles.sku(color)}>SKU: {sku}</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        {itemsOnShelf &&
       
            <View style={[styles.itemsOnShelf(color), styles.button,{borderWidth:0}]}>
                <Text style={styles.itemsOnShelfText(color)}>On Shelf:<Text style={{fontWeight:"bold"}}> {itemsOnShelf}</Text></Text>
            </View>
       
        }
        <Pressable style={styles.button(color)} onPress={onAddManually}>
          <Icon name="add" size={16} color="blue" />
          <Text style={styles.buttonText}>Add {!itemsOnShelf && "manually"}</Text>
        </Pressable>

        <Pressable style={styles.button(color)} onPress={onScan}>
          <Icon name="qr-code-scanner" size={16} color="blue" />
          <Text style={styles.buttonText}>Scan</Text>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  productsCard: (color)=>({
    flexDirection: "row",
    gap: 12,
    padding: 12,
  }),

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

  button: (color)=>[{
    flex: 1,
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 6,
    borderWidth: 1,
    borderColor:color.primaryColor.fill,
    borderRadius: 8,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    
  }],

  productImage:(color)=>[ {
    height: 56,
    width: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: color.grey.border
  }],

  title:(color) =>[{
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
    color:color.text.dark,
  }],

  weight:(color)=>[ {
    fontWeight: "500",
    fontSize: 10,
    lineHeight: 12,
    color:color.text.regular,
  }],

  sku:(color)=>[ {
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 12,
    color: color.text.light
  }],

  buttonText: {
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 16,
    color: "#2D64B8"
  },
  itemsOnShelf:(color)=>[{
    height:40,
    borderRadius:8,
    gap:8,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10,
    backgroundColor:color.grey.background,
    paddingHorizontal:12,


  }],
  itemsOnShelfText:(color)=>[{
    fontSize:12,
    fontWeight:400,
    lineHeight:16,
    height:16,
    color:color.text.light,

  }]

});