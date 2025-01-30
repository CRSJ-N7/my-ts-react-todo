import { useState, useMemo, useEffect } from "react";
import TodoAppHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";
import type { FC } from "react";

export type TodoType = {
  text: string;
  id: string;
  isCompleted: boolean;
};

export type FilterType = "all" | "active" | "completed";

const TodoApp: FC = () => {
  const [todoArray, setTodoArray] = useState<TodoType[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const todoPerPage = 5;

  const filteredTodoArrays = useMemo(() => {
    switch (filter) {
      case "active":
        return todoArray.filter((todo) => !todo.isCompleted);
      case "completed":
        return todoArray.filter((todo) => todo.isCompleted);
      default:
        return todoArray;
    }
  }, [todoArray, filter]);

  const maxPages = Math.ceil(filteredTodoArrays.length / todoPerPage);

  const paginatedArray = useMemo(() => {
    const lastIndex = todoPerPage * currentPage;
    const firstIndex = lastIndex - todoPerPage;
    return filteredTodoArrays.slice(firstIndex, lastIndex);
  }, [filteredTodoArrays, currentPage]);

  useEffect(() => {
    if (paginatedArray.length === 0 && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [paginatedArray, currentPage]);

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

  const handleToggleFilter = (value: FilterType) => {
    setFilter(value);
  };

  const changeCurrentPage = (value: number) => {
    setCurrentPage(value);
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
        todo={paginatedArray}
        onToggleTodo={handleToggleTodo}
        onDeleteTask={handleDeleteTask}
        onUpdateTask={updateTask}
      />
      {!todoArray.length ? (
        <h2>No current tasks</h2>
      ) : (
        <TodoFooter
          onToggleFilter={handleToggleFilter}
          maxPages={maxPages}
          onPageClick={changeCurrentPage}
        />
      )}
    </div>
  );
};

export default TodoApp;
