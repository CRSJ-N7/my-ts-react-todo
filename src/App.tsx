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

  return (
    <div>
      <h1>My TypeScript Todo</h1>
      <TodoAppHeader handleAddTodo={handleAddTodo} />
      <TodoList
        todoArray={todoArray}
        handleToggleTodo={handleToggleTodo}
        handleDeleteTask={handleDeleteTask}
      />
      <TodoFooter />
    </div>
  );
};

export default TodoApp;
