import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, ImageBackground, Alert } from 'react-native';
import axios from 'axios';
import Pergunta from './Pergunta';
import Resultado from './Resultado';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Questionario = () => {
  const [step, setStep] = useState(1); // 1: Seleção de Categoria, 2: Lista de Perguntas, 3: Resultado
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [resultado, setResultado] = useState<number | null>(null);
  const [userData, setUserData] = useState<{ id: number; name: string; score: number } | null>(null);
  const [perguntas, setPerguntas] = useState<any[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [semPerguntas, setSemPerguntas] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null); // Adicionado para feedback

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userJson = await AsyncStorage.getItem('user');
        if (userJson) {
          const user = JSON.parse(userJson);
          setUserData(user);
          console.log('User data loaded:', user);
        } else {
          console.log('No user data found.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (categoriaSelecionada) {
      const fetchPerguntas = async () => {
        setLoading(true);
        console.log('Fetching questions for category:', categoriaSelecionada);
        try {
          const response = await axios.get(`http://165.227.218.157:8080/questions/random/${categoriaSelecionada}?size=10`);
          if (response.data.length === 0) {
            setSemPerguntas(true);
            console.log('No questions found for this category.');
          } else {
            setPerguntas(response.data);
            setSemPerguntas(false);
            console.log('Perguntas carregadas:', response.data);
          }
        } catch (error) {
          console.error('Erro ao buscar perguntas:', error);
          setSemPerguntas(true);
        }
        setLoading(false);
      };

      fetchPerguntas();
    }
  }, [categoriaSelecionada]);

  useEffect(() => {
    console.log('Indice Atual:', indiceAtual);
    console.log('Número de Perguntas:', perguntas.length);
    if (indiceAtual >= perguntas.length && resultado === null) {
      console.log('Calculando resultado...');
      calcularResultado();
    }
  }, [indiceAtual]);

  const opcaoSelecionada = (indiceOpcao: number) => {
    const correctAnswer = (perguntas[indiceAtual].correctAnswer);
    const perguntaAtual = perguntas[indiceAtual];
    // const textoOpcao = perguntaAtual.opcoes[indiceOpcao]; // Obtenha o texto da opção
    console.log(perguntaAtual);
    // console.log('Texto da opção selecionada:', textoOpcao);

    // Atualize as respostas com a resposta selecionada
    setRespostas((prevRespostas) => {
      const novasRespostas = [...prevRespostas];
      novasRespostas[indiceAtual] = indiceOpcao;
      console.log('Respostas atuais:', novasRespostas);
      return novasRespostas;
    });

    // Validação da resposta
    const respostaCerta = perguntas[indiceAtual].correctAnswer;

    if (indiceOpcao === respostaCerta) {
      setFeedback('Resposta correta!');
      console.log('Feedback: Resposta correta!');
    } else {
      setFeedback('Resposta incorreta.');
      console.log('Feedback: Resposta incorreta.');
    }

    // Avance para a próxima pergunta ou calcule o resultado
    if (indiceAtual < perguntas.length - 1) {
      console.log('Avançando para a próxima pergunta.');
      setIndiceAtual(indiceAtual + 1);
    } else {
      console.log('Última pergunta respondida, calculando resultado...');
      calcularResultado();
    }
  };

  const calcularResultado = () => {
    console.log('Calculando resultado...');

    // Número total de perguntas
    const totalPerguntas = perguntas.length;

    // Contar o número de respostas corretas
    const totalCorretas = respostas.reduce((total, resposta, indice) => {
      // Aqui você verifica se a resposta selecionada é igual à resposta correta da pergunta
      return resposta === perguntas[indice].correctAnswer ? total + 1 : total;
    }, 0);

    // Cada pergunta vale 10 pontos
    const pontuacao = totalCorretas * 10;

    console.log('Pontuação final:', pontuacao);
    setResultado(pontuacao);


    // Atualizar o ranking, se necessário
    atualizarRanking(pontuacao);
  };

  const atualizarRanking = async (pontuacao: number) => {
    if (userData) {
      try {
        console.log('Atualizando ranking para o usuário:', userData.id);
        
        await axios.put(`http://165.227.218.157:8080/${userData.id}`, { id: userData.id, name: userData.name, score: pontuacao });
      } catch (error) {
        console.error('Erro ao atualizar o ranking:', error);
      }
    }
  };

  const reiniciar = () => {
    console.log('Reiniciando o questionário...');
    setIndiceAtual(0);
    setRespostas([]);
    setResultado(null);
    setCategoriaSelecionada(null);
    setPerguntas([]);
    setSemPerguntas(false);
    setFeedback(null); // Limpar feedback ao reiniciar
    setStep(1); // Voltar para o passo de seleção de categoria
  };

  const background = require('@/assets/images/4.png');

  if (step === 1) {
    return (
      <ImageBackground
        source={background}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.selecioneCategoriaTexto}>Selecione uma Categoria</Text>
          <Button title="Natureza" onPress={() => {
            console.log('Categoria selecionada: Natureza');
            setCategoriaSelecionada('NATURE');
            setStep(2);
          }} />
          <Button title="Atitudes Ecologicas" onPress={() => {
            console.log('Categoria selecionada: Atitudes Ecologicas');
            setCategoriaSelecionada('ECOLOGICAL_ATTITUDES');
            setStep(2);
          }} />
          <Button title="Animais" onPress={() => {
            console.log('Categoria selecionada: Animais');
            setCategoriaSelecionada('ANIMALS');
            setStep(2);
          }} />
          <Button title="Mudanças Climaticas" onPress={() => {
            console.log('Categoria selecionada: Mudanças Climaticas');
            setCategoriaSelecionada('CLIMATE_CHANGE');
            setStep(2);
          }} />
        </View>
      </ImageBackground>
    );
  }

  if (step === 2) {
    if (loading) {
      return (
        <View style={styles.overlay}>
          <Text style={styles.progressoTexto}>Carregando perguntas...</Text>
        </View>
      );
    }

    if (semPerguntas) {
      return (
        <ImageBackground
          source={background}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <Text style={styles.progressoTexto}>Não há perguntas para essa categoria.</Text>
            <Button title="Voltar" onPress={() => {
              console.log('Voltando para seleção de categoria');
              setCategoriaSelecionada(null);
              setStep(1);
            }} />
          </View>
        </ImageBackground>
      );
    }

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
              {perguntas.length > 0 && (
                <>
                  <Pergunta
                    pergunta={perguntas[indiceAtual]}
                    opcaoSelecionada={opcaoSelecionada}
                  />
                  {feedback && <Text style={styles.feedbackTexto}>{feedback}</Text>} {/* Exibição do feedback */}
                </>
              )}
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
  }

  return null;
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  progressoTexto: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  selecioneCategoriaTexto: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  feedbackTexto: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'yellow', // ou qualquer cor que você desejar para o feedback
  },
});

export default Questionario;
