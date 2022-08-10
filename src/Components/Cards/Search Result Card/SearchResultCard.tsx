import React,{FC} from 'react';
import { Text,View,Image,TouchableWithoutFeedback } from 'react-native';
import styles from './SearchResultCard.style';
interface ICardProps{
    item:any;
    viewDetail:(result:any)=>void;
}
const SearchResultCard:FC<ICardProps>=({item,viewDetail})=>{
    function handleVisibleDetailModal(){
        viewDetail(item);
    }
    return(
        <TouchableWithoutFeedback onPress={handleVisibleDetailModal}>
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.imageContainer}>
                   <Image source={{uri:item.photo.thumb}} style={styles.image}></Image>
                </View>
                <View style={styles.textInfoContainer}>
                    <Text style={styles.calText}>{item.nf_calories} Cal</Text> 
                    <Text style={styles.nameText}>{item.food_name}</Text>
                    <Text style={styles.brandText}>{item.brand_name}</Text>
                </View>
                
            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}
export default SearchResultCard;