import { useState, type ChangeEvent, type FC } from "react";
import addTask from "../assets/add-task.png";
import toggleAll from "../assets/toggle-all.png";
import deleteAllCompleted from "../assets/delete-all-completed.png";
import c from "./TodoHeader.module.css";

type Props = {
  onAddTodo: (text: string) => void;
  onRemoveCompleted: () => void;
  onToggleAllTasks: () => void;
};

const TodoAppHeader: FC<Props> = (props) => {
  const [todoText, setTodoText] = useState<string>("");

  const onAddTodo = () => {
    if (!todoText.trim()) {
      alert(`You can't create an empty task`);
      return;
    }
    props.onAddTodo(todoText);
    setTodoText("");
  };

  const onTodoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  return (
    <div className={c.headerWrapper}>
      <button className={c.headerButtons} onClick={onAddTodo}>
        <img src={addTask}></img>
      </button>
      <input
        className={c.todoInput}
        placeholder="...what's next ?"
        value={todoText}
        onChange={(e) => onTodoChange(e)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onAddTodo();
          }
        }}
      />
      <button onClick={props.onToggleAllTasks} className={c.headerButtons}>
        <img src={toggleAll}></img>
      </button>
      <button onClick={props.onRemoveCompleted} className={c.headerButtons}>
        <img src={deleteAllCompleted}></img>
      </button>
    </div>
  );
};

export default TodoAppHeader;
