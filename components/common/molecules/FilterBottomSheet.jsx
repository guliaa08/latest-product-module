import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import BottomSheet from "../atoms/BottomSheet"
const FilterBottomSheet = ({ visible, onClose, height, setFilter }) => {
    return (
        <BottomSheet visible={visible} onClose={onClose} height={height} >
            <View style={{padding:12, gap:8}}>

                <Pressable style={[styles.buttonContainer]} onPress={()=>{setFilter("pending"); onClose()}}><View><Text style={[styles.buttonText]}>Pending</Text></View></Pressable>
                <Pressable style={[styles.buttonContainer]} onPress={()=>{setFilter("scanned"); onClose()}}><View><Text style={[styles.buttonText]}>Scanned</Text></View></Pressable>
                <Pressable style={[styles.buttonContainer]} onPress={()=>{setFilter("both"); onClose()}}><View><Text style={[styles.buttonText]}>Both</Text></View></Pressable>
            </View>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer:{height:45, backgroundColor:"#f6f6f6", borderRadius:9, justifyContent:"center", alignItems:"center" },
    buttonText:{ fontWeight:600}
    
});

export default FilterBottomSheet;