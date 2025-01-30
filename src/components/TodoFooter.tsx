import c from "./TodoFooter.module.css";
import { FC } from "react";
import type { FilterType } from "../TodoApp";

type Props = {
  onToggleFilter: (value: FilterType) => void;
  onPageClick: (value: number) => void;
  maxPages: number;
};

const TodoFooter: FC<Props> = (props) => {
  return (
    <div>
      <div className={c.pagination}>
        {Array(props.maxPages)
          .fill(undefined)
          .map((e, i) => (
            <button key={i} onClick={() => props.onPageClick(i)}>
              {++i}
            </button>
          ))}
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
