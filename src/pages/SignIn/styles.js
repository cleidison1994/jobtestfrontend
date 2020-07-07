import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 10px;
  border-radius: 4px;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    span {
      text-align: left;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
    }
    input {
      margin: 10px 0;
      padding: 10px 10px;
      font-size: 16px;
      background: rgba(0, 0, 0, 0.3);
      border: 0;
      color: #fff;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }
    button {
      margin-top: 10px;
      padding: 10px 10px;
      background: #005bf9;
      border: 0;
      border-radius: 4px;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
    }
  }
  a {
    margin-top: 10px;
    font-size: 15px;
    font-weight: bold;
    color: #fff;
  }
`;
export const ContentLogo = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 10px;
  span {
    color: #00a5fe;
    font-size: 25px;
    margin-right: 15px;
  }
`;
