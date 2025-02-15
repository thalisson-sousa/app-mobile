import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';
import useCustomFonts from '@/app/useFonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const fontsLoaded = useCustomFonts();

  const handleStartQuiz = async () => {
    if (username.trim() === '') {
      console.error('Nome de usuário não pode estar vazio');
      return;
    }

    try {
      // Enviar o nome do usuário para a API e obter a resposta
      const response = await axios.post('http://165.227.218.157:8080/users/', { name: username });
      const { id, name, score } = response.data;

      // Armazenar os dados do usuário no AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify({ id, name, score }));

      // Navegar para a tela Questionario passando os dados do usuário
      navigation.navigate('questionario', { name: name, id: id, score: score });
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error);
    }
  };

  const background = require('@/assets/images/splash.png');

  if (!fontsLoaded) {
    // Pode exibir um indicador de carregamento enquanto as fontes estão sendo carregadas
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.image}
        imageStyle={{ opacity: 0.9 }}
      >
        <Text style={styles.title}>EcoAmigos</Text>
        <TextInput
          style={[styles.input, styles.rounded]}
          placeholder="Digite seu nome"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TouchableOpacity style={styles.button} onPress={handleStartQuiz}>
          <Text style={styles.buttonText}>Jogar</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    marginBottom: 20,
    fontFamily: 'Rubik',
    color: '#00997d',
  },
  input: {
    fontFamily: 'SPACEMISSION',
    borderWidth: 1,
    textAlign: 'center',
    padding: 10,
    width: 200,
    borderColor: '#00997d',
  },
  button: {
    width: 200,
    borderColor: '#00997d',
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#00997d',
    fontSize: 18,
    fontFamily: 'Rubik',
  },
  rounded: {
    borderRadius: 20,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
