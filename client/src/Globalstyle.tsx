import { createGlobalStyle } from "styled-components";

const Globalstyle = createGlobalStyle`

body{

  background-color: #4B6587;
  margin: 0;
  padding: 0;
  overflow: scroll;
  font-family: Arial, Helvetica, sans-serif;
  
  ::-webkit-scrollbar {
    display: none;
  }
}



`;

export default Globalstyle;
