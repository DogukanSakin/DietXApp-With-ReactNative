/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  View,
} from 'react-native';
import styles from './SearchPage.style';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Fonts from '../../Styles/Fonts';
import Colors from '../../Styles/Colors';
import InputBox from '../../Components/InputBox';
import useFetch from '../../Hooks/useFetch';
import Config from 'react-native-config';
import SearchResultCard from '../../Components/Cards/Search Result Card';
import SearchResultDetailModal from '../../Components/Modals/Search Result Detail Modal';
import SearchUserCard from '../../Components/Cards/User Search Card';
import database from '@react-native-firebase/database';
import parseContentData from '../../Utils/parseContentData';
import {showMessage} from 'react-native-flash-message';
import AddDailyConsumptionModal from '../../Components/Modals/Add Daily Consumption Modal';
import currentUserInfo from '../../Utils/getUserInfo';
const Tab = createMaterialTopTabNavigator();
const deviceSize = Dimensions.get('window');
function SearchPage() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {shadowColor: 'transparent', paddingTop: 15, elevation: 0},
        tabBarIndicatorStyle: {opacity: 0},
        tabBarPressColor: 'transparent',
      }}>
      <Tab.Screen
        name="SearchFoodsAndDrinks"
        component={SearchFoodsAndDrinks}
        options={{
          tabBarLabel: ({focused}) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? Colors.darkGreen : '',
                  padding: 10,
                  borderRadius: 100,
                  width: deviceSize.width / 2.5,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: focused ? 'white' : Colors.textColor,
                    fontFamily: Fonts.defaultRegularFont,
                    fontSize: 18,
                  }}>
                  Foods & Drinks
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="SearchUsers"
        component={SearchUsers}
        options={{
          tabBarLabel: ({focused}) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? Colors.darkGreen : '',
                  padding: 10,
                  borderRadius: 100,
                  width: deviceSize.width / 2.5,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: focused ? 'white' : Colors.textColor,
                    fontFamily: Fonts.defaultRegularFont,
                    fontSize: 18,
                  }}>
                  Users
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
const SearchFoodsAndDrinks = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [resultDetailForModal, setResultDetailForModal] = useState<any>(null);
  const [addDailyConsumptionModalVisible, setAddDailyConsumptionModalVisible] =
    useState<boolean>(false);
  const [selectedFood, setSelectedFood] = useState<any>();

  async function searchFoodOrDrinkNutrition(searchedName: string) {
    searchedName = searchedName.trim();
    if (searchedName === '') {
      setData(null);
    } else {
      setData(null);
      setLoading(true);
      const data = await useFetch(
        `${Config.API_URL}?query=${searchedName}&common=true&detailed=true`,
      );
      setLoading(false);
      setData(data);
    }
  }
  function handleVisibleDetailModal(item?: any) {
    setDetailModalVisible(!detailModalVisible);
    if (item) {
      setResultDetailForModal(item);
    }
  }
  function handleDailyConsumptionModalVisible(item?: any) {
    setAddDailyConsumptionModalVisible(!addDailyConsumptionModalVisible);
    if (item) {
      setSelectedFood(item);
    }
  }
  async function addDailyConsumption(item: any, quantity: any, totalCal: any) {
    if (quantity === undefined) {
      quantity = 1;
    }

    try {
      setLoading(true);
      const dailyConsumptionContent = {
        name: item.food_name,
        cal: totalCal,
        protein:
          item.full_nutrients[0].attr_id === '203'
            ? Math.floor(item.full_nutrients[0].value * quantity)
            : 0,
        fat:
          item.full_nutrients[1] === '204'
            ? Math.floor(item.full_nutrients[1].value * quantity)
            : 0,
        carbohydrate:
          item.full_nutrients[2] === '205'
            ? Math.floor(item.full_nutrients[2].value * quantity)
            : 0,
        quantity: quantity,
      };
      await database()
        .ref(`dailyConsumptions/${currentUserInfo.userID}/`)
        .orderByChild('name')
        .equalTo(item.food_name)
        .once('value')
        .then(snapshot => {
          if (snapshot.exists()) {
            const existData = snapshot.val();
            const parsedData: any = parseContentData(existData);
            database()
              .ref(
                `dailyConsumptions/${currentUserInfo.userID}/${parsedData[0].id}/`,
              )
              .update({
                cal: parsedData[0].cal + dailyConsumptionContent.cal,
                carbohydrate:
                  parsedData[0].carbohydrate +
                  dailyConsumptionContent.carbohydrate,
                fat: parsedData[0].fat + dailyConsumptionContent.fat,
                protein:
                  parsedData[0].protein + dailyConsumptionContent.protein,
                quantity:
                  parsedData[0].quantity + dailyConsumptionContent.quantity,
              });
          } else {
            database()
              .ref(`dailyConsumptions/${currentUserInfo.userID}/`)
              .push(dailyConsumptionContent);
          }
        });
      setLoading(false);
      showMessage({
        message:
          'The food or drink successfuly added to your daily consumptions.',
        type: 'success',
        titleStyle: {fontFamily: Fonts.defaultRegularFont},
      });
      setAddDailyConsumptionModalVisible(false);
    } catch (error) {
      setLoading(false);
      showMessage({
        message: 'Opps... There is an error!',
        type: 'danger',
        titleStyle: {fontFamily: Fonts.defaultRegularFont},
      });
    }
  }
  const renderResult = ({item}: any) => (
    <SearchResultCard
      item={item}
      viewDetail={item => handleVisibleDetailModal(item)}
      addButtonVisible={true}
      addDailyConsumption={item => handleDailyConsumptionModalVisible(item)}
      loading={loading}
    />
  );
  return (
    <View style={styles.container}>
      <InputBox
        iconName="magnify"
        placeholder="Search foods or drinks..."
        onChangeText={text => searchFoodOrDrinkNutrition(text)}
      />
      {resultDetailForModal && (
        <SearchResultDetailModal
          isVisible={detailModalVisible}
          onClose={() => handleVisibleDetailModal()}
          item={resultDetailForModal}
        />
      )}
      <FlatList renderItem={renderResult} data={data} />
      <AddDailyConsumptionModal
        isVisible={addDailyConsumptionModalVisible}
        onClose={handleDailyConsumptionModalVisible}
        food={selectedFood}
        addDailyConsumption={addDailyConsumption}
      />
      <View style={styles.loadingStateContainer}>
        {loading ? (
          <ActivityIndicator size={35} color={Colors.iconColor} />
        ) : null}
      </View>
    </View>
  );
};
const SearchUsers = ({navigation}: any) => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  async function searchUser(searchedUserName: string) {
    searchedUserName = searchedUserName.trim();
    if (searchedUserName === '') {
      setUserData([]);
    } else {
      try {
        setLoading(true);
        await database()
          .ref('users')
          .orderByChild('userName')
          .startAt(searchedUserName)
          .on('value', function (snapshot) {
            if (snapshot.val() !== null) {
              let data = snapshot.val();
              const parsedData = parseContentData(data);

              setUserData(parsedData);
            }
          });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  }
  function goUserInfoPage(user: any) {
    if (user.id === currentUserInfo.userID) {
      navigation.navigate('Profile' as never);
    } else {
      navigation.navigate('UserInfo' as never, {userInfo: user} as never);
    }
  }
  const renderUser = ({item}: any) => (
    <SearchUserCard
      user={item}
      onUserInfoVisible={() => goUserInfoPage(item)}
    />
  );
  return (
    <View style={styles.container}>
      <InputBox
        iconName="magnify"
        placeholder="Search users..."
        onChangeText={text => searchUser(text)}
      />
      <FlatList renderItem={renderUser} data={userData} />
      <View style={styles.loadingStateContainer}>
        {loading ? (
          <ActivityIndicator size={35} color={Colors.iconColor} />
        ) : null}
      </View>
    </View>
  );
};
export default SearchPage;
