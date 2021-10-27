/* eslint-disable import/prefer-default-export */
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  header {
    display: flex;
    align-items: center;
  }
  img {
    width: 250px;
  }

  .header-item {
    margin: 10px;
  }
  body {
    display: flex;
    flex-direction: column;
    width: 100%;
    span {
      margin: 5px;
    }
    .detailDiv {
      margin: 5px;
    }
  }
  footer {
    display: flex;
    flex-direction: column;
    justify-content: left;
    width: 100%;
  }
`;
