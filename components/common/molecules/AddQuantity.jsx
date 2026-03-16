import BottomSheet from "../atoms/BottomSheet"
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image,TextInput } from 'react-native';
import AddQuantityModal from "../../../screens/osa/AddQuantityModal";

const AddQuantity = ({ visible,onClose,height, quantity, setQuantity, onSave,item,enterQuantityWarning, setEnterQuantityWarning}) => {
  return (
        
    <BottomSheet visible={visible} onClose={onClose} height={height} setEnterQuantityWarning={setEnterQuantityWarning} >
       
       <AddQuantityModal  quantity={quantity} setQuantity={setQuantity}  onSave={onSave} item={item} enterQuantityWarning={enterQuantityWarning} />
    </BottomSheet>
  );
};


const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
})


export default AddQuantity;