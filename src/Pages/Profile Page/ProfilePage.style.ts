import {StyleSheet} from 'react-native';
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconContainer: {
    backgroundColor: Colors.greyColor,
    borderRadius: 10,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfoContainer: {
    alignItems: 'center',
  },
  profilePhotoContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.greyColor,
    borderRadius: 50,
  },
  addProfilePhotoButton: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkGreen,
    borderRadius: 50,
  },
  userNameText: {
    color: Colors.textColor,
    fontFamily: Fonts.defaultRegularFont,
    fontSize: 20,
    marginTop: 10,
  },
  genderText: {
    color: Colors.darkGreen,
    fontFamily: Fonts.defaultRegularFont,
    fontSize: 14,
    marginTop: 10,
  },
  formInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
