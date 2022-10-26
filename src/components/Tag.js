import React from 'react';
import Colors from './colors';
import styled from 'styled-components';
import Typography from './typography';

const Tag = ({value}) => {
  const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 2px 6px;
    background: ${props => props.color};
    border-radius: 8px;
  `;
  return (
    <Container color={Colors.white_3}>
      <Typography variant='subtitle1'>{value}</Typography>
    </Container>
  );
}

export default Tag;