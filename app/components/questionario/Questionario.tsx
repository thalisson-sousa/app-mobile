import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Pergunta from './Pergunta'; // Importe o componente Pergunta
import perguntas from '@/app/data/constants/perguntas'; // Certifique-se de que o caminho está correto
import Resultado from './Resultado';

const Questionario = () => {
  // Armazena o índice da pergunta atual
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [resultado, setResultado] = useState<number | null>(null);

  // Função chamada quando uma opção é selecionada
  const opcaoSelecionada = (indiceOpcao: number) => {
    setRespostas((prevRespostas) => {
      const novasRespostas = [...prevRespostas];
      novasRespostas[indiceAtual] = indiceOpcao;
      return novasRespostas;
    });

    // Avançar para a próxima pergunta automaticamente
    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      // Se for a última pergunta, calcular o resultado
      calcularResultado();
    }
  };

  // Função para calcular o resultado final
  const calcularResultado = () => {
    const totalPerguntas = perguntas.length;
    const totalCorretas = respostas.reduce((total, resposta, indice) => {
      return resposta === perguntas[indice].resposta ? total + 1 : total;
    }, 0);
    setResultado(totalCorretas);
  };

  // Função para reiniciar o questionário
  const reiniciar = () => {
    setIndiceAtual(0);
    setRespostas([]);
    setResultado(null);
  };

  // Use efeito para calcular o resultado após a última pergunta
  useEffect(() => {
    if (indiceAtual === perguntas.length && resultado === null) {
      calcularResultado();
    }
  }, [indiceAtual]);

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  progressoTexto: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoCalcular: {
    marginTop: 20,
    backgroundColor: '#2E9D48',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: 'white',
  },
});

export default Questionario;
