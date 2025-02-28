import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Button, InputAdornment, Stack, TextField } from '@mui/material';
import { Strings } from '../constants/Strings';
import EmailIcon from '@mui/icons-material/Email';
import LockClockIcon from '@mui/icons-material/LockClock';
import { notifyMessage } from '../constants/NotificationMessage';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { errorMessage } from '../constants/ErrorMessage';
import { signInSchema } from '../schemas/SignUpSchema';
import logger from '../utils/logger';

const SignUp: React.FC = () => {
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

	//reset state error to default: false
	const resetError = () => {
		setUsernameError(false);
		setPasswordError(false);
		setEmailError(false);
		setRetypePasswordError(false);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		resetError();

		//create from data get from use state
		const formData = {
			username: username.trim(),
			password: password.trim(),
			email: email.trim(),
			retypePassword: retypePassword.trim(),
		};
		logger.debug('Form data:', formData);

		//validate form data using zod
		const result = signInSchema.safeParse(formData);
		logger.debug(`Result: ${result}`);

		//checking if any field has error, set state of error to true
		if (!result.success) {
			result.error.errors.forEach((issue) => {
				if (issue.path.includes('username')) {
					setUsernameError(true);
				}
				if (issue.path.includes('email')) {
					setEmailError(true);
				}
				if (issue.path.includes('password')) {
					setPasswordError(true);
				}
				if (issue.path.includes('retypePassword')) {
					setRetypePasswordError(true);
				}
			});
		} else {
			logger.silly('Logging successful');
			navigate('/sign-in');
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
							helperText={
								usernameError ? notifyMessage.pleaseFillInUsername : ''
							}
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
							helperText={emailError ? notifyMessage.pleaseFillINEmail : ''}
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
							helperText={
								passwordError ? notifyMessage.plaeseFillINPassword : ''
							}
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
							helperText={
								retypePasswordError
									? errorMessage.retypePasswordHaveToSamePassword
									: ''
							}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<LockClockIcon />
									</InputAdornment>
								),
							}}
						/>
					</Stack>
					<div className='w-full pt-3'>
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
							Đăng ký
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
