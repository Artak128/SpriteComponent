import styled, { keyframes } from "styled-components";
import "./App.css";
import { useState, useMemo } from "react";

function KeyframeGen(row = 2, col = 4, width = 200, height = 100) {
  let str = ""
  let posWidth = 0;
  let posHeight = 0;
  const number = (100 / (row * col));
  for (let i = 0; i < row * col; i++) {
    const firstPercent = Math.trunc((i * number)) + 0.1;
    const secondPercent = Math.trunc((i + 1) * number);
    str += ` ${firstPercent}% {transform: translate(-${posWidth}px, -${posHeight}px)} ${secondPercent}% {transform: translate(-${posWidth}px, -${posHeight}px)} `;
    posHeight = posWidth === width * col ? posHeight + height : posHeight;
    posWidth = posWidth === width * col ? 0 : posWidth + width;
  }
  return str;
}

const Animat = (props) => keyframes`
${props || `
0% {transform: translate(0px, 0px);}
98% {transform: translate(0px, 0px);}
99%{transform: translate(-100px, -100px);} 
100% {transform: translate(-100px, -100px);} 
`
  }
`;

const StyledDiv = styled.div`
position: relative;
overflow: hidden;
width: ${({ width }) => width || "500"}px;
height: ${({ height }) => height || "500"}px;
`;

const InnerDiv = styled.div`
position: absolute;
width: ${({ width, col }) => width * col || "500"}px;
height: ${({ height, row }) => height * row || "500"}px;
background: ${({ color }) => color || "red"};
background-size: 100% 100%;
animation: ${({ anim }) => Animat(anim)};
animation-duration: 0.7s;
animation-iteration-count: infinite;
animation-play-state: ${({ play }) => play || "paused"};
`

function App({ width = 200, height = 200, row = 6, col = 8, image = "black" }) {
  const [play, setPlay] = useState("running");

  const anim = useMemo(() => KeyframeGen(row, col, width, height), [row, col, width, height]);
  console.log(anim);
  return (
    <div>
      <StyledDiv
        width={width}
        height={height}
      ><InnerDiv
        width={width}
        height={height}
        row={row}
        col={col}
        color={image}
        anim={anim}
        play={play}
      ></InnerDiv></StyledDiv>
      <button onClick={() => setPlay(prev => prev === "paused" ? "running" : "paused")}>CLICK!!!</button>
    </div>
  );
}

export default App;
