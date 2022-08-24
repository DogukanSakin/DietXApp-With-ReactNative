import React, {FC} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Styles/Colors';
import styles from './FloatingButton.style';
interface IButtonProps {
  onPress: () => void;
}
const FloatingButton: FC<IButtonProps> = ({onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Icon name="plus" size={35} color={Colors.darkGreen} />
      </View>
    </TouchableWithoutFeedback>
  );
};
export default FloatingButton;
