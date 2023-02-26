import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1{
    color: #EE6B26;
  }

  p{
    color: #20295f;
    font-weight: bold;
  }

`;

export const QrCodeArea = styled.div`
  width: 100%;
  height: 400px;
  background-color: red;
`;