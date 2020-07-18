import styled, { createGlobalStyle } from 'styled-components';
import BGImage from './assets/fog.jpg';

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    background-image: url(${BGImage});
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }
  * {
    font-family: 'Fira Sans', sans-serif;
    box-sizing: border-box;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > p {
    color: #fff;
  }
  .score {
    color: white;
    font-size: 2rem;
    margin-bottom: 32px;
    margin-top: 16px;
  }
  h1 {
    font-family: 'Roboto', cursive;
    background-image: linear-gradient(180deg, #87f1ff, #87f1ff);
    font-weight: 400;
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 52px;
    text-align: center;
    margin: 20px;
  }
  .start, .next {
    cursor: pointer;
    background: linear-gradient(to right, #00d2ff,#72bcd4);
    border: 2px solid #286c82;
    padding: 16px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    height: 80px;
    margin: 20px 0;
    padding: 0 40px;
    width: 300px;
    color: #fff;
    font-size: 20px;
  }
`;