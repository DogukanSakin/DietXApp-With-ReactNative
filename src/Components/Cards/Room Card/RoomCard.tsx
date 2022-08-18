import React from 'react';
import { Text,View } from 'react-native';
import styles from './RoomCard.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Styles/Colors';
const RoomCard=()=>{
    return(
        <View style={styles.container}>
            <View style={styles.roomAccessContainer}>
                <Icon name='lock' size={15} color={Colors.darkGreen}></Icon>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.roomNameText}>roomName</Text>
            </View>
            <View style={styles.innerContainer}>
                <Icon name='account-group' size={25} color={Colors.iconColor}></Icon>
                <Text style={styles.roomInfoText}> usersNumber</Text>
            </View>
        </View>
    )
}
export default RoomCard;