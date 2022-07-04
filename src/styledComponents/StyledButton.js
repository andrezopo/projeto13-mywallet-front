import styled from "styled-components";

const StyledButton = styled.button`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  font-size: ${(props) => props.fontSize}px;
  font-weight: 700;
  line-height: ${(props) => Number(props.fontSize) + 3}px;
  background-color: #a328d6;
  border: 0px solid;
  border-radius: 5px;
  color: #ffffff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default StyledButton;
