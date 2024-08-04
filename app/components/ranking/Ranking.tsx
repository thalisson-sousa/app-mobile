import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const RankingScreen = () => {
  // ... seus dados de ranking aqui
  const rankingData = [
    { name: 'Usuário 1', score: 95 },
    { name: 'Usuário 2', score: 88 },
    { name: 'Usuário 3', score: 75 },
    // Adicione mais usuários conforme necessário
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ranking Ecológico</Text>
      </View>
      <FlatList
        data={rankingData}
        renderItem={({ item }) => (
          <View style={styles.rankingItem}>
            <Text style={styles.rankingText}>{item.name}</Text>
            <Text style={styles.rankingScore}>{item.score}</Text>
          </View>
        )}
        keyExtractor={(item) => item.name}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rankingText: {
    fontSize: 18,
    color: '#333',
  },
  rankingScore: {
    fontSize: 16,
    color: '#888',
  },
});

export default RankingScreen;
