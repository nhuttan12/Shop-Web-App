import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/auth/SignInForm.tsx';
import SignUp from './components/auth/SignUpForm.tsx';
import { paths } from './constants/Path.ts';
import Home from './pages/home/Home.tsx';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route index path={paths.home} element={<Home />} />
					<Route path={paths.signIn} element={<SignIn />} />
					<Route path={paths.signUp} element={<SignUp />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
