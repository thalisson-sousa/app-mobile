// components/questionario/Pergunta.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Enunciado from './Enunciado';
import Opcao from './Opcao';
import PerguntaModel from '@/app/data/model/Pergunta';

export interface PerguntaProps {
    pergunta: PerguntaModel;
    opcaoSelecionada: (indice: number) => void; // Define que o parâmetro 'indice' é um número
}

const Pergunta = (props: PerguntaProps) => {
    return (
        <View style={styles.container}>
            <Enunciado enunciado={props.pergunta.enunciado} />
            <View style={styles.opcoesContainer}>
                {props.pergunta.opcoes.map((opcao, indice) => (
                    <Opcao
                        key={indice} // Preferível usar um identificador único se disponível
                        indice={indice}
                        texto={opcao}
                        onPress={() => props.opcaoSelecionada(indice)}
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
