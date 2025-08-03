import { StatusBar } from 'expo-status-bar';
import {React, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, Pressable } from 'react-native';

export default function App() {


  const [board, setBoard] = useState(Array(9).fill(''));
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null);


function TicTacToeGrid({ board, handlePress }) {
  return (
    <View style={styles.grid}>
      {Array.from({ length: 9 }).map(function (_, index) {
        return (
          <Pressable key={index} style={styles.cell} onPress={() => handlePress(index)}>
            <Text style={styles.cellText}>{board[index]}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}



  function checkWinner(b) {
    const combos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6],           // diagonals
    ];

    for (let combo of combos) {
      const [a, b1, c] = combo;
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        return b[a];
      }
    }
    return null;
  }

  function handlePress(index) {
    if (board[index] !== '' || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
    } else {
      setTurn(turn === 'X' ? 'O' : 'X');
    }
  }

  function isDraw() {
    // Logic to check for a draw will go here
  }

  function resetGame() {
    setBoard(Array(9).fill(''));
    setTurn('X');
    setWinner(null);
  }


  return (
<SafeAreaView style={styles.safe}>

  <View style={styles.topBar}>
    <Text style={styles.title}>Tic Tac Toe</Text>
    
  </View>

  <View style={styles.middle}>
    <Text style={{color:"Green", fontSize: 40, textAlign: 'center', marginVertical:40}}>
      {winner ? `🎉 Winner: ${winner}` : `Player Turn: ${turn}`}
    </Text>
    <TicTacToeGrid board={board} handlePress={handlePress} />

  </View>

  <View>
    <Pressable onPress={resetGame} style={styles.bottomBar}>
      <Text style={{color:"Blue", fontSize: 30, textAlign: 'center'}}>Reset Game</Text>
    </Pressable>


  </View>
</SafeAreaView>

  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f5f5f5ff',
  },
  topBar: {
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#21422fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  middle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    color:"white",
    width: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    color:"white",
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  bottomBar: {
    padding: 10,
    alignItems: 'center',
  },
});

