import {StyleSheet} from 'react-native';
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  profileInfoContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 30,
  },
  profilePhoto: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  goBackButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goBackButtonText: {
    color: Colors.textColor,
    fontSize: 18,
    fontFamily: Fonts.defaultRegularFont,
    flex: 1,
    textAlign: 'center',
  },
  userNameText: {
    color: Colors.darkGreen,
    fontSize: 20,
    fontFamily: Fonts.defaultRegularFont,
    marginTop: 10,
  },
  genderText: {
    color: Colors.textColor,
    fontSize: 18,
    fontFamily: Fonts.defaultRegularFont,
    marginTop: 10,
  },
});
