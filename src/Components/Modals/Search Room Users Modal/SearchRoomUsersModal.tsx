import React, {FC, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import Modal from 'react-native-modal';
import currentUserInfo from '../../../Utils/getUserInfo';
import SearchUserCard from '../../Cards/User Search Card';
import InputBox from '../../InputBox';
import styles from './SearchRoomUsersModal.style';
import {useNavigation} from '@react-navigation/native';
interface IModalProps {
  isVisible: boolean;
  onClose: () => void;
  room: any;
  onLeaveRoom: () => void;
}
const SearchRoomUsersModal: FC<IModalProps> = ({
  isVisible,
  onClose,
  room,
  onLeaveRoom,
}) => {
  const navigation = useNavigation();
  const [roomUsers, setRoomUsers] = useState<any>(room.users);
  const renderRoomUsers = ({item}: any) => (
    <SearchUserCard
      user={item}
      onUserInfoVisible={() => goUserInfoPage(item)}
    />
  );
  function searchRoomUsers(searchedUserName: string) {
    const filteredList = room.users.filter((user: any) => {
      const currentUserName = user.userName.trim().toLowerCase();
      const searchedName = searchedUserName.trim().toLowerCase();
      return currentUserName.indexOf(searchedName) > -1;
    });
    setRoomUsers(filteredList);
  }
  function goUserInfoPage(user: any) {
    if (user.id === currentUserInfo.userID) {
      navigation.navigate('Profile' as never);
    } else {
      navigation.navigate('UserInfo' as never, {userInfo: user} as never);
    }
  }
  return (
    <Modal
      style={styles.modalContainer}
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}>
      <View style={styles.container}>
        <Text style={styles.leaveRoomButton} onPress={onLeaveRoom}>
          Leave the room
        </Text>
        <InputBox
          iconName="magnify"
          placeholder="Search room users..."
          onChangeText={t => searchRoomUsers(t)}
        />
        <FlatList data={roomUsers} renderItem={renderRoomUsers} />
      </View>
    </Modal>
  );
};

export default SearchRoomUsersModal;
