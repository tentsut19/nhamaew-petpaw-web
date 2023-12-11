# Cabsat

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Path Deploy
/usr/share/nginx/html/cabsat


export NODE_OPTIONS=--openssl-legacy-provider

set NODE_OPTIONS=--openssl-legacy-provider && npm run start


## Build PROD
ng build --prod
## Build UAT
ng build --prod --configuration=uat
## Build SIT
ng build --prod --configuration=sit

control + shift + r

docker run --restart=always -it --name cabsat -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=cabsat_db -p 3307:3306 -d mariadb:10.5 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci

docker run -v ./imposters:/imposters -p 8080:8080 -p 2525:2525 -d jkris/mountebank --configfile /imposters/imposters.ejs --allowInjection

https://leovo2708.github.io/ngx-treeview/#/components

