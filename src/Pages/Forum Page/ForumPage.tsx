import React,{useState} from 'react';
import { Dimensions, Text,View } from 'react-native';
import styles from './ForumPage.style';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
import InputBox from '../../Components/InputBox';
import RoomCard from '../../Components/Cards/Room Card';
import FloatingButton from '../../Components/Buttons/Floating Button';
import CreateRoomModal from '../../Components/Modals/Create Room Modal';
const Tab = createMaterialTopTabNavigator();
const deviceSize = Dimensions.get('window');
const ForumPage=()=>{
    return(
        <Tab.Navigator screenOptions={{
            tabBarStyle: {shadowColor: 'transparent',paddingTop:15},
            tabBarIndicatorStyle:{opacity:0},
            tabBarPressColor:'transparent'
          }}>
            <Tab.Screen name="SearchFoodsAndDrinks" component={AllRooms} options={{
                    tabBarLabel: ({ focused }) => {
                        return(
                            <View style={{backgroundColor: focused ? Colors.darkGreen : '',padding:10,borderRadius:100,width:deviceSize.width/2.5,alignItems:'center'}}>
                                <Text style={{color: focused ? 'white' : Colors.textColor, fontFamily:Fonts.defaultRegularFont,fontSize:17}}>All Rooms</Text>
                            </View>
                        )
                    },
            }}/>
            <Tab.Screen name="SearchUsers" component={MyRooms} options={{
                    tabBarLabel: ({ focused }) => {
                        return(
                            <View style={{backgroundColor: focused ? Colors.darkGreen : '',padding:10,borderRadius:100,width:deviceSize.width/2.5,alignItems:'center'}}>
                                <Text style={{color: focused ? 'white' : Colors.textColor, fontFamily:Fonts.defaultRegularFont,fontSize:17}}>My Rooms</Text>
                            </View>
                        )
                    },
            }}/>
        </Tab.Navigator>
    )
}
const MyRooms=()=>{
    return(
        <View style={styles.container}>
            <InputBox iconName='magnify' placeholder='Search in my rooms...'></InputBox>
            <Text>MYROOMS</Text>
        </View>
    )
}
const AllRooms=()=>{
    const [createRoomModalVisible,setCreateRoomVisible]=useState<boolean>(false);
    function handleCreateRoomVisible(){
        setCreateRoomVisible(!createRoomModalVisible);
    }
    return(
        <View style={styles.container}>
             <InputBox iconName='magnify' placeholder='Search in all rooms...'></InputBox>
            <RoomCard></RoomCard>
            
            <FloatingButton onPress={handleCreateRoomVisible}></FloatingButton>
            <CreateRoomModal isVisible={createRoomModalVisible} onClose={handleCreateRoomVisible}></CreateRoomModal>
        </View>
    )
}
export default ForumPage;