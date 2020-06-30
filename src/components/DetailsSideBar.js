import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  handleToggleMenuClosed,
  handleAddConditional,
} from "../redux/actions/menu-actions";
import IconSquare from "./IconSquare";
import {
  handleUpdateNode,
  handleDeleteTree,
} from "../redux/actions/item-actions";
import ConditionalButtonStatus from "./ConditionalButtonStatus";
import AddConditionalButton from "./AddConditionalButton";

const DetailsSideBar = () => {
  const height = useSelector((state) => state.widthHeight.height);
  const menu = useSelector((state) => state.menu);
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const [showConditionalMenu, setShowConditionalMenu] = useState(false);

  const handleCloseMenu = () => {
    dispatch(handleToggleMenuClosed());
  };

  const filterItems = (object, idToDelete) => {
    if (object.id !== null && object.id === idToDelete) return null;
    const children = object.children
      .map((child) => filterItems(child, idToDelete))
      .filter((node) => !!node);
    return {
      ...object,
      children,
    };
  };

  const handleAddBasicConditional = () => {
    setShowConditionalMenu(true);
    handleDispatchOfConditional();
  };

  const handleDispatchOfConditional = () => {
    const firstConditional = menu.cardData.conditionalOptions[0];
    dispatch(
      handleAddConditional(
        firstConditional.question,
        "is",
        firstConditional.answer[0]
      )
    );
  };

  const createNewNodeData = (data, conditionsForRoute) => {
    const date = new Date();
    const nodeID = date.valueOf();
    return {
      id: nodeID, // to find in the array
      parentId: menu.optionID,
      optionType: data.optionType, // for the card option type
      title: data.title, // title for the card
      shortDesc: data.shortDesc, // description of the the card
      icon: data.icon, // icon to help with visuals
      noun: data.noun, // noun to help details sidebar
      conditionalOptions: data.conditionalOptions, // options for detail sidebar for route
      conditionsForRoute: conditionsForRoute,
      x: null, // where the x-posiiton should be om the card.
      y: null, // where the y-position should be on the card
      children: [],
    };
  };

  const handleAddChildWithConditional = (newRouteData, conditionals) => {
    let newNodeData = createNewNodeData(newRouteData, conditionals);
    let foundValue;
    const findID = (object, id) => {
      if (typeof object !== "object" || object === undefined || object === null)
        return;
      if (object.id === id) {
        foundValue = object;
        return;
      } else {
        for (const i in object) {
          findID(object[i], id);
        }
      }
    };
    findID(items, menu.optionID);
    foundValue.children.push(newNodeData);
    dispatch(handleUpdateNode(items));
  };

  const handleRemoveBlockClick = () => {
    const newItem = filterItems(items, menu.cardData.id);
    newItem === null
      ? dispatch(handleDeleteTree())
      : dispatch(handleUpdateNode(newItem));
    handleCloseMenu();
  };

  const menuTitle = menu.cardData !== null ? menu.cardData.title : "";
  return (
    <Wrapper height={height} isMenuOpen={menu.isMenuOpen}>
      <ContentWrapper height={height} isMenuOpen={menu.isMenuOpen}>
        <HeaderRow>
          <h4>{menuTitle}</h4>
          <IconSquare
            onClick={handleCloseMenu}
            showBackground={false}
            icon="X"
            size={40}
          />
        </HeaderRow>
        {menu.cardData &&
          menu.cardData.conditionalOptions &&
          menu.cardData.conditionalOptions.length !== 0 &&
          (showConditionalMenu ? (
            <ConditionalButtonStatus
              handleDispatchOfConditional={handleDispatchOfConditional}
              handleAddChildWithConditional={handleAddChildWithConditional}
            />
          ) : (
            <AddConditionalButton onClick={handleAddBasicConditional} />
          ))}
        <RemoveButton onClick={handleRemoveBlockClick}>
          Remove Route
        </RemoveButton>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: ${(props) => (props.isMenuOpen ? "300px" : "0px")};
  position: fixed;
  top: 0;
  right: 0;
  min-height: ${(props) => props.height - 50}px;
  zindex: 100;
  transition: 0.25s;
  background-color: white;
  margin-right: ${(props) => (props.isMenuOpen ? "0" : "-300px")};
`;

const ContentWrapper = styled.div`
  ${"" /* display: ${(props) => (props.isMenuOpen ? "block" : "none !important")}; */}
  ${"" /* opacity: ${(props) => (props.isMenuOpen ? 1 : 0)}; */}
  transition: 0.25s;
  overflow: auto;
  min-height: ${(props) => props.height - 50}px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeaderRow = styled(Row)`
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
`;

const RemoveButton = styled.button`
  width: 90%;
  font-size: 14px;
  border-radius: 5px;
  background: white;
  border: 1px solid black;
  padding: 5px;
  margin-bottom: 15px;
  align-self: center;
`;

export default DetailsSideBar;
