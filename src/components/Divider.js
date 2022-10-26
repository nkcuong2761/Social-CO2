import React from 'react';
import Colors from './colors';
import styled from 'styled-components';

export default Divider => {
  const Line = styled.div`
    height: 1px;
    width: 100%;
    background-color: ${props => props.color};
  `;

  return (
    <Line color={Colors.white_2}/>
  );
}