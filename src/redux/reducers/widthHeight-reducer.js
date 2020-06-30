import { UPDATE_WIDTH_HEIGHT } from "../actions/widthHeight-actions";

export const initialWidthHeightState = {
  width: window.innerWidth,
  height: window.innerHeight,
  cardWidth: 350,
};

const widthHeightReducer = (
  state = initialWidthHeightState,
  { type, payload }
) => {
  switch (type) {
    case UPDATE_WIDTH_HEIGHT:
      return {
        ...state,
        width: payload.width,
        height: payload.height,
      };
    default:
      return state;
  }
};

export default widthHeightReducer;
