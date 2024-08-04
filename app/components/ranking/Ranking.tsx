import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const RankingScreen = () => {
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users'); // Substitua pela URL do seu endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Ordena os dados por pontuação em ordem decrescente
        const sortedData = data.sort((a, b) => b.score - a.score);
        setRankingData(sortedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRankingData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ranking Ecológico</Text>
      </View>
      <FlatList
        data={rankingData}
        renderItem={({ item, index }) => (
          <View style={styles.rankingItem}>
            <Text style={styles.rankingPosition}>{index + 1}</Text>
            <Text style={styles.rankingText}>{item.name}</Text>
            <Text style={styles.rankingScore}>{item.score}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()} // Certifique-se de que 'id' é um identificador único
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2', // Cor de fundo suave
  },
  header: {
    backgroundColor: '#228B22', // Verde escuro
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
  },
  rankingItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rankingPosition: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    width: 30, // Espaço reservado para o número da posição
    textAlign: 'center',
  },
  rankingText: {
    fontSize: 18,
    color: '#333',
    flex: 1,
    marginLeft: 10,
  },
  rankingScore: {
    fontSize: 16,
    color: '#888',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default RankingScreen;
