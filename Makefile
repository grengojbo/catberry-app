NAME:=example
ACCOUNT="grengojbo"

CURRENT_DIR:=$(CURDIR)
ANSIBLE_DIR:="~/ansible"

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

help:
	@echo "...............................................................\n"
	@echo Project: $(PROJECT_NAME)
	@echo version: $(VERSION)
	@echo make install -
	@echo make clean   -
	@echo make run     -
	@echo make release -
	@echo make deploy -
	@echo "...............................................................\n"

npm-test: lint

lint:
	./node_modules/.bin/jshint ./ && ./node_modules/.bin/jscs ./

config:
	cp -nR ./configs_example/ ./configs/
	echo "Configuration initialized in ./configs"

build:
	@gulp release
	@node ./build.js release

release: build
	@echo Release $(PROJECT_NAME) version: $(VERSION)
	@node ./server.js release

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
	@cd ${ANSIBLE_DIR}
	@ansible-playbook -i base.ini -e app_name=${NAME} -e app_type=nodejs deploy.yml
	@cd ${CURRENT_DIR}

run:
	@gulp build
	@node ./build.js
	@node ./server.js

install:
	@npm install
	@bower install

skeleton:
	@git remote add skeleton https://github.com/grengojbo/catberry-app.git
	@git fetch skeleton
	@git merge skeleton/master