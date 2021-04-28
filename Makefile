install:
	yarn

start: install
	npm start

test:
	npm test

coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	yarn eslint .

.PHONY: coverage
