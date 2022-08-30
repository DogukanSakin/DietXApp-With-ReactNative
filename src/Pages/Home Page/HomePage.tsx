/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './HomePage.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Styles/Colors';
import CircularProgress from 'react-native-circular-progress-indicator';
import Fonts from '../../Styles/Fonts';
import DailyFoodCard from '../../Components/Cards/Daily Food Card';
import database from '@react-native-firebase/database';
import parseContentData from '../../Utils/parseContentData';
import currentUserInfo from '../../Utils/getUserInfo';
import BodyMeasurements from '../../Components/Body Measurements';
import storage from '@react-native-firebase/storage';
function HomePage({navigation}: any) {
  const [currentUserData, setCurrentUserData] = useState<any>({});
  const [
    currentUserDailyConsumptionsTotals,
    setCurrentUserDailyConsumptionsTotals,
  ] = useState<any>({});
  const [currentUserDailyConsumptions, setCurrentUserDailyConsumptions] =
    useState<any>();
  const [bmi, setBMI] = useState<number>(0);
  const [dailyTotalCal, setDailyTotalCal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>();
  const [profilePhotoURL, setProfilePhotoURL] = useState<any>(null);
  useEffect(() => {
    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function fetchAllData() {
    setLoading(true);
    await fetchCurrentUserInfo();
    await fetchCurrentUserDailyConsumptions();
    setLoading(false);
  }
  async function fetchCurrentUserInfo() {
    try {
      //Here, the daily calorie needs of the user are calculated using formulas.
      await database()
        .ref(`users/${currentUserInfo.userID}`)
        .on('value', snapshot => {
          const fetchedData = snapshot.val();

          if (fetchedData != undefined || fetchedData != null) {
            setCurrentUserData(fetchedData);
            if (fetchedData.weight && fetchedData.height) {
              const BMI = Math.floor(
                Math.floor(fetchedData.weight) /
                  ((Math.floor(fetchedData.height) / 100) *
                    (Math.floor(fetchedData.height) / 100)),
              );
              setBMI(BMI);
            }
            if (
              fetchedData.gender &&
              fetchedData.weight &&
              fetchedData.height &&
              fetchedData.weight &&
              fetchedData.age
            ) {
              if (fetchedData.gender === 'Male') {
                const BMR = Math.floor(
                  66.5 +
                    13.75 * Math.floor(fetchedData.weight) +
                    5.003 * Math.floor(fetchedData.height) -
                    6.75 * Math.floor(fetchedData.age),
                );
                setDailyTotalCal(BMR);
              } else {
                const BMR = Math.floor(
                  655.1 +
                    9.563 * Math.floor(fetchedData.weight) +
                    1.85 * Math.floor(fetchedData.height) -
                    4.676 * Math.floor(fetchedData.age),
                );
                setDailyTotalCal(BMR);
              }
            }
            if (fetchedData.profilePhotoURL) {
              storage()
                .ref('/' + fetchedData.profilePhotoURL)
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

  async function fetchCurrentUserDailyConsumptions() {
    try {
      //The values of the nutrients consumed by the user daily are calculated here.
      await database()
        .ref(`dailyConsumptions/${currentUserInfo.userID}`)
        .on('value', snapshot => {
          const fetchedData = snapshot.val();
          if (fetchedData !== undefined || fetchedData !== null) {
            const parsedData: any = parseContentData(fetchedData);
            const parsedDataLength = parsedData ? parsedData.length : 0;
            let cal = 0,
              protein = 0,
              fat = 0,
              carbohydrate = 0;
            if (parsedDataLength > 0) {
              for (let index = 0; index < parsedDataLength; index++) {
                cal += parsedData[index].cal;
                protein += parsedData[index].protein;
                fat += parsedData[index].fat;
                carbohydrate += parsedData[index].fat;
              }
            }

            const totalUserDailyConsumptions = {
              totalCal: cal,
              totalProtein: protein,
              totalFat: fat,
              totalCarbohydrate: carbohydrate,
            };

            setCurrentUserDailyConsumptionsTotals(totalUserDailyConsumptions);
            setCurrentUserDailyConsumptions(parsedData);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteDailyConsumption(food: any) {
    await database()
      .ref(`dailyConsumptions/${currentUserInfo.userID}/${food.id}`)
      .remove();
  }
  const renderDailyConsumptions = ({item}: any) => (
    <DailyFoodCard food={item} onDelete={() => deleteDailyConsumption(item)} />
  );
  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={30} color={Colors.darkGreen} />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.profileInnerContainer}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Profile')}>
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
          </View>
        </TouchableWithoutFeedback>

        <Text style={styles.welcomeText}>
          Welcome back {currentUserData.userName}!
        </Text>
        {currentUserData.height && currentUserData.weight ? (
          <BodyMeasurements
            height={currentUserData.height}
            weight={currentUserData.weight}
            bmi={bmi}
          />
        ) : null}
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.line} />
          <Text style={styles.titleText} numberOfLines={1}>
            Daily statistics
          </Text>
          <View style={styles.line} />
        </View>
        {currentUserData.age === undefined ||
        currentUserData.gender === undefined ||
        currentUserData.weight === undefined ||
        currentUserData.height === undefined ? (
          <View style={styles.warningContainer}>
            <Text style={styles.warningText}>
              Since this information below is missing, your daily statistics
              cannot be calculated correctly. Please add this information by
              going to the profile page.
            </Text>
          </View>
        ) : null}

        <View style={styles.dailyInfoContainer}>
          <View style={styles.totalCaloriesContainer}>
            <Text style={styles.totalCalTitle}>Total Daily Calories </Text>
            <CircularProgress
              value={
                currentUserDailyConsumptionsTotals.totalCal != undefined
                  ? currentUserDailyConsumptionsTotals.totalCal
                  : 0
              }
              radius={75}
              duration={5000}
              progressValueColor={Colors.textColor}
              maxValue={dailyTotalCal}
              subtitle={`Total : ${dailyTotalCal}`}
              subtitleStyle={{
                fontWeight: 'bold',
                fontFamily: Fonts.defaultRegularFont,
                color: Colors.darkGreen,
              }}
              titleColor={Colors.textColor}
              titleStyle={{
                fontWeight: 'bold',
                fontFamily: Fonts.defaultRegularFont,
              }}
              activeStrokeColor={Colors.darkGreen}
              inActiveStrokeColor={Colors.lightGreen}
            />
          </View>
          <View style={styles.infoValuesContainer}>
            <View style={styles.infoValuesInnerContainer}>
              {currentUserDailyConsumptionsTotals.totalCarbohydrate !=
                undefined && currentUserDailyConsumptionsTotals != undefined ? (
                <Text style={styles.infoValuesText}>
                  {' '}
                  Carbohydrate:{' '}
                  {currentUserDailyConsumptionsTotals.totalCarbohydrate}{' '}
                </Text>
              ) : (
                <Text style={styles.infoValuesText}> Carbohydrate: 0 </Text>
              )}
            </View>
            <View style={styles.infoValuesInnerContainer}>
              {currentUserDailyConsumptionsTotals.totalProtein != undefined &&
              currentUserDailyConsumptionsTotals != undefined ? (
                <Text style={styles.infoValuesText}>
                  {' '}
                  Protein: {
                    currentUserDailyConsumptionsTotals.totalProtein
                  }{' '}
                </Text>
              ) : (
                <Text style={styles.infoValuesText}> Protein: 0 </Text>
              )}
            </View>
            <View style={styles.infoValuesInnerContainer}>
              {currentUserDailyConsumptionsTotals.totalFat != undefined &&
              currentUserDailyConsumptionsTotals != undefined ? (
                <Text style={styles.infoValuesText}>
                  {' '}
                  Fat: {currentUserDailyConsumptionsTotals.totalFat}
                </Text>
              ) : (
                <Text style={styles.infoValuesText}> Fat: 0</Text>
              )}
            </View>
          </View>
        </View>
        <FlatList
          data={currentUserDailyConsumptions}
          renderItem={renderDailyConsumptions}
          numColumns={2}
        />
      </View>
    </View>
  );
}

export default HomePage;
