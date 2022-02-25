import * as fs from 'fs';
import { OpenAPIV3 } from 'openapi-types';
import { Collection } from 'stapigen/dist/collectionGenerator';
import { createFileWriter } from 'stapigen/dist/fileWriter';
import type { Plugin } from 'stapigen/dist/pluginSystem';

type PluginOptions = {
	/**
	 * file path to write the openapi specification to
	 */
	dir: string;
	fileName?: string;
	spec: Omit<OpenAPIV3.Document, 'paths'>;
};

export default function pluginOpenAPI(options: PluginOptions): Plugin {
	const write = createFileWriter('json', (data: any) =>
		JSON.stringify(data, null, 2)
	);

	const plugin: Plugin = {
		name: 'openapi',
		hooks: {
			'before:write_collections': async ({ collections }) => {
				const spec: OpenAPIV3.Document = {
					...options.spec,
					paths: createPaths(collections),
				};

				// create directory if it doesn't exist
				fs.mkdirSync(options.dir, { recursive: true });

				await write(options.dir, {
					data: spec as any,
					name: options.fileName?.replace('.json', '') || 'openapi',
				});
			},
		},
	};
	return plugin;
}

function createPaths(collections: Collection[]): OpenAPIV3.Document['paths'] {
	const paths: OpenAPIV3.Document['paths'] = {};
	collections.forEach((collection) => {
		if (collection.entrypoint) {
			// remove first or last slash
			let basePath = collection.path.replace(/^\/|\/$/g, '');

			// add leading slash if not empty
			if (basePath) basePath = `/${basePath}`;

			// get all
			paths[`${basePath}/index.json`] = {
				summary: 'Get all items',
				get: {
					responses: {
						200: {
							description: 'Success',
						},
					},
				},
			};

			// get by id
			paths[`${basePath}/{id}.json`] = {
				get: {
					summary: 'Get a single item',
					parameters: [
						{
							name: 'id',
							in: 'path',
							required: true,
							schema: {
								type: 'string',
							},
						},
					],
					responses: {
						200: {
							description: 'Success',
						},
					},
				},
			};
		}
	});
	return paths;
}
