import styled from "styled-components";

export const Container = styled.div`
  width: 290px;
  height: 90px;
  padding: 10px;
  border-radius: 5px;
  background: ${(props) => (props.actived ? "#EE6B26" : "#20295f")};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  transition: all 0.3s ease;

  img {
    width: 25px;
    height: 25px;
  }

  span {
    color: #fff;
    font-weight: bold;
    align-self: flex-end;
    font-size: 18px;
  }

  &:hover {
    background-color: #ee6b26;
  }
`;
