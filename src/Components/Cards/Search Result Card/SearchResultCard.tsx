import React, {FC} from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import styles from './SearchResultCard.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Styles/Colors';
interface ICardProps {
  item: any;
  viewDetail: (result: any) => void;
  addButtonVisible?: boolean;
  addDailyConsumption?: (result: any) => void;
  loading?: boolean;
}
const SearchResultCard: FC<ICardProps> = ({
  item,
  viewDetail,
  addButtonVisible = false,
  addDailyConsumption,
  loading = false,
}) => {
  function handleVisibleDetailModal() {
    viewDetail(item);
  }
  function handleAddDailyConsumption() {
    if (addDailyConsumption != null) {
      addDailyConsumption(item);
    }
  }
  return (
    <TouchableWithoutFeedback onPress={handleVisibleDetailModal}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.imageContainer}>
            <Image source={{uri: item.photo.thumb}} style={styles.image} />
          </View>
          <View style={styles.textInfoContainer}>
            <Text style={styles.calText}>{item.nf_calories} Cal</Text>
            <Text style={styles.nameText} numberOfLines={1}>
              {item.food_name}
            </Text>
            <Text style={styles.brandText}>{item.brand_name}</Text>
          </View>
          {addButtonVisible ? (
            <TouchableWithoutFeedback onPress={handleAddDailyConsumption}>
              <View style={styles.addButtonContainer}>
                {loading ? (
                  <ActivityIndicator color={Colors.iconColor} />
                ) : (
                  <>
                    <Icon
                      name="hamburger-plus"
                      size={30}
                      color={Colors.iconColor}
                    />
                    <Text style={styles.addButtonText}>Add</Text>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          ) : null}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default SearchResultCard;
