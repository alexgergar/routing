import { TOGGLE_MENU_OPEN, TOGGLE_MENU_CLOSE } from "../actions/menu-actions";

export const initialMenuState = {
  isMenuOpen: false,
  optionID: null,
  cardData: null,
};

const menuReducer = (state = initialMenuState, { type, payload }) => {
  switch (type) {
    case TOGGLE_MENU_OPEN:
      return {
        ...state,
        isMenuOpen: true,
        optionID: payload.cardData.id,
        cardData: payload.cardData,
      };
    case TOGGLE_MENU_CLOSE:
      return {
        ...state,
        isMenuOpen: false,
        optionID: null,
        cardData: null,
      };
    default:
      return state;
  }
};

export default menuReducer;
