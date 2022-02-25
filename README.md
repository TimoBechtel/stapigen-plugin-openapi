<h1 align="center">
🧩
<br/>
stapigen-plugin-openapi
</h1>
<h3 align="center">A stapigen plugin that generates OpenAPI 3 definitions.</h3>
<p align="center">
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>
<p align="center">
  ·
  <a href="https://github.com/TimoBechtel/stapigen-plugin-openapi/issues">Report Bug / Request Feature</a>
  ·
</p>

## Table of Contents

- [About](#About)
- [Installation](#Install)
- [Usage](#Usage)
- [Development / Contributing](#Development-Contributing)

## About

This is a plugin for [stapigen](https://github.com/TimoBechtel/stapigen) that generates OpenAPI 3 definitions.

## Install

```sh
yarn add stapigen
yarn add stapigen-plugin-openapi
```

## Usage

Add it to the list of plugins in your `stapigen.conf.js`:

```js
const { default: pluginOpenAPI } = require('stapigen-plugin-openapi');

module.exports = {
	// ... other configuration options ...
	plugins: [
		pluginOpenAPI({
			dir: './',
			fileName: 'spec.json',
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
```

## Development / Contributing

### Run tests

```sh
yarn run test
```

### Commit messages

This project uses semantic-release for automated release versions. So commits in this project follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) guidelines. I recommend using [commitizen](https://github.com/commitizen/cz-cli) for automated commit messages.
