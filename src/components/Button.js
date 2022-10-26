import React from 'react';
import Colors from './colors';
import styled from 'styled-components';
import Typography from './typography';
import {ReactComponent as ChartLine} from '../assets/icons/ChartLine.svg';

const Button = ({icon, value, onClick}) => {
  const Container = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 20px;
    gap: 8px;
    width: 12.5rem;
    background: ${props => props.color};
    border-radius: 8px;
    z-index: 100;
  `;
  
  if (icon === undefined) {
    return (
      <button
        onClick={onClick}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "12px 20px",
          gap: "8px",
          width: "12.5rem",
          background: Colors.primary,
          borderRadius: "8px",
          zIndex: "100",
          border: "0"
        }}>
        <Typography variant='subtitle1' color='white'>{value}</Typography>
      </button>
    );
  } else {
    return (
      <button
        onClick={onClick}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "12px 20px",
          gap: "8px",
          width: "12.5rem",
          background: Colors.primary,
          borderRadius: "8px",
          zIndex: "100",
          border: "0"
        }}>
        <ChartLine/>
        <Typography variant='h4' color='white'>{value}</Typography>
      </button>
    )
  }
}

export default Button;