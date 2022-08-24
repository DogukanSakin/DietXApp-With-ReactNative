import React, {FC} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../../Styles/Colors';
import styles from './MainButton.style';
interface IProps extends TouchableOpacityProps {
  title: string;
  theme?: 'primary' | 'secondary';
  loading?: boolean;
}
const MainButton: FC<IProps> = ({
  loading,
  title,
  theme = 'primary',
  ...rest
}) => {
  let activityIndicatorColor;
  if (theme == 'primary') {
    activityIndicatorColor = 'white';
  } else if (theme == 'secondary') {
    activityIndicatorColor = Colors.darkGreen;
  }
  return (
    <TouchableOpacity {...rest}>
      <View style={styles[theme].buttonContainer}>
        {loading ? (
          <ActivityIndicator color={activityIndicatorColor} />
        ) : (
          <Text style={styles[theme].buttonTitle}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default MainButton;
