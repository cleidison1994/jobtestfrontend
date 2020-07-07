import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1050px;
  margin: 50px auto;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  > span {
    font-size: 25px;
    font-weight: bold;
    color: #fff;
  }
`;

export const ContentHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 25px 0;
  form {
    width: 330px;
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 4px;
    input {
      width: 100%;
      border: 0;
      padding: 0 10px;
      background: #fff;
      color: #333;
      &::placeholder {
        color: #333;
      }
    }
  }
  button {
    border: 0;
    background: #00a5fe;
    color: #fff;
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 0 8px;
    height: 35px;
  }
`;
export const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    color: #fff;
    padding: 5px 5px;
    border: 0;
    font-size: 12px;
    background: #00a5fe;
    border-radius: 4px;

    & + button {
      margin-left: 5px;
    }
  }
`;
export const ButtonMark = styled.button`
  color: #fff;
  padding: 2px 5px;
  border: 0;
  background: #00a5fe;
  border-radius: 4px;
  font-size: 12px;

  & + button {
    margin-left: 5px;
  }
`;

export const ButtonFilterCategory = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  span {
    color: #fff;
    margin-bottom: 5px;
    text-align: left;
  }
`;
export const ButtonFilterMark = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  span {
    color: #fff;
    text-align: right;
    margin-bottom: 5px;
  }
`;

export const ContentList = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-collapse: separate !important;
  border-spacing: 0 20px !important;
  thead th {
    text-align: left;
    color: #fff;
    padding: 0 10px;
    &:last-child {
      text-align: right;
    }
  }
  tbody td {
    background: #fff;
    height: 50px;
    font-size: 16px;
    padding: 0 10px;
    &:first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    &:last-child {
      text-align: right;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
`;

export const TableLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: #7159c1;
    font-size: 20px;
  }
`;
