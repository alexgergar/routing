import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { handleToggleMenuClosed } from "../redux/actions/menu-actions";
import IconSquare from "./IconSquare";
import Checkbox from "./Checkbox";
import { handleUpdateNode } from "../redux/actions/item-actions";

const DetailsSideBar = () => {
  const height = useSelector((state) => state.widthHeight.height);
  const menu = useSelector((state) => state.menu);
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

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

  const handleRemoveBlockClick = () => {
    const newItem = filterItems(items, menu.cardData.id);
    dispatch(handleUpdateNode(newItem));
  };

  return (
    <Wrapper height={height} isMenuOpen={menu.isMenuOpen}>
      <ContentWrapper isMenuOpen={menu.isMenuOpen}>
        <HeaderRow>
          <h2>Options</h2>
          <IconSquare
            onClick={handleCloseMenu}
            showBackground={false}
            icon="X"
            size={40}
          />
        </HeaderRow>
        <PaddedRow>
          <h4>Properties</h4>
        </PaddedRow>
        <PaddedRow>
          <h5>Conditionals</h5>
        </PaddedRow>
        <Column>
          <CheckBoxWrapper>
            <Checkbox label="Conditional 1" />
            <Checkbox label="Conditional 2" />
            <Checkbox label="Conditional 3" />
          </CheckBoxWrapper>
        </Column>
        <RemoveButton onClick={handleRemoveBlockClick}>
          Remove Blocks
        </RemoveButton>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: ${(props) => (props.isMenuOpen ? "400px" : "0px")};
  position: absolute;
  right: 0;
  min-height: ${(props) => props.height - 50}px;
  background-color: white;
  zindex: 100;
  transition: 0.25s;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  padding-top: 20px;
  display: ${(props) => (props.isMenuOpen ? "block" : "none !important")};
  opacity: ${(props) => (props.isMenuOpen ? 1 : 0)};
  transition: 0.25s;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const Column = styled.div`
  flex-direction: column;
`;

const PaddedRow = styled(Row)`
  padding: 0 20px;
`;

const HeaderRow = styled(Row)`
  padding: 20px;
`;

const CheckBoxWrapper = styled.div`
  padding: 20px;
`;

const CheckBox = styled.input``;

const RemoveButton = styled.button`
  position: absolute;
  width: 90%;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background: white;
  border: 1px solid black;
  padding: 20px;
  font-size: 20px;
`;

export default DetailsSideBar;
