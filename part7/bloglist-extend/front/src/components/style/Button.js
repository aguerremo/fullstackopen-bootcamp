import styled from 'styled-components'

export const Button = styled.button`
  background: white;
  font-size: 16px;
  cursor: pointer;
  margin: 5px;
  padding: 4px 8px;
  border: 1px solid #09f;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background: #09f;
    color: white;
  }
`