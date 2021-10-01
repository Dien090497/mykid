import React, { useLayoutEffect, useRef, useState,useEffect } from 'react';
import {
  Switch,
  Text,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal
} from 'react-native';
import Header from '../../../components/Header';
import {styles} from './styles';
import {String} from "../../../assets/strings/String";
import {showAlert} from "../../../functions/utils";
import {fork} from "redux-saga/effects";
import {
  setEacesDropApi
} from '../../../network/EacesDropingService';
import DataLocal from "../../../data/dataLocal";
const {width,height} = Dimensions.get('window');
export  default function EacesDroping(){
  const [number,setNumber] =useState('');
  const EacesDrop= num => num.toString().replace(/[^0-9]/g, '');
  const refLoading = useRef();

  const checkNumber = (number)=>{
    let check=false;
    if(number.length===1||number.length===0){
        showAlert('Độ dài từ 2-19')
    }
    else{
      for(let i=0;i<number.length;i++){
          if(number[i]>='a'&&number[i]<='z'||number[i]>='A'&&number[i]<='Z'){
             check=true;
             break;
          }
      }
      if(check===true){
        showAlert('Vui lòng nhập chữ số')
      }else{
        eacesDropingApi(number);
      }
    }
  }
  const eacesDropingApi  = ()=>{
    const phoneNumber ={
      phoneNumber: number
    }
    setEacesDropApi(DataLocal.deviceId,phoneNumber, {
        success: res => {
          console.log("asss",res.data)
        },
        refLoading: refLoading,
      },
    );
  }
  return(
    <View style={styles.viewContainer}>
      <Header title={String.hender_eacesDroping} />
       <View style={{width:'auto',height:'auto',marginHorizontal:width*0.02,marginTop:height*0.02,backgroundColor:'white'}}>
           <View style={styles.viewInputText}>
             <TextInput
               scrollEnabled={false} 
               // onFocus={() => setNumber(amount)}
               value={number}
               style={styles.inputText}
               onChangeText={(text => setNumber(text))}
               placeholder={'Nhập số điện thoại'}
             />
           </View>
            <TouchableOpacity style={styles.tob}
              onPress={()=>checkNumber(number)}
            >
                  <Text style={{color:'white',fontSize:width*0.05}}>Xác nhận </Text>
            </TouchableOpacity>

       </View>
    </View>
  );
}