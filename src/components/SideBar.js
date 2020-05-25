import React, {useState} from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import TabContainer from "react-bootstrap/TabContainer";
import Tab from "react-bootstrap/Tab";
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import OptionCard from "./OptionCard";
import DragData from './DragData';

const dataInfo = { title: "this is the title", body: "this is the body" };

const SideBar = (props) => {
  const [optionKey, setOptionKey] = useState('triggers');

  return (
    <SideBarColumn>
      <PaddingForSideBar>
        <h3>Options:</h3>
        <SearchForm>
          <Form.Control type="search" placeholder="Search for Option" />
        </SearchForm>
      </PaddingForSideBar>
      <TabContainer
        activeKey={optionKey}
        defaultActiveKey="triggers"
        variant="tabs"
        onSelect={(optionKey) => setOptionKey(optionKey)}
      >
        <OptionsTabRow>
          <OptionsTabNavBar defaultActiveKey="triggers">
            <Nav.Item>
              <OptionTabLink eventKey="triggers" optionKey={optionKey}>
                Triggers
              </OptionTabLink>
            </Nav.Item>
            <Nav.Item>
              <OptionTabLink eventKey="actions" optionKey={optionKey}>
                Actions
              </OptionTabLink>
            </Nav.Item>
            <Nav.Item>
              <OptionTabLink eventKey="extras" optionKey={optionKey}>
                Extras
              </OptionTabLink>
            </Nav.Item>
          </OptionsTabNavBar>
        </OptionsTabRow>
        <BoxForOptionsSection noGutters>
          <OptionsContentBox>
            <OptionsPaneItem eventKey="triggers">
              <DragData dataItem={dataInfo}>
                <OptionCard />
              </DragData>
              <DragData dataItem={dataInfo}>
                <OptionCard />
              </DragData>
              <DragData dataItem={dataInfo}>
                <OptionCard />
              </DragData>
              <DragData dataItem={dataInfo}>
                <OptionCard />
              </DragData>
            </OptionsPaneItem>
            <OptionsPaneItem eventKey="actions">
              <OptionCard />
            </OptionsPaneItem>
            <OptionsPaneItem eventKey="extras">
              <OptionCard />
            </OptionsPaneItem>
          </OptionsContentBox>
        </BoxForOptionsSection>
      </TabContainer>
    </SideBarColumn>
  );
};

const SideBarColumn = styled.div`
  width: 350px;
  height: calc(100vh - 50px);
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
  color: ${(props) =>
    props.eventKey === props.optionKey ? "black" : "#7D7D7D"};
  border-bottom: ${(props) =>
    props.eventKey === props.optionKey ? "3px solid blue" : ""};
  text-decoration: none;

  &:hover {
    color: ${(props) =>
      props.eventKey === props.optionKey ? "black" : "#c2c2c2"};
  }
`;

const BoxForOptionsSection = styled(Row)`
  height: auto;
`;

const OptionsContentBox = styled(Tab.Content)`
  width: 100%;
  overflow-y: auto;
`;

const OptionsPaneItem = styled(Tab.Pane)`

`;

export default SideBar;
