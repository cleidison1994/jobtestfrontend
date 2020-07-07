import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: relative;
`;

export const Badge = styled.button`
  border: 0;
  background: none;
  margin-left: calc(50% - 8px);
`;
export const MoreOptions = styled.div`
  position: absolute;
  background: #fff;
  z-index: 1;
  width: 150px;
  display: ${(props) => (props.visibility ? 'flex' : 'none')} !important;
  flex-direction: column;
  border-radius: 4px;
  white-space: nowrap;
  margin-top: 5px;
  top: 20px;
  left: calc(50% - 40px);
  padding: 5px 10px;
  border: 0.5px solid #eee;
  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 8px);
    top: -8px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #eee;
  }
  div {
    width: 100%;
    padding: 10px 0;
    & + div {
      border-top: 1px solid #eee;
    }
    button {
      border: 0;
      background: none;
      display: flex;
      align-items: center;
      svg {
        margin-right: 5px;
      }
    }
  }
`;
