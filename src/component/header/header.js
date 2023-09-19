import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import navigationService from '../../root/navigationService'

const Header = ({
    rightComponent,
    backArrow,
    heading,
    rightOnPress
}) => {
  return (
    <View style={styles.container}>
    {backArrow &&  <TouchableOpacity
    onPress={() => navigationService.goBack()}
    style={styles.backArrowContainer}>
        <Text style={{fontSize:20, color:'black'}}>{`<`}</Text>
      </TouchableOpacity>}
      <Text>{heading}</Text>
      <View style={styles.rightContainer}>
       {rightComponent && <TouchableOpacity
       onPress={rightOnPress}
       >
        <Image source={require('../../assets/images/bag.png')} style={{width: 25, height:25, tintColor:'black', resizeMode:'contain'}}/>
        </TouchableOpacity>}
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:60,
        backgroundColor:"white",
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center'
    },
    backArrowContainer:{
        justifyContent:'center',
        alignItems:"center",
        backgroundColor:'#F8F9F1',
        paddingVertical:12,
        paddingHorizontal:20,
        marginLeft:5,
        borderRadius:50
    },
    rightContainer:{
        width:'20%',
        height:'100%',
        justifyContent:'center',
        alignItems:"center",
    }
})