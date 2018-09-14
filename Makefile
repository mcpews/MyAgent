PKG =node_modules/pkg/lib-es5/bin.js

.PHONY :all binary allplatform clean nodeandnpm builddir

all: binary
	@echo All Done

binary: $(PKG) builddir
	node $(PKG) -t linux myagent.js
	mv myagent build/

allplatform: $(PKG) builddir
	node $(PKG) -t node8-linux-x64 myagent.js
	mv myagent build/myagent-linux
	node $(PKG) -t node8-win-x64 myagent.js
	mv myagent.exe build/myagent-win.exe
	node $(PKG) -t node8-macos-x64 myagent.js
	mv myagent build/myagent-macos

clean:
	rm -rf build
	npm uninstall pkg

$(PKG): nodeandnpm
	npm i pkg

builddir:
	-@mkdir build
nodeandnpm:
	node -v
	npm -v
