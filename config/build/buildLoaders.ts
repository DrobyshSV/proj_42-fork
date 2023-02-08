import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
	const svgLoader = {
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	};
	const fileLoader = {
		test: /\.(woff|woff2|eot|ttf|otf)$/i,
		type: 'asset/resource',
		generator: {
			filename: 'assets/fonts/[name][ext]',
		},
	};
	const cssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					modules: {
						auto: (resPath: string) =>
							Boolean(resPath.includes('.module.')),
						localIdentName: isDev
							? '[path][name][ext]'
							: '[name][ext]',
					},
				},
			},
			'sass-loader',
		],
	};

	const typescriptLoader = {
		test: /\.(tsx|ts|js)$/i,
		use: 'ts-loader',
		exclude: /node_modules/,
	};
	return [fileLoader, svgLoader, typescriptLoader, cssLoader];
}
