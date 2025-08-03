import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const App = () => {
  // State to hold user input and the calculated result
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  // Function to parse and calculate the input string
  const calculate = (expression) => {
    const tokens = expression
      .replace(/x/g, '*')
      .replace(/÷/g, '/')
      .match(/(\d+\.?\d*|\.\d+|[+\-*/])/g);

    if (!tokens) return 'Error';

    let current = parseFloat(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const next = parseFloat(tokens[i + 1]);

      if (isNaN(next)) return 'Error';

      switch (operator) {
        case '+':
          current += next;
          break;
        case '-':
          current -= next;
          break;
        case '*':
          current *= next;
          break;
        case '/':
          if (next === 0) return 'Error';
          current /= next;
          break;
        default:
          return 'Error';
      }
    }

    return current.toString();
  };

  // Handles button press logic
  const handlePress = (value) => {
    if (value === 'AC') {
      setInput('');
      setResult('');
    } else if (value === '=') {
      const calcResult = calculate(input);
      setResult(calcResult);
    } else if (value === '+/-') {
      // Toggle negative sign for the last number entered
      if (input) {
        const lastNumberMatch = input.match(/(\d+\.?\d*)$/);
        if (lastNumberMatch) {
          const lastNumber = lastNumberMatch[0];
          const negative = -parseFloat(lastNumber);
          setInput(input.slice(0, -lastNumber.length) + negative.toString());
        }
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  // Renders a single button with optional custom styling
  const renderButton = (label, customStyle) => (
    <TouchableOpacity
      key={label}
      style={[styles.button, customStyle]}
      onPress={() => handlePress(label)}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  // Define layout structure
  const topRow = ['AC', '+/-', '%'];
  const rightColumn = ['÷', 'x', '-', '+', '='];
  const numberPad = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0', '.', ''],
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Display area for input and result */}
      <View style={styles.display}>
        <Text style={styles.result}>{result}</Text>
        <Text style={styles.input}>{input}</Text>
      </View>

      {/* Main calculator layout */}
      <View style={styles.calculator}>
        {/* Top row: AC, +/-, % */}
        <View style={styles.topRow}>
          {topRow.map((label) => renderButton(label, styles.topButton))}
        </View>

        {/* Body: number pad (left) and right operator column (right) */}
        <View style={styles.mainBody}>
          {/* Number pad (digits + .) */}
          <View style={styles.numberPad}>
            {numberPad.map((row, i) => (
              <View key={i} style={styles.row}>
                {row.map((label) =>
                  label
                    ? renderButton(label, styles.numberButton)
                    : <View key={Math.random()} style={styles.button} />
                )}
              </View>
            ))}
          </View>

          {/* Right column: ÷, x, -, +, = */}
          <View style={styles.rightColumn}>
            {rightColumn.map((label) =>
              renderButton(label, styles.operatorButton)
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Style definitions for layout and button groups
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  display: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  input: {
    fontSize: 50,
    color: 'white',
  },
  result: {
    fontSize: 47,
    color: 'gray',
    marginTop: 10,
  },
  calculator: {
    flex: 5,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
    marginBottom: 10,
  },
  mainBody: {
    flex: 1,
    flexDirection: 'row',
  },
  numberPad: {
    flex: 3,
    justifyContent: 'space-between',
  },
  rightColumn: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    flex: 1,
    margin: 6,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
  numberButton: {
    backgroundColor: '#424242ff',
  },
  operatorButton: {
    backgroundColor: '#ff9500',
  },
  topButton: {
    backgroundColor: '#a5a5a5',
  },
});

export default App;
