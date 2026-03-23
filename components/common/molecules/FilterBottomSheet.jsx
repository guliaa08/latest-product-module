import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import BottomSheet from "../atoms/BottomSheet"
import { PageBody } from '../Layout';
import { useSelector } from 'react-redux';
const FilterBottomSheet = ({ visible, onClose, height, setFilter }) => {
    const {appColor:color} = useSelector(state=>state.productAppTheme)
    return (
        <BottomSheet visible={visible} onClose={onClose} height={height} >
            <PageBody style={{padding:12, gap:8}}>

                <Pressable style={[styles.buttonContainer(color)]} onPress={()=>{setFilter("pending"); onClose()}}><View><Text style={[styles.buttonText(color)]}>Pending</Text></View></Pressable>
                <Pressable style={[styles.buttonContainer(color)]} onPress={()=>{setFilter("scanned"); onClose()}}><View><Text style={[styles.buttonText(color)]}>Scanned</Text></View></Pressable>
                <Pressable style={[styles.buttonContainer(color)]} onPress={()=>{setFilter("both"); onClose()}}><View><Text style={[styles.buttonText(color)]}>Both</Text></View></Pressable>
            </PageBody>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer:(color)=>[{height:45, backgroundColor:color.background, borderRadius:9, justifyContent:"center", alignItems:"center" , borderWidth:1, borderColor:color.grey.border}],
    buttonText:(color)=>[{ color:color.text.regular, fontWeight:600}]
    
});

export default FilterBottomSheet;