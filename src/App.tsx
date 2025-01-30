import { useState } from "react";
import TodoAppHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";
import type { FC } from "react";

export type TodoType = {
  text: string;
  id: string;
  isCompleted: boolean;
};

const TodoApp: FC = () => {
  const [todoArray, setTodoArray] = useState<TodoType[]>([]);

  const handleAddTodo = (text: string) => {
    const newTask: TodoType = {
      text: text.trim(),
      id: crypto.randomUUID(),
      isCompleted: false,
    };

    setTodoArray([...todoArray, newTask]);
  };

  

  const handleToggleTodo = (id: string) => {
    setTodoArray((prevTodos) => {
      const index = prevTodos.findIndex((todo) => todo.id === id);
      if (index === -1) {
        return prevTodos;
      }

      const newTodos = [...prevTodos];
      newTodos[index] = {
        ...newTodos[index],
        isCompleted: !newTodos[index].isCompleted,
      };

      return newTodos;
    });
  };

  const handleDeleteTask = (id: string) => {
    setTodoArray((prevTodos) => {
      const index = prevTodos.findIndex((todo) => todo.id === id);
      if (index === -1) {
        return prevTodos;
      }

      const newTodos = [...prevTodos];
      newTodos.splice(index, 1);

      return newTodos;
    });
  };

  const removeCompletedTasks = () => {
    setTodoArray((prevTodos) => {
      return prevTodos.filter((todo) => !todo.isCompleted);
    });
  };

  const toggleAllTasks = () => {
    const hasCompletedTasks = todoArray.some((todo) => todo.isCompleted);

    setTodoArray((prevTodos) => {
      return prevTodos.map((todo) => ({
        ...todo,
        isCompleted: !hasCompletedTasks,
      }));
    });
  };

  const updateTask = (id: string, text: string) => {
    setTodoArray((prevTodos) => {
      const index = prevTodos.findIndex((todo) => todo.id === id);
      if (index === -1) {
        return prevTodos;
      }

      const newTodos = [...prevTodos];

      newTodos[index] = {
        ...newTodos[index],
        text: text,
      };

      return newTodos;
    });
  };

  return (
    <div>
      <h1>My TypeScript Todo</h1>
      <TodoAppHeader
        onAddTodo={handleAddTodo}
        onRemoveCompleted={removeCompletedTasks}
        onToggleAllTasks={toggleAllTasks}
      />
      <TodoList
        todo={todoArray}
        onToggleTodo={handleToggleTodo}
        onDeleteTask={handleDeleteTask}
        onUpdateTask={updateTask}
      />
      <TodoFooter />
    </div>
  );
};

export default TodoApp;
