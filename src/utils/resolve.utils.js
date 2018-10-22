const { VERSION, RESOURCE_CONFIG } = require('../config');
const path = require('path');

let base = path.posix.join(__dirname, '../');

let resolveFromVersion = (version = VERSION['3_0_1'], relative_path = '') => {
	return path.posix.join(base, RESOURCE_CONFIG.resourceBase, version, relative_path);
};

let resolve = (relative_path = '') => {
	return path.posix.join(base, relative_path);
};

/**
 * @name exports
 * @summary helpers for requiring files
 */
module.exports = {
	resolveFromVersion,
	resolve
};
