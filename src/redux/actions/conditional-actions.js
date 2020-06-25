export const ADD_CONDITIONAL = "ADD_CONDITIONAL";
export const UPDATE_CONDITIONAL = "UPDATE_CONDITIONAL";
export const REMOVE_CONDITIONAL = "REMOVE_CONDITIONAL";
export const RESET_CONDITIONAL = "RESET_CONDITIONAL";

const handleAddConditional = (question, andAllValue, answer) => ({
  type: ADD_CONDITIONAL,
  payload: {
    question: question,
    andAllValue: andAllValue,
    answer: answer,
  },
});

const handleUpdateConditional = (condition, index) => ({
  type: UPDATE_CONDITIONAL,
  payload: {
    condition: condition,
    index: index,
  },
});

const handleRemoveConditional = (index) => ({
  type: REMOVE_CONDITIONAL,
  payload: {
    index: index,
  },
});

const handleResetConditional = () => ({
  type: RESET_CONDITIONAL,
});

export {
  handleAddConditional,
  handleUpdateConditional,
  handleRemoveConditional,
  handleResetConditional,
};
