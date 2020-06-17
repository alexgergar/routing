export const TOGGLE_MENU_OPEN = "TOGGLE_MENU_OPEN";
export const TOGGLE_MENU_CLOSE = "TOGGLE_MENU_CLOSE";

const handleToggleMenuOpen = (data) => ({
  type: TOGGLE_MENU_OPEN,
  payload: {
    cardData: data,
  },
});

const handleToggleMenuClosed = () => ({
  type: TOGGLE_MENU_CLOSE,
});

export { handleToggleMenuOpen, handleToggleMenuClosed };
