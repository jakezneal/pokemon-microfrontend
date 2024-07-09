const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');

module.exports = (webpackConfigEnv, argv) => {
    const defaultConfig = singleSpaDefaults({
        orgName: 'kinetic',
        projectName: 'pokemon',
        webpackConfigEnv,
        argv,
    });

    const standalonePlugin = defaultConfig.plugins.find((p) => p.constructor.name === 'StandaloneSingleSpaPlugin');

    standalonePlugin.options.importMapUrl = new URL('https://react.microfrontends.app/importmap.json');

    const externals = [/^rxjs\/?.*$/];

    if (webpackConfigEnv.standalone) {
        externals.push('react', 'react-dom');
    }

    return merge(defaultConfig, {
        // customizations go here
        externals,
    });
};
