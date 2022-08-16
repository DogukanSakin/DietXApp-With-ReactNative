import React,{useState} from 'react';
import { ActivityIndicator, Dimensions, FlatList, Text,View } from 'react-native';
import styles from './SearchPage.style';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Fonts from '../../Styles/Fonts';
import Colors from '../../Styles/Colors';
import InputBox from '../../Components/InputBox';
import useFetch from '../../Hooks/useFetch';
import Config from 'react-native-config';
import SearchResultCard from '../../Components/Cards/Search Result Card';
import SearchResultDetailModal from '../../Components/Modals/Search Result Detail Modal';
import SearchUserCard from '../../Components/Cards/User Search Card';
import database from '@react-native-firebase/database';
import parseContentData from '../../Utils/parseContentData';
import auth from '@react-native-firebase/auth';
import { showMessage } from 'react-native-flash-message';
import AddDailyConsumptionModal from '../../Components/Modals/Add Daily Consumption Modal';
const Tab = createMaterialTopTabNavigator();
const deviceSize = Dimensions.get('window');
const currentUserUID=auth().currentUser?.uid;
const SearchPage=()=>{
    return(
        <Tab.Navigator screenOptions={{
            tabBarStyle: {shadowColor: 'transparent',paddingTop:15},
            tabBarIndicatorStyle:{opacity:0},
            tabBarPressColor:'transparent'
          }}>
            <Tab.Screen name="SearchFoodsAndDrinks" component={SearchFoodsAndDrinks} options={{
                    tabBarLabel: ({ focused }) => {
                        return(
                            <View style={{backgroundColor: focused ? Colors.darkGreen : '',padding:10,borderRadius:100,width:deviceSize.width/2.5,alignItems:'center'}}>
                                <Text style={{color: focused ? 'white' : Colors.textColor, fontFamily:Fonts.defaultRegularFont,fontSize:17}}>Foods & Drinks</Text>
                            </View>
                        )
                    },
            }}/>
            <Tab.Screen name="SearchUsers" component={SearchUsers} options={{
                    tabBarLabel: ({ focused }) => {
                        return(
                            <View style={{backgroundColor: focused ? Colors.darkGreen : '',padding:10,borderRadius:100,width:deviceSize.width/2.5,alignItems:'center'}}>
                                <Text style={{color: focused ? 'white' : Colors.textColor, fontFamily:Fonts.defaultRegularFont,fontSize:17}}>Users</Text>
                            </View>
                        )
                    },
            }}/>
        </Tab.Navigator>
       
    )
}
const SearchFoodsAndDrinks=()=>{
    const [loading,setLoading]=useState<boolean>(false);
    const [data,setData]=useState<any>(null);
    const [detailModalVisible,setDetailModalVisible]=useState<boolean>(false);
    const [resultDetailForModal,setResultDetailForModal]=useState<any>(null);
    const [addDailyConsumptionModalVisible,setAddDailyConsumptionModalVisible]=useState<boolean>(false);
    const [selectedFood,setSelectedFood]=useState<any>();
    
    async function searchFoodOrDrinkNutrition(searchedName:string){
        searchedName=searchedName.trim();
        if(searchedName==""){
            setData(null);
        }
        else{
            setData(null);
            setLoading(true);
            const data=await useFetch(`${Config.API_URL}?query=${searchedName}&common=true&detailed=true`);
            setLoading(false); 
            setData(data);     
        }
          
    }
    function handleVisibleDetailModal(item?:any){
        setDetailModalVisible(!detailModalVisible);
        if(item){
            setResultDetailForModal(item);  
        }     
    }
    function handleDailyConsumptionModalVisible(item?:any){
        setAddDailyConsumptionModalVisible(!addDailyConsumptionModalVisible);
        if(item){
            setSelectedFood(item);
        }
    }
    async function addDailyConsumption(item:any,quantity:any,totalCal:any){
        console.log("q:"+quantity+" t:"+totalCal);
        
        try {
            setLoading(true);
            const dailyConsumptionContent={
                name:item.food_name,
                cal:totalCal,
                protein:item.full_nutrients[0].attr_id == '203' ? item.full_nutrients[0].value : 0,
                fat: item.full_nutrients[1] == '204' ? item.full_nutrients[1].value : 0,
                carbohydrate: item.full_nutrients[2] == '205' ? item.full_nutrients[2].value : 0,
                quantity:quantity
            }
            await database().ref(`dailyConsumptions/${currentUserUID}/`).push(dailyConsumptionContent);
            setLoading(false);
            showMessage({
                message: 'The food or drink successfuly added to your daily consumptions.',
                type: "success",
                titleStyle:{fontFamily:Fonts.defaultRegularFont},
            });
            setAddDailyConsumptionModalVisible(false);
            
            
        } catch (error) {
            setLoading(false);
            showMessage({
                message: 'Opps... There is an error!',
                type: "danger",
                titleStyle:{fontFamily:Fonts.defaultRegularFont},
            });
        }
             
    }
    const renderResult=({item}:any)=><SearchResultCard item={item} viewDetail={(item)=>handleVisibleDetailModal(item)} addButtonVisible={true} addDailyConsumption={(item)=>handleDailyConsumptionModalVisible(item)} loading={loading}></SearchResultCard>;
    return(
        
        <View style={styles.container}>
            <InputBox iconName='magnify' placeholder='Search foods or drinks...' onChangeText={(text)=>searchFoodOrDrinkNutrition(text)} ></InputBox>
            { resultDetailForModal && <SearchResultDetailModal isVisible={detailModalVisible} onClose={()=>handleVisibleDetailModal()} item={resultDetailForModal}></SearchResultDetailModal>}
            <FlatList renderItem={renderResult} data={data} ></FlatList>
            <AddDailyConsumptionModal isVisible={addDailyConsumptionModalVisible} onClose={handleDailyConsumptionModalVisible} food={selectedFood} addDailyConsumption={addDailyConsumption}></AddDailyConsumptionModal>
            <View style={styles.loadingStateContainer}> 
             {loading ? <ActivityIndicator size={35} color={Colors.iconColor}></ActivityIndicator> : null}
            </View>
        </View>
    )
}
const SearchUsers=()=>{
    const [userData,setUserData]=useState<any>(null);
    const [loading,setLoading]=useState<boolean>(false);
    async function searchUser(searchedUserName:string) {
        searchedUserName=searchedUserName.trim();
        if(searchedUserName==""){
            setUserData([]);
        }
        else{
            try {
                setLoading(true);
                await database().ref('users').orderByChild('userName').startAt(searchedUserName).on('value', function (snapshot) {
                    if (snapshot.val() !== null) {
                        let data = snapshot.val();
                        const parsedData=parseContentData(data);
                        setUserData(parsedData);  
                    }
                });
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }
        
    }
    const renderUser=({item}:any)=><SearchUserCard user={item}></SearchUserCard>;
    return(
        <View style={styles.container}>
            <InputBox iconName='magnify' placeholder='Search users...' onChangeText={(text)=>searchUser(text)}></InputBox>
            <FlatList renderItem={renderUser} data={userData}></FlatList>
            <View style={styles.loadingStateContainer}> 
             {loading ? <ActivityIndicator size={35} color={Colors.iconColor}></ActivityIndicator> : null}
            </View>
            
        </View>
    )
}
export default SearchPage;