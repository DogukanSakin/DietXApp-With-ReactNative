/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import styles from './HomePage.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Styles/Colors';
import CircularProgress from 'react-native-circular-progress-indicator';
import Fonts from '../../Styles/Fonts';
import DailyFoodCard from '../../Components/Cards/Daily Food Card';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import parseContentData from '../../Utils/parseContentData';
const currentUserUID = auth().currentUser?.uid;
const userTEST = {
  age: 18,
  email: 'Nra@nra.com',
  gender: 'Male',
  height: 188,
  userName: 'Nra',
  weight: 90,
};
const totalUserDailyConsumptionsTEST = {
  totalCal: 250,
  totalProtein: 15,
  totalFat: 50,
  totalCarbohydrate: 750,
};
function HomePage() {
  const [currentUserData, setCurrentUserData] = useState<any>(userTEST);
  const [
    currentUserDailyConsumptionsTotals,
    setCurrentUserDailyConsumptionsTotals,
  ] = useState<any>(totalUserDailyConsumptionsTEST);
  const [currentUserDailyConsumptions, setCurrentUserDailyConsumptions] =
    useState<any>();
  const [bmi, setBMI] = useState<number>(0);
  const [dailyTotalCal, setDailyTotalCal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>();
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
    await database()
      .ref(`users/${currentUserUID}`)
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
        } else {
          const BMI = Math.floor(
            Math.floor(userTEST.weight) /
              ((Math.floor(userTEST.height) / 100) *
                (Math.floor(userTEST.height) / 100)),
          );
          setBMI(BMI);
          const BMR = Math.floor(
            66.5 +
              13.75 * Math.floor(userTEST.weight) +
              5.003 * Math.floor(userTEST.height) -
              6.75 * Math.floor(userTEST.age),
          );
          setDailyTotalCal(BMR);
          setCurrentUserData(userTEST);
        }
      });
  }
  async function fetchCurrentUserDailyConsumptions() {
    await database()
      .ref(`dailyConsumptions/${currentUserUID}`)
      .on('value', snapshot => {
        const fetchedData = snapshot.val();
        if (fetchedData !== undefined || fetchedData !== null) {
          const parsedData = parseContentData(fetchedData);
          const parsedDataLength = parsedData.length;
          let cal = 0,
            protein = 0,
            fat = 0,
            carbohydrate = 0;
          for (let index = 0; index < parsedDataLength; index++) {
            cal += parsedData[index].cal;
            protein += parsedData[index].protein;
            fat += parsedData[index].fat;
            carbohydrate += parsedData[index].fat;
          }
          const totalUserDailyConsumptions = {
            totalCal: cal,
            totalProtein: protein,
            totalFat: fat,
            totalCarbohydrate: carbohydrate,
          };

          setCurrentUserDailyConsumptionsTotals(totalUserDailyConsumptions);
          setCurrentUserDailyConsumptions(parsedData);
        } else {
          setCurrentUserDailyConsumptionsTotals(totalUserDailyConsumptionsTEST);
        }
      });
  }
  async function deleteDailyConsumption(food: any) {
    await database()
      .ref(`dailyConsumptions/${currentUserUID}/${food.id}`)
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
        <Icon name="account-question" size={30} color={Colors.iconColor} />
        <Text style={styles.welcomeText}>
          Welcome back {currentUserData.userName}!
        </Text>
        <View style={styles.userBodyMeasureContainer}>
          <Icon name="weight-kilogram" size={30} color={Colors.iconColor} />
          <Text style={styles.measureText}>{currentUserData.weight} KG</Text>
          <Icon
            name="human-male-height-variant"
            size={30}
            color={Colors.iconColor}
          />
          <Text style={styles.measureText}>{currentUserData.height} CM</Text>
          <Icon name="scale" size={30} color={Colors.iconColor} />
          <Text style={styles.measureText}>BMI : {bmi}</Text>
        </View>
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
