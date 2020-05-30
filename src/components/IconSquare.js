import React from 'react'
import styled from "styled-components";
import {Eye, Zap, Clock, AlertOctagon, Database, Terminal} from "react-feather";


const IconSquare = props => {
  const iconColor = props.color ? props.color : "#7D7D7D";
  const IconBlock = () => {
    switch (props.icon) {
      case "Eye":
        return <Eye color={iconColor} size={props.size * (2 / 3)} />;
      case "Zap":
        return <Zap color={iconColor} size={props.size * (2 / 3)} />;
      case "Clock":
        return <Clock color={iconColor} size={props.size * (2 / 3)} />;
      case "Alert":
        return <AlertOctagon color={iconColor} size={props.size * (2 / 3)} />;
      case "Database":
        return <Database color={iconColor} size={props.size * (2 / 3)} />;
      case "Terminal":
        return <Terminal color={iconColor} size={props.size * (2 / 3)} />;
      default:
        break;
    }
  }

  return (
    <>
      {props.showBackground ? (
        <Wrapper backgroundColor={props.backgroundColor} size={props.size}>
          <IconBlock />
        </Wrapper>
      ) : (
        <JustIconWrapper>
          <IconBlock />
        </JustIconWrapper>
      )}
    </>
  );
}
const Wrapper = styled.div`
  border-radius: 5px;
  height: ${(props) => (props.size ? props.size + "px" : "36px")};
  width: ${(props) => (props.size ? props.size + "px" : "36px")};
  background-color: ${(props) =>
    props.background ? props.background : "#F1F4FC"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const JustIconWrapper = styled.div`

`

IconSquare.defaultProps = {
  showBackground: true,
}

export default IconSquare
