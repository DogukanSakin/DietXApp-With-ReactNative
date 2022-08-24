import React, {FC} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Styles/Colors';
import styles from './UserSearchCard.style';
interface ICardProps {
  user: any;
}
const SearchUserCard: FC<ICardProps> = ({user}) => {
  return (
    <View style={styles.container}>
      <Icon name="account-question" size={30} color={Colors.iconColor} />
      <Text style={styles.userNameText}>{user.userName}</Text>
    </View>
  );
};
export default SearchUserCard;
