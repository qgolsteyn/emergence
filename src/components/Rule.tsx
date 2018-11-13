import * as React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  margin: 4px;
  padding: 0 4px 4px 4px;
  border: 1px black solid;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #eaeaea;
  }
`;

const StyledRow = styled.div`
  width: 100%;
  display: flex;
  margin-top: 4px;
  justify-content: space-around;
`;

const StyledSquare = styled.div`
  width: 8px;
  height: 8px;
  margin: 1px;
  border: 1px solid black;
`;

export const Rule = (props: {
  r: boolean;
  q: boolean;
  l: boolean;
  o: boolean;
  onClick: () => void;
}) => {
  return (
    <StyledWrapper onClick={props.onClick}>
      <StyledRow>
        <StyledSquare style={{ background: props.r ? "black" : "white" }} />
        <StyledSquare style={{ background: props.q ? "black" : "white" }} />
        <StyledSquare style={{ background: props.l ? "black" : "white" }} />
      </StyledRow>
      <StyledRow>
        <StyledSquare style={{ background: props.o ? "black" : "white" }} />
      </StyledRow>
    </StyledWrapper>
  );
};
