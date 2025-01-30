import c from "./TodoFooter.module.css";
import { FC } from "react";

type Props = {
  onToggleFilter: (value: "all" | "active" | "completed") => void;
  maxPages: number;
};




const TodoFooter: FC<Props> = (props) => {
  return (
    <div>
      <div className={c.pagination}>
        <button>Page 1</button>
      </div>
      <div className={c.filter}>
        <button onClick={() => props.onToggleFilter("all")}>All todos</button>
        <button onClick={() => props.onToggleFilter("active")}>
          Active todos
        </button>
        <button onClick={() => props.onToggleFilter("completed")}>
          Completed todos
        </button>
      </div>
    </div>
  );
};

export default TodoFooter;
