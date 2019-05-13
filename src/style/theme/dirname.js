//import 'kpc/styles/themes/ksyun/index.styl'
const path = require('path');

module.exports = () => {
    return (style) => {
        style.define('__dirname', ()=>{
            return path.dirname(style.nodes.filename);
        });
    };
};
