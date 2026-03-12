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
		ecmaVersion: 2020,
		ecmaFeatures: { jsx: true },
		babelOptions: {
			presets: []
		}
	},
	extends: ['eslint:recommended', 'plugin:react-hooks/recommended'],
	plugins: ['react-hooks'],
	settings: {
		react: { version: 'detect' }
	},
	rules: {
		semi: ['error', 'always'],
		indent: 'off',
		'no-tabs': 0,
		'no-undef': 'off',
		'no-unused-vars': 'off',
		'import/no-named-as-default-member': 'off'
	}
}
