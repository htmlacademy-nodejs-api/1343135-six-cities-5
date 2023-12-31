# Как работать над проектом

## Окружение

Для удобства работы над проектом используются инструменты из **Node.js** и **npm**. Все необходимые настройки произведены. Убедитесь, что на рабочем компьютере установлен актуальный LTS релиз Node.js**. Актуальная версия **Node.js** указана в файле `package.json` в поле `node`. Затем, в терминале, перейдите в директорию с проектом и _единожды_ запустите команду:

```bash
npm install
```

Команда запустит процесс установки зависимостей проекта из **npm**.

## Переменные окружения
PORT=3000 - порт для запуска REST-приложения
SALT=my_secret_salt - соль для генерации хешей паролей
DB_USERNAME=admin - имя пользователя для подключения к БД
DB_PASSWORD=test - парол для подключения к БД
DB_HOST=0.0.0.0 - имя хоста для подключения к БД
DB_PORT=27017 - порт для подключения к БД
DB_NAME=six-cities - имя базы данных в СУБД
UPLOAD_DIR=upload - путь к директории для загрузки файлов
JWT_SECRET=jwt-secret - секрет для генерации сессионных токенов

### Сценарии

В `package.json` предопределено несколько сценариев.

#### Скомпилировать проект

```bash
npm run compile
```

Создаст директорию `dist` и скомпилирует проект.

#### Удалить скомпилированный проект

```bash
npm run clean
```

Удаляет директорию `dist`. Используется перед компиляцией.

#### Собрать проект

```bash
npm run build
```

Выполняет сборку проекта: удаляет ранее скомпилированный проект и компилирует заново.

#### Проверить линтером

```bash
npm run lint
```

Запуск проверки проекта статическим анализатором кода **ESLint**.

Линтер проверяет файлы только внутри директории `src`.

**Обратите внимание**, при запуске данной команды, ошибки выводятся в терминал.

#### Запустить ts-модуль без компиляции

```bash
npm run ts -- <Путь к модулю с ts-кодом>
```

Пакет `ts-node` позволяет выполнить TS-код в Node.js без предварительной компиляции. Используется только на этапе разработки.

#### Запустить проект

```bash
npm start
```

В процессе запуска проекта будет выполнен процесс «Сборки проекта» и запуска результирующего кода.

#### Запустить проект в режиме разработки

```bash
npm start:dev
```

В процессе запуска проекта будет выполнен процесс «Сборки проекта» и запуска результирующего кода, начнут отслеживаться изменения исходного кода проекта.

#### Выполнить команду cli-приложения

```bash
npm run cli -- <Команда>
```

В процессе запуска будет выполнен процесс «Сборки проекта» и выполнится консольная команда.

#### Запустить сервер с моковыми данными для генерации объявлений

```bash
npm run mock:server
```

## Структура проекта

### Директория `src`

Исходный код проекта: компоненты, модули и так далее. Структура директории `src` может быть произвольной.

### Файл `Readme.md`

Инструкции по работе с учебным репозиторием.

### Файл `Contributing.md`

Советы и инструкции по внесению изменений в учебный репозиторий.

### Остальное

Все остальные файлы в проекте являются служебными. Пожалуйста, не удаляйте и не изменяйте их самовольно. Только если того требует задание или наставник.
