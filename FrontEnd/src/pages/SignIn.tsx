import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Strings } from '../constants/Strings';
import debug from 'debug';
import { useNavigate } from 'react-router-dom';
import { signInSchema } from '../schemas/SignInSchema';

const SignIn: React.FC = () => {
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

	const resetError = () => {
		setUsernameError(false);
		setPasswordError(false);

		setUsernameHelperText('');
		setPasswordHelperText('');
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
		} else {
			log('Sign in successful');
			navigate('/home');
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

					
					<div className='w-full pt-1.5 flex flex-col'>
          <Stack direction={'row'} justifyContent={'space-between'} paddingBottom={1}>
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
						>
							{Strings.signIn}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
