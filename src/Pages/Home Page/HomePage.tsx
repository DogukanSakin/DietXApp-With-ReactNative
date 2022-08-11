import React from 'react';
import { Text,View } from 'react-native';
import styles from './HomePage.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Styles/Colors';
import CircularProgress from 'react-native-circular-progress-indicator';
import Fonts from '../../Styles/Fonts';
import DailyFoodCard from '../../Components/Cards/Daily Food Card';
const HomePage=()=>{
    return(
        <View style={styles.container}>
            <View style={styles.profileInnerContainer}>
                <Icon name='account-question' size={30} color={Colors.iconColor}></Icon>
                <Text style={styles.welcomeText}>Welcome back userName!</Text>
                <View style={styles.userBodyMeasureContainer}>
                    <Icon name='weight-kilogram' size={30} color={Colors.iconColor} ></Icon>
                    <Text style={styles.measureText}>weight</Text>
                    <Icon name='human-male-height-variant' size={30} color={Colors.iconColor}></Icon>
                    <Text style={styles.measureText}>height</Text>
                    <Icon name='scale' size={30} color={Colors.iconColor}></Icon>
                    <Text style={styles.measureText}>BMI</Text>
                </View>
            </View>
            <View style={styles.innerContainer}>
                <View style={styles.titleContainer}> 
                    <View style={styles.line}></View>
                    <Text style={styles.titleText} numberOfLines={1}>Daily statistics</Text>
                    <View style={styles.line}></View>
                </View>
               
                <View style={styles.dailyInfoContainer}>
                <View style={styles.totalCaloriesContainer}>
                    <Text style={styles.totalCalTitle}>Total Daily Calories </Text>
                    <CircularProgress
                        value={60}
                        radius={75}
                        duration={5000}
                        progressValueColor={Colors.textColor}
                        maxValue={200}
                        subtitle={'Total : 5000'}
                        subtitleStyle={{fontWeight: 'bold',fontFamily:Fonts.defaultRegularFont,color:Colors.darkGreen}}
                        titleColor={Colors.textColor}
                        titleStyle={{fontWeight: 'bold',fontFamily:Fonts.defaultRegularFont}}
                        activeStrokeColor={Colors.darkGreen}
                        inActiveStrokeColor={Colors.lightGreen}
                    />
                </View>
                    <View style={styles.infoValuesContainer}>
                        <View style={styles.infoValuesInnerContainer}>
                            <Text style={styles.infoValuesText}> Carbohydrate: 5.5g </Text>
                        </View>
                        <View style={styles.infoValuesInnerContainer}>
                            <Text style={styles.infoValuesText}> Carbohydrate: 5.5g </Text>
                        </View>
                        <View style={styles.infoValuesInnerContainer}>
                            <Text style={styles.infoValuesText}> Carbohydrate: 5.5g </Text>
                        </View>
                    </View>   
                </View>
                <DailyFoodCard></DailyFoodCard>
            </View>
        </View>
    )
}
export default HomePage;