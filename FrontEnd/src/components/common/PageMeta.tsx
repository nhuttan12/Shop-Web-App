import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const PageMeta: React.FC<{
	title: string;
	description: string;
}> = ({ title, description }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
		</Helmet>
	);
};

export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
	<HelmetProvider>{children}</HelmetProvider>
);

export default PageMeta;
