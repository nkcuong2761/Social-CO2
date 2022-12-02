import React, { Children } from 'react';
import Colors from './colors';
import styled from 'styled-components';
import Typography from './typography';
import {ReactComponent as ChartLine} from '../assets/icons/ChartLine.svg';

const Button = ({variant, type, onClick, children, width, height, className}) => {
  if (variant == 'icon-only') {
    return (
      <button
        className={className}
        onClick={onClick}
        type={type}
        style={{
          zIndex: 100,
          cursor: 'pointer',
          width: width,
          height: height,
          background: "none",
          border: "none",
          padding: "0px"
        }}>
        {children}
      </button>
    )
  } else {
    return (
      <button
        className={className}
        onClick={onClick}
        type={type}
        style={{
          cursor: 'pointer',
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignSelf: "stretch",
          alignItems: "center",
          padding: "12px 20px",
          gap: "8px",
          width: "12.5rem",
          background: Colors.primary,
          borderRadius: "8px",
          zIndex: 100,
          border: "0"
        }}>
        {children}
      </button>
    );
  }
}

export default Button;
