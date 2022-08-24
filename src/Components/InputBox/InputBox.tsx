import React, {FC} from 'react';
import {TextInput, TextInputProps, View} from 'react-native';
import Colors from '../../Styles/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './InputBox.style';
interface IProps extends TextInputProps {
  iconName?: string;
}
const InputBox: FC<IProps> = ({placeholder, iconName, ...rest}) => {
  return (
    <View style={styles.container}>
      {iconName ? (
        <Icon
          name={iconName}
          size={25}
          color={Colors.iconColor}
          style={styles.icon}
        />
      ) : null}
      <TextInput
        {...rest}
        placeholder={placeholder}
        placeholderTextColor={Colors.textColor}
        style={styles.input}
      />
    </View>
  );
};
export default InputBox;
