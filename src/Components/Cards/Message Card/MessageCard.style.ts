import {StyleSheet} from 'react-native';
import Colors from '../../../Styles/Colors';
import Fonts from '../../../Styles/Fonts';
const baseStyle = StyleSheet.create({
  text: {
    fontFamily: Fonts.defaultRegularFont,
    fontSize: 14,
    color: Colors.textColor,
  },
});
export default StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGreen,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    borderBottomWidth: 1,
    borderColor: Colors.textColor,
    flex: 1,
  },
  authorText: {
    ...baseStyle.text,
    flex: 1,
    textAlign: 'center',
  },
  messageContentText: {
    ...baseStyle.text,
    marginTop: 10,
  },
});
