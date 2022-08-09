import React from 'react';
import { Text,View,Button } from 'react-native';
import auth from '@react-native-firebase/auth';
const HomePage=()=>{
    return(
        <View>
            <Text>HomePage</Text>
            <Button title='Sign out' onPress={()=>{auth().signOut()}}></Button>
        </View>
    )
}
export default HomePage;