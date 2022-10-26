import React from 'react';
import Colors from './colors';
import styled from 'styled-components';
import Typography from './typography';
import {ReactComponent as ChartLine} from '../assets/icons/ChartLine.svg';

const Button = ({icon, value}) => {
  const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 20px;
    gap: 8px;
    width: 12.5rem;
    background: ${props => props.color};
    border-radius: 8px;
  `;
  
  if (icon === undefined) {
    return (
      <Container color={Colors.primary}>
        <Typography variant='subtitle1' color='white'>{value}</Typography>
      </Container>
    );
  } else {
    return (
      <Container color={Colors.primary}>
        <ChartLine/>
        <Typography variant='h4' color='white'>{value}</Typography>
      </Container>
    )
  }
}

export default Button;