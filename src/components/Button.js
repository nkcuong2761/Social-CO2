import React, { Children } from 'react';
import Colors from './colors';
import styled from 'styled-components';
import Typography from './typography';
import {ReactComponent as ChartLine} from '../assets/icons/ChartLine.svg';

const Button = ({variant, type, onClick, children}) => {

  if (variant == 'icon-only') {
    return (
      <button
        onClick={onClick}
        type={type}
        style={{
          width: "24px",
          height: "24px",
          background: "none",
          border: "none",
          padding: "0px"
        }}>
        {children}
      </button>
    )
  } else if (variant == 'with-icon') {
    return (
      <button
        onClick={onClick}
        type={type}
        style={{
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
          zIndex: "100",
          border: "0"
        }}>
        {children}
      </button>
    );
  } else {
    return (
      <button>đmm specify variant đi đã</button>
    )
  }
}

export default Button;