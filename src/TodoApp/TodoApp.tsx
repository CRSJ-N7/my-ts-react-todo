import { useState, useMemo, useEffect, type FC } from "react";
import TodoAppHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";
import TodoLogo from "./components/TodoLogo";
import logo from "./assets/bg3-logo.png";
import hoveredLogo from "./assets/b3-logo-hover.png";
import c from "./TodoApp.module.css";

export type TodoType = {
  text: string;
  id: string;
  isCompleted: boolean;
};

export type FilterType = "all" | "active" | "completed";

const TodoApp: FC = () => {
  const [todoArray, setTodoArray] = useState<TodoType[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState<FilterType>(() => {
    const savedFilter = localStorage.getItem("filter");
    return savedFilter ? (savedFilter as FilterType) : "all";
  });

  const [currentPage, setCurrentPage] = useState<number>(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const [todoPerPage, setTodoPerPage] = useState<number>(() => {
    const savedTodoPerPage = localStorage.getItem("todoPerPage");
    return savedTodoPerPage ? parseInt(savedTodoPerPage, 10) : 5;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoArray));
  }, [todoArray]);

  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  useEffect(() => {
    localStorage.setItem("currentPage", JSON.stringify(currentPage));
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem("todoPerPage", JSON.stringify(todoPerPage));
  }, [todoPerPage]);

  const {
    activeTodosCount = 0,
    allTodosCount = 0,
    completedTodosCount = 0,
    paginatedTodos,
    maxPages,
  } = useMemo(() => {
    let activeTodosCount = 0;
    const filteredTodos = todoArray.filter((element) => {
      if (!element.isCompleted) {
        activeTodosCount++;
      }

      if (filter === "all") {
        return true;
      }

      if (filter === "completed") {
        return element.isCompleted;
      }

      if (filter === "active") {
        return !element.isCompleted;
      }
      return false;
    });

    const allTodosCount = todoArray.length;
    const completedTodosCount = allTodosCount - activeTodosCount;
    const lastIndex = todoPerPage * currentPage;
    const firstIndex = lastIndex - todoPerPage;
    const paginatedTodos = filteredTodos.slice(firstIndex, lastIndex);
    const maxPages = Math.ceil(filteredTodos.length / todoPerPage);

    return {
      paginatedTodos,
      allTodosCount,
      completedTodosCount,
      activeTodosCount,
      maxPages,
    };
  }, [todoArray, filter, currentPage, todoPerPage]);

  useEffect(() => {
    if (paginatedTodos.length === 0 && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [paginatedTodos, currentPage]);

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
    <div className={c.todoApp}>
      <TodoLogo logo={logo} hoveredLogo={hoveredLogo} />

      <h1 className={c.header}>todo</h1>
      <TodoAppHeader
        onAddTodo={handleAddTodo}
        onRemoveCompleted={removeCompletedTasks}
        onToggleAllTasks={toggleAllTasks}
      />

      <TodoList
        todo={paginatedTodos}
        onToggleTodo={handleToggleTodo}
        onDeleteTask={handleDeleteTask}
        onUpdateTask={updateTask}
      />
      {!todoArray.length ? (
        <h2 className={c.emptyTodoList}>No current tasks</h2>
      ) : (
        <TodoFooter
          onToggleFilter={handleToggleFilter}
          maxPages={maxPages}
          onPageClick={changeCurrentPage}
          todoPerPage={todoPerPage}
          setTodoPerPage={setTodoPerPage}
          allTodosCount={allTodosCount}
          activeTodosCount={activeTodosCount}
          completedTodosCount={completedTodosCount}
          currentPage={currentPage}
          filter={filter}
        />
      )}
    </div>
  );
};

export default TodoApp;
