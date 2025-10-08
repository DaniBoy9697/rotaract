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
			presets: ['@vue/babel-preset-app']
		}
	},
	extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'plugin:vue/recommended', 'eslint:recommended', 'plugin:vuetify/recommended'],
	plugins: ['vue', 'vuetify'],
	// add your custom rules here
	rules: {
		semi: [2, 'never'],
		indent: ['error', 'tab'],
		'no-tabs': 0,
		'nuxt/no-cjs-in-config': 'off',
		'vue/multi-word-component-names': 0,
		'vue/html-indent': [
			'error',
			'tab',
			{
				attribute: 1,
				baseIndent: 1,
				closeBracket: 0,
				alignAttributesVertically: true,
				ignores: []
			}
		],
		'vue/html-closing-bracket-newline': [
			'error',
			{
				singleline: 'never',
				multiline: 'never'
			}
		],
		'vuetify/no-deprecated-classes': 'error',
		'import/no-named-as-default-member': 'off'
	}
}
