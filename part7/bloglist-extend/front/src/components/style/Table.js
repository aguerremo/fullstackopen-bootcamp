import styled from 'styled-components'

export const Table = styled.table`
  width: 50%;
  border-collapse: collapse;
  margin: 1em 0;

  th, td {
    border: 1px solid #ddd;
    padding: 3px;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`