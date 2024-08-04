import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ImageBackground,
} from "react-native";

const Home = ({ navigation }) => {
  const [username, setUsername] = useState("");

  const handleStartQuiz = () => {
    navigation.navigate("Questionario", { username });
  };

  const background = require("@/assets/images/4.png");

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.image}
        imageStyle={{ opacity: 0.9 }}
      >
        <Text style={styles.title}>Bem-vindo ao Quiz!</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <Button title="Jogar" onPress={handleStartQuiz} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  image: {
    flex: 1,
    width: '100%',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
},
});

export default Home;
