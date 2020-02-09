# Changelog




## UNRELEASED







## v0.2.1 (2020-02-09)

### Fixed

* Fix snowpack babel error [#38](https://github.com/jakedeichert/svelvet/pull/38)
* Update examples/basic svelvet version [#35](https://github.com/jakedeichert/svelvet/pull/35)




## v0.2.0 (2020-02-03)

### Added

* Use servor as our live reloading dev server [#34](https://github.com/jakedeichert/svelvet/pull/34)




## v0.1.10 (2020-01-25)

### Fixed

* Require node v10+ [#20](https://github.com/jakedeichert/svelvet/pull/20)
* Log svelte debug warnings [#23](https://github.com/jakedeichert/svelvet/pull/23)
* Load babel config override [#26](https://github.com/jakedeichert/svelvet/pull/26)
* Log svelte warnings after all other logging is complete [#27](https://github.com/jakedeichert/svelvet/pull/27)
* Prevent test and typescript files from being copied into dist [#29](https://github.com/jakedeichert/svelvet/pull/29)

### Meta

* Update snapshot because svelte had a new release [25](https://github.com/jakedeichert/svelvet/pull/25)




## v0.1.9 (2020-01-21)

### Added

* Add support for minifying in production with terser [#19](https://github.com/jakedeichert/svelvet/pull/19)




## v0.1.8 (2020-01-20)

### Added

* Add --hydratable and --immutable args for svelte options [#15](https://github.com/jakedeichert/svelvet/pull/15)

### Fixed

* Bail if there's a snowpack error [#14](https://github.com/jakedeichert/svelvet/pull/14)




## v0.1.7 (2020-01-20)

### Fixed

* Handle any new files when dev mode is running [#13](https://github.com/jakedeichert/svelvet/pull/13)





## v0.1.6 (2020-01-20)

### Fixed

* Don't compile changed non-js/svelte assets [#8](https://github.com/jakedeichert/svelvet/pull/8)




## v0.1.5 (2020-01-19)

### Fixed

* Prevent corruption of binary asset types during copy [#7](https://github.com/jakedeichert/svelvet/pull/7)




## v0.1.4 (2020-01-19)

### Fixed

* Fix build race conditions [#6](https://github.com/jakedeichert/svelvet/pull/6)




## v0.1.3 (2020-01-19)

### Fixed

* Fix watcher race condition [#4](https://github.com/jakedeichert/svelvet/pull/4)




## v0.1.2 (2020-01-19)

### Fixed

* Prevent error when non-js files are copied to dist




## v0.1.1 (2020-01-19)

Initial release 🎉
