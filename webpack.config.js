var Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .addEntry('app', './assets/js/app.js')
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .enableReactPreset()
    .configureBabel(function (babelConfig) {
        babelConfig.plugins = [
            "@babel/plugin-proposal-object-rest-spread",
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime"
        ]
    })
    .configureCssLoader(options => {
        options.modules = true;
        options.importLoaders= 1;
        options.localIdentName = '[name]__[local]__[hash:base64:5]';
    })
    .configureFilenames({
        images: '[path][name].[hash:8].[ext]',
    })
;
module.exports = Encore.getWebpackConfig();