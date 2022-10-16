import { useState, useEffect } from "react"
import { View, Text, Image, FlatList, StyleSheet } from "react-native"
import { useIsFocused } from "@react-navigation/native";

// database
import { fetchImages } from "../util/database";

// util
import { getMapPreview } from "../util/location";

const DetailPlace = ({ route }) => {
    const [images, setImages] = useState([])
    const [mapPreview, setMapPreview] = useState('')

    const { id, title, address, description, lat, lng } = route.params


    const isFocused = useIsFocused()

    useEffect(() => {
        const fetchImagesHandler = async () => {
            await fetchImages(id).then(res => {
                setImages(res)
            })
        }

        const getMapPreviewHandler = async () => {
            const mapPreview = await getMapPreview(lat, lng)
            setMapPreview(mapPreview)
        }

        if (isFocused) {
            fetchImagesHandler()
            getMapPreviewHandler()
        }
    }, [isFocused])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{title}</Text>
            </View>

            <View style={styles.detailsContainer}>
            <View style={styles.detailInfo}>
                    <View style={styles.detailInfoLeft}>
                        <Text style={styles.detailInfoLeftText}>Description</Text>
                    </View>
                    <View style={styles.detailInfoRight}>
                        <Text style={styles.detailInfoRightText}>{description}</Text>
                    </View>

                </View>
                <View style={styles.detailInfo}>
                    <View style={styles.detailInfoLeft}>
                        <Text style={styles.detailInfoLeftText}>Address</Text>
                    </View>
                    <View style={styles.detailInfoRight}>
                        <Text style={styles.detailInfoRightText}>{address}</Text>
                    </View>
                </View>
                <Image style={styles.map} source={{ uri: mapPreview }} />
            </View>
            <View style={{ height: 350 }}>
                <FlatList
                    data={images}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: item.uri }} />
                        </View>
                    )}
                />

            </View>
        </View >
    )
}

export default DetailPlace

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    imageContainer: {
        width: '100%',
        height: 300,
        backgroundColor: '#fff',
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    detailsContainer: {
        width: '100%',
        height: 350,
        backgroundColor: '#fff',
    },
    detailInfo: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    detailInfoLeft: {
        width: '20%',
        height: '100%',
    },
    detailInfoRight: {
        width: '80%',
        height: '100%',
    },
    map: {
        width: '100%',
        height: 200,
    },



})
