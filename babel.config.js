module.exports = {
	presets: [["@10up/babel-preset-default", { wordpress: true }]],
	plugins: [
		process.env.NODE_ENV === "production" && [
			"babel-plugin-react-remove-properties",
			{ properties: ["data-testid"] },
		],
	].filter(Boolean),
};
