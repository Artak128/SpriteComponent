import { memo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * It takes a number of rows and columns, a width and height, and a starting and ending frame, and
 * returns a string of keyframes.
 * @param [row] - number of rows in the sprite sheet
 * @param [col] - number of columns in the sprite sheet
 * @param [width] - width of each frame
 * @param [height] - The height of each frame in the sprite sheet.
 * @param [finishFrame] - The last frame of the animation.
 * @param [startingFrame] - The frame you want to start from.
 * @returns A string of CSS keyframes.
 */
function KeyframeGen(
  row,
  col,
  width,
  height,
  finishFrame, //Not included when have startFrame !!!
  startingFrame
) {
  let str = ``;

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
    str += `${Math.floor(percent * i * 100) / 100}% {background-position: -${
      width * widthIndex
    }px -${height * heightIndex}px}`;

    if (i + 1 >= framesCount) {
      str += `100% {background-position: -${width * widthIndex}px -${
        height * heightIndex
      }px}`;
    }

    if (widthIndex + 1 === col) {
      widthIndex = 0;
      heightIndex += 1;
    } else {
      widthIndex += 1;
    }
  }
  return str;
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
  finishFrame,
  startingFrame,
  delay,
  forwards,
}) {
  return (
    <StyledDiv
      width={width}
      height={height}
      rowCount={rowCount}
      columnCount={columnCount}
      url={url}
      start={start}
      loop={loop}
      loopCount={loopCount}
      fps={(rowCount * columnCount * 1000) / fps}
      onAnimationEnd={onAnimationEnd}
      finishFrame={finishFrame}
      startingFrame={startingFrame}
      delay={delay}
      forwards={forwards}
    />
  );
}

SpriteAnimation.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  rowCount: PropTypes.number,
  columnCount: PropTypes.number,
  url: PropTypes.object,
  start: PropTypes.bool,
  loop: PropTypes.bool,
  loopCount: PropTypes.number,
  fps: PropTypes.number,
  onAnimationEnd: PropTypes.func,
  finishFrame: PropTypes.any,
  startingFrame: PropTypes.any,
  delay: PropTypes.number,
  forwards: PropTypes.bool,
};

SpriteAnimation.defaultProps = {
  width: 0,
  height: 0,
  rowCount: 0,
  columnCount: 0,
  url: {},
  start: true,
  loop: false,
  loopCount: 0,
  fps: 30,
  onAnimationEnd: () => {},
  finishFrame: null,
  startingFrame: null,
  delay: 0,
  forwards: false,
};

export default memo(SpriteAnimation);
