import { useState } from "react";
import type { FC } from "react";
import c from "./TodoLogo.module.css";

type Props = {
  logo: string;
  hoveredLogo: string;
};

const TodoLogo: FC<Props> = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={c.imageContainer}>
      <img src={props.logo} alt="Default" className={c.defaultImage} />
      <img
        src={props.hoveredLogo}
        alt="Hover"
        className={`${c.hoverImage} ${isHovered ? c.visible : ""}`}
      />
      <div
        className={c.hoverArea}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </div>
  );
};

export default TodoLogo;
