import styled from "styled-components";
import { useState, memo } from "react";

function KeyframeGen(row = 2, col = 2, width = 200, height = 100) {
  let str = ` `;
  let widthIndex = 0;
  let heightIndex = 0;
  const percent = Math.floor((100 / (row * col)) * 100) / 100;
  for (let i = 0; i < row * col; i++) {
    str += `${percent * i}% {background-position: -${width * widthIndex}px -${height * heightIndex}px}`;
    if (widthIndex + 1 === col) {
      widthIndex = 0;
      heightIndex += 1;
    } else {
      widthIndex += 1
    }
  }
  return str;
}

const StyledDiv = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background: ${({ color }) => color || "red"};
  background-size: ${({ width, height, row, col }) => `${width * col}px ${height * row}px`};
  background-position: 0px 0px;
  background-repeat: no-repeat;
  animation: frames 2s steps(1) infinite ${({ play }) => play || "paused"};
  @keyframes frames {
   ${({ row, col, width, height }) => KeyframeGen(row, col, width, height)}
  }
`;

function App({ width = 200, height = 150, row = 4, col = 12, image = "black" }) {
  const [play, setPlay] = useState("running");
  return (
    <div>
      <StyledDiv width={width} height={height} row={row} col={col} color={image} play={play} />
      <button
        onClick={() =>
          setPlay((prev) => (prev === "paused" ? "running" : "paused"))
        }
      >
        CLICK!!!
      </button>
    </div>
  );
}

export default memo(App);
