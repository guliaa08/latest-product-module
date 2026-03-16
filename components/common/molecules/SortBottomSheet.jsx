import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import BottomSheet from "../atoms/BottomSheet"
import { sortByName } from '../../../redux/osa/reducers';
import {sortByWeight} from '../../../redux/osa/reducers';
import { useDispatch } from 'react-redux';

const SortBottomSheet = ({ visible, onClose, height }) => {
    const dispatch = useDispatch();
    return (
        <BottomSheet visible={visible} onClose={onClose} height={height} >
            <View style={{padding:12, gap:8}}>

                <Pressable onPress={()=>{dispatch(sortByName());onClose()}} style={[styles.buttonContainer]}><View><Text style={[styles.buttonText]}>Name</Text></View></Pressable>
                {/* <Pressable style={[styles.buttonContainer]}><View><Text style={[styles.buttonText]}>Name</Text></View></Pressable> */}
                <Pressable  onPress={()=>{dispatch(sortByWeight());onClose()}} style={[styles.buttonContainer]}><View><Text style={[styles.buttonText]}>Weight</Text></View></Pressable>
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

export default SortBottomSheet;