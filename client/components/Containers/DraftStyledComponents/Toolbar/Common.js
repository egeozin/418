import styled from 'styled-components';

export const ToolbarItem = styled.div`
  width: 40px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  box-shadow: 0px 1px 11px 1px rgba(15, 15, 15, 0.2);
  background-color: #34495e;
  color: #fff;
  font-size: 16px;
  transition: all 250ms ease-in-out;
  cursor: pointer;
  ${(props) =>
    props.isActive &&
    `    transform: translateY(1px);
    color: #34495e;
    background-color: transparent;
    box-shadow: none;
    border: 1px solid #34495e;`}
  &:hover {
    transform: translateY(1px);
    color: #34495e;
    background-color: transparent;
    box-shadow: none;
    border: 1px solid #34495e;
  }
`;

export const Container = styled.div`
  display: flex;
  margin-right: 7px;
`;
