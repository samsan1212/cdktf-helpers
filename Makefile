# FOR LOCAL DEVELOPMENT ONLY
.PHONY: build clean deploy

clean:
	@yarn clean

build: clean
	@yarn build

deploy: build
	@yarn prepublishOnly
	@yarn npm publish
	@yarn postpublish