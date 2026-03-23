import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PageBody } from '../Layout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useDebounce from '../../../hooks/useDebounce';
import { get_osaListSearch } from '../../../redux/osa/action';
import { get_osaList } from '../../../redux/osa/action';
import { setSearch } from '../../../redux/osa/reducers';
import { useDispatch, useSelector } from 'react-redux';

export default function SearchBox({request}) {
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 500);
  const dispatch = useDispatch();
  const {appColor} = useSelector(state=>state.productAppTheme)

  useEffect(() => {
    
    dispatch(setSearch({ search: text }));
    dispatch(get_osaList({ request, params: { page: 1 } }));
  }, [debouncedText]);
  return (
 
      <View style={styles.inputContainer(appColor)}>
        <View style={styles.left}>
          <Icon name="search" size={20} color={'black'} />
          <View style={[{ flex: 1, width: '100%' }]}>
            <TextInput
              style={[styles.inputBox, { flex: 1 }]}
              placeholder="Search Products"
              onChangeText={text => setText(text)}
              value={text}
            />
          </View>
        </View>
        {/* <View style={styles.right}>
          <Icon name="document-scanner" size={24}
            color={"black"} />
          <Text style={[styles.ScanText]}>Scan</Text>
        </View> */}
      </View>
   
  );
}

const styles = StyleSheet.create({
  inputContainer:(appColor)=>( {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: appColor.grey.disabled,
    padding: 4,
    paddingLeft: 10,
    gap: 8,

    borderWidth: 1,
  }),
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  inputBox: {
    // height: 18,
    fontWeight: 400,
    fontSize: 14,
    borderColor: 'black',
    lineHeight: 18,
    color: '#C5C5C5',
    flex: 1,
  },
  right: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 6,
    padding: 10,
    gap: 4,
    backgroundColor: '#2D64B8',
  },
  ScanText: {
    height: 20,
    fontWeight: 600,
    lineHeight: 20,
    size: 14,
    textAlign: 'center',
    color: 'white',
  },
});
