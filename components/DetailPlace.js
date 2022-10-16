import { useState, useEffect} from "react"
import { View, Image, FlatList, StyleSheet } from "react-native"

const DetailPlace = ({ place }) => {
    const [images, setImages] = useState([])

    useEffect(() => {
        const getImages = async () => {
            const images = await fetchImages(place.id)
            setImages(images)
        }
        getImages()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: place.image }} />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{place.title}</Text>
                <Text style={styles.description}>{place.description}</Text>
                <Text style={styles.address}>{place.address}</Text>
                <Text style={styles.latlng}>{place.lat}, {place.lng}</Text>
            </View>
            <View style={styles.imageContainer}>
                <FlatList
                    data={images}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Image style={styles.image} source={{ uri: item.uri }} />
                    )}
                />
            </View>
        </View>
    )
}

export default DetailPlace

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    imageContainer: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    detailsContainer: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
    },
    address: {
        fontSize: 16,
    },
    latlng: {
        fontSize: 16,
    },
})
