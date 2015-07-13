NAME:=example
ACCOUNT="grengojbo"
ANSIBLE_DIR="../../ansible"

CURRENT_DIR:=$(CURDIR)

# Program version
VERSION := $(shell cat VERSION)

# Project owner for bintray
OWNER:=${ACCOUNT}

# Project name for bintray
PROJECT_NAME:=$(shell basename $(abspath ./))

# Grab the current commit
GIT_COMMIT:="$(shell git rev-parse HEAD)"

# Check if there are uncommited changes
GIT_DIRTY:="$(shell test -n "`git status --porcelain`" && echo "+CHANGES" || true)"

HOME_CSS_REV:=$(shell node ./util.js)

help:
	@echo "..............................................................."
	@echo "Project: $(PROJECT_NAME)"
	@echo "version: $(VERSION)"
	@echo "make install - Install npm and bower packages"
	@echo "make clean   - Clean .orig, .log files"
	@echo "make lint    - Run jshint and jscs"
	@echo "make csscomb - CSScomb > CSS coding style formatter"
	@echo "make run     - Run project debug mode"
	@echo "make index   - Optimize index page"
	@echo "make release - Build and run release project"
	@echo "make deploy  - Deploy current project (git push and ansible deploy)"
	@echo "...............................................................\n"
	@exit 0

npm-test: lint

lint:
	./node_modules/.bin/jshint ./ && ./node_modules/.bin/jscs ./

config:
	cp -nR ./configs_example/ ./configs/
	echo "Configuration initialized in ./configs"

builds:
	@gulp release
	@#sed -i .orig -e 's/"isProductionEnvironment": false/"isProductionEnvironment": true/g' config/environment.json
	@#sed -i .orig -e 's/"isRelease": false/"isRelease": true/g' config/environment.json
	@node ./build.js release

release:
	@echo Release $(PROJECT_NAME) version: $(VERSION)
	@gulp dist
	@#sed -i .orig -e 's/"isProductionEnvironment": false/"isProductionEnvironment": true/g' config/environment.json
	@#sed -i .orig -e 's/"isRelease": false/"isRelease": true/g' config/environment.json
	@node ./build.js release
	@node ./server.js release
	@#sed -i .orig -e 's/"isProductionEnvironment": true/"isProductionEnvironment": false/g' config/environment.json
	@#sed -i .orig -e 's/"isRelease": true/"isRelease": false/g' config/environment.json

clean:
	rm -rf coverage
	git gc --prune=0 --aggressive
	find . -name "*.orig" -type f -delete
	find . -name "*.log" -type f -delete

push:
	@git add -A
	@git ci -am "new release v$(VERSION) COMMIT: $(GIT_COMMIT)"
	@git push

deploy: push
	@$(shell cd $(ANSIBLE_DIR) && ansible-playbook -i base.ini -e app_name=${NAME} -e app_type=nodejs deploy.yml && cd $(CURRENT_DIR))

run:
	@#sed -i .orig -e 's/"isProductionEnvironment": true/"isProductionEnvironment": false/g' config/environment.json
	@#sed -i .orig -e 's/"isRelease": true/"isRelease": false/g' config/environment.json
	@#gulp build
	@#npm run debug
	@# pid=`ps | grep build.js | awk 'NR==1{print $1}' | cut -d' ' -f1`; kill $pid
	@gulp dev --tunnel --lr
	@exit 0

install:
	@#cd config/ && wget https://raw.githubusercontent.com/csscomb/csscomb.js/master/config/csscomb.json && mv csscomb.json .csscomb.json && cd ../
	@npm install
	@bower install

skeleton:
	@git remote add skeleton https://github.com/grengojbo/catberry-app.git
	@git fetch skeleton
	@git merge skeleton/master

csscomb:
	@csscomb src/static/scss -c config/.csscomb.json

# index:
# 	@curl http://localhost:3000/ > src/index.html
# 	@sed -i .orig -e 's/ src\="\/bundle.js"//g' src/index.html
# 	@uncss -s ../public/tmp/css/home.css src/index.html > public/static/css/home.css

index:
	@mkdir -p .tmp/desktop/static/css/
	@curl http://localhost:3000/ > build/index.html
	@#sed -i .orig -e 's/ src\="\/bundle.js"//g' build/index.html
	@#uncss -s ../public/tmp/css/home.css build/index.html > public/static/css/home-9e7bb53b73.css
	@#uncss -C ./build build/index.html > public/static/css/home-9e7bb53b73.css
	@cd build && ../node_modules/uncss/bin/uncss -H ../build index.html > ../.tmp/desktop/${HOME_CSS_REV}


