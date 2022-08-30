import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
const deviceSize = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGreen,
  },
  innerContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    height: deviceSize.height,
    flex: 1,
  },
  profileInnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  welcomeText: {
    color: Colors.textColor,
    fontFamily: Fonts.defaultRegularFont,
    fontSize: 20,
  },
  userBodyMeasureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  measureText: {
    color: Colors.textColor,
    fontFamily: Fonts.defaultRegularFont,
    fontSize: 14,
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    alignSelf: 'center',
    width: deviceSize.width / 1.5,
  },
  line: {
    borderBottomWidth: 0.5,
    borderColor: Colors.iconColor,
    flex: 1,
  },
  titleText: {
    color: Colors.textColor,
    fontFamily: Fonts.defaultSemiBoldFont,
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  totalCaloriesContainer: {
    backgroundColor: Colors.greyColor,
    borderRadius: 50,
    width: 175,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
  },
  totalCalTitle: {
    color: Colors.textColor,
    fontFamily: Fonts.defaultRegularFont,
    marginBottom: 10,
    marginTop: 10,
  },
  dailyInfoContainer: {
    flexDirection: 'row',
  },
  infoValuesContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  infoValuesText: {
    color: Colors.textColor,
    fontFamily: Fonts.defaultRegularFont,
  },
  infoValuesInnerContainer: {
    backgroundColor: Colors.greyColor,
    borderRadius: 50,
    padding: 15,
    margin: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
  },
  warningText: {
    fontFamily: Fonts.defaultSemiBoldFont,
    color: 'red',
    width: deviceSize.width / 1.5,
    textAlign: 'center',
  },
  warningContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loadingContainer: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePhotoContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 50,
  },
});
