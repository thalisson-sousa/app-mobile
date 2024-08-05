// components/questionario/Pergunta.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Enunciado from './Enunciado';
import Opcao from './Opcao';
import PerguntaModel from '@/app/data/model/Pergunta';

export interface PerguntaProps {
    pergunta: PerguntaModel;
    opcaoSelecionada: (opcao: string) => void; // Atualizado para receber o texto da opção
}

const Pergunta = (props: PerguntaProps) => {
    // Cria um array com as opções e embaralha
    const opcoes = [
        props.pergunta.correctAnswer,
        props.pergunta.wrongAnswer1,
        props.pergunta.wrongAnswer2,
        props.pergunta.wrongAnswer3,
    ].sort(() => Math.random() - 0.5);

    return (
        <View style={styles.container}>
            <Enunciado enunciado={props.pergunta} />
            <View style={styles.opcoesContainer}>
                {opcoes.map((opcao) => (
                    <Opcao
                        key={opcao} // Usar o texto da opção como chave
                        texto={opcao}
                        onPress={() => props.opcaoSelecionada(opcao)} // Passa o texto da opção
                    />
                ))}
            </View>
        </View>
    );
};


// Define estilos para melhor organização e manutenção
const styles = StyleSheet.create({
    container: {
        gap: 25,
    },
    opcoesContainer: {
        gap: 15,
    },
});

export default Pergunta;
