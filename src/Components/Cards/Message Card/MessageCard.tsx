import React, {FC} from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import styles from './MessageCard.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Styles/Colors';
interface ICardProps {
  message: any;
  onOpenMessageContentInfo: () => void;
  roomAdmin: any;
}
const MessageCard: FC<ICardProps> = ({
  message,
  onOpenMessageContentInfo,
  roomAdmin,
}) => {
  return (
    <TouchableWithoutFeedback onLongPress={onOpenMessageContentInfo}>
      <View style={styles.container}>
        <View style={styles.authorContainer}>
          <View style={styles.line} />
          <Text style={styles.authorText}>
            {message.authorName}
            {message.authorID === roomAdmin ? (
              <Icon name="shield-crown" size={15} color={Colors.iconColor} />
            ) : (
              ''
            )}
          </Text>
          <View style={styles.line} />
        </View>
        <Text style={styles.messageContentText}>{message.message}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default MessageCard;
