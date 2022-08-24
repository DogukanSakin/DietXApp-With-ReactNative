import {StyleSheet} from 'react-native';
import Colors from '../../../Styles/Colors';
import Fonts from '../../../Styles/Fonts';
const baseStyle = StyleSheet.create({
  buttonTitle: {
    fontSize: 20,
    fontFamily: Fonts.defaultRegularFont,
  },
  buttonContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
});
export default {
  primary: {
    buttonTitle: {
      ...baseStyle.buttonTitle,
      color: 'white',
    },
    buttonContainer: {
      ...baseStyle.buttonContainer,
      backgroundColor: Colors.darkGreen,
    },
    activityIndicator: {
      color: 'black',
    },
  },
  secondary: {
    buttonTitle: {
      ...baseStyle.buttonTitle,
      color: Colors.darkGreen,
    },
    buttonContainer: {
      ...baseStyle.buttonContainer,
      borderWidth: 1,
      borderColor: Colors.darkGreen,
    },
  },
};
