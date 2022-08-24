/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, FC} from 'react';
import {ActivityIndicator, Text, View, FlatList} from 'react-native';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchResultCard from '../../Components/Cards/Search Result Card';
import InputBox from '../../Components/InputBox';
import SearchResultDetailModal from '../../Components/Modals/Search Result Detail Modal';
import useFetch from '../../Hooks/useFetch';
import Colors from '../../Styles/Colors';
import styles from './SearchWithoutLogin.style';
interface IPageProps {
  navigation: any;
}
const SearchWithoutLoginPage: FC<IPageProps> = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [resultDetailForModal, setResultDetailForModal] = useState<any>(null);
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
  const renderResult = ({item}: any) => (
    <SearchResultCard
      item={item}
      viewDetail={item => handleVisibleDetailModal(item)}
    />
  );
  return (
    <View style={styles.container}>
      <View style={styles.titleInnerContainer}>
        <Icon
          name="chevron-left"
          size={35}
          color={Colors.iconColor}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.titleText}>Search foods and drinks!</Text>
      </View>
      <InputBox
        iconName="magnify"
        placeholder="Search..."
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
      <View style={styles.loadingStateContainer}>
        {loading ? (
          <ActivityIndicator size={35} color={Colors.iconColor} />
        ) : null}
      </View>
    </View>
  );
};
export default SearchWithoutLoginPage;
