import { View, Text, StyleSheet } from "react-native"


const Settings = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>About Me</Text>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.detailInfo}>
                    <View style={styles.detailInfoLeft}>
                        <Text style={styles.detailInfoLeftText}>Name</Text>
                    </View>
                    <View style={styles.detailInfoRight}>
                        <Text style={styles.detailInfoRightText}>Naufal Taufiq Ridwan</Text>
                    </View>
                </View>

                <View style={styles.detailInfo}>
                    <View style={styles.detailInfoLeft}>
                        <Text style={styles.detailInfoLeftText}>NIM</Text>
                    </View>
                    <View style={styles.detailInfoRight}>
                        <Text style={styles.detailInfoRightText}>120140044</Text>
                    </View>
                </View>

                <View style={styles.detailInfo}>
                    <View style={styles.detailInfoLeft}>
                        <Text style={styles.detailInfoLeftText}>Kelas</Text>
                    </View>
                    <View style={styles.detailInfoRight}>
                        <Text style={styles.detailInfoRightText}>Pemrograman Aplikasi Mobile RB</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Settings;

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

    detailsContainer: {
        width: '100%',
        height: 350,
        backgroundColor: '#fff',
    },
    detailInfo: {
        width: '100%',
        height: 20,
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
})