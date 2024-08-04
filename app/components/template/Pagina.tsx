import { ImageBackground, StyleSheet, View } from 'react-native'

export interface PaginaProps {
    children: React.ReactNode
}

const background = require('@/assets/images/4.png')

export default function Pagina(props: PaginaProps) {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={background}
                resizeMode="cover"
                style={styles.image}
                imageStyle={{ opacity: 0.9 }}
            >
                {props.children}
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'transparent',
    },
    image: {
        flex: 1,
        width: '100%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
