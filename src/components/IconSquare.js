import React from "react";
import styled from "styled-components";
import {
  Eye,
  Zap,
  Clock,
  AlertOctagon,
  Database,
  Terminal,
  X,
  User,
  Settings,
  Save,
  Calendar,
  PhoneIncoming,
  Share2,
  Plus,
  PlusCircle,
  MinusCircle,
  AlertTriangle,
} from "react-feather";

const IconSquare = (props) => {
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
      case "X":
        return <X color={iconColor} size={props.size * (2 / 3)} />;
      case "User":
        return <User color={iconColor} size={props.size * (2 / 3)} />;
      case "Settings":
        return <Settings color={iconColor} size={props.size * (2 / 3)} />;
      case "Save":
        return <Save color={iconColor} size={props.size * (2 / 3)} />;
      case "Calendar":
        return <Calendar color={iconColor} size={props.size * (2 / 3)} />;
      case "PhoneIncoming":
        return <PhoneIncoming color={iconColor} size={props.size * (2 / 3)} />;
      case "Share2":
        return <Share2 color={iconColor} size={props.size * (2 / 3)} />;
      case "PlusCircle":
        return <PlusCircle color={iconColor} size={props.size * (2 / 3)} />;
      case "Plus":
        return <Plus color={iconColor} size={props.size * (2 / 3)} />;
      case "MinusCircle":
        return <MinusCircle color={iconColor} size={props.size * (2 / 3)} />;
      case "AlertTriangle":
        return <AlertTriangle color={iconColor} size={props.size * (2 / 3)} />;
      default:
        break;
    }
  };

  return (
    <>
      {props.showBackground ? (
        <Wrapper
          backgroundColor={props.backgroundColor}
          size={props.size}
          onClick={props.onClick}
          style={props.style}
        >
          <IconBlock />
        </Wrapper>
      ) : (
        <JustIconWrapper onClick={props.onClick} style={props.style}>
          <IconBlock />
        </JustIconWrapper>
      )}
    </>
  );
};
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

const JustIconWrapper = styled.div``;

IconSquare.defaultProps = {
  showBackground: true,
};

export default IconSquare;
