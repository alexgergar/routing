import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddConditional,
  handleRemoveConditional,
  handleResetConditional,
} from "../redux/actions/conditional-actions";
import { database } from "../utils/database";
import Form from "react-bootstrap/Form";
import AddConditionalButton from "./AddConditionalButton";
import ConditionalStatement from "./ConditionalStatement";
import IconSquare from "./IconSquare";

const ConditionalButtonStatus = (props) => {
  const conditionals = useSelector((state) => state.conditionals);
  const dispatch = useDispatch();
  const [routeIndex, setRouteIndex] = useState(0); // this will be the index number of the database actions
  const [andAllValue, setAndAllValue] = useState("all");

  const handleAndAllSelect = (event) => {
    setAndAllValue(event.target.value);
  };

  const handleNewRouteSelect = (event) => {
    setRouteIndex(event.target.value);
  };

  const handleNewRouteWithConditionalAdd = () => {
    console.log(conditionals);
    console.log(routeIndex);
    console.log(andAllValue);
  };
  return (
    <ConditionalColumn>
      <Form>
        <Row>
          <Title>{props.noun} meets &nbsp;</Title>
          <AndAllColumn>
            <Form.Control onChange={handleAndAllSelect} as="select" size="sm">
              <option>all</option>
              <option>any</option>
            </Form.Control>
          </AndAllColumn>

          <Title>&nbsp; condition(s):</Title>
        </Row>
        {conditionals &&
          conditionals.map((conditional, index) => (
            <ConditionalStatement data={props.data} index={index} />
          ))}
        <AddConditionalButton
          onClick={props.handleDispatchOfConditional}
          label="Add Another Condtion"
          icon="PlusCircle"
        />
        <Title>Then Route To:</Title>
        <Form.Control
          as="select"
          size="sm"
          onChange={handleNewRouteSelect}
          defaultValue={routeIndex}
        >
          {database.map((option, index) => (
            <option value={index}>{option.title}</option>
          ))}
        </Form.Control>
      </Form>
      <CenterRow>
        <AddConditionalButton
          icon="Plus"
          label="Create this Route"
          onClick={handleNewRouteWithConditionalAdd}
        />
      </CenterRow>
    </ConditionalColumn>
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const CenterRow = styled(Row)`
  justify-content: center;
  margin: 1rem 0;
`;

const ConditionalColumn = styled.div`
  padding: 20px;
  flex-grow: 1;
`;

const AndAllColumn = styled.div`
  flex-direction: column;
  width: 25%;
  margin-bottom: 0.5rem;
`;

const Title = styled.h6`
  align-self: center;
`;

export default ConditionalButtonStatus;
