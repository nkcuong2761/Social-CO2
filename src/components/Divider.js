import React from 'react';
import Colors from './colors';
import styled from 'styled-components';

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${props => props.color};
`;

export default Divider => {
  return (
    <Line color={Colors.white_2}/>
  );
}