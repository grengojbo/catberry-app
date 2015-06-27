#  Новый проект Catberry Empty Project

## Приступая к работе для разработчика

Необходимо установить [git](http://git-scm.com/downloads) [github/hub](https://github.com/github/hub) **node.js**. Then **sass**, **gulp** and **bower** if you haven't yet.

```
$ sudo brew install --HEAD hub
$ sudo gem install sass
$ sudo npm -g install gulp bower
```

Создаем проект с .

```
mkdir example-site
cd  example-site
git init
echo "0.0.1" > VERSION
git add -A
git commit -m "first commit"
```

Публикуем на [github](https://github.com) если нужно приватный репозитарий то бесплатно можно создать на [bitbucket](https://bitbucket.org).

```
git remote add origin git@github.com:grengojbo/example-site.git
или приватный
git remote add origin git@bitbucket.org:grengojbo/example-site.git

git push -u origin master
```

Делаем форк шаблона приложения, для удобства я использую [github/hub](https://github.com/github/hub).

```
git remote add skeleton https://github.com/grengojbo/catberry-app.git
git fetch skeleton
git merge skeleton/master
```


## Работа с вашей копией проекта

Заменяем *grengojbo-skeleton* на имя вашего проекта -> *example-site* в файлах [package.json](./package.json) [bower.json](./bower.json). Редактируем описание вашего проекта в файде [package.json](./package.json).

Это приложение показывает только "Hello, world!".

В первую очередь необходимо установить зависимости для разработчика:

```
npm install
bower install
```

Если используете New Relic

```
npm install newrelic --save
```

Измените [robots.txt](./static/robots.txt),  sitemap.xml в [server.js](./server.js).

В терминале запустите задачу **gult** и работайте в вашем любимом редакторе например [SublimeText3](http://www.sublimetext.com/3).

```
gulp build
...
20:39:39] Starting 'serve'...
[20:39:42] Finished 'serve' after 2.51 s
[20:39:42] Starting 'default'...
[20:39:42] Finished 'default' after 13 μs
[grengojbo-skeleton] Local URL: http://localhost:3000
[grengojbo-skeleton] External URL: http://192.168.1.129:3000
[grengojbo-skeleton] Serving files from: public/tmp
[grengojbo-skeleton] Serving files from: src
[grengojbo-skeleton] Serving files from: public
...
```

При этом [откроется](http://localhost:3000) страничка в броузере, а если открыть *External URL* ```http://192.168.1.129:3000``` в броузерах на других компьютерах то изменените scss, html, js файл и можно в реальном времент смотрить результат на всех гаджетах (при настройке tunnel, xio) даже заказчик с может смотреть.



Then to start in `debug` mode without script minification and with file watching:

```
npm run debug
```

To start in `release` mode:

```
npm start
```

## Используем Handlebars

```
var viewData = {
    itemSize: 20,
    items: [
        'Zimbabwe', 'dog', 'falafel'
    ]
};
{{#each items}}
    <div style="font-size:{{../itemSize}}px">{{this}}</div>
{{/each}}
```

## Наброски

```
this._logger.info(util.format('----------- [%s] %s --->', '', ''));
this._logger.info(util.format('----------- [%s] %s --->', 'ComponentName', 'FunctionName'));
```

## Contribution
If you have found a bug, please create pull request with [mocha](https://www.npmjs.org/package/mocha) 
unit-test which reproduces it or describe all details in an issue if you can not
implement test. If you want to propose some improvements just create an issue or
a pull request but please do not forget to use `npm test` to be sure that your
code is awesome.

All changes should satisfy this [Code Style Guide](https://github.com/catberry/catberry/blob/4.0.0/docs/code-style-guide.md).

Also your changes should be covered by unit tests using [mocha](https://www.npmjs.org/package/mocha).

Denis Rechkunov <denis.rechkunov@gmail.com>
