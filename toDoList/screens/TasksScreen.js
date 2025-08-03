// screens/TasksScreen.js
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function TasksScreen() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showInput, setShowInput] = useState(false);

  function addTask(task) {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setInput("");
    setShowInput(false);
  }

  function handleInputChange(text) {
    setInput(text);
  }

  function handleAddTask() {
    addTask(input);
    setShowInput(true);
  }

  function handleDelete(indexToRemove) {
    const updatedTasks = tasks.filter((task, index) => index !== indexToRemove);
    setTasks(updatedTasks);
  }

  function renderTasks() {
    return tasks.map((task, index) => (
      <View key={index} style={styles.taskBox}>
        <Text style={styles.taskText}>{task}</Text>
        <Pressable onPress={() => handleDelete(index)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </Pressable>
      </View>
    ));
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "white" }}>
        To-Do List
      </Text>

      <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
        <ScrollView
          style={{ flex: 1, width: "100%" }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {renderTasks()}
        </ScrollView>

        <View style={styles.bottomContainer}>
          {showInput && (
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter a task"
              placeholderTextColor="white"
              value={input}
              onChangeText={handleInputChange}
            />
          )}
          <Pressable onPress={handleAddTask}>
            <Text style={styles.addTaskButton}>Add Task</Text>
          </Pressable>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d2350ff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 130,
  },
  textInputStyle: {
    width: 200,
    placeholderTextColor: "white",
    color:"white",
    height: 40,
    borderColor: "white",
    borderWidth: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addTaskButton: {
    textAlign: "center",
    width: 200,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  bottomContainer: {
    width: "100%",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginTop: 3,
  },
  taskBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    width: '80%',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
  },
  taskText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontFamily: "monospace",
  },
});
