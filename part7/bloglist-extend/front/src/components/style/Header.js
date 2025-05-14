import styled from 'styled-components'

export const Header = styled.header`
  background: #282c34;
  padding: 1em;
  display: flex;
  align-items: center;
  color: white;

  a {
    color: white;
    text-decoration: none;
    margin: 0 1em;
    font-weight: bold;

    &:hover {
      color: #09f;
    }
  }
`