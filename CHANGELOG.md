# Changelog




## UNRELEASED




## v0.4.2 (2020-04-20)

### Fixed

* Allow port to be configured with `--port <number>` [#82](https://github.com/jakedeichert/svelvet/pull/82)




## v0.4.1 (2020-03-29)

### Fixed

* Fix missing web_module check for dynamic imports [#72](https://github.com/jakedeichert/svelvet/pull/72)




## v0.4.0 (2020-03-17)

### Breaking Changes

* Use /public directory for static assets instead of copying from /src [#65](https://github.com/jakedeichert/svelvet/pull/65)




## v0.3.6 (2020-03-01)

### Fixed

* Let babel know the absolute file path of the file currently being processed [#61](https://github.com/jakedeichert/svelvet/pull/61)




## v0.3.5 (2020-03-01)

### Added

* Pass through snowpack log colors and show stats during production builds [#56](https://github.com/jakedeichert/svelvet/pull/56)

### Fixed

* Prevent external imports from triggering snowpack web_module regeneration [#55](https://github.com/jakedeichert/svelvet/pull/55)
* Normalize incoming paths to getDestPath for Windows [#57](https://github.com/jakedeichert/svelvet/pull/57)




## v0.3.4 (2020-02-24)

### Added

* Add svelte preprocessor support [#53](https://github.com/jakedeichert/svelvet/pull/53)




## v0.3.3 (2020-02-23)

### Fixed

* Check for missing web modules in dev mode and fix them [#52](https://github.com/jakedeichert/svelvet/pull/52)




## v0.3.2 (2020-02-17)

### Fixed

* Upgrade snowpack to support 3rd party svelte files [#48](https://github.com/jakedeichert/svelvet/pull/48)




## v0.3.1 (2020-02-12)

### Fixed

* Call node explicitly in order to run snowpack on Windows [#44](https://github.com/jakedeichert/svelvet/pull/44)
* Use path.sep to fix windows build error [#45](https://github.com/jakedeichert/svelvet/pull/45)




## v0.3.0 (2020-02-10)

### Breaking Changes

* Auto delete dist directory on build [#42](https://github.com/jakedeichert/svelvet/pull/42)




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
