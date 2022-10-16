import { Image, View, StyleSheet, Dimensions } from "react-native"
import PrimaryButton from "./PrimaryButton"


const CardImage = ({ uriImage, onPress, text }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: uriImage }} style={styles.image} />
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={onPress} color="rgba(0,0,0,0.5)">{text}</PrimaryButton>
            </View>
        </View>
    )
}

export default CardImage

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        height: 300,
        width: Dimensions.get('window').width - 40,
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
    },
    imageContainer: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        width: '100%',
        height: 50,
        position: 'absolute',
        bottom: 0,
    },
})