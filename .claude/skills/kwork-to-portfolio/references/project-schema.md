# JSON-схема проекта портфолио

Точный формат файла `content/projects/{slug}.json`.

## Полная структура

```json
{
  "slug": "string (обязательно)",
  "title": "string (обязательно)",
  "subtitle": "string (опционально)",
  "isNda": "boolean (обязательно)",
  "featured": "boolean (обязательно)",
  "order": "number (обязательно)",

  "tags": {
    "type": ["массив строк — тип проекта"],
    "stack": ["массив строк — технологии"],
    "industry": ["массив строк — отрасль"]
  },

  "brief": "string (обязательно) — 1-2 строки для карточки",

  "case": {
    "problem": "string (обязательно) — задача / проблема заказчика",
    "solution": "string (обязательно) — что сделано и почему",
    "result": "string (обязательно) — результат с метриками"
  },

  "role": "string (опционально) — роль в проекте",

  "metrics": [
    {
      "value": "string — число или короткое значение (80%, 5 мин, 10K+)",
      "label": "string — пояснение"
    }
  ],

  "media": {
    "cover": "string (обязательно) — /assets/projects/{slug}/cover.svg",
    "architecture": "string (опционально) — /assets/projects/{slug}/architecture.svg",
    "screenshots": ["массив строк (опционально)"],
    "video": "string (опционально)"
  }
}
```

## Допустимые значения тегов

### tags.type
бот, API, сервис, интеграция, парсер, автоматизация, скрипт, панель управления,
телеграм-бот, веб-приложение, микросервис, CRM, платёжный модуль, ETL, мониторинг

### tags.stack
Python, JavaScript, TypeScript, Node.js, FastAPI, Django, Flask, aiogram,
pyrogram, telethon, aiohttp, requests, Selenium, BeautifulSoup, Scrapy,
PostgreSQL, MySQL, SQLite, MongoDB, Redis, ClickHouse,
Docker, Docker Compose, Nginx, CI/CD, GitHub Actions, Linux,
Telegram Bot API, REST API, GraphQL, WebSocket,
Celery, RabbitMQ, Kafka,
pandas, numpy, OpenAI API, YandexGPT

### tags.industry
e-commerce, логистика, финтех, образование, медицина, HR, маркетинг,
недвижимость, юриспруденция, ритейл, SaaS, крипто, медиа, рестораны,
строительство, автоматизация бизнеса, туризм

## Пример: простой бот

```json
{
  "slug": "hr-bot",
  "title": "Бот для автоматизации HR-процессов",
  "subtitle": "Логистическая компания",
  "isNda": false,
  "featured": true,
  "order": 1,
  "tags": {
    "type": ["бот", "автоматизация"],
    "stack": ["Python", "aiogram", "PostgreSQL", "Docker"],
    "industry": ["логистика"]
  },
  "brief": "Автоматизация найма и онбординга для компании с 500+ сотрудниками",
  "case": {
    "problem": "HR-отдел тратил 6 часов в день на рутинные задачи: обработку заявок, рассылку анкет, сбор документов. Каждый новый сотрудник требовал 2+ часов ручной работы по онбордингу.",
    "solution": "Разработал Telegram-бота на aiogram с PostgreSQL для хранения данных. Бот автоматически принимает заявки от кандидатов, рассылает анкеты, собирает документы и формирует карточку сотрудника. Реализовал систему ролей (HR, руководитель, сотрудник) и интеграцию с 1С для синхронизации данных.",
    "result": "Время обработки заявок сократилось с 2 часов до 5 минут. Автоматизировано 80% рутинных HR-операций. Бот обслуживает 500+ сотрудников ежедневно."
  },
  "role": "Единственный разработчик. Проектирование, разработка, деплой и поддержка.",
  "metrics": [
    { "value": "80%", "label": "рутины автоматизировано" },
    { "value": "5 мин", "label": "вместо 2 часов на заявку" },
    { "value": "500+", "label": "сотрудников в системе" }
  ],
  "media": {
    "cover": "/assets/projects/hr-bot/cover.svg",
    "architecture": "/assets/projects/hr-bot/architecture.svg",
    "screenshots": []
  }
}
```

## Пример: NDA-проект

```json
{
  "slug": "marketplace-payment",
  "title": "Платёжный шлюз для маркетплейса",
  "subtitle": "E-commerce, NDA",
  "isNda": true,
  "featured": false,
  "order": 5,
  "tags": {
    "type": ["API", "интеграция"],
    "stack": ["Python", "FastAPI", "Redis", "PostgreSQL"],
    "industry": ["e-commerce"]
  },
  "brief": "Интеграция с 3 платёжными системами и автоматический сплит платежей между продавцами",
  "case": {
    "problem": "Маркетплейсу нужна была единая точка приёма платежей с автоматическим распределением средств между продавцами. Каждый провайдер имел свой API и логику, подключение нового занимало 2 недели.",
    "solution": "Спроектировал микросервис-шлюз на FastAPI, который абстрагирует работу с платёжными провайдерами за единым интерфейсом. Реализовал паттерн Strategy для переключения провайдеров, систему автоматического сплита платежей и Redis-очередь для обработки webhook-колбэков.",
    "result": "Подключение нового провайдера занимает 2 дня вместо 2 недель. Обрабатывает 10 000+ транзакций в сутки с 99.9% uptime."
  },
  "metrics": [
    { "value": "10K+", "label": "транзакций в сутки" },
    { "value": "3", "label": "платёжных провайдера" },
    { "value": "2 дня", "label": "на подключение нового провайдера" }
  ],
  "media": {
    "cover": "/assets/projects/marketplace-payment/cover.svg",
    "architecture": "/assets/projects/marketplace-payment/architecture.svg"
  }
}
```
