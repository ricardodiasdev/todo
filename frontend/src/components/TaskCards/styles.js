import styled from "styled-components";

export const Container = styled.div`
  width: 250px;
  height: 200px;
  box-shadow: 0px 9px 34px -4px rgba(0, 0, 0, 0.75);
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.done ? 0.5 : 1)};

  &:hover{
    opacity: 0.9;
    box-shadow: none;
  }
`;

export const TopCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const BottomCard = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;

  strong {
    font-weight: bold;
    color: #ee6b26;
  }

  span {
    color: #707070;
  }
`;
