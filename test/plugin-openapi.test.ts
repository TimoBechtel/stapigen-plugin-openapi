jest.mock('fs');

import { fs, vol } from 'memfs';
import { generateApi } from 'stapigen';
import type { Config } from 'stapigen/dist/config';
import pluginOpenAPI from '../src/';

const testDir = 'test';

beforeEach(() => {
	vol.mkdirSync(testDir, { recursive: true });
	vol.fromJSON(
		{
			'2020/file.md': 'file without a month + day',
			'2020/04/10/lorem.md': '',
			'2020/04/13/randomNotes.md': '',
			'2020/04/13/thoughts.md': '',
		},
		'test/example/input'
	);
});

afterEach(() => {
	vol.reset();
});

test('creates an openapi specification from stapigen collections', async () => {
	const config: Config = {
		input: {
			dir: 'test/example/input',
			schema: ':year/:month/:day',
		},
		output: {
			dir: testDir,
			schema: ':month/:day/',
		},
		parser: [
			{
				extensions: ['.md'],
				parse: ({ content }) => ({ text: content }),
			},
		],
		plugins: [
			pluginOpenAPI({
				dir: testDir,
				spec: {
					info: {
						title: 'Test',
						version: '1.0.0',
					},
					openapi: '3.0.0',
				},
			}),
		],
	};

	await generateApi(config);

	expect(fs.existsSync(`${testDir}/openapi.json`)).toBe(true);
	expect(fs.readFileSync(`${testDir}/openapi.json`, 'utf8')).toMatchSnapshot();
});
