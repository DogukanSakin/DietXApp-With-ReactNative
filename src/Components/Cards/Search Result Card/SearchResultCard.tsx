import React,{FC} from 'react';
import { Text,View,Image } from 'react-native';
import styles from './SearchResultCard.style';
interface ICardProps{
    item?:any;
}
const SearchResultCard:FC<ICardProps>=({item})=>{
    console.log(item);
    const testItem={
        nf_calories:'100',
        food_name:'test',
        brand_name:'test'
    }
    return(
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.imageContainer}>
                   
                    
                </View>
                <View style={styles.textInfoContainer}>
                    <Text style={styles.calText}>{item.nf_calories}</Text> 
                    <Text style={styles.nameText}>{item.food_name}</Text>
                    <Text style={styles.brandText}>{item.brand_name}</Text>
                </View>
                
            </View>
        </View>
    )
}
export default SearchResultCard;