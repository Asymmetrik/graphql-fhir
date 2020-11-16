const { resolveFromVersion, resolve } = require('./resolve.utils');
const { VERSION } = require('../config');
const path = require('path');

describe('Resolve Utils Test', () => {
	describe('resolve', () => {
		test('should resolve to `src` as the base when no relative path is provided', () => {
			let base = path.basename(resolve());
			expect(base).toEqual('src');
		});

		test('should resolve to a path relative to the base', () => {
			let relative_path = path.join('scooby','doo');
			let diff = path.relative(resolve(''), resolve(relative_path));
			expect(diff).toEqual(relative_path);
		});
	});

	describe('resolveFromVersion', () => {
		test('should resolve to `src/resources/stu3` when no arguments are provided', () => {
			let base = resolveFromVersion();
			let project_base = base.substr(base.indexOf('src'));
			expect(project_base).toEqual(path.join('src','resources','3_0_1'));
		});

		test('should resolve to `src/resources/r4` when no relatve path is provided and version is r4', () => {
			let base = resolveFromVersion('r4');
			let project_base = base.substr(base.indexOf('src'));
			expect(project_base).toEqual(path.join('src','resources','r4'));
		});

		test('should resolve a path relative to the version base', () => {
			let base = resolveFromVersion(VERSION['3_0_1'], 'scooby/doo');
			let project_base = base.substr(base.indexOf('src'));
			expect(project_base).toEqual(path.join('src','resources','3_0_1','scooby','doo'));
		});
	});
});
