import React, {FC} from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import styles from './MessageContentInfoModal.style';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import currentUserInfo from '../../../Utils/getUserInfo';
interface IModalProps {
  isVisible: boolean;
  onClose: () => void;
  message: any;
  onBanUser: (userID: any, userName: any) => void;
}
const MessageContentInfoModal: FC<IModalProps> = ({
  isVisible,
  onClose,
  message,
  onBanUser,
}) => {
  function handleBanUser() {
    if (message) {
      onBanUser(message.authorID, message.authorName);
    }
  }
  return (
    <Modal
      style={styles.modalContainer}
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}>
      <View style={styles.container}>
        <Text style={styles.tagText}>
          Author: <Text style={styles.contentText}>{message.authorName}</Text>
        </Text>
        <View style={styles.line} />
        <Text style={styles.tagText}>
          Message: <Text style={styles.contentText}>{message.message}</Text>
        </Text>
        <View style={styles.line} />
        <Text style={styles.tagText}>
          Send Time: <Text style={styles.contentText}>{message.sendTime}</Text>
        </Text>
        <View style={styles.line} />
        {/*The admins of the roomscannot ban themselves. */}
        {message.authorID !== currentUserInfo.userID && (
          <TouchableWithoutFeedback onPress={handleBanUser}>
            <View style={styles.banButtonContainer}>
              <Text style={styles.banButtonText}>Ban this user</Text>
              <Icon
                name="account-cancel"
                size={20}
                color="red"
                style={styles.buttonIcon}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </Modal>
  );
};
export default MessageContentInfoModal;
