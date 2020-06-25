import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { handleToggleMenuClosed } from "../redux/actions/menu-actions";
import IconSquare from "./IconSquare";
import ConditionalStatement from "./ConditionalStatement";
import { database } from "../utils/database";
import {
  handleUpdateNode,
  handleDeleteTree,
} from "../redux/actions/item-actions";
import {
  handleAddConditional,
  handleRemoveConditional,
  handleResetConditional,
} from "../redux/actions/conditional-actions";
import Form from "react-bootstrap/Form";
import AddConditionalButton from "./AddConditionalButton";

const DetailsSideBar = () => {
  const height = useSelector((state) => state.widthHeight.height);
  const menu = useSelector((state) => state.menu);
  const items = useSelector((state) => state.items);
  const conditionals = useSelector((state) => state.conditionals);
  const dispatch = useDispatch();
  const [showConditionalMenu, setShowConditionalMenu] = useState(false);
  const [routeValue, setRouteValue] = useState(database[0].title);
  const [andAllValue, setAndAllValue] = useState("all");

  // useEffect(() => {
  //   console.log(conditionals);
  // }, [conditionals]);

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
    newItem === null
      ? dispatch(handleDeleteTree())
      : dispatch(handleUpdateNode(newItem));
  };

  // this is the basic format to what is added to
  const handleAddBasicConditional = () => {
    setShowConditionalMenu(true);
    handleDispatchOfConditional();
  };

  const handleDispatchOfConditional = () => {
    const firstConditional = menu.cardData.conditionalOptions[0];
    dispatch(
      handleAddConditional(
        firstConditional.question,
        "all",
        firstConditional.answer[0]
      )
    );
  };

  const handleAndAllSelect = (event) => {
    setAndAllValue(event.target.value);
  };

  const handleRouteValueSelect = (event) => {
    setRouteValue(database.event.target.value);
  };

  const handleAddNewConditionalItem = () => {
    console.log("add new conditional item");
  };

  const ConditionalButtonStatus = () => {
    return !showConditionalMenu ? (
      <AddConditionalButton onClick={handleAddBasicConditional} />
    ) : (
      <div>
        <ConditionalColumn>
          <Form>
            <Row>
              <Title>{menu.cardData.noun} meets &nbsp;</Title>
              <AndAllColumn>
                <Form.Control
                  onChange={handleAndAllSelect}
                  as="select"
                  size="sm"
                >
                  <option>all</option>
                  <option>any</option>
                </Form.Control>
              </AndAllColumn>

              <Title>&nbsp; condition(s):</Title>
            </Row>
            {conditionals &&
              conditionals.map((conditional, index) => {
                console.log(`conditional question - ${conditional.question}`);
                return (
                  <ConditionalStatement
                    data={menu.cardData.conditionalOptions}
                    titleNoun={menu.cardData.noun}
                    defaultQuestionIndex={0}
                    defaultQuestion={conditional.question}
                    defaultAndAll={conditional.andAllValue}
                    defaultAnswer={conditional.answer}
                    index={index}
                  />
                );
              })}
            <AddConditionalButton
              onClick={handleDispatchOfConditional}
              label="Add Another Condtion"
            />
            <Title>Then Route To:</Title>
            <Form.Control as="select" size="sm">
              {database.map((option) => (
                <option onChange={handleRouteValueSelect}>
                  {option.title}
                </option>
              ))}
            </Form.Control>
          </Form>
        </ConditionalColumn>
      </div>
    );
  };

  const menuTitle = menu.cardData !== null ? menu.cardData.title : "";
  return (
    <Wrapper height={height} isMenuOpen={menu.isMenuOpen}>
      <ContentWrapper isMenuOpen={menu.isMenuOpen}>
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
          menu.cardData.conditionalOptions.length > 0 && (
            <ConditionalButtonStatus />
          )}
        <RemoveButton onClick={handleRemoveBlockClick}>
          Remove Route
        </RemoveButton>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: ${(props) => (props.isMenuOpen ? "300px" : "0px")};
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
  display: ${(props) => (props.isMenuOpen ? "block" : "none !important")};
  opacity: ${(props) => (props.isMenuOpen ? 1 : 0)};
  transition: 0.25s;
  overflow: scroll;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  flex-direction: column;
`;

const HeaderRow = styled(Row)`
  padding: 20px;
  justify-content: space-between;
  align-items: flex-start;
`;

const ConditionalColumn = styled(Column)`
  padding: 0 20px;
`;

const Title = styled.h6`
  align-self: center;
`;

const RemoveButton = styled.button`
  position: absolute;
  width: 90%;
  bottom: 0px;
  left: 50%;
  font-size: 14px;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background: white;
  border: 1px solid black;
  padding: 5px;
`;

const AndAllColumn = styled(Column)`
  width: 25%;
  margin-bottom: 0.5rem;
`;

export default DetailsSideBar;
