import { Modal, View, Text, TextInput, Image, StyleSheet } from "react-native"
import { useState } from "react"
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location"
import PrimaryButton from "./PrimaryButton"
import { getMapLocation, getMapPreview } from "../util/location"

const InformationInput = (props) => {
    const [locationPermission, requestPermission] = useForegroundPermissions()

    const [pickedLocation, setLocation] = useState(null)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')

    const titleHandler = (text) => {
        setTitle(text)
    }

    const descriptionHandler = (text) => {
        setDescription(text)
    }
    

    const verifyLocationPermission = async () => {
        if (locationPermission.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission()
            return permissionResponse.granted
        }
        return locationPermission.status === PermissionStatus.GRANTED
    }
    const getLocationHandler = async () => {
        const hasPermission = await verifyLocationPermission()
        if (!hasPermission) {
            return
        }
        const location = await getCurrentPositionAsync()
        setLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    }

    var locationPreview = <Image style={styles.loading} source={require('../assets/loading.gif')} />

    if (pickedLocation) {
        locationPreview = <Image style={styles.mapPreview} source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} />
    }

    if(props.visible === true && !pickedLocation){
        (async () => {
            await getLocationHandler()
        })();
    }

    if(pickedLocation && !address){
        (async () => {
        getMapLocation(pickedLocation.lat, pickedLocation.lng).then(address => setAddress(address))
        })();
    }

    const saveHandler = () => {
        props.onSave(title, description, address, pickedLocation.lat, pickedLocation.lng)
    }


    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.container}>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Place Name</Text>
                    <TextInput style={styles.input} onChangeText={titleHandler} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Place Description</Text>
                    <TextInput style={styles.textArea} multiline onChangeText={descriptionHandler}/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Place Address</Text>
                    <TextInput style={styles.textArea} value={address} multiline editable={false} />
                </View>

                <View style={styles.map}>
                    {locationPreview}
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonLeft}>
                        <PrimaryButton onPress={props.onCancel} color="red">Cancel</PrimaryButton>
                    </View>
                    <View style={styles.buttonRight}>
                        <PrimaryButton onPress={saveHandler} color="green">Save</PrimaryButton>
                    </View>
                </View>
            </View>
        </Modal>
    )

}

export default InformationInput;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        flex: 1,

    },
    inputContainer: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    inputLabel: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        fontSize: 18,
        padding: 10,
    },
    textArea: {
        width: '80%',
        height: 80,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        fontSize: 18,
        padding: 10,
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
    map: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapPreview: {
        width: '80%',
        height: 300,

    },
    loading: {
        width: 100,
        height: 123,
    }
})