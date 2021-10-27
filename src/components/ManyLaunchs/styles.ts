/* eslint-disable import/prefer-default-export */
import styled from "styled-components";

export const Container = styled.div`
  header {
    display: flex;
    justify-content: space-between;
  }
  footer {
    display: flex;
    justify-content: space-between;
  }
  nav {
    ul {
      display: flex;
      justify-content: center;
      width: 100%;
      list-style-type: none;
      li {
        width: 5%;
        height: 5%;
        button {
          width: 100%;
        }
      }
    }
  }
  .launch-item {
    margin: 1em 1em;
    padding: 5px;
    border: solid 3px #5879e6;
    border-radius: 15px;
  }
`;
