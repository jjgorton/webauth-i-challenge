import React from 'react';
import axios from 'axios';

import { LoginContainer, LoginBox, Form, Input, LoginButton } from './LoginStyle';
// import { Logo, H2 } from '../SearchBar/SearchBarStyle';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username : '',
			password : ''
		};
	}

	handleChanges = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	login = (e) => {
		console.log('login');
		localStorage.setItem(this.state.username, this.state.password);
		axios
			.post('http://localhost:5000/api/register', this.state)
			.then((res) => {
				res.send('Registered');
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	render() {
		return (
			<LoginContainer>
				{/* <Logo>
					<i className="fab fa-instagram" />
					<H2>Instragram</H2>
				</Logo> */}
				<LoginBox>
					<Form onSubmit={this.login}>
						<Input
							type="text"
							placeholder="Username"
							value={this.state.username}
							name="username"
							onChange={this.handleChanges}
						/>

						<Input
							type="text"
							placeholder="Password"
							value={this.state.password}
							name="password"
							onChange={this.handleChanges}
						/>

						<LoginButton>Login</LoginButton>
					</Form>
				</LoginBox>
			</LoginContainer>
		);
	}
}

export default Login;
