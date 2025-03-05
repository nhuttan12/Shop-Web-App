import SignInForm from '../../components/auth/SignInForm';
import PageMeta from '../../components/common/PageMeta';
import { Strings } from '../../constants/Strings';

const name = () => {
	return (
		<>
			<PageMeta title={Strings.signIn} description={Strings.signIn} />
			<SignInForm />
		</>
	);
};

export default name;
