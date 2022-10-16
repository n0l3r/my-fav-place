import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

// database
import { fetchPlaces, fetchImages } from "../util/database";
import CardImage from '../components/CardImage';


const Home = ({navigation}) => {

    const [loadedPlaces, setLoadedPlaces] = useState([])
    const [loadedImages, setLoadedImages] = useState([])

    const isFocused = useIsFocused()

    useEffect(() => {
        const fetchPlacesHandler = async () => {
            await fetchPlaces().then(res => {
                setLoadedPlaces(res)
            })
        }

        if (isFocused) {
            fetchPlacesHandler()
        } else {
            return
        }
    }, [isFocused])

    // navigate to detail place
    const navigateToDetailPlace = (id, title, address, description, lat, lng) => {
        navigation.navigate('DetailPlace',  
        { id: id, title: title, address: address, description: description, lat: lat, lng: lng })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>My Favorite Places</Text>
            </View>

            {loadedPlaces.length > 0
                ?
                <FlatList
                    data={loadedPlaces}
                    keyExtractor={item => item.id.toString()}
                    renderItem={itemData => (
                        <CardImage text={itemData.item.title} uriImage={itemData.item.thumbnail} onPress={navigateToDetailPlace.bind(this, itemData.item.id, itemData.item.title, itemData.item.address, itemData.item.description, itemData.item.lat, itemData.item.lng)} />
                    )}
                />
                :
                <View style={styles.noPlaces}>
                    <Text style={styles.noPlacesText}>No places added yet</Text>
                </View>
            }


        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 60
    },
    header: {
        backgroundColor: '#fff',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 36,
        fontWeight: 'bold',
    },
})