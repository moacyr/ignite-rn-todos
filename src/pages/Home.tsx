import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { ItemWrapper } from '../components/ItemWrapper';
import { Task } from '../components/TaskItem';
import { TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExists = tasks.find(item => item.title === newTaskTitle);
    if (taskExists) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome',
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]);
    }
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldState => [...oldState, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => (
      (task.id === id) ? { ...task, done: !task.done }
        : { ...task }));
    setTasks(updatedTasks);
  }

  function handleEditTask(id: number, taskNewTitle: string) {
    const updatedTasks = tasks.map(task => (
      (task.id === id) ? { ...task, title: taskNewTitle }
        : { ...task }));
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    return Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?',
      [{ text: "Não", onPress: () => console.log("Não Pressed") },
      {
        text: "Sim", onPress: () => setTasks(oldstate => oldstate.filter(
          task => task.id != id
        ))
      }]);

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})