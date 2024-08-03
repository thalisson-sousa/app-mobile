import { StyleSheet, Text, View } from 'react-native'

export default function Logo() {
    return (
        <View>
            <Text style={styles.primario}>VerdeConsciente</Text>
            <Text style={styles.segundario}>Preserve o verde para manter o mundo colorido!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    primario: {
        fontFamily: 'SPACEMISSION',
        fontSize: 35,
        color: 'white',
        textAlign: 'center',
    },
    segundario: {
        //fontFamily: 'roboto',
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
    },
})
