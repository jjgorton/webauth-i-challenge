// import React from 'react';
import styled, { css } from 'styled-components';

export const LoginContainer = styled.div`
	background: rgb(235, 235, 235);
	display: flex;
	justify-content: space-evenly;
	height: 500px;
	width: 100%;
`;

export const LoginBox = styled.div`
	margin-top: 10%;
	background: rgba(1, 20, 61, 0.822);
	border-radius: 10px;
	border: 2px solid gray;
	box-shadow: -2px -2px 15px rgb(68, 68, 68);
	width: 550px;
	height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	flex-wrap: wrap;
`;

export const Form = styled.form`
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-direction: column;
	flex-wrap: wrap;
	width: 60%;
	height: 70%;
`;

export const Input = styled.input`
	width: 70%;
	height: 25px;
	text-align: center;
	border-radius: 10px;
	font-size: 18px;
`;

export const LoginButton = styled.button`
	width: 45%;
	height: 45px;
	font-size: 20px;
	background: rgb(1, 6, 145);
	color: white;
	border: 1px solid blue;
	border-radius: 5px;
`;

// export { LoginContainer, LoginBox };
// export default LoginContainer;
// export default LoginBox;
