import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.button`
  width: 100%;
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  font-size: 14px;
  background-color: ${props => props.theme.blueColor};
  text-align: center;
  padding: 7px 0px;
  cursor: pointer;
`;

const Button = ({ text }) => <Container>{text}</Container>;

Button.propTypes = {
  text: PropTypes.string.isRequired
};

export default Button;
