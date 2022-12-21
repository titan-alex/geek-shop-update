# Настройка проекта

Установка зависимостей

    npm install

Установить призму

    npm install prisma

Выполнить миграцию БД из конфигурации ORM Prisma

    npx prisma migrate dev

Запуск веб-сервера

    npm run dev

Содержание таблицы category

    Anime   anime.jpg   category    /anime
    
Запуск tailwindcss

    npx tailwindcss -i ./public/css/input.css -o ./public/css/output.css --watch