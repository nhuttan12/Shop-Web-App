import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import debug from 'debug';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import { Strings } from '../../constants/Strings';
import { signInSchema } from '../../schemas/SignInSchema';
import { env } from '../../configs/env';
import { Endpoint } from '../../constants/Endpoint';
import { errorMessage } from '../../constants/ErrorMessage';

const SignInForm: React.FC = () => {
	const log = debug('page:SignIn');
	const navigate = useNavigate();
	//state for form's data submission
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	//state for error messages
	const [usernameError, setUsernameError] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<boolean>(false);

	//state for helper text
	const [usernameHelperText, setUsernameHelperText] = useState<string>('');
	const [passwordHelperText, setPasswordHelperText] = useState<string>('');

	const [loading, setLoading] = useState<boolean>(false);

	const resetError = () => {
		setUsernameError(false);
		setPasswordError(false);

		setUsernameHelperText('');
		setPasswordHelperText('');
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		resetError();

		//create from data get from use state
		const formData = {
			username: username.trim(),
			password: password.trim(),
		};
		log('Form data:', formData);

		//validate form data using zod
		const result = signInSchema.safeParse(formData);
		log(`Result: ${result}`);

		//checking if any field has error, set state of error to true
		if (!result.success) {
			result.error.errors.forEach((issue) => {
				if (issue.path.includes('username')) {
					setUsernameError(true);
					setUsernameHelperText(issue.message);
				}
				if (issue.path.includes('password')) {
					setPasswordError(true);
					setPasswordHelperText(issue.message);
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
				env.VITE_BACK_END_SERVER_URL + Endpoint.signIn,
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

			let message = errorMessage.error;
			if (axios.isAxiosError(error) && error.response) {
				message = error.response.data.message;
			}

			Swal.fire({
				icon: 'error',
				title: errorMessage.signInError,
				text: message,
			});

			setUsernameError(true);
			setUsernameHelperText(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<div className='flex h-auto w-xl flex-col items-center justify-start rounded-xl bg-green-100 p-6 pb-12 shadow-2xl'>
				<div className='pb-6 text-7xl'>{Strings.signIn}</div>
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
					</Stack>

					<div className='flex w-full flex-col pt-1.5'>
						<Stack
							direction={'row'}
							justifyContent={'space-between'}
							paddingBottom={1}
						>
							<div className='self-start'>
								<span>
									<a href='/sign-up' className='hover:text-blue-500'>
										{Strings.signUp}
									</a>
								</span>
							</div>
							<div className='self-end'>
								<span>
									<a href='#' className='hover:text-blue-500'>
										{Strings.forgotPassword}
									</a>
								</span>
							</div>
						</Stack>
						<Button
							variant='contained'
							sx={{
								backgroundColor: '#3B82F6',
								color: '#ffffff',
								'&:hover': {
									backgroundColor: '#2563EB',
								},
							}}
							type='submit'
							startIcon={<KeyboardTabIcon />}
              disabled={loading}
						>
							{loading? Strings.currentlySignIn : Strings.signIn}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignInForm;
