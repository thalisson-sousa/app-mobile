import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground, Alert } from 'react-native';
import axios from 'axios';
import Pergunta from './Pergunta'; 
import perguntas from '@/app/data/constants/perguntas'; 
import Resultado from './Resultado';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Questionario = () => {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [resultado, setResultado] = useState<number | null>(null);
  const [userData, setUserData] = useState<{ name: string; score: number } | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error('Erro ao obter username do AsyncStorage:', error);
      }
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    if (username) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/users/byname/${username}`);
          setUserData(response.data);
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      };

      fetchUserData();
    }
  }, [username]);

  useEffect(() => {
    if (username && userData) {
      Alert.alert(
        'Parâmetros recebidos',
        `Nome: ${username}\nScore: ${userData.score || 'Não disponível'}`,
        [{ text: 'OK' }]
      );
    }
  }, [username, userData]);

  const opcaoSelecionada = (indiceOpcao: number) => {
    setRespostas((prevRespostas) => {
      const novasRespostas = [...prevRespostas];
      novasRespostas[indiceAtual] = indiceOpcao;
      return novasRespostas;
    });

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado();
    }
  };

  const calcularResultado = () => {
    const totalPerguntas = perguntas.length;
    const totalCorretas = respostas.reduce((total, resposta, indice) => {
      return resposta === perguntas[indice].resposta ? total + 1 : total;
    }, 0);
    const pontuacao = totalCorretas * 10; // Cada pergunta vale 10 pontos
    setResultado(pontuacao);
    atualizarRanking(pontuacao); // Atualiza o ranking após calcular o resultado
  };

  const atualizarRanking = async (pontuacao: number) => {
    if (username) {
      try {
        await axios.put(`http://localhost:3000/users/byname/${username}`, { score: pontuacao });
        
        const rankingResponse = await axios.get('http://localhost:3000/ranking');
        console.log('Ranking atualizado:', rankingResponse.data);
      } catch (error) {
        console.error('Erro ao atualizar o ranking:', error);
      }
    }
  };

  const reiniciar = () => {
    setIndiceAtual(0);
    setRespostas([]);
    setResultado(null);
  };

  const background = require('@/assets/images/4.png');

  useEffect(() => {
    if (indiceAtual === perguntas.length && resultado === null) {
      calcularResultado();
    }
  }, [indiceAtual]);

  return (
    <ImageBackground
      source={background}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {resultado === null ? (
          <>
            <Text style={styles.progressoTexto}>{`${indiceAtual + 1}/${perguntas.length}`}</Text>
            <Pergunta
              pergunta={perguntas[indiceAtual]}
              opcaoSelecionada={opcaoSelecionada}
            />
          </>
        ) : (
          <Resultado
            pontuacao={resultado}
            totalDePerguntas={perguntas.length}
            reiniciar={reiniciar}
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'center', // Alinha o conteúdo verticalmente
    alignItems: 'center', // Alinha o conteúdo horizontalmente
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Cor de fundo semitransparente para melhorar a legibilidade
  },
  progressoTexto: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Questionario;
