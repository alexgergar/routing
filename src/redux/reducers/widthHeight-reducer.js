import { UPDATE_WIDTH_HEIGHT } from "../actions/widthHeight-actions";

export const initialWidthHeightState = {
  width: "100vw",
  height: "100vh",
};

const widthHeightReducer = (
  state = initialWidthHeightState,
  { type, payload }
) => {
  switch (type) {
    case UPDATE_WIDTH_HEIGHT:
      return {
        width: payload.width,
        height: payload.height,
      };
    default:
      return state;
  }
};

export default widthHeightReducer;
