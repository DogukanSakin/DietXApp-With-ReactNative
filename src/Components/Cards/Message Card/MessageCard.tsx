import React from 'react';
import {Text, View} from 'react-native';
import styles from './MessageCard.style';
const MessageCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.authorContainer}>
        <View style={styles.line} />
        <Text style={styles.authorText}>Author</Text>
        <View style={styles.line} />
      </View>
      <Text style={styles.messageContentText}>Message Content</Text>
    </View>
  );
};
export default MessageCard;
