# Portfolio

Статичный сайт-портфолио бэкенд-разработчика. Собран на Next.js 14 (static export) и задеплоен на GitHub Pages.

**Стек:** Next.js 14, TypeScript, Tailwind CSS
**Контент:** JSON-файлы в `content/`
**Деплой:** GitHub Actions → GitHub Pages

---

## Запуск локально

```bash
npm install
npm run dev       # dev-сервер на http://localhost:3000
npm run build     # собрать статику в out/
```

---

## Добавить проект с Kwork через skill

Для оптимизации выкладывания проектов Kwork в портфолио было создано расширение и скилл для claude code.

Как пользоваться:
1. Создайте папку kwork_projects
2. В ней создайте папку с названием равным id заказа. Пример: `kwork_projects/7418524/`
3. С помощью [расширения](https://github.com/lavrocoder/Kwork-Order-Collector) скачайте переписку в эту папку.
4. Скачайте все файлы проекта в эту папку.
5. Напишите claude code следующий промпт `Обработай заказ {id}`. Пример: `Обработай заказ 7418524`. Так же можно добавлять несколько заказов.

После выполнения skill — обнови сайт (см. ниже).

---

## Обновить сайт (задеплоить изменения)

```bash
git add .
git commit -m "Добавлен проект: <название>"
git push
```

GitHub Actions автоматически соберёт и задеплоит на GitHub Pages.
Статус деплоя: вкладка **Actions** в репозитории.

---

## Добавить проект вручную

### 1. Создать JSON-файл проекта

Создай `content/projects/<slug>.json` по образцу:

```json
{
  "slug": "my-project",
  "title": "Название проекта",
  "subtitle": "Клиент или контекст",
  "isNda": false,
  "featured": true,
  "order": 10,

  "tags": {
    "type": ["тип"],
    "tech": ["Python", "PostgreSQL"],
    "domain": ["домен"]
  },

  "metrics": [
    { "value": "2×", "label": "ускорение" }
  ],

  "problem": "Описание задачи.",
  "solution": "Что было сделано.",
  "results": ["Результат 1", "Результат 2"],

  "stack": {
    "Бэкенд": ["Python", "FastAPI"],
    "База данных": ["PostgreSQL"]
  },

  "architecture": {
    "description": "Краткое описание архитектуры.",
    "components": [
      { "name": "API", "description": "REST API на FastAPI" }
    ]
  }
}
```

**Поля `isNda: true`** скрывают детали реализации и показывают NDA-бейдж.

### 2. Добавить изображения

Положи файлы в `public/assets/projects/<slug>/`:
- `cover.svg` — обложка карточки (рекомендуется 800×450)
- `architecture.svg` — схема архитектуры (опционально)

Если изображений нет — компоненты покажут заглушку.

### 3. Проверить локально

```bash
npm run dev
# открой http://localhost:3000/projects/<slug>
```

### 4. Задеплоить

```bash
git add content/projects/<slug>.json public/assets/projects/<slug>/
git commit -m "Добавлен проект: <название>"
git push
```
