import React, {FC, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import Modal from 'react-native-modal';
import SearchUserCard from '../../Cards/User Search Card';
import InputBox from '../../InputBox';
import styles from './SearchRoomUsersModal.style';
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
  const [roomUsers, setRoomUsers] = useState<any>(room.users);
  const renderRoomUsers = ({item}: any) => (
    <SearchUserCard user={item}></SearchUserCard>
  );
  function searchRoomUsers(searchedUserName: string) {
    const filteredList = room.users.filter((user: any) => {
      const currentUserName = user.userName.trim().toLowerCase();
      const searchedName = searchedUserName.trim().toLowerCase();
      return currentUserName.indexOf(searchedName) > -1;
    });
    setRoomUsers(filteredList);
  }
  return (
    <Modal
      style={styles.modalContainer}
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}>
      <View style={styles.container}>
        <Text style={styles.leaveRoomButton} onPress={onLeaveRoom}>
          Leave the room{' '}
        </Text>
        <InputBox
          iconName="magnify"
          placeholder="Search room users..."
          onChangeText={t => searchRoomUsers(t)}></InputBox>
        <FlatList data={roomUsers} renderItem={renderRoomUsers}></FlatList>
      </View>
    </Modal>
  );
};
export default SearchRoomUsersModal;
