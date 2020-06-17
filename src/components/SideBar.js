import React, { useState } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import TabContainer from "react-bootstrap/TabContainer";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import OptionCard from "./OptionCard";
import DragData from "./DragData";
import { database } from "../utils/database";

const triggerList = database.filter((task) => task.optionType === "trigger");
const actionList = database.filter((task) => task.optionType === "action");
const loggerList = database.filter((task) => task.optionType === "logger");

const SideBar = (props) => {
  const [option, setOption] = useState("triggers");

  return (
    <SideBarColumn>
      <PaddingForSideBar>
        <h3>Options:</h3>
        <SearchForm>
          <Form.Control type="search" placeholder="Search for Option" />
        </SearchForm>
      </PaddingForSideBar>
      <TabContainer
        activeKey={option}
        defaultActiveKey="triggers"
        variant="tabs"
        onSelect={(option) => setOption(option)}
      >
        <OptionsTabRow>
          <OptionsTabNavBar defaultActiveKey="triggers">
            <Nav.Item>
              <OptionTabLink eventKey="triggers" option={option}>
                Triggers
              </OptionTabLink>
            </Nav.Item>
            <Nav.Item>
              <OptionTabLink eventKey="actions" option={option}>
                Actions
              </OptionTabLink>
            </Nav.Item>
            <Nav.Item>
              <OptionTabLink eventKey="extras" option={option}>
                Extras
              </OptionTabLink>
            </Nav.Item>
          </OptionsTabNavBar>
        </OptionsTabRow>
        <BoxForOptionsSection noGutters>
          <OptionsContentBox>
            <OptionsPaneItem eventKey="triggers">
              {triggerList.map((listItem) => (
                <DragData dataItem={listItem} key={listItem.id}>
                  <OptionCard cardData={listItem} />
                </DragData>
              ))}
            </OptionsPaneItem>
            <OptionsPaneItem eventKey="actions">
              {actionList.map((listItem) => (
                <DragData dataItem={listItem} key={listItem.id}>
                  <OptionCard cardData={listItem} />
                </DragData>
              ))}
            </OptionsPaneItem>
            <OptionsPaneItem eventKey="extras">
              {loggerList.map((listItem) => (
                <DragData dataItem={listItem} key={listItem.id}>
                  <OptionCard cardData={listItem} />
                </DragData>
              ))}
            </OptionsPaneItem>
          </OptionsContentBox>
        </BoxForOptionsSection>
      </TabContainer>
    </SideBarColumn>
  );
};

const SideBarColumn = styled.div`
  width: 350px;
  height: calc(
    100vh - 50px
  ); /* this seems to work better than using widthHeight.height - 50 (which cuts off it) */
  box-sizing: border-box;
  background-color: #fff;
  border-right: 1px solid #c7c7c7;
  z-index: 3;
`;

const PaddingForSideBar = styled.div`
  padding: 20px;
`;

const SearchForm = styled(Form)`
  margin-top: 5px;
`;

const OptionsTabRow = styled(Row)`
  margin-top: 10px;
  justify-content: center;
`;

const OptionsTabNavBar = styled(Nav)`
  justify-content: center;
`;

const OptionTabLink = styled(Nav.Link)`
  color: ${(props) => (props.eventKey === props.option ? "black" : "#7D7D7D")};
  border-bottom: ${(props) =>
    props.eventKey === props.option ? "3px solid blue" : ""};
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;

  &:hover {
    color: ${(props) =>
      props.eventKey === props.option ? "black" : "#c2c2c2"};
  }
`;

const BoxForOptionsSection = styled(Row)`
  height: auto;
  border-top: 1px solid #e8e8e8;
`;

const OptionsContentBox = styled(Tab.Content)`
  width: 100%;
  overflow-y: auto;
`;

const OptionsPaneItem = styled(Tab.Pane)``;

export default SideBar;
