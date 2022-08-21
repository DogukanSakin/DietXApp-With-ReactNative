import React from 'react';
import { Text,View } from 'react-native';
const MessagesPage=({route}:any)=>{
    const {room}=route.params;
    console.log(room);
    
    return(
        <View>
            <Text></Text>
        </View>
    )
}
export default MessagesPage;