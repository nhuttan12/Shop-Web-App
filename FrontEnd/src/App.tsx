import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/auth/SignInForm.tsx';
import SignUp from './components/auth/SignUpForm.tsx';
import Home from './pages/Home.tsx';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/sign-in' element={<SignIn />} />
					<Route path='/sign-up' element={<SignUp />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
