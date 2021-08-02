
//vue.config.js
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        //? '/modals/' //production
        ? '' //for local machine
        : '/',
    assetsDir: 'assets',
    productionSourceMap: false,
    filenameHashing: true
}