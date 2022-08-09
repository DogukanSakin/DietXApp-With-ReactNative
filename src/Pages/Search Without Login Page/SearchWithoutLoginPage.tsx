import React,{useState,FC} from 'react';
import { ActivityIndicator, Text,View,FlatList } from 'react-native';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchResultCard from '../../Components/Cards/Search Result Card';
import InputBox from '../../Components/InputBox';
import useFetch from '../../Hooks/useFetch';
import Colors from '../../Styles/Colors';
import styles from './SearchWithoutLogin.style';
interface IPageProps{
    navigation:any;
}
const SearchWithoutLoginPage:FC<IPageProps>=({navigation})=>{
    const [loading,setLoading]=useState<boolean>(false);
    const [data,setData]=useState<any>(null);
    async function searchFoodOrDrinkNutrition(searchedName:string){
        setData(null);
        setLoading(true);
        const data=await useFetch(`${Config.API_URL}?query=${searchedName}&common=true&detailed=true`);
        setLoading(false); 
        setData(data);  
        console.log(data);
        
    }
    const renderResult=({item}:any)=><SearchResultCard item={item}></SearchResultCard>;
    return(
        <View style={styles.container}>
            <View style={styles.titleInnerContainer}>
                <Icon name='chevron-left' size={35} color={Colors.iconColor} onPress={()=>navigation.goBack()}></Icon>
                <Text style={styles.titleText}>Search foods and drinks!</Text>
            </View>
            <InputBox iconName='magnify' placeholder='Search...' onChangeText={(text)=>searchFoodOrDrinkNutrition(text)}></InputBox>

            <FlatList renderItem={({item})=>{return(
                <View>
                    <Text>{item.food_name}</Text>
                </View>
                
            )}} data={data} ></FlatList>
            <View style={styles.loadingStateContainer}> 
             {loading ? <ActivityIndicator size={35} color={Colors.iconColor}></ActivityIndicator> : null}
             
            </View>
        </View>
    )
}
export default SearchWithoutLoginPage;