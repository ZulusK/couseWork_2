const Utils = require('@utils');
module.exports = () => {
    try {
        Utils.code.loadDefaultBlocks();
        console.log(`+Code`)
    } catch (e) {
        console.log(`-Code: ${e}`)
        return;
    }
}