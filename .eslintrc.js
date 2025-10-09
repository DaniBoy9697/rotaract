module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: '@babel/eslint-parser',
		sourceType: 'module',
		requireConfigFile: false,
		babelOptions: {
			presets: []
		}
	},
	extends: ['eslint:recommended'],
	// add your custom rules here
	rules: {
		semi: [2, 'never'],
		indent: ['error', 'tab'],
		'no-tabs': 0,
		'import/no-named-as-default-member': 'off'
	}
}
