npm-test: lint

lint:
	./node_modules/.bin/jshint ./ && ./node_modules/.bin/jscs ./

config:
	cp -nR ./configs_example/ ./configs/
	echo "Configuration initialized in ./configs"

release:
	node ./build.js release

clean:
	rm -rf coverage
	git gc --prune=0 --aggressive
	find . -name "*.orig" -type f -delete
	find . -name "*.log" -type f -delete

run:
	@gulp build
	@npm run debug

install:
	@git remote add skeleton https://github.com/grengojbo/catberry-app.git
	@git fetch skeleton
	@git merge skeleton/master
	@npm install
	@bower install