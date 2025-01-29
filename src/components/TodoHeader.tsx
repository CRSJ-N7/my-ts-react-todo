import { useState, type ChangeEvent, type FC } from "react";

type Props = {
  handleAddTodo: (text: string) => void;
};

const TodoAppHeader: FC<Props> = (props) => {
  const [todoText, setTodoText] = useState<string>("");

  const onAddTodo = () => {
    if (!todoText.trim()) {
      alert(`You can't create an empty task`);
      return;
    }
    props.handleAddTodo(todoText);
    setTodoText("");
  };

  const onTodoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  return (
    <div>
      <input
        placeholder="...what's next ?"
        value={todoText}
        onChange={(e) => onTodoChange(e)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onAddTodo();
          }
        }}
      />
      <button onClick={onAddTodo}>Add</button>
      <button onClick={() => console.log("Toggle All")}>Toggle All</button>
      <button onClick={() => console.log("Delete All")}>
        Delete All Completed
      </button>
    </div>
  );
};

export default TodoAppHeader;
