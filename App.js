import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';
const App = () => {
  const [toggle, setToggle] = useState(false);
  
  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);
  
  useEffect(() => {
    //Liga o flash do celular
    Torch.switchState(toggle)
  },[toggle]);
  
  useEffect(() => {
    //Muda Toggle ao chacoalhar
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });
    // Funcao chamada quando o componente for desmontado
    return () => subscription.remove();
  },[]);
  
  return (
  <View style ={ toggle ? style.containerLight : style.container}>
    <TouchableOpacity onPress={handleChangeToggle}>
      <Image style = {style.flashlight} 
        // if toggle is true require x, else require y
        source={
          toggle 
          ? require('./assets/icons/flashlight-off.png')
          : require('./assets/icons/flashlight-on.png')
        } 
      />
      <Image style = {style.flashlightName} 
        source={
          toggle 
          ? require('./assets/icons/logo-flash.png')
          : require('./assets/icons/logo-flash-white.png')
        } 
      />
    </TouchableOpacity>
  </View>
  );
};

export default App

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashlight: {
  resizeMode: 'contain',
  alignSelf: 'center',
  width: 150,
  height: 150,
  },
  flashlightName: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,  
    },
});