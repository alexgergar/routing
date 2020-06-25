import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import IconSquare from "./IconSquare";
import {
  handleUpdateConditional,
  handleRemoveConditional,
  handleResetConditional,
} from "../redux/actions/conditional-actions";
import { useDispatch, useSelector } from "react-redux";

const ConditionalStatement = (props) => {
  let dispatch = useDispatch();
  const conditionals = useSelector((state) => state.conditionals);
  const [questionValue, setQuesitonValue] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(null);
  const [conditionValue, setConditionValue] = useState(null);
  const [answerValue, setAnswerValue] = useState(null);

  useEffect(() => {
    let indexOfQuestion = props.data.findIndex(
      (x) => x.question === conditionals[props.index].question
    );
    setQuesitonValue(conditionals[props.index].question);
    setQuestionIndex(indexOfQuestion);
    setConditionValue(conditionals[props.index].andAllValue);
    setAnswerValue(conditionals[props.index].answer);
  }, [conditionals, props.data, props.index]);

  const handleQuestionSelect = (event) => {
    setQuesitonValue(event.target.value);
    conditionals[props.index] = {
      question: event.target.value,
      andAllValue: conditionValue,
      answer: answerValue,
    };
    dispatch(handleUpdateConditional(conditionals, props.index));
  };

  const handleConditionSelect = (event) => {
    setConditionValue(event.target.value);
    dispatch(
      handleUpdateConditional(props.index, {
        question: questionValue,
        andAllValue: event.target.value,
        answer: answerValue,
      })
    );
  };

  const handleAnswerSelect = (event) => {
    setAnswerValue(event.target.value);
    dispatch(
      handleUpdateConditional(props.index, {
        question: questionValue,
        andAllValue: conditionValue,
        answer: event.target.value,
      })
    );
  };

  const handleRemoveConditionalClick = () => {
    console.log(props.index);
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
                >
                  <option>is</option>
                  <option>is not</option>
                </Form.Control>
              </ConditionalColumn>
            </Row>

            <RowSpacer />
            <Form.Control as="select" size="sm" defaultValue={answerValue}>
              {props.data[questionIndex].answer.map((option) => (
                <option onChange={handleAnswerSelect}>{option}</option>
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
