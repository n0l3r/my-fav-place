
import { launchCameraAsync, PermissionStatus, useCameraPermissions } from "expo-image-picker";
import { useRef, useState } from "react";
import { View, Text, StyleSheet, Alert, Image, DevSettings, TextInput, FlatList, Animated } from "react-native"
import CardImage from "../components/CardImage";
import PrimaryButton from "../components/PrimaryButton";
import InformationInput from "../components/InformationInput";

// database
import { insertImage, insertPlace } from "../util/database";



const AddPlace = () => {
    const scrollX = useRef(new Animated.Value(0)).current

    const [cameraPermisson, requestPermission] = useCameraPermissions()
    const [images, setImages] = useState([])

    const [place, setPlace] = useState({
        title: '',
        description: '',
        address: '',
        lat: '',
        lng: '',
    })

    const verifyPermission = async () => {
        if(cameraPermisson.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission()
            return permissionResponse.granted
        }
        
        return cameraPermisson
    }

    const openCameraHandler = async () => {
        const hasPermission = await verifyPermission()
        if (!hasPermission) {
            Alert.alert('No permission to access camera', 'You need to grant camera permission to use this app.', [{ text: 'Okay' }])
            return

        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        })
        if (!image.cancelled) {
            setImages(prevState => [...prevState, { id: new Date().toString() + Math.random().toString(), uri: image.uri }])
        }
    }

    const deleteHandler = (id) => {
        Alert.alert(
            'Delete',
            'Are you sure?',
            [
                {
                    text: 'Yes', onPress: () => {
                        // delete image
                        setImages(prevState => prevState.filter(image => image.id !== id))

                    }
                },
                { text: 'No', onPress: () => console.log('No') }
            ]
        )
    }

    var imagePreview = null

    if (images.length > 0) {
        imagePreview = <FlatList style={styles.flatList} data={images} renderItem={({ item }) => <CardImage uriImage={item.uri} onPress={deleteHandler.bind(this, item.id)} text="delete" />}
            horizontal
            showsHorizontalScrollIndicator
            pagingEnabled
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })} />
    }


    const [modalVisible, setModalVisible] = useState(false)

    const startInputInformationHandler = () => {
        setModalVisible(true)
    }

    const cancelInputInformationHandler = () => {
        setModalVisible(false)
    }

    const saveInputInformationHandler = (title, description, address, lat, lng) => {
        if(title === '' || description === '' || address === '' || lat === '' || lng === ''){
            Alert.alert(
                'Error',
                'Please fill all required fields',
                [
                    {
                        text: 'OK', onPress: () => {
                            return
                        }
                    }
                ]
            )
            return
        }

        console.log('save')
        setPlace({
            title: title,
            description: description,
            address: address,
            lat: lat,
            lng: lng,
        })
        
        const saveDatabase = async () => {
            const savePlace = await insertPlace(title, description, address, lat, lng)

            images.forEach(image => {
                insertImage(savePlace.insertId, image.uri)
            })
        }

        saveDatabase()
        setImages([])
        setPlace({
            title: '',
            description: '',
            address: '',
            lat: '',
            lng: '',
        })

        setModalVisible(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Add New Place</Text>
            </View>

            {images.length > 0
                ?
                <>
                    {imagePreview}
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonLeft}>
                            <PrimaryButton onPress={openCameraHandler} color="green">Add Image</PrimaryButton>
                        </View>
                        <View style={styles.buttonRight}>
                            <PrimaryButton onPress={startInputInformationHandler} color="green">Save</PrimaryButton>
                        </View>
                    </View>
                </>
                :
                <PrimaryButton onPress={openCameraHandler} color="green">Add Photo</PrimaryButton>

            }
            <InformationInput visible={modalVisible} onCancel={cancelInputInformationHandler} onSave={saveInputInformationHandler}/>
        </View>
    )
}

export default AddPlace;

const styles = StyleSheet.create({
    container: {
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
    buttonContainer: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonLeft: {
        width: '40%',
        height: '100%',
        marginLeft: 20,
    },
    buttonRight: {
        width: '40%',
        height: '100%',
        marginRight: 20,
    },



})