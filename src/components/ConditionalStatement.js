import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import IconSquare from "./IconSquare";
import {
  handleUpdateConditional,
  handleRemoveConditional,
  handleResetConditional,
} from "../redux/actions/menu-actions";
import { useDispatch, useSelector } from "react-redux";
import { database } from "../utils/database";

const ConditionalStatement = (props) => {
  let dispatch = useDispatch();

  const conditionals = useSelector((state) => state.menu.conditionals);
  const [questionValue, setQuesitonValue] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(null);
  const [conditionValue, setConditionValue] = useState(null);
  const [answerValue, setAnswerValue] = useState(null);

  useEffect(() => {
    let indexOfQuestion = props.data.findIndex(
      (x) => x.question === conditionals[props.index].question
    );
    console.log(conditionals);
    setQuesitonValue(conditionals[props.index].question);
    console.log(`Question: ${conditionals[props.index].question}`);
    setQuestionIndex(indexOfQuestion);
    console.log(`Index of questionQuestion: ${indexOfQuestion}`);
    setConditionValue(conditionals[props.index].condition);
    console.log(`Condition: ${conditionals[props.index].condition}`);
    setAnswerValue(conditionals[props.index].answer);
    console.log(`Answer: ${conditionals[props.index].answer}`);
  }, [conditionals, props.data, props.index]);

  const handleQuestionSelect = (event) => {
    setQuesitonValue(event.target.value);
    dispatch(
      handleUpdateConditional(props.index, {
        question: event.target.value,
        condition: conditionValue,
        answer: answerValue,
      })
    );
  };

  const handleConditionSelect = (event) => {
    setConditionValue(event.target.value);

    dispatch(
      handleUpdateConditional(props.index, {
        question: questionValue,
        condition: event.target.value,
        answer: answerValue,
      })
    );
  };

  const handleAnswerSelect = (event) => {
    console.log(event.target.value);
    setAnswerValue(event.target.value);
    dispatch(
      handleUpdateConditional(props.index, {
        question: questionValue,
        condition: conditionValue,
        answer: event.target.value,
      })
    );
  };

  const handleRemoveConditionalClick = () => {
    dispatch(handleRemoveConditional(props.index));
  };

  return (
    <Form.Group>
      {questionValue && (
        <Row>
          <RemoveIconColumn>
            <IconSquare
              showBackground={false}
              icon="MinusCircle"
              size={30}
              color={"black"}
              onClick={handleRemoveConditionalClick}
            />
          </RemoveIconColumn>
          <Column>
            <Row>
              <Form.Control
                as="select"
                onChange={handleQuestionSelect}
                size="sm"
                defaultValue={questionValue}
                value={questionValue}
              >
                {props.data.map((option, index) => (
                  <option>{option.question}</option>
                ))}
              </Form.Control>
              <ColumnSpacer />
              <ConditionalColumn>
                <Form.Control
                  onChange={handleConditionSelect}
                  as="select"
                  size="sm"
                  defaultValue={conditionValue}
                  value={conditionValue}
                >
                  <option>is</option>
                  <option>is not</option>
                </Form.Control>
              </ConditionalColumn>
            </Row>

            <RowSpacer />
            <Form.Control
              as="select"
              size="sm"
              defaultValue={answerValue}
              value={answerValue}
              onChange={handleAnswerSelect}
            >
              {props.data[questionIndex].answer.map((option) => (
                <option>{option}</option>
              ))}
            </Form.Control>
          </Column>
        </Row>
      )}
    </Form.Group>
  );
};

const RowSpacer = styled.div`
  height: 5px;
  width: 100%;
`;

const ColumnSpacer = styled.div`
  width: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const ConditionalColumn = styled(Column)`
  width: 35%;
`;

const RemoveIconColumn = styled(Column)`
  width: 10%;
  align-self: center;
`;

export default ConditionalStatement;
