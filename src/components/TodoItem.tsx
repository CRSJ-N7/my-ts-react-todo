import { FC } from "react";
import type { TodoType } from "../App";
import c from "./TodoItem.module.css";

type Props = {
  todo: TodoType;
  handleToggleTodo: (id: string) => void;
  handleDeleteTask: (id: string) => void;
};

const TodoItem: FC<Props> = (props) => {
  return (
    <div className={c.todoItem} id={props.todo.id}>
      <div>{props.todo.text}</div>
      <input
        type="checkbox"
        checked={props.todo.isCompleted}
        onChange={() => props.handleToggleTodo(props.todo.id)}
      />
      <button onClick={() => props.handleDeleteTask(props.todo.id)}>
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
