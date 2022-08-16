import React,{FC} from 'react';
import { Text,View,FlatList } from 'react-native';
import Modal from 'react-native-modal';
import styles from './SearchResultDetailModal.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Styles/Colors';
import ResultDetailInfoCard from '../../Cards/Result Detail Info Card';
interface IModalProps{
    isVisible:boolean;
    onClose:()=>void;
    item:any;
}
const SearchResultDetailModal:FC<IModalProps>=({isVisible,onClose,item})=>{ 
    const renderDetail=({item}:any)=><ResultDetailInfoCard nutrient={item}></ResultDetailInfoCard>;
    
    return(
        <Modal isVisible={isVisible} onSwipeComplete={onClose} onBackdropPress={onClose} style={styles.modalContainer}>
            <View style={styles.container}>
                <View style={styles.resultDetailTitleInnerContainer}>
                    <Icon name='food' size={25} color={Colors.iconColor}></Icon>
                    <Text style={styles.foodNameText}>{item.food_name} ({item.nf_calories} Cal)</Text>
                </View>
                <FlatList data={item.full_nutrients} renderItem={renderDetail}> </FlatList>
                
            </View>
        </Modal>
    )
}
export default SearchResultDetailModal;