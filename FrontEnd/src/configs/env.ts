import { config } from 'dotenv-safe';
import { join } from 'path';

config({
	path: join(process.cwd(), '.env'),
	example: join(process.cwd(), '.env.example'),
	allowEmptyValues: true,
});

export const env = {
	//Application configuration
	VITE_STATUS: import.meta.env.VITE_STATUS!,
	VITE_SERVER_PORT: Number(import.meta.env.VITE_SERVER_PORT!),
	VITE_SERVER_URL: import.meta.env.BACK_END_SERVER_URL!,
};
