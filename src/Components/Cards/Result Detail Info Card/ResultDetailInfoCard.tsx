import React, {FC} from 'react';
import {Text, View} from 'react-native';
import apiNutritientsParser from '../../../Utils/apiNutritientsParser';
import styles from './ResultDetailInfoCard.style';
interface ICardProps {
  nutrient: any;
}
const ResultDetailInfoCard: FC<ICardProps> = ({nutrient}) => {
  let key = apiNutritientsParser(nutrient.attr_id);
  return (
    <View>
      {key != 'Unknown' && (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.keyText}>{key} :</Text>
            <Text style={styles.valueText}>{nutrient.value}</Text>
          </View>
          <View style={styles.line} />
        </View>
      )}
    </View>
  );
};
export default ResultDetailInfoCard;
