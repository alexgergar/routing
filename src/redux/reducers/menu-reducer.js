import {
  TOGGLE_MENU_OPEN,
  TOGGLE_MENU_CLOSE,
  ADD_CONDITIONAL,
  UPDATE_CONDITIONAL,
  REMOVE_CONDITIONAL,
  UPDATE_AND_ALL_CONDITIONAL_VALUE,
} from "../actions/menu-actions";

export const initialMenuState = {
  isMenuOpen: false,
  optionID: null,
  cardData: null,
  conditionals: null,
  andAllValue: null,
};

const menuReducer = (state = initialMenuState, { type, payload }) => {
  switch (type) {
    case TOGGLE_MENU_OPEN:
      let conditionsForRoute =
        payload.cardData.conditionsForRoute.length === 0
          ? []
          : payload.cardData.conditionsForRoute.conditionals;
      let andAllValueForRoute =
        payload.cardData.conditionsForRoute.length === 0
          ? "all"
          : payload.cardData.conditionsForRoute.andAllValue;
      return {
        ...state,
        isMenuOpen: true,
        optionID: payload.cardData.id,
        cardData: payload.cardData,
        conditionals: conditionsForRoute,
        andAllValue: andAllValueForRoute,
      };
    case TOGGLE_MENU_CLOSE:
      return {
        ...state,
        isMenuOpen: false,
        optionID: null,
        cardData: null,
        conditionals: null,
        andAllValue: null,
      };
    case ADD_CONDITIONAL:
      return {
        ...state,
        conditionals: [...state.conditionals, payload],
      };
    case UPDATE_CONDITIONAL:
      let newConditionalsState = state.conditionals.map((item, index) => {
        if (index !== payload.index) {
          return item;
        }
        return payload.updatedConditional;
      });
      return {
        ...state,
        conditionals: newConditionalsState,
      };
    case REMOVE_CONDITIONAL:
      let newConditionalState = state.conditionals.filter(
        (conditional, index) => index !== payload.index
      );
      return {
        ...state,
        conditionals: newConditionalState,
      };
    case UPDATE_AND_ALL_CONDITIONAL_VALUE:
      return {
        ...state,
        andAllValue: payload.andAllValue,
      };
    default:
      return state;
  }
};

export default menuReducer;
