/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useState, useEffect} from 'react';
import {Text, View, TouchableWithoutFeedback, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Styles/Colors';
import styles from './UserSearchCard.style';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
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
  const [profilePhotoURL, setProfilePhotoURL] = useState<any>(null);
  useEffect(() => {
    getUserProfilePhoto();
  }, []);
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
  async function getUserProfilePhoto() {
    await database()
      .ref(`users/${user.id}/profilePhotoURL`)
      .once('value')
      .then(snapshot => {
        const fetchedProfilePhotoURL = snapshot.val();
        if (fetchedProfilePhotoURL !== null) {
          storage()
            .ref('/' + fetchedProfilePhotoURL)
            .getDownloadURL()
            .then(url => {
              setProfilePhotoURL(url);
            })
            .catch(e => console.log('Errors while downloading => ', e));
        }
      });
  }

  return (
    <TouchableWithoutFeedback onPress={handleUserInfoVisible}>
      <View style={styles.container}>
        {profilePhotoURL ? (
          <Image
            source={{uri: profilePhotoURL}}
            style={styles.profilePhotoImage}
          />
        ) : (
          <Icon name="account-question" size={30} color={Colors.iconColor} />
        )}

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
