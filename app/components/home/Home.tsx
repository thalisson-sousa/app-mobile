import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

const Home = ({ navigation }) => {
  const [username, setUsername] = useState('');

  const handleStartQuiz = () => {
    navigation.navigate('Questionario', { username });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Quiz!</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <Button title="Jogar" onPress={handleStartQuiz} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
});

export default Home;
