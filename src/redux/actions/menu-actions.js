export const TOGGLE_MENU_OPEN = "TOGGLE_MENU_OPEN";
export const TOGGLE_MENU_CLOSE = "TOGGLE_MENU_CLOSE";
export const ADD_CONDITIONAL = "ADD_CONDITIONAL";
export const UPDATE_CONDITIONAL = "UPDATE_CONDITIONAL";
export const REMOVE_CONDITIONAL = "REMOVE_CONDITIONAL";
export const UPDATE_AND_ALL_CONDITIONAL_VALUE =
  "UPDATE_AND_ALL_CONDITIONAL_VALUE";

const handleToggleMenuOpen = (data) => ({
  type: TOGGLE_MENU_OPEN,
  payload: {
    cardData: data,
  },
});

const handleToggleMenuClosed = () => ({
  type: TOGGLE_MENU_CLOSE,
});

const handleAddConditional = (question, condition, answer) => ({
  type: ADD_CONDITIONAL,
  payload: {
    question: question,
    condition: condition,
    answer: answer,
  },
});

const handleUpdateConditional = (index, updatedConditional) => ({
  type: UPDATE_CONDITIONAL,
  payload: {
    index: index,
    updatedConditional: updatedConditional,
  },
});

const handleRemoveConditional = (index) => ({
  type: REMOVE_CONDITIONAL,
  payload: {
    index: index,
  },
});

const handleUpdateAndAllValue = (andAllValue) => ({
  type: UPDATE_AND_ALL_CONDITIONAL_VALUE,
  payload: {
    andAllValue: andAllValue,
  },
});

export {
  handleToggleMenuOpen,
  handleToggleMenuClosed,
  handleAddConditional,
  handleUpdateConditional,
  handleRemoveConditional,
  handleUpdateAndAllValue,
};
