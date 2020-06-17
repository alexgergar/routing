export const UPDATE_WIDTH_HEIGHT = "UPDATED_WIDTH_HEIGHT";

const handleUpdateWidthHeight = (width, height) => ({
  type: UPDATE_WIDTH_HEIGHT,
  payload: {
    width: width,
    height: height,
  },
});

export { handleUpdateWidthHeight };
