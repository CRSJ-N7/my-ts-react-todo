import TodoAppHeader from "./components/TodoAppHeader";
import { useState } from "react";

type TodoType = {
  text: string;
  id: string;
  isCompleted: boolean;
};

const TodoApp = () => {
  const [todoArray, setTodoArray] = useState<TodoType[]>([]);

  const handleNewTodo = () => {
    setTodoArray();
  };

  return (
    <div>
      <h1>My TypeScript Todo</h1>
      <TodoAppHeader />
    </div>
  );
};

export default TodoApp;
