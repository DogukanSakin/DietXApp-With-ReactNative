import React, {useEffect, useState} from 'react';
import {Text, View, TouchableWithoutFeedback, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './ProfilePage.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Styles/Colors';
import database from '@react-native-firebase/database';
import currentUserInfo from '../../Utils/getUserInfo';
import BodyMeasurements from '../../Components/Body Measurements';
import InputBox from '../../Components/InputBox';
import MainButton from '../../Components/Buttons/MainButton';
import {Formik} from 'formik';
import {showMessage} from 'react-native-flash-message';
import Fonts from '../../Styles/Fonts';
import storage from '@react-native-firebase/storage';
import getImage from '../../Utils/imagePicker';
interface IFormValues {
  email: any;
  password: string;
  weight: string;
  height: string;
  age: string;
}
function ProfilePage() {
  const [currentUserData, setCurrentUserData] = useState<any>({});
  const [bmi, setBMI] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [profilePhotoURL, setProfilePhotoURL] = useState<any>(null);
  useEffect(() => {
    fetchUserInfoData();
  }, []);
  const initialFormValues: IFormValues = {
    email: auth().currentUser?.email ? auth().currentUser?.email : '',
    password: '',
    weight: currentUserData.weight ? currentUserData.weight : '',
    height: currentUserData.height ? currentUserData.height : '',
    age: currentUserData.age ? currentUserData.age : '',
  };
  async function fetchProfilePhoto(profilePhoto: string) {
    storage()
      .ref('/' + profilePhoto)
      .getDownloadURL()
      .then(url => {
        setProfilePhotoURL(url);
      })
      .catch(e => console.log('Errors while downloading => ', e));
  }
  async function handleUpdateProfilePhoto() {
    try {
      const resultURI: any = await getImage();
      const imageName: any = resultURI.substring(
        resultURI.lastIndexOf('/') + 1,
      );
      await database()
        .ref(`users/${currentUserInfo.userID}/`)
        .update({profilePhotoURL: imageName});
      const task = storage().ref(imageName).putFile(resultURI);
      task.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });
      async () => {
        await task;
        fetchProfilePhoto(imageName);
      };
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchUserInfoData() {
    try {
      await database()
        .ref(`users/${currentUserInfo.userID}`)
        .on('value', snapshot => {
          const fetchedData = snapshot.val();
          if (fetchedData) {
            setCurrentUserData(fetchedData);
            if (fetchedData.weight && fetchedData.height) {
              const BMI = Math.floor(
                Math.floor(fetchedData.weight) /
                  ((Math.floor(fetchedData.height) / 100) *
                    (Math.floor(fetchedData.height) / 100)),
              );
              setBMI(BMI);
            }
            if (fetchedData.profilePhotoURL) {
              storage()
                .ref('/' + fetchedData.profilePhotoURL) //name in storage in firebase console
                .getDownloadURL()
                .then(url => {
                  setProfilePhotoURL(url);
                })
                .catch(e => console.log('Errors while downloading => ', e));
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  async function handleUpdateProfileInfo(formValues: any) {
    setLoading(true);
    try {
      //Email:
      if (currentUserData.email !== formValues.email) {
        auth().currentUser?.updateEmail(formValues.email);
        await database()
          .ref(`users/${currentUserInfo.userID}/`)
          .update({email: formValues.email});
      }
      //Password:
      const passwordCheck = formValues.password.trim();
      if (passwordCheck != '') {
        auth().currentUser?.updatePassword(formValues.password);
      }
      //Others:
      await database().ref(`users/${currentUserInfo.userID}/`).update({
        weight: formValues.weight,
        height: formValues.height,
        age: formValues.age,
      });
      showMessage({
        message: 'Your profile is successfuly updated!',
        type: 'success',
        titleStyle: {fontFamily: Fonts.defaultRegularFont},
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showMessage({
        message: 'Opps... There is an error!',
        type: 'danger',
        titleStyle: {fontFamily: Fonts.defaultRegularFont},
      });
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.topButtonsContainer}>
        <View style={styles.iconContainer}>
          <Icon
            name="logout"
            size={30}
            color={Colors.darkGreen}
            onPress={() => auth().signOut()}
          />
        </View>
      </View>
      <View style={styles.profileInfoContainer}>
        <TouchableWithoutFeedback onPress={handleUpdateProfilePhoto}>
          <View style={styles.profilePhotoContainer}>
            {currentUserData.profilePhotoURL ? (
              <Image
                source={{uri: profilePhotoURL}}
                style={styles.profilePhotoContainer}
              />
            ) : (
              <Icon
                name="account-question"
                size={30}
                color={Colors.iconColor}
              />
            )}

            <View style={styles.addProfilePhotoButton}>
              <Icon name="plus" size={15} color="white" />
            </View>
          </View>
        </TouchableWithoutFeedback>

        <Text style={styles.userNameText}>{currentUserData.userName}</Text>
        {currentUserData.gender && (
          <Text style={styles.genderText}>{currentUserData.gender}</Text>
        )}
        {currentUserData.weight && currentUserData.height ? (
          <BodyMeasurements
            weight={currentUserData.weight}
            height={currentUserData.height}
            bmi={bmi}
          />
        ) : null}
      </View>
      <Formik
        initialValues={initialFormValues}
        onSubmit={handleUpdateProfileInfo}>
        {({values, handleChange, handleSubmit}) => (
          <>
            <InputBox
              iconName="email"
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
            />
            <InputBox
              iconName="lock"
              secureTextEntry={true}
              placeholder=""
              value={values.password}
              onChangeText={handleChange('password')}
            />
            <View style={styles.formInnerContainer}>
              <InputBox
                iconName="weight-kilogram"
                placeholder="Weight(KG)"
                value={values.weight}
                onChangeText={handleChange('weight')}
              />
              <InputBox
                iconName="human-male-height-variant"
                placeholder="Height(CM)"
                value={values.height}
                onChangeText={handleChange('height')}
              />
              <InputBox
                iconName="baby-carriage"
                placeholder="Age"
                value={values.age}
                onChangeText={handleChange('age')}
              />
            </View>
            <MainButton
              title="Update profile"
              onPress={handleSubmit}
              loading={loading}
            />
          </>
        )}
      </Formik>
    </View>
  );
}
export default ProfilePage;
