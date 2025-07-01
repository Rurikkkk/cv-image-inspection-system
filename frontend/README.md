## Images markup web-UI SPA

## Overview
The web application provides basic UI for uploading images to analyze. It contains 2 pages, system of marking files (used flags checked/unchecked). App connects with backend services via Fetch API (used /upload and /images endpoints). There`re React JS and Bootstrap as a main frameworks.

## Pages
- View - page for bacis image view and uploading. Contains form to input a file and a table with preview buttons.
- Alerts - page with alerts. Contains a special flag for each file to sign it as a checked or unchecked. Alert table contains same functions like a view table.

## Run
To execute project, run
```sh
    npm install
```
and
``` sh
    npm start
```

## Application structure ##
- **public directory**
Contains HTML file for work with React and images for app (f.e. logo.svg)
- **src directory**
Contains main project files
- **components directory**
    Contains basic components of an app (React functions)
        - **config**
        There is only one line in this file. Its necessary to set a filepath prefix to connect with backend images directory
        - **Fish file (files.json)**
        You may delete it. It used for app test without a backend
        - **LoadedPhotoTable**
        UI of View page. Contain a form with file upload and table of files.
        - **NotifiedPhoto**
        Line of a table of Alert view
        - **PhotoNotifier**
        A table contains Notified photos as a table rows. Used as main viewfild of Alerts
        - **StatusCircle**
        CSS file to create a status marker for a files (yellow - uncheked, gray - checked)
    - **App**
    File with main nav header and conditional render of View/Alerts page
    - **index**
    File that connects React application (App) with HTML
    - **reportWebVitals**
    File to get metrics. You may delete it if you don`t need it
- **Package**
Main dependencies of a application. You don`t need to download it - npm provides tools to do it via a CLI.

## Notes ##
Backend server is in production. So, there`re extra .json files and extra code in an app. It will be cleaned in future.


## Веб SPA для разметки фото

## Общее описание
Веб-приложение предоставляет базовый интерфейс для загрузки обрабатываемых изображений. Оно содержит 2 страницы и систему маркировки файлов (используются флаги проверено/не проверено). Приложение соединяется с серверными сервисами через Fetch API (используются эндпоинты /upload /images endpoints). В качестве основных фреймворков применялся React JS и Bootstrap.

## Страницы
- Обзор - страница для базового просмотра фото и его выгрузки. Содержит форму отправки файла и таблицу с файлами и кнопками просмотра.
- Предупреждения - страница с уведомлениями. Содержит специальные флаги у каждого файла для обозначения его как проверенного или непроверенного. Таблица предупреждений содержит такой же функционал, что и таблица обзора

## Запуск
Для запуска запустить
```sh
    npm install
```
Затем
``` sh
    npm start
```

## Структура приложения ##
- **папка public**
Содержит HTML файл для работы с React и изображения для самого сайта (например, logo.svg)
- **папка src**
Содержит основные файлы проекта
- **папка components**
    Содержи базовые компоненты приложения (функции React)
        - **config**
        В этом файле только одна строка. Она необходима для задания префикса для файлов для соединения с папкой картинок на сервере
        - **Файл-рыба (files.json)**
        Вы можете удалить его. Он был нужен для теста веб-приложения без сервера
        - **LoadedPhotoTable**
        Компонент интерфейса страницы обзора. Содержит форму отправки файла и таблицу файлов
        - **NotifiedPhoto**
        Компонент - запись в таблице для страницы предупреждений
        - **PhotoNotifier**
        Таблица, содержащая NotifiedPhoto в качестве строки. Используется как основное поле обзора страницы предупреждений
        - **StatusCircle**
        CSS файл для создания маркера файла (желтый - не проверено, серый - проверено)
    - **App**
    Файл с основной панелью навигации и условным рендером страницы обзора/предупреждений
    - **index**
    Файл, используемый для связи React приложения (App) и HTML страницы
    - **reportWebVitals**
    Файл для получения метрик. Можно удалить, если они не требуются
- **Package**
Основные зависимости приложения. Скачивать не нужно - npm обеспечивает инструменты для осуществления этого через CLI

## Заметки ##
Сервер в разработке. В репозитории содержатся лишние .json файлы, и код содержит избытки. Они будут убраны в будущем.