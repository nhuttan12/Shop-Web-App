import SignUpForm from '../../components/auth/SignUpForm';
import PageMeta from '../../components/common/PageMeta';
import { Strings } from '../../constants/Strings';

const SignUp = () => {
	return (
		<>
			<PageMeta title={Strings.signUp} description={Strings.signUp} />
			<SignUpForm />
		</>
	);
};

export default SignUp;
