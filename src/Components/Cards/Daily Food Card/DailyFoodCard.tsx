import React from 'react';
import { Text,View } from 'react-native';
import styles from './DailyFoodCard.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Styles/Colors';
const DailyFoodCard=()=>{
    return(
        <View style={styles.container}>
            <Icon name='food-fork-drink' color={Colors.iconColor} size={30}></Icon>
            <Text style={styles.foodNameText} numberOfLines={1}>Food Name</Text>
            <Text style={styles.calText}>250 Cal</Text>
        </View>
    )
}
export default DailyFoodCard;