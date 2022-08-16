import React,{useEffect,useState} from 'react';
import { Text,View } from 'react-native';
import styles from './HomePage.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Styles/Colors';
import CircularProgress from 'react-native-circular-progress-indicator';
import Fonts from '../../Styles/Fonts';
import DailyFoodCard from '../../Components/Cards/Daily Food Card';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import parseContentData from '../../Utils/parseContentData';
const currentUserUID=auth().currentUser?.uid;
const userTEST={
    age:18,
    email:"Nra@nra.com",
    gender:"Male",
    height:188,
    userName:"Nra",
    weight:90
}
const totalUserDailyConsumptionsTEST={
    totalCal:2123,
    totalProtein:15,
    totalFat:50,
    totalCarbohydrate:750,
}
const HomePage=()=>{
    const [currentUserData,setCurrentUserData]=useState<any>(userTEST);
    const [currentUserDailyConsumptions,setCurrentUserDailyConsumptions] = useState<any>(totalUserDailyConsumptionsTEST);
    const [bmi,setBMI] = useState<number>(0);
    const [dailyTotalCal,setDailyTotalCal]=useState<number>(0);
    useEffect(()=>{
        fetchCurrentUserInfo();
        fetchCurrentUserDailyConsumptions();
    },[]);
    async function fetchCurrentUserInfo() {
        await database().ref(`users/${currentUserUID}`).on('value', snapshot => {
            const fetchedData = snapshot.val();
            if(fetchedData!=undefined || fetchedData!=null){
                setCurrentUserData(fetchedData);
                if(fetchedData['weight'] && fetchedData['height']){
                    const BMI = Math.floor(Math.floor(fetchedData['weight']) / ((Math.floor(fetchedData['height']) / 100) * (Math.floor(fetchedData['height']) / 100)));
                    setBMI(BMI);
                }
                if( fetchedData['gender'] && fetchedData['weight'] && fetchedData['height'] && fetchedData['weight'] && fetchedData['age']){
                    if(fetchedData['gender'] == 'Male'){
                        const BMR = Math.floor(66.5 + (13.75 * Math.floor(fetchedData['weight'])) + (5.003 * Math.floor(fetchedData['height'])) - (6.75 * Math.floor(fetchedData['age'])));
                        setDailyTotalCal(BMR);
                    }
                    else{
                        const BMR = Math.floor(655.1 + (9.563  * Math.floor(fetchedData['weight'])) + (1.850 * Math.floor(fetchedData['height'])) - (4.676 * Math.floor(fetchedData['age'])));
                        setDailyTotalCal(BMR);
                    }
                    
                }

            }
            else{ 
                const BMI = Math.floor(Math.floor(userTEST.weight) / ((Math.floor(userTEST.height) / 100) * (Math.floor(userTEST.height) / 100)));
                setBMI(BMI);
                const BMR = Math.floor(66.5 + (13.75 * Math.floor(userTEST.weight)) + (5.003 * Math.floor(userTEST.height)) - (6.75 * Math.floor(userTEST.age)));
                setDailyTotalCal(BMR);
                setCurrentUserData(userTEST);
            }
            
        })
        
    }
    async function fetchCurrentUserDailyConsumptions() {
        await database().ref(`dailyConsumptions/${currentUserUID}`).on('value', snapshot => {
            const fetchedData = snapshot.val();
            if(fetchedData!=undefined || fetchedData!=null){
                const parsedData = parseContentData(fetchedData);
                const parsedDataLength=parsedData.length;
                let cal=0,protein=0,fat=0,carbohydrate=0;
                for (let index = 0; index < parsedDataLength; index++) {
                    cal+=parsedData[index].cal;
                    protein+=parsedData[index].protein;
                    fat+=parsedData[index].fat;
                    carbohydrate+=parsedData[index].fat;
                }
                const totalUserDailyConsumptions={
                    totalCal:cal,
                    totalProtein:protein,
                    totalFat:fat,
                    totalCarbohydrate:carbohydrate,
                }
                setCurrentUserDailyConsumptions(totalUserDailyConsumptions);

            }
            else{
                setCurrentUserDailyConsumptions(totalUserDailyConsumptionsTEST);
            }
            
            
            
        })
    }
    return(
        <View style={styles.container}>
            <View style={styles.profileInnerContainer}>
                <Icon name='account-question' size={30} color={Colors.iconColor}></Icon>
                <Text style={styles.welcomeText}>Welcome back userName!</Text>
                    <View style={styles.userBodyMeasureContainer}>
                    <Icon name='weight-kilogram' size={30} color={Colors.iconColor} ></Icon>
                    <Text style={styles.measureText}>{currentUserData.weight} KG</Text>
                    <Icon name='human-male-height-variant' size={30} color={Colors.iconColor}></Icon>
                    <Text style={styles.measureText}>{currentUserData.height} CM</Text>
                    <Icon name='scale' size={30} color={Colors.iconColor}></Icon>
                    <Text style={styles.measureText}>BMI : {bmi}</Text>
                </View> 
                 
            </View>
            <View style={styles.innerContainer}>
                <View style={styles.titleContainer}> 
               
                    <View style={styles.line}></View>
                    <Text style={styles.titleText} numberOfLines={1}>Daily statistics</Text>
                    <View style={styles.line}></View>
                </View>
                { currentUserData.age == undefined || currentUserData.gender == undefined || currentUserData.weight== undefined || currentUserData.height == undefined ? 
                        <View style={styles.warningContainer}>
                            <Text style={styles.warningText}>Since this information below is missing, your daily statistics cannot be calculated correctly. Please add this information by going to the profile page.</Text>
                        </View>
                        
                    :null}
               
                <View style={styles.dailyInfoContainer}>
                <View style={styles.totalCaloriesContainer}>
                    <Text style={styles.totalCalTitle}>Total Daily Calories </Text>
                    <CircularProgress
                        value={currentUserDailyConsumptions.totalCal!=undefined ? currentUserDailyConsumptions.totalCal : 0}
                        radius={75}
                        duration={5000}
                        progressValueColor={Colors.textColor}
                        maxValue={dailyTotalCal}
                        subtitle={`Total : ${dailyTotalCal}`}
                        subtitleStyle={{fontWeight: 'bold',fontFamily:Fonts.defaultRegularFont,color:Colors.darkGreen}}
                        titleColor={Colors.textColor}
                        titleStyle={{fontWeight: 'bold',fontFamily:Fonts.defaultRegularFont}}
                        activeStrokeColor={Colors.darkGreen}
                        inActiveStrokeColor={Colors.lightGreen}
                    />
                </View>
                    <View style={styles.infoValuesContainer}>
                        <View style={styles.infoValuesInnerContainer}>
                            {currentUserDailyConsumptions.totalCarbohydrate!=undefined && currentUserDailyConsumptions!=undefined ? <Text style={styles.infoValuesText}> Carbohydrate: {currentUserDailyConsumptions.totalCarbohydrate} </Text> : <Text style={styles.infoValuesText}> Carbohydrate: 0 </Text>}    
                        </View>
                        <View style={styles.infoValuesInnerContainer}>
                            {currentUserDailyConsumptions.totalProtein!=undefined && currentUserDailyConsumptions!=undefined ? <Text style={styles.infoValuesText}> Protein: {currentUserDailyConsumptions.totalProtein} </Text> : <Text style={styles.infoValuesText}> Protein: 0 </Text>}
                        </View>
                        <View style={styles.infoValuesInnerContainer}>
                            {currentUserDailyConsumptions.totalFat!=undefined && currentUserDailyConsumptions!=undefined ? <Text style={styles.infoValuesText}> Fat: {currentUserDailyConsumptions.totalFat}</Text>: <Text style={styles.infoValuesText}> Fat: 0</Text>}
                        </View>
                    </View>   
                </View>
                <DailyFoodCard></DailyFoodCard>
            </View>
        </View>
    )
}
export default HomePage;