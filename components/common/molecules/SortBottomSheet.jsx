import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import BottomSheet from "../atoms/BottomSheet"
import { sortByName } from '../../../redux/osa/reducers';
import {sortByWeight} from '../../../redux/osa/reducers';
import { useDispatch, useSelector } from 'react-redux';

const SortBottomSheet = ({ visible, onClose, height }) => {
    const {appColor:color}= useSelector(state=>state.productAppTheme)
    const dispatch = useDispatch();
    return (
        <BottomSheet visible={visible} onClose={onClose} height={height} >
            <View style={{padding:12, gap:8,backgroundColor:color.background}}>

                <Pressable onPress={()=>{dispatch(sortByName());onClose()}} style={[styles.buttonContainer(color)]}><View><Text style={[styles.buttonText(color)]}>Name</Text></View></Pressable>
                {/* <Pressable style={[styles.buttonContainer]}><View><Text style={[styles.buttonText]}>Name</Text></View></Pressable> */}
                <Pressable  onPress={()=>{dispatch(sortByWeight());onClose()}} style={[styles.buttonContainer(color)]}><View><Text style={[styles.buttonText(color)]}>Weight</Text></View></Pressable>
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
    buttonContainer:(color)=>[{height:45, backgroundColor:"#f6f6f6", borderRadius:9, justifyContent:"center", alignItems:"center" ,backgroundColor:color.background, borderWidth:1,borderColor:color.grey.border},],
    buttonText:(color)=>[{ fontWeight:600,color:color.text.regular}]
    
});

export default SortBottomSheet;