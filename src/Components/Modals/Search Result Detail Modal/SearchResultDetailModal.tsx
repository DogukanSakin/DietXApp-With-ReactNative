import React, {FC} from 'react';
import {Text, View, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import styles from './SearchResultDetailModal.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Styles/Colors';
import ResultDetailInfoCard from '../../Cards/Result Detail Info Card';
interface IModalProps {
  isVisible: boolean;
  onClose: () => void;
  item: any;
}
const SearchResultDetailModal: FC<IModalProps> = ({
  isVisible,
  onClose,
  item,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const renderDetail = ({item}: any) => (
    <ResultDetailInfoCard nutrient={item} />
  );

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      style={styles.modalContainer}>
      <View style={styles.container}>
        <View style={styles.resultDetailTitleInnerContainer}>
          <Icon name="food" size={25} color={Colors.iconColor} />
          <Text style={styles.foodNameText}>
            {item.food_name} ({item.nf_calories} Cal)
          </Text>
        </View>
        <FlatList data={item.full_nutrients} renderItem={renderDetail} />
      </View>
    </Modal>
  );
};
export default SearchResultDetailModal;
