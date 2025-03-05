import PageBreadcrumb from '../components/common/PageBreadcrumb';
import PageMeta from '../components/common/PageMeta';
import UserAddressCard from '../components/UserProfile/UserAddressCard';
import UserInfoCard from '../components/UserProfile/UserInfoCard';
import UserMetaCard from '../components/UserProfile/UserMetaCard';
import { Strings } from '../constants/Strings';

const UserProfile = () => {
	return (
		<>
			<PageMeta title={Strings.userProfile} description={Strings.userProfile} />
      <PageBreadcrumb pageTitle={Strings.userProfile} />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard />
          <UserInfoCard />
          <UserAddressCard />
        </div>
      </div>
		</>
	);
};

export default UserProfile;
