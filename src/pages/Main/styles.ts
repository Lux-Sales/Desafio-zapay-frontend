/* eslint-disable import/prefer-default-export */
import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
  color: #ffffff;
  background: url("background.jpg") no-repeat center;
  background-size: cover;
  h1 {
    text-align: center;
  }
  .mdc-tab-scroller__scroll-content {
    display: flex;
    justify-content: space-between;
  }
  button {
    height: 50px;
    width: 300px;
    color: #fff;
    border-radius: 5px;
    background-color: #3b3737;
  }
  button:disabled {
    background-color: ${shade("0.8", "#3b3737")};
  }
  a {
    text-decoration: none;
    color: #788ff3;
  }
`;
