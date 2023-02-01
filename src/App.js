import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * It takes a number of rows and columns, a width and height, and a starting and ending frame, and
 * returns a string of keyframes.
 * @param [row] - number of rows in the sprite sheet
 * @param [col] - number of columns in the sprite sheet
 * @param [width] - width of each frame
 * @param [height] - The height of each frame in the sprite sheet.
 * @param [finishFrame] - The last frame of the animation. Not included current frame when have startFrame!!!
 * @param [startingFrame] - The frame you want to start from.
 * @returns A string of CSS keyframes.
 */
function KeyframeGen(row, col, width, height, finishFrame, startingFrame) {
  let frames = ``;

  let widthIndex =
    (startingFrame &&
      (startingFrame <= col
        ? startingFrame - 1
        : startingFrame % col > 0
          ? (startingFrame % col) - 1
          : col - 1)) ||
    0;

  let heightIndex =
    startingFrame && startingFrame > col
      ? startingFrame % col > 0
        ? Math.trunc(startingFrame / col)
        : startingFrame / col - 1
      : 0;

  const framesCount = startingFrame
    ? startingFrame && finishFrame
      ? finishFrame - startingFrame
      : row * col - startingFrame + 1
    : finishFrame || row * col;

  const percent = 100 / framesCount;

  for (let i = 0; i < framesCount; i++) {
    frames += `${Math.floor(percent * i * 100) / 100}% {background-position: -${width * widthIndex
      }px -${height * heightIndex}px}`;

    if (i + 1 >= framesCount) {
      frames += `100% {background-position: -${width * widthIndex}px -${height * heightIndex
        }px}`;
    }
    if (widthIndex + 1 === col) {
      widthIndex = 0;
      heightIndex += 1;
    } else {
      widthIndex += 1;
    }
  }
  return frames;
}

const StyledDiv = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-image: url(${({ url }) => url});
  background-size: ${({ width, height, rowCount, columnCount }) =>
    `${width * columnCount}px ${height * rowCount}px`};
  background-position: 0px 0px;
  background-repeat: no-repeat;
  animation: frames ${({ fps }) => fps}ms steps(1) ${({ delay }) => delay}ms
    ${({ loop, loopCount }) => (loop ? "infinite" : loopCount || "")}
    ${({ forwards }) => (forwards ? "forwards" : "backwards")}
    ${({ start }) => (start ? "running" : "paused")};
  &.isPaused{
  animation-play-state: paused;
  }
  
  @keyframes frames {
    ${({ rowCount, columnCount, width, height, finishFrame, startingFrame }) =>
    KeyframeGen(
      rowCount,
      columnCount,
      width,
      height,
      finishFrame,
      startingFrame
    )}
  }
`;
function SpriteAnimation({
  restart,
  width,
  height,
  rowCount,
  columnCount,
  url,
  loop,
  loopCount,
  start,
  fps,
  onAnimationEnd,
  onIteration,
  finishFrame,
  startingFrame,
  delay,
  forwards,
}) {
  const [key, setKey] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    restart && setKey(prev => !prev);
  }, [restart])

  //****if we want to stop the animation when changing tab//
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  //****//

  return (
    <StyledDiv
      className={isPaused ? "isPaused" : ""}
      key={key}
      width={width}
      height={height}
      rowCount={rowCount}
      columnCount={columnCount}
      url={url}
      start={start}
      loop={loop}
      loopCount={loopCount}
      onAnimationEnd={onAnimationEnd}
      omAnimationIteration={onIteration}
      fps={(rowCount * columnCount * 1000) / fps}
      finishFrame={finishFrame}
      startingFrame={startingFrame}
      delay={delay}
      forwards={forwards}
    />
  );
}

SpriteAnimation.propTypes = {
  restart: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  rowCount: PropTypes.number,
  columnCount: PropTypes.number,
  url: PropTypes.string,
  start: PropTypes.bool,
  loop: PropTypes.bool,
  loopCount: PropTypes.any,
  fps: PropTypes.number,
  onAnimationEnd: PropTypes.func,
  onIteration: PropTypes.func,
  finishFrame: PropTypes.any,
  startingFrame: PropTypes.any,
  delay: PropTypes.number,
  forwards: PropTypes.bool,
};

SpriteAnimation.defaultProps = {
  restart: false,
  width: 0,
  height: 0,
  rowCount: 0,
  columnCount: 0,
  url: "",
  start: false,
  loop: false,
  loopCount: null,
  fps: 30,
  onAnimationEnd: () => { },
  onIteration: () => { },
  finishFrame: null,
  startingFrame: null,
  delay: 0,
  forwards: false,
};

function App() {
  const [start, setStart] = useState(true);
  const [restart, setRestart] = useState(false);
  return (
    <>
      <SpriteAnimation
        url={
          "https://www.gamedesigning.org/wp-content/uploads/2020/10/Animating-A-Sprite.jpg"
        }
        restart={restart}
        width={200}
        height={400}
        rowCount={2}
        loopCount={2}
        start={start}
        fps={5}
        onAnimationEnd={() => console.log("OnEnd")}
        columnCount={8}
        forwards={true}
      />
      <button onClick={() => setStart((prev) => !prev)}>Start/Pause</button>
      <button onClick={() => setRestart((prev) => !prev)}>Restart</button>
    </>
  );
}

export default App;
