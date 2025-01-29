import TodoItem from "./TodoItem";
import { FC } from "react";
import type { TodoType } from "../App";
import { default as c } from "./TodoList.module.css";

type Props = {
  todoArray: TodoType[];
  handleToggleTodo: (id: string) => void;
  handleDeleteTask: (id: string) => void;
};

const TodoList: FC<Props> = (props) => {
  return (
    <div>
      {props.todoArray.map((todo) => (
        <div className={c.todoList} key={todo.id}>
          <TodoItem
            todo={todo}
            handleDeleteTask={props.handleDeleteTask}
            handleToggleTodo={props.handleToggleTodo}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
