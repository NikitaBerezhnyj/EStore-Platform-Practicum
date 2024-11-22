# API специфікація

- [API специфікація](#api-специфікація)
  - [Авторизація та реєстрація](#авторизація-та-реєстрація)
    - [POST /api/auth/login](#post-apiauthlogin)
    - [POST /api/auth/register](#post-apiauthregister)
    - [POST /api/auth/password-reset](#post-apiauthpassword-reset)
    - [POST /api/auth/password-change](#post-apiauthpassword-change)
  - [Особистий кабінет користувача](#особистий-кабінет-користувача)
    - [GET /api/user/profile](#get-apiuserprofile)
    - [PUT /api/user/profile/{id}](#put-apiuserprofileid)
    - [GET /api/user/orders](#get-apiuserorders)
    - [DELETE /api/user/{id}](#delete-apiuserid)
  - [Товари (для продавця)](#товари-для-продавця)
    - [GET /api/products](#get-apiproducts)
    - [POST /api/products](#post-apiproducts)
    - [PUT /api/products/{id}](#put-apiproductsid)
    - [DELETE /api/products/{id}](#delete-apiproductsid)
  - [Оформлення замовлення](#оформлення-замовлення)
    - [POST /api/orders](#post-apiorders)
    - [GET /api/orders/{id}](#get-apiordersid)
  - [Активні замовлення для продавця](#активні-замовлення-для-продавця)
    - [GET /api/seller/orders](#get-apisellerorders)
    - [PUT /api/seller/orders/{id}/status](#put-apisellerordersidstatus)
  - [Пошук товарів](#пошук-товарів)
    - [GET /api/products/search](#get-apiproductssearch)
  - [Перегляд картки замовлення](#перегляд-картки-замовлення)
    - [GET /api/orders/{id}/details](#get-apiordersiddetails)

## Авторизація та реєстрація

### POST /api/auth/login

**Призначення:** авторизація користувача. Приймає email та пароль, перевіряє їх і повертає токен доступу.

**Метод:** POST

**Параметри запиту:**

- `email` — електронна пошта користувача.
- `password` — пароль користувача.

**Приклад запиту:**

```bash
POST api/auth/login

Content-Type: application/json
{
    "email": "johndoe@example.com",
    "password": "Ab_12345"
}
```

**Приклад відповіді:**

- Успішно

  ```json
  {
    "status": "200",
    "message": "User logged in",
    "token": "JWT_TOKEN"
  }
  ```

- Помилка
  ```json
  {
    "status": "404",
    "message": "User not found"
  }
  ```

**Коди відповіді:**

- 200 — Успішно знайдено.
- 401 — Невірний email або пароль.
- 404 — Користувача не знайдено.
- 500 — Помилка сервера.

### POST /api/auth/register

**Призначення:** реєстрація нового користувача. Приймає ім’я, email, пароль та його підтвердження, створює акаунт і повертає відповідь про успішну реєстрацію.

**Метод:** POST

**Параметри запиту:**

- `name` — повне ім'я користувача
- `email` — електронна пошта користувача
- `password` — пароль користувача
- `role` - роль користувача в системі (покупець/продавець)

**Приклад запиту:**

```bash
POST api/auth/register
Content-Type: application/json

{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "Ab_12345",
    "role": "customer"
}
```

**Приклад відповіді:**

- Успішно

```json
{
  "status": "201",
  "message": "User successfully registered",
  "token": "JWT_TOKEN"
}
```

- Помилка

```json
{
  "status": "400",
  "message": "Email already exists"
}
```

**Коди відповіді:**

- 201 — Користувача успішно створено
- 400 — Некоректні дані або email вже існує
- 500 — Помилка сервера

### POST /api/auth/password-reset

**Призначення:** надсилання посилання для відновлення пароля на email користувача.

**Метод:** POST

**Параметри запиту:**

- `email` — електронна пошта користувача

**Приклад запиту:**

```bash
POST api/auth/password-reset
Content-Type: application/json

{
    "email": "johndoe@example.com"
}
```

**Приклад відповіді:**

- Успішно

```json
{
  "status": "200",
  "message": "Password reset link sent to email"
}
```

- Помилка

```json
{
  "status": "404",
  "message": "User not found"
}
```

**Коди відповіді:**

- 200 — Посилання успішно надіслано
- 404 — Користувача не знайдено
- 500 — Помилка сервера

### POST /api/auth/password-change

**Призначення:** зміна пароля після того, як користувач отримав посилання для відновлення.

**Метод:** POST

**Параметри запиту:**

- `token` — токен з посилання для відновлення
- `password` — новий пароль

**Приклад запиту:**

```bash
POST api/auth/password-change
Content-Type: application/json

{
    "token": "reset_password_token",
    "password": "NewAb_12345",
}
```

**Приклад відповіді:**

- Успішно

```json
{
  "status": "200",
  "message": "Password successfully changed"
}
```

- Помилка

```json
{
  "status": "400",
  "message": "Invalid or expired token"
}
```

**Коди відповіді:**

- 200 — Пароль успішно змінено
- 400 — Некоректний або прострочений токен
- 422 — Паролі не співпадають
- 500 — Помилка сервера

## Особистий кабінет користувача

### GET /api/user/profile

**Призначення:** отримання даних профілю користувача (по ID).

### PUT /api/user/profile/{id}

**Призначення:** редагування даних профілю користувача.

**Метод:** PUT

**Параметри запиту:**

- `{id}` - унікальний ідентифікатор користувача (в URL).
- `name` — нове ім'я користувача.
- `email` — новий email користувача.
- `role` - нова роль користувача.

Приклад запиту:

```bash
PUT /api/user/profile/{id}
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "janedoe@example.com",
  "role": "seller"
}
```

**Приклад відповіді:**

- Успішно:

  ```bash
  {
  "status": "200",
  "message": "Profile updated successfully"
  }
  ```

- Помилка:

  ```json
  {
    "status": "400",
    "message": "Invalid data provided"
  }
  ```

**Коди відповіді:**

- 200 — Дані профілю успішно оновлено.
- 400 — Некоректні дані.
- 401 — Неавторизований доступ.
- 500 — Помилка сервера.

### GET /api/user/orders

**Призначення:** отримання історії замовлень користувача.

**Метод:** GET

**Приклад запиту:**

```bash
GET /api/user/orders
Authorization: Bearer JWT_TOKEN
```

**Приклад відповіді:**

- Успішно:

  ```json
  {
    "status": "200",
    "orders": [
      {
        "id": "12345",
        "date": "2024-11-20",
        "items": [
          {
            "product": "Laptop",
            "quantity": 1,
            "price": 1000
          }
        ],
        "total": 1000,
        "status": "Delivered"
      },
      {
        "id": "12346",
        "date": "2024-11-18",
        "items": [
          {
            "product": "Mouse",
            "quantity": 2,
            "price": 50
          }
        ],
        "total": 100,
        "status": "In Progress"
      }
    ]
  }
  ```

- Помилка:
  ```json
  {
    "status": "401",
    "message": "Unauthorized"
  }
  ```

**Коди відповіді:**

- 200 — Дані про замовлення успішно отримано.
- 401 — Неавторизований доступ.
- 500 — Помилка сервера.

### DELETE /api/user/{id}

**Призначення:** видалити акаунт користувача (за ID).

**Метод:** DELETE

**Параметри запиту:**

- `{id}` — унікальний ідентифікатор користувача (в URL).

**Приклад запиту:**

```bash
DELETE /api/user/12345
Authorization: Bearer JWT_TOKEN
```

**Приклад відповіді:**

- Успішно:

  ```json
  {
    "status": "200",
    "message": "User account deleted successfully"
  }
  ```

- Помилка:

  ```json
  {
    "status": "404",
    "message": "User not found"
  }
  ```

  **Коди відповіді:**

- 200 — Акаунт успішно видалено.
- 401 — Неавторизований доступ.
- 404 — Користувача не знайдено.
- 500 — Помилка сервера.

## Товари (для продавця)

### GET /api/products

**Призначення:** отримання списку товарів

### POST /api/products

**Призначення:** додавання нового товару (назва, опис, фото, категорія, ціна, кількість).

**Метод:** POST

**Параметри запиту:**

- `name` — назва товару
- `description` — опис товару
- `photo` — фото товару (файл)
- `category` — категорія товару
- `price` — ціна товару
- `quantity` — кількість товару на складі

**Приклад запиту:**

```bash
POST api/products
Authorization: Bearer JWT_TOKEN
Content-Type: multipart/form-data

{
    "name": "Смартфон XYZ",
    "description": "Новий смартфон з потужним процесором",
    "photo": [файл],
    "category": "electronics",
    "price": 15000
}
```

**Приклад відповіді:**

- Успішно

```json
{
  "status": "201",
  "message": "Product successfully created",
  "data": {
    "id": "1",
    "name": "Смартфон XYZ",
    "description": "Новий смартфон з потужним процесором",
    "photo_url": "https://example.com/photos/xyz.jpg",
    "category": "electronics",
    "price": 15000
  }
}
```

- Помилка

```json
{
  "status": "400",
  "message": "Invalid product data"
}
```

**Коди відповіді:**

- 201 — Товар успішно створено
- 400 — Некоректні дані товару
- 401 — Не авторизований
- 500 — Помилка сервера

### PUT /api/products/{id}

**Призначення:** редагування інформації про товар (за ID товару).

**Метод:** PUT

**Параметри запиту:**

- `name` (опціонально) — назва товару
- `description` (опціонально) — опис товару
- `photo` (опціонально) — фото товару (файл)
- `category` (опціонально) — категорія товару
- `price` (опціонально) — ціна товару

**Приклад запиту:**

```bash
PUT api/products/1
Authorization: Bearer JWT_TOKEN
Content-Type: multipart/form-data

{
  "name": "Смартфон XYZ",
  "description": "Новий смартфон з потужним процесором",
  "photo": [файл],
  "category": "electronics",
  "price": 14000,
}
```

**Приклад відповіді:**

- Успішно

```json
{
  "status": "200",
  "message": "Product successfully updated",
  "data": {
    "id": "1",
    "name": "Смартфон XYZ",
    "description": "Новий смартфон з потужним процесором",
    "photo_url": "https://example.com/photos/xyz.jpg",
    "category": "electronics",
    "price": 14000
  }
}
```

- Помилка

```json
{
  "status": "404",
  "message": "Product not found"
}
```

**Коди відповіді:**

- 200 — Товар успішно оновлено
- 400 — Некоректні дані товару
- 401 — Не авторизований
- 404 — Товар не знайдено
- 500 — Помилка сервера

### DELETE /api/products/{id}

**Призначення:** видалення товару (за ID товару).

**Метод:** DELETE

**Параметри запиту:**

- `id` — ідентифікатор товару (в URL)

**Приклад запиту:**

```bash
DELETE api/products/1
Authorization: Bearer JWT_TOKEN
```

**Приклад відповіді:**

- Успішно

```json
{
  "status": "200",
  "message": "Product successfully deleted"
}
```

- Помилка

```json
{
  "status": "404",
  "message": "Product not found"
}
```

**Коди відповіді:**

- 200 — Товар успішно видалено
- 401 — Не авторизований
- 404 — Товар не знайдено
- 500 — Помилка сервера

## Оформлення замовлення

### POST /api/orders

**Призначення:** оформлення нового замовлення.

**Метод:** POST

**Параметри запиту:**

- `delivery_address` — об'єкт з адресою доставки:
  - `city` — місто
  - `street` — вулиця
  - `house_number` — номер будинку
  - `apartment` (опціонально) — номер квартири
  - `recipient_name` — ім'я отримувача
  - `phone_number` — номер телефону
- `payment_method` — спосіб оплати (card, cash)
- `items` — масив товарів:
  - `product_id` — ідентифікатор товару
  - `quantity` — кількість одиниць товару
- `notes` (опціонально) — примітки до замовлення

**Приклад запиту:**

```bash
POST api/orders
Authorization: Bearer JWT_TOKEN
Content-Type: application/json

{
    "delivery_address": {
        "city": "Київ",
        "street": "вул. Хрещатик",
        "house_number": "1",
        "apartment": "5",
        "recipient_name": "Іван Петренко",
        "phone_number": "+380501234567"
    },
    "payment_method": "card",
    "items": [
        {
            "product_id": "1",
            "quantity": 2
        },
        {
            "product_id": "3",
            "quantity": 1
        }
    ],
    "notes": "Дзвонити за 30 хвилин до доставки"
}
```

**Приклад відповіді:**

- Успішно

```json
{
  "status": "201",
  "message": "Order successfully created",
  "data": {
    "order_id": "12345",
    "created_at": "2024-03-22T10:30:00Z",
    "status": "pending",
    "total_amount": 44000,
    "delivery_address": {
      "city": "Київ",
      "street": "вул. Хрещатик",
      "house_number": "1",
      "apartment": "5",
      "recipient_name": "Іван Петренко",
      "phone_number": "+380501234567"
    },
    "payment_method": "card",
    "items": [
      {
        "product_id": "1",
        "name": "Смартфон XYZ",
        "price": 15000,
        "quantity": 2,
        "subtotal": 30000
      },
      {
        "product_id": "3",
        "name": "Навушники ABC",
        "price": 14000,
        "quantity": 1,
        "subtotal": 14000
      }
    ],
    "notes": "Дзвонити за 30 хвилин до доставки"
  }
}
```

- Помилка

```json
{
  "status": "400",
  "message": "Invalid order data",
  "errors": ["Product with id 1 is out of stock", "Invalid phone number format"]
}
```

**Коди відповіді:**

- 201 — Замовлення успішно створено
- 400 — Некоректні дані замовлення
- 401 — Не авторизований
- 422 — Недостатня кількість товару на складі
- 500 — Помилка сервера

### GET /api/orders/{id}

**Призначення:** отримання детальної інформації про замовлення (по ID).

**Метод:** GET

**Параметри запиту:**

- `id` — ідентифікатор замовлення (в URL)

**Приклад запиту:**

```bash
GET api/orders/12345
Authorization: Bearer JWT_TOKEN
```

**Приклад відповіді:**

- Успішно

```json
{
  "status": "200",
  "data": {
    "order_id": "12345",
    "created_at": "2024-03-22T10:30:00Z",
    "updated_at": "2024-03-22T10:35:00Z",
    "status": "processing",
    "total_amount": 44000,
    "delivery_address": {
      "city": "Київ",
      "street": "вул. Хрещатик",
      "house_number": "1",
      "apartment": "5",
      "recipient_name": "Іван Петренко",
      "phone_number": "+380501234567"
    },
    "payment_method": "card",
    "payment_status": "paid",
    "items": [
      {
        "product_id": "1",
        "name": "Смартфон XYZ",
        "price": 15000,
        "quantity": 2,
        "subtotal": 30000
      },
      {
        "product_id": "3",
        "name": "Навушники ABC",
        "price": 14000,
        "quantity": 1,
        "subtotal": 14000
      }
    ],
    "status_history": [
      {
        "status": "pending",
        "timestamp": "2024-03-22T10:30:00Z"
      },
      {
        "status": "processing",
        "timestamp": "2024-03-22T10:35:00Z"
      }
    ],
    "notes": "Дзвонити за 30 хвилин до доставки"
  }
}
```

- Помилка

```json
{
  "status": "404",
  "message": "Order not found"
}
```

**Коди відповіді:**

- 200 — Успішно отримано інформацію про замовлення
- 401 — Не авторизований
- 403 — Немає прав для перегляду цього замовлення
- 404 — Замовлення не знайдено
- 500 — Помилка сервера

## Активні замовлення для продавця

### GET /api/seller/orders

**Призначення:** отримання списку активних замовлень для продавця.

**Метод:** GET

**Параметри запиту (query parameters):**

- `status` (опціонально) — фільтр за статусом замовлення (pending, processing, shipped, delivered, cancelled)
- `date_from` (опціонально) — фільтр за датою (від)
- `date_to` (опціонально) — фільтр за датою (до)
- `sort` (опціонально) — сортування (date_asc, date_desc, amount_asc, amount_desc)
- `page` (опціонально) — номер сторінки (за замовчуванням: 1)
- `limit` (опціонально) — кількість замовлень на сторінці (за замовчуванням: 10)

**Приклад запиту:**

```bash
GET api/seller/orders?status=processing&date_from=2024-03-01&date_to=2024-03-22&sort=date_desc&page=1&limit=10
Authorization: Bearer JWT_TOKEN
```

**Приклад відповіді:**

- Успішно

```json
{
  "status": "200",
  "data": {
    "items": [
      {
        "order_id": "12345",
        "created_at": "2024-03-22T10:30:00Z",
        "status": "processing",
        "total_amount": 44000,
        "customer": {
          "name": "Іван Петренко",
          "phone": "+380501234567"
        },
        "delivery_address": {
          "city": "Київ",
          "street": "вул. Хрещатик",
          "house_number": "1",
          "apartment": "5",
          "postal_code": "01001"
        },
        "items": [
          {
            "product_id": "1",
            "name": "Смартфон XYZ",
            "quantity": 2,
            "subtotal": 30000
          },
          {
            "product_id": "3",
            "name": "Навушники ABC",
            "quantity": 1,
            "subtotal": 14000
          }
        ],
        "payment_status": "paid",
        "notes": "Дзвонити за 30 хвилин до доставки"
      }
    ],
    "total": 45,
    "page": 1,
    "pages": 5
  }
}
```

- Помилка

```json
{
  "status": "400",
  "message": "Invalid date range"
}
```

**Коди відповіді:**

- 200 — Успішно отримано список замовлень
- 400 — Некоректні параметри запиту
- 401 — Не авторизований
- 403 — Немає прав продавця
- 500 — Помилка сервера

### PUT /api/seller/orders/{id}/status

**Призначення:** зміна статусу замовлення (наприклад, "Обробляється", "Відправлено").

**Метод:** PUT

**Параметри запиту:**

- `status` — новий статус замовлення:
  - `pending` — очікує обробки
  - `processing` — обробляється
  - `shipped` — відправлено
  - `delivered` — доставлено
  - `cancelled` — скасовано
- `tracking_number` (опціонально) — номер відстеження посилки (обов'язковий для статусу "shipped")
- `status_comment` (опціонально) — коментар до зміни статусу

**Приклад запиту:**

```bash
PUT api/seller/orders/12345/status
Authorization: Bearer JWT_TOKEN
Content-Type: application/json

{
    "status": "shipped",
    "tracking_number": "NP1234567890UA",
    "status_comment": "Відправлено Новою Поштою"
}
```

**Приклад відповіді:**

- Успішно

```json
{
  "status": "200",
  "message": "Order status successfully updated",
  "data": {
    "order_id": "12345",
    "previous_status": "processing",
    "current_status": "shipped",
    "updated_at": "2024-03-22T15:30:00Z",
    "tracking_number": "NP1234567890UA",
    "status_history": [
      {
        "status": "pending",
        "timestamp": "2024-03-22T10:30:00Z",
        "comment": null
      },
      {
        "status": "processing",
        "timestamp": "2024-03-22T10:35:00Z",
        "comment": "Замовлення прийнято в обробку"
      },
      {
        "status": "shipped",
        "timestamp": "2024-03-22T15:30:00Z",
        "comment": "Відправлено Новою Поштою",
        "tracking_number": "NP1234567890UA"
      }
    ]
  }
}
```

- Помилка

```json
{
  "status": "400",
  "message": "Invalid status transition",
  "details": "Cannot change status from 'delivered' to 'processing'"
}
```

**Коди відповіді:**

- 200 — Статус замовлення успішно оновлено
- 400 — Некоректний статус або перехід між статусами
- 401 — Не авторизований
- 403 — Немає прав продавця
- 404 — Замовлення не знайдено
- 422 — Відсутній номер відстеження для статусу "shipped"
- 500 — Помилка сервера

## Пошук товарів

### GET /api/products/search

**Призначення:** пошук товарів за ключовими словами.

**Метод:** GET

**Параметри запиту (query parameters):**

- `q` — пошуковий запит (ключові слова)
- `category` (опціонально) — фільтр за категорією
- `min_price` (опціонально) — мінімальна ціна
- `max_price` (опціонально) — максимальна ціна
- `in_stock` (опціонально) — наявність на складі (true/false)
- `sort` (опціонально) — сортування (relevance, price_asc, price_desc, name_asc, name_desc)
- `page` (опціонально) — номер сторінки (за замовчуванням: 1)
- `limit` (опціонально) — кількість товарів на сторінці (за замовчуванням: 20)

**Приклад запиту:**

```bash
GET api/products/search?q=смартфон&category=electronics&min_price=10000&max_price=20000&in_stock=true&sort=relevance&page=1&limit=20
```

**Приклад відповіді:**

- Успішно

```json
{
  "status": "200",
  "data": {
    "items": [
      {
        "id": "1",
        "name": "Смартфон XYZ",
        "description": "Новий смартфон з потужним процесором",
        "photo_url": "https://example.com/photos/xyz.jpg",
        "category": "electronics",
        "price": 15000,
        "quantity": 10,
        "rating": 4.5,
        "reviews_count": 28,
        "relevance_score": 0.95
      }
    ],
    "total": 156,
    "page": 1,
    "pages": 8,
    "filters": {
      "categories": [
        {
          "name": "electronics",
          "count": 120
        },
        {
          "name": "accessories",
          "count": 36
        }
      ],
      "price_range": {
        "min": 10000,
        "max": 20000
      }
    },
    "applied_filters": {
      "q": "смартфон",
      "category": "electronics",
      "min_price": 10000,
      "max_price": 20000,
      "in_stock": true
    }
  }
}
```

- Помилка

```json
{
  "status": "400",
  "message": "Invalid price range"
}
```

**Коди відповіді:**

- 200 — Успішно знайдено товари
- 400 — Некоректні параметри пошуку
- 500 — Помилка сервера

## Перегляд картки замовлення

### GET /api/orders/{id}/details

**Призначення:** отримання детальної інформації про замовлення (для покупця і продавця).

**Метод:** GET

**Параметри запиту:**

- `id` — ідентифікатор замовлення (в URL)

**Приклад запиту:**

```bash
GET api/orders/12345/details
Authorization: Bearer JWT_TOKEN
```

**Приклад відповіді:**

- Успішно

```json
{
  "status": "200",
  "data": {
    "order": {
      "id": "12345",
      "created_at": "2024-03-22T10:30:00Z",
      "updated_at": "2024-03-22T15:30:00Z",
      "status": "shipped",
      "total_amount": 44000
    },
    "customer": {
      "id": "user123",
      "name": "Іван Петренко",
      "phone": "+380501234567",
      "email": "ivan@example.com"
    },
    "seller": {
      "id": "seller456",
      "name": "Електроніка Store",
      "phone": "+380671234567",
      "email": "store@example.com"
    },
    "delivery": {
      "address": {
        "city": "Київ",
        "street": "вул. Хрещатик",
        "house_number": "1",
        "apartment": "5",
        "postal_code": "01001"
      },
      "tracking_number": "NP1234567890UA",
      "carrier": "Нова Пошта",
      "estimated_delivery": "2024-03-24"
    },
    "payment": {
      "method": "card",
      "status": "paid",
      "payment_date": "2024-03-22T10:35:00Z",
      "transaction_id": "pay_789xyz"
    },
    "items": [
      {
        "product_id": "1",
        "name": "Смартфон XYZ",
        "photo_url": "https://example.com/photos/xyz.jpg",
        "price": 15000,
        "quantity": 2,
        "subtotal": 30000
      },
      {
        "product_id": "3",
        "name": "Навушники ABC",
        "photo_url": "https://example.com/photos/abc.jpg",
        "price": 14000,
        "quantity": 1,
        "subtotal": 14000
      }
    ],
    "status_history": [
      {
        "status": "pending",
        "timestamp": "2024-03-22T10:30:00Z",
        "comment": "Замовлення створено"
      },
      {
        "status": "processing",
        "timestamp": "2024-03-22T10:35:00Z",
        "comment": "Оплату підтверджено"
      },
      {
        "status": "shipped",
        "timestamp": "2024-03-22T15:30:00Z",
        "comment": "Відправлено Новою Поштою",
        "tracking_number": "NP1234567890UA"
      }
    ],
    "notes": "Дзвонити за 30 хвилин до доставки",
    "available_actions": {
      "can_cancel": false,
      "can_change_address": false,
      "can_leave_review": false
    }
  }
}
```

- Помилка

```json
{
  "status": "404",
  "message": "Order not found"
}
```

**Коди відповіді:**

- 200 — Успішно отримано деталі замовлення
- 401 — Не авторизований
- 403 — Немає прав для перегляду цього замовлення
- 404 — Замовлення не знайдено
- 500 — Помилка сервера
