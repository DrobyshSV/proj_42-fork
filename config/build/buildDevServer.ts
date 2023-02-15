import { BuildOptions } from './types';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
export function buildDevServer(options: BuildOptions): DevServerConfiguration {
	return {
		port: options.port,
		open: true,
		historyApiFallback: true,
		hot: true,
		devMiddleware: {
			index: 'index.html',
			writeToDisk: true,
		},
	};
}
