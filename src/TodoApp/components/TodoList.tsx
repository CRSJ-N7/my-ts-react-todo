import { FC } from "react";
import TodoItem from "./TodoItem";
import type { TodoType } from "../TodoApp";
import c from "./TodoList.module.css";

type Props = {
  todo: TodoType[];
  onToggleTodo: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, text: string) => void;
};

const TodoList: FC<Props> = (props) => {
  return (
    <div className={c.todoList}>
      {props.todo.map((todo) => (
        <div className={c.todoList} key={todo.id}>
          <TodoItem
            todo={todo}
            onDeleteTask={props.onDeleteTask}
            onToggleTodo={props.onToggleTodo}
            onUpdateTask={props.onUpdateTask}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
