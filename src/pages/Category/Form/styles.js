import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 920px;
  margin: 40px auto;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;
export const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    > span {
      font-size: 25px;
      font-weight: bold;
      color: #fff;
    }
  }
  div {
    display: flex;

    > button {
      display: flex;
      align-items: center;
      border: 0;
      color: #fff;
      border-radius: 4px;
      background: #999;
      width: 130;
      padding: 8px 20px;
      margin: 0 0 0 25px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.1, '#999')};
      }
      & + button {
        background: #00a5fe;
        transition: background 0.2s;
        &:hover {
          background: ${darken(0.1, '#7159c1')};
        }
      }
    }
  }
`;
export const ContentForm = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  padding: 20px 30px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  div {
    display: flex;
    justify-content: center;

    & + div {
      display: flex;
      flex-direction: column;
    }
    span {
      font-size: 15px;
      font-weight: bold;
      margin: 5px 0;
      color: #fff;
    }
    input {
      font-size: 16px;
      padding: 10px 5px;
      margin: 0 0 5px 0;
      background: rgba(0, 0, 0, 0.3);
      border: 0;
      color: #fff;

      &::placeholder {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
`;
