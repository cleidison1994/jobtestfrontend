import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  background: #00a5fe;
  display: flex;
`;

export const Content = styled.div`
  width: 100%;
  height: 65px;
  padding: 0px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  nav {
    display: flex;
    align-items: center;
    img {
      max-width: 180px;
      border-right: 1px solid #999;
      padding-right: 20px;
      margin-right: 20px;
    }
    a {
      color: #fff;
      font-weight: bold;
      margin-right: 30px;
      transition: color 0.2s;
      &:hover {
        color: ${darken(0.3, '#999')};
      }
    }
  }
  aside {
    display: flex;
    color: #fff;
    align-items: center;
    flex-direction: column;
    span {
      font-size: 15px;
      font-weight: bold;
      line-height: 35px;
    }
    button {
      border: 0;
      background: none;
      font-size: 15px;
      color: #de3838;
    }
  }
`;
