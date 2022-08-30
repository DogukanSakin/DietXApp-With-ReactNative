import React, {FC} from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Styles/Colors';
import styles from './UserSearchCard.style';
interface ICardProps {
  user: any;
  unBanButtonVisible?: boolean;
  onUnBanUser?: (user: any) => void;
  onUserInfoVisible?: (user: any) => void;
}
const SearchUserCard: FC<ICardProps> = ({
  user,
  unBanButtonVisible = false,
  onUnBanUser,
  onUserInfoVisible,
}) => {
  function handleUnBanUser() {
    if (onUnBanUser) {
      onUnBanUser(user);
    }
  }
  function handleUserInfoVisible() {
    if (onUserInfoVisible) {
      onUserInfoVisible(user);
    }
  }
  return (
    <TouchableWithoutFeedback onPress={handleUserInfoVisible}>
      <View style={styles.container}>
        <Icon name="account-question" size={30} color={Colors.iconColor} />
        <Text style={styles.userNameText}>{user.userName}</Text>
        {unBanButtonVisible && (
          <TouchableWithoutFeedback onPress={handleUnBanUser}>
            <View style={styles.unbanButtonContainer}>
              <Icon name="shield-remove" size={30} color={Colors.iconColor} />
              <Text style={styles.unBanButtonText}>Unban this user</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
export default SearchUserCard;
