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
import IconSquare from "./IconSquare";

const triggerList = database.filter((task) => task.optionType === "trigger");
const actionList = database.filter((task) => task.optionType === "action");
const loggerList = database.filter((task) => task.optionType === "logger");

const SideBar = (props) => {
  const [option, setOption] = useState("triggers");

  return (
    <>
      <SideBarColumn sideBarOpen={props.sideBarOpen}>
        <SideBarTitleSection>
          <h3>Workflow Options</h3>
        </SideBarTitleSection>
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
      <SideBarToggleButton
        onClick={props.handleToggleSideBar}
        sideBarOpen={props.sideBarOpen}
      >
        {props.sideBarOpen ? (
          <IconSquare icon="ChevronsLeft" showBackground={false} size={60} />
        ) : (
          <IconSquare icon="ChevronsRight" showBackground={false} size={60} />
        )}
      </SideBarToggleButton>
    </>
  );
};

const SideBarColumn = styled.div`
  width: ${(props) => (props.sideBarOpen ? "350px" : "0")};
  height: calc(
    100vh - 50px
  ); /* this seems to work better than using widthHeight.height - 50 (which cuts off it) */
  box-sizing: border-box;
  background-color: #fff;
  border-right: 1px solid #c7c7c7;
  z-index: 3;
  overflow-y: scroll;
  overflow-x: hidden;
  left: 0;
  transition: 0.5s;
  margin-left: ${(props) => (props.sideBarOpen ? "0" : "-350px")};
`;

const SideBarToggleButton = styled.div`
  position: fixed;
  margin-left: ${(props) => (props.sideBarOpen ? "349px" : "0px")};
  transition: 0.5s;
  height: 40px;
  width: 40px;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #c7c7c7;
  border-right: 1px solid #c7c7c7;
`;

const SideBarTitleSection = styled.div`
  padding: 20px 20px 5px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OptionsTabRow = styled(Row)`
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
