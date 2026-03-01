# Техническая спецификация: управление контентом

## Стек и подход

| Параметр | Решение |
|----------|---------|
| Фреймворк | Next.js с `output: 'export'` (статическая генерация) |
| Формат данных | JSON-файлы в репозитории |
| Изображения | В репозитории, папка `public/assets/` |
| Хостинг | GitHub Pages / Cloudflare Pages / Vercel (на выбор) |
| Деплой | Автоматический через GitHub Actions при push в main |

---

## 1. Структура репозитория

```
portfolio/
├── content/                        # ← весь контент сайта
│   ├── projects/                   # данные о проектах
│   │   ├── _schema.json            # JSON-схема для валидации (опционально)
│   │   ├── hr-bot.json             # один файл = один проект
│   │   ├── payment-gateway.json
│   │   ├── logistics-api.json
│   │   └── ...
│   ├── about.json                  # данные для страницы «Обо мне»
│   └── meta.json                   # общие данные: имя, контакты, соцсети, метрики hero-секции
│
├── public/
│   └── assets/
│       ├── projects/               # медиа по проектам
│       │   ├── hr-bot/             # папка совпадает со slug проекта
│       │   │   ├── cover.webp      # обложка для карточки
│       │   │   ├── architecture.svg # схема архитектуры
│       │   │   ├── screen-1.webp   # скриншоты
│       │   │   ├── screen-2.webp
│       │   │   └── demo.mp4        # видео-демо (если есть)
│       │   └── payment-gateway/
│       │       └── ...
│       ├── about/                  # фото, резюме
│       │   ├── photo.webp
│       │   └── resume.pdf
│       └── og-image.png            # дефолтная OG-картинка
│
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx                # главная
│   │   ├── projects/
│   │   │   ├── page.tsx            # список проектов
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # детальная страница кейса
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── contacts/
│   │       └── page.tsx
│   ├── components/                 # UI-компоненты
│   └── lib/
│       └── content.ts              # функции чтения JSON из content/
│
├── next.config.js                  # output: 'export'
└── package.json
```

---

## 2. Формат данных

### 2.1. Файл проекта (`content/projects/*.json`)

```json
{
  "slug": "hr-bot",
  "title": "Бот для автоматизации HR-процессов",
  "subtitle": "Логистическая компания",
  "isNda": false,
  "featured": true,
  "order": 1,

  "tags": {
    "type": ["бот", "интеграция"],
    "stack": ["Python", "aiogram", "PostgreSQL", "Docker"],
    "industry": ["логистика"]
  },

  "brief": "Автоматизация найма и онбординга для компании с 500+ сотрудниками",

  "case": {
    "problem": "HR-отдел тратил 6 часов в день на рутинные задачи: ...",
    "solution": "Разработал Telegram-бота, который ...",
    "result": "Время обработки заявок сократилось с 2 часов до 5 минут. Автоматизировано 80% рутинных HR-операций."
  },

  "role": "Единственный разработчик. Проектирование, разработка, деплой и поддержка.",

  "metrics": [
    { "value": "80%", "label": "рутины автоматизировано" },
    { "value": "5 мин", "label": "вместо 2 часов на заявку" },
    { "value": "500+", "label": "сотрудников в системе" }
  ],

  "media": {
    "cover": "/assets/projects/hr-bot/cover.webp",
    "architecture": "/assets/projects/hr-bot/architecture.svg",
    "screenshots": [
      "/assets/projects/hr-bot/screen-1.webp",
      "/assets/projects/hr-bot/screen-2.webp"
    ],
    "video": "/assets/projects/hr-bot/demo.mp4"
  }
}
```

#### Поля

| Поле | Тип | Обязательное | Описание |
|------|-----|:------------:|----------|
| `slug` | string | ✅ | URL-идентификатор, совпадает с именем файла и папкой в assets |
| `title` | string | ✅ | Название проекта (обезличенное для NDA) |
| `subtitle` | string | — | Тип компании / отрасль (без имени при NDA) |
| `isNda` | boolean | ✅ | Показывать бейдж NDA |
| `featured` | boolean | ✅ | Показывать на главной в превью |
| `order` | number | ✅ | Порядок сортировки (меньше = выше) |
| `tags` | object | ✅ | Теги для фильтрации: `type`, `stack`, `industry` |
| `brief` | string | ✅ | Краткое описание для карточки (1–2 строки) |
| `case.problem` | string | ✅ | Описание задачи / проблемы заказчика |
| `case.solution` | string | ✅ | Что было сделано и почему так |
| `case.result` | string | ✅ | Конкретный результат с метриками |
| `role` | string | — | Твоя роль в проекте |
| `metrics` | array | — | Ключевые цифры для визуального блока |
| `media.cover` | string | ✅ | Путь к обложке карточки |
| `media.architecture` | string | — | Путь к схеме архитектуры |
| `media.screenshots` | array | — | Пути к скриншотам |
| `media.video` | string | — | Путь к видео-демо |

### 2.2. NDA-проект — пример

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
    "problem": "Маркетплейсу нужна была единая точка приёма платежей с автоматическим распределением средств между продавцами...",
    "solution": "Спроектировал микросервис-шлюз, который абстрагирует работу с платёжными провайдерами...",
    "result": "Подключение нового провайдера занимает 2 дня вместо 2 недель. Обрабатывает 10 000+ транзакций в сутки."
  },

  "metrics": [
    { "value": "10K+", "label": "транзакций в сутки" },
    { "value": "3", "label": "платёжных провайдера" },
    { "value": "2 дня", "label": "на подключение нового провайдера" }
  ],

  "media": {
    "cover": "/assets/projects/marketplace-payment/cover.webp",
    "architecture": "/assets/projects/marketplace-payment/architecture.svg"
  }
}
```

### 2.3. Общие данные (`content/meta.json`)

```json
{
  "name": "Имя Фамилия",
  "headline": "Бэкенд-разработчик",
  "tagline": "Разрабатываю ботов, API и сервисы, которые решают задачи бизнеса",

  "heroMetrics": [
    { "value": "5+", "label": "лет опыта" },
    { "value": "20+", "label": "завершённых проектов" },
    { "value": "Python", "label": "основной стек" }
  ],

  "contacts": {
    "email": "hello@example.com",
    "telegram": "@username",
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username"
  }
}
```

### 2.4. Страница «Обо мне» (`content/about.json`)

```json
{
  "bio": "Бэкенд-разработчик с 5+ годами опыта. Специализируюсь на ...",

  "skills": [
    {
      "category": "Бэкенд",
      "items": ["Python", "FastAPI", "Django", "asyncio"]
    },
    {
      "category": "Базы данных",
      "items": ["PostgreSQL", "Redis", "MongoDB"]
    },
    {
      "category": "DevOps",
      "items": ["Docker", "CI/CD", "Linux", "Nginx"]
    },
    {
      "category": "Интеграции",
      "items": ["Telegram Bot API", "REST API", "Платёжные системы"]
    }
  ],

  "experience": [
    {
      "period": "2022 — настоящее время",
      "role": "Фриланс бэкенд-разработчик",
      "description": "20+ проектов для бизнеса: боты, API, автоматизация"
    },
    {
      "period": "2019 — 2022",
      "role": "Python-разработчик, Компания",
      "description": "Разработка внутренних сервисов и интеграций"
    }
  ],

  "approach": [
    {
      "title": "Прозрачность",
      "description": "Ежедневные апдейты, доступ к задачам, демо по итогам спринта"
    },
    {
      "title": "Сроки",
      "description": "Реалистичные оценки с буфером. Если что-то идёт не по плану — предупреждаю заранее"
    },
    {
      "title": "Документация",
      "description": "Код с комментариями, README, инструкция по деплою. Проект можно передать другому разработчику"
    }
  ],

  "resumeFile": "/assets/about/resume.pdf"
}
```

---

## 3. Как добавить новый проект

Пошаговый процесс:

```
1. Создать файл                content/projects/my-new-project.json
2. Заполнить по шаблону        (скопировать любой существующий и отредактировать)
3. Добавить медиа              public/assets/projects/my-new-project/
                                 ├── cover.webp
                                 ├── architecture.svg (если есть)
                                 └── screen-*.webp (если есть)
4. git add → commit → push     Деплой произойдёт автоматически
```

Никакого другого кода менять не нужно — список проектов и маршруты генерируются автоматически из содержимого папки `content/projects/`.

---

## 4. Чтение данных на уровне кода

Файл `src/lib/content.ts` — единственная точка доступа к контенту:

```typescript
// Псевдокод ключевых функций

// Получить все проекты (для списка и фильтрации)
getProjects(): Project[]
  → читает все JSON из content/projects/
  → сортирует по order
  → возвращает массив

// Получить один проект (для детальной страницы)
getProject(slug: string): Project
  → читает content/projects/{slug}.json

// Получить featured-проекты (для главной)
getFeaturedProjects(): Project[]
  → фильтрует по featured === true

// Все уникальные теги (для фильтров на странице проектов)
getAllTags(): { type: string[], stack: string[], industry: string[] }
  → собирает из всех проектов

// Данные «Обо мне» и meta
getAbout(): About
getMeta(): Meta
```

Next.js вызывает эти функции на этапе сборки (`generateStaticParams` + серверные компоненты), так что в итоговом бандле нет никакого чтения файлов — только готовый HTML.

---

## 5. Рекомендации по медиа

### Форматы и размеры

| Тип | Формат | Размер | Примечание |
|-----|--------|--------|------------|
| Обложка карточки | WebP | 800×600 px, < 100 KB | Соотношение 4:3, сжатие 80% |
| Скриншоты | WebP | до 1400 px по ширине, < 200 KB | Обезличить данные для NDA |
| Архитектурная схема | SVG | — | Масштабируется без потерь |
| Видео-демо | MP4 (H.264) | до 30 сек, < 5 MB | Опционально, конвертировать через ffmpeg |
| Фото (обо мне) | WebP | 400×400 px | Квадрат, для аватара |

### Важно для NDA-проектов

- Скриншоты: размыть чувствительные данные (имена, цифры) или использовать мокапы
- Архитектурные схемы: не упоминать название компании / продукта заказчика
- Видео: убрать URL-бар, замазать логотипы

---

## 6. Деплой

### GitHub Actions (автоматический деплой при push)

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build     # next build → генерирует out/
      - name: Deploy
        # GitHub Pages / Cloudflare Pages / Vercel — выбрать один
```

### Варианты хостинга

| Хостинг | Бесплатно | Свой домен | Примечание |
|---------|:---------:|:----------:|------------|
| GitHub Pages | ✅ | ✅ | Самый простой, деплой из Actions |
| Cloudflare Pages | ✅ | ✅ | Быстрый CDN, авто-деплой из репо |
| Vercel | ✅ (хобби) | ✅ | Нативная поддержка Next.js |
