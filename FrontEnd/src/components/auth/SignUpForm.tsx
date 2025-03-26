import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Button, InputAdornment, Stack, TextField } from '@mui/material';
import { Strings } from '../../constants/Strings';
import EmailIcon from '@mui/icons-material/Email';
import LockClockIcon from '@mui/icons-material/LockClock';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpSchema } from '../../schemas/SignUpSchema';
import debug from 'debug';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Endpoint } from '../../constants/Endpoint.ts';
import { env } from '../../configs/env.ts';
import { errorMessage } from '../../constants/ErrorMessage.ts';

const SignUpForm: React.FC = () => {
	const log = debug('page:SignUp');
	const navigate = useNavigate();

	//state for form's data submission
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [retypePassword, setRetypePassword] = useState<string>('');
	const [email, setEmail] = useState<string>('');

	//state for error messages
	const [retypePasswordError, setRetypePasswordError] =
		useState<boolean>(false);
	const [emailError, setEmailError] = useState<boolean>(false);
	const [usernameError, setUsernameError] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<boolean>(false);

	//state for helper text
	const [usernameHelperText, setUsernameHelperText] = useState<string>('');
	const [passwordHelperText, setPasswordHelperText] = useState<string>('');
	const [retypePasswordHelperText, setRetypePasswordHelperText] =
		useState<string>('');
	const [emailHelperText, setEmailHelperText] = useState<string>('');

	const [loading, setLoading] = useState<boolean>(false);

	//reset state error to default: false
	const resetError = () => {
		setUsernameError(false);
		setPasswordError(false);
		setEmailError(false);
		setRetypePasswordError(false);

		setUsernameHelperText('');
		setPasswordHelperText('');
		setRetypePasswordHelperText('');
		setEmailHelperText('');
	};

	const handleErrorHelperText = async (path: string, message: string) => {
		switch (path) {
			case 'username':
				setUsernameError(true);
				setUsernameHelperText(message);
				break;
			case 'email':
				setEmailError(true);
				setEmailHelperText(message);
				break;
			case 'password':
				setPasswordError(true);
				setPasswordHelperText(message);
				break;
			case 'retypePassword':
				setRetypePasswordError(true);
				setRetypePasswordHelperText(message);
				break;
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		resetError();

		//create from data get from use state
		const formData = {
			username: username.trim(),
			password: password.trim(),
			email: email.trim(),
			retypePassword: retypePassword.trim(),
		};
		log('Form data:', formData);

		//validate form data using zod
		const result = signUpSchema.safeParse(formData);
		log(`Result: ${result}`);

		//checking if any field has error, set state of error to true
		if (!result.success) {
			result.error.errors.forEach((issue) => {
				if (issue.path.includes('username')) {
					setUsernameError(true);
					setUsernameHelperText(issue.message);
				}
				if (issue.path.includes('email')) {
					setEmailError(true);
					setEmailHelperText(issue.message);
				}
				if (issue.path.includes('password')) {
					setPasswordError(true);
					setPasswordHelperText(issue.message);
				}
				if (issue.path.includes('retypePassword')) {
					setRetypePasswordError(true);
					setRetypePasswordHelperText(issue.message);
				}
			});
			return;
		}

		//call backend api
		try {
			Swal.fire({
				title: Strings.currentlySignIn,
				allowOutsideClick: false,
				didOpen: () => {
					Swal.showLoading();
				},
			});

			setLoading(true);
			const response = await axios.post(
				env.VITE_BACK_END_SERVER_URL + Endpoint.signUp,
				formData
			);
			log('Api response: ' + response.data);

			// close modal when sign in is successful
			Swal.close();

			if (response.status === 200) {
				localStorage.setItem('token', response.data.token);
				navigate('/home');
			}
		} catch (error: unknown) {
			// close modal when sign in is unsuccessful
			Swal.close();

			log('Error in sign-in: ' + error);

			let messageArray: string[] = [errorMessage.error];
			let pathArray: string[] = [];
			if (axios.isAxiosError(error) && error.response) {
				messageArray = error.response.data.message;
				pathArray = error.response.data.path;
			}

			for (let i = 0; i < messageArray.length; i++) {
				await handleErrorHelperText(pathArray[i], messageArray[i]);
			}

			await Swal.fire({
				icon: 'error',
				title: errorMessage.signUpError,
				text: messageArray.join('\n'),
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<div className='flex h-auto w-xl flex-col items-center justify-start rounded-xl bg-green-100 p-6 pb-12 shadow-2xl'>
				<div className='pb-6 text-7xl'>{Strings.signUp}</div>
				<form
					action=''
					onSubmit={handleSubmit}
					method='post'
					className='flex w-3/4 flex-col'
				>
					<Stack spacing={2}>
						<TextField
							id='outlined-basic'
							label={Strings.username}
							variant='outlined'
							value={username}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setUsername(e.target.value)
							}
							error={usernameError}
							helperText={usernameError ? usernameHelperText : ''}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<PersonIcon />
									</InputAdornment>
								),
							}}
						/>
						<TextField
							id='outlined-basic'
							label={Strings.email}
							type='email'
							variant='outlined'
							value={email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setEmail(e.target.value)
							}
							error={emailError}
							helperText={emailError ? emailHelperText : ''}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<EmailIcon />
									</InputAdornment>
								),
							}}
						/>
						<TextField
							id='outlined-password-input'
							label={Strings.password}
							type='password'
							autoComplete='current-password'
							value={password}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setPassword(e.target.value)
							}
							error={passwordError}
							helperText={passwordError ? passwordHelperText : ''}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<LockIcon />
									</InputAdornment>
								),
							}}
						/>

						<TextField
							id='outlined-password-input'
							label={Strings.retypePassword}
							type='password'
							autoComplete='current-password'
							value={retypePassword}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setRetypePassword(e.target.value)
							}
							error={retypePasswordError}
							helperText={retypePasswordError ? retypePasswordHelperText : ''}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<LockClockIcon />
									</InputAdornment>
								),
							}}
						/>
					</Stack>
					<div className='flex w-full flex-col pt-1'>
						<div className='self-end pb-1.5'>
							<span>
								<a href='/sign-in' className='hover:text-blue-500'>
									{Strings.haveAnAccount}
								</a>
							</span>
						</div>
						<Button
							variant='contained'
							sx={{
								backgroundColor: '#3B82F6',
								color: '#ffffff',
								'&:hover': {
									backgroundColor: '#2563EB',
								},
								width: '100%',
							}}
							type='submit'
							startIcon={<KeyboardTabIcon />}
						>
							{loading ? Strings.currentlySignUp : Strings.signUp}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUpForm;
