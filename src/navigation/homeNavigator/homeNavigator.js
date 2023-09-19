import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavigationService from '../../root/navigationService';
import { Home, Cart, Detail, Menu, Favourite } from "../../screens";
import { Image, Text , View} from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false, headerMode: 'none' }}>
            <Stack.Screen name={'Home'} component={Home} />
            <Stack.Screen name={'Detail'} component={Detail} />
            <Stack.Screen name={'Cart'} component={Cart} />
        </Stack.Navigator>
    )
}

function MyTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, gestureEnabled: false, headerMode: 'none' ,tabBarShowLabel: false, tabBarStyle: {height:80}}}>
            <Tab.Screen options={{tabBarIcon: ({focused}) => {
                    return <View style={{backgroundColor: focused? '#2A4BA0' : 'white', justifyContent:'center', alignItems:'center', paddingHorizontal:12, paddingVertical:9, borderRadius:50}}>
                        <Image source={require('.././../assets/images/home.png')} resizeMode="contain" style={{ width: 25, height: 25, tintColor: focused? 'white': 'black',}} />
                        <Text style={{color: focused ? 'white': 'black'}}>Home</Text>
                    </View>
                }
            }} name="StackNavigator" component={StackNavigator} />
            <Tab.Screen options={{tabBarIcon: ({focused}) => {
                    return <View style={{backgroundColor: focused? '#2A4BA0' : 'white', justifyContent:'center', alignItems:'center', paddingHorizontal:9, paddingVertical:15, borderRadius:50}}>
                        <Image source={require('.././../assets/images/Heart.png')} resizeMode="contain" style={{ width: 25, height: 25, tintColor: focused? 'white': 'black',}} />
                        <Text style={{color: focused ? 'white': 'black'}}>Favourite</Text>
                    </View>
                }
            }} name="Favourite" component={Favourite} />
            <Tab.Screen options={{tabBarIcon: ({focused}) => {
                    return <View style={{backgroundColor: focused? '#2A4BA0' : 'white', justifyContent:'center', alignItems:'center', paddingHorizontal:12, paddingVertical:8, borderRadius:50}}>
                        <Image source={require('.././../assets/images/more_vertical.png')} resizeMode="contain" style={{ width: 25, height: 25, tintColor: focused? 'white': 'black',}} />
                        <Text style={{color: focused ? 'white': 'black'}}>Menu</Text>
                    </View>
                }
            }} name="Menu" component={Menu} />
        </Tab.Navigator>
    );
}

const HomeNavigator = () => {
    return (
        <NavigationContainer ref={NavigationService.navigationRef} >
            {MyTabs()}
        </NavigationContainer>
    );

}

export default HomeNavigator;