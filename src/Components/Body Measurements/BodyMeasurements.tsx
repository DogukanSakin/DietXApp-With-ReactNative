import React, {FC} from 'react';
import {Text, View} from 'react-native';
import styles from './BodyMeasurements.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Styles/Colors';
interface IProps {
  weight: number;
  height: number;
  bmi: number;
}
const BodyMeasurements: FC<IProps> = ({weight, height, bmi}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Icon name="weight-kilogram" size={30} color={Colors.iconColor} />
        <Text style={styles.measureText}>{weight} KG</Text>
      </View>
      <View style={styles.rowContainer}>
        <Icon
          name="human-male-height-variant"
          size={30}
          color={Colors.iconColor}
        />
        <Text style={styles.measureText}>{height} CM</Text>
      </View>
      <View style={styles.rowContainer}>
        <Icon name="scale" size={30} color={Colors.iconColor} />
        <Text style={styles.measureText}>BMI : {bmi}</Text>
      </View>
    </View>
  );
};
export default BodyMeasurements;
