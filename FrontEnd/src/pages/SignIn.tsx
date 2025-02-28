import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { notifyMessage } from '../constants/NotificationMessage';
import { Strings } from '../constants/Strings';

const SignIn: React.FC = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [usernameError, setUsernameError] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<boolean>(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let valid: boolean = true;

		if (username.trim() === '') {
			setUsernameError(true);
			valid = false;
		} else {
			setUsernameError(false);
		}
		if (password.trim() === '') {
			setPasswordError(true);
			valid = false;
		} else {
			setPasswordError(false);
		}

		if (valid) {
			console.log('Login successful');
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
					</Stack>

					<Stack
						spacing={2}
						direction='column-reverse'
						display={'flex'}
						paddingTop={'2'}
					>
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
						<Stack direction={'row'} justifyContent={'space-between'}>
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
					</Stack>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
