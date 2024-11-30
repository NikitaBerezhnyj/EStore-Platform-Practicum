# API специфікація

- [API специфікація](#api-специфікація)
  - [Авторизація та реєстрація](#авторизація-та-реєстрація)
    - [POST /api/auth/login](#post-apiauthlogin)
    - [POST /api/auth/register](#post-apiauthregister)
    - [POST /api/auth/password-reset](#post-apiauthpassword-reset)
    - [POST /api/auth/password-change/{token}](#post-apiauthpassword-changetoken)
  - [Особистий кабінет користувача](#особистий-кабінет-користувача)
    - [GET /api/user/{id}](#get-apiuserid)
    - [PUT /api/user/{id}](#put-apiuserid)
    - [DELETE /api/user/{id}](#delete-apiuserid)
  - [Товари](#товари)
    - [POST /api/product](#post-apiproduct)
    - [GET /api/product/{id}](#get-apiproductid)
    - [GET /api/products](#get-apiproducts)
    - [PUT /api/product/{id}](#put-apiproductid)
    - [DELETE /api/product/{id}](#delete-apiproductid)
  - [Замовлення](#замовлення)
    - [POST /api/order](#post-apiorder)
    - [GET /api/order/{id}](#get-apiorderid)
    - [DELETE /api/order/{id}](#delete-apiorderid)
  - [Пошук товарів](#пошук-товарів)
    - [GET /api/products/search](#get-apiproductssearch)
  - [Завантаження зображень](#завантаження-зображень)
    - [POST /api/upload](#post-apiupload)

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
    "message": "User logged in",
    "token": "JWT_TOKEN"
  }
  ```

- Помилка
  ```json
  {
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
  "message": "User successfully registered",
  "token": "JWT_TOKEN"
}
```

- Помилка

```json
{
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
  "message": "Password reset link sent to email"
}
```

- Помилка

```json
{
  "message": "User not found"
}
```

**Коди відповіді:**

- 200 — Посилання успішно надіслано
- 404 — Користувача не знайдено
- 500 — Помилка сервера

### POST /api/auth/password-change/{token}

**Призначення:** зміна пароля після того, як користувач отримав посилання для відновлення.

**Метод:** POST

**Параметри запиту:**

- `token` — токен з посилання для відновлення (передається через params)
- `password` — новий пароль

**Приклад запиту:**

```bash
POST api/auth/password-change/ee95318bdcbe17b2c056200aef2e4bc9a25d30f23ea1c25b49b7eb660f34a57f
Content-Type: application/json

{
    "password": "NewAb_12345",
}
```

**Приклад відповіді:**

- Успішно

```json
{
  "message": "Password successfully changed"
}
```

- Помилка

```json
{
  "message": "Invalid or expired token"
}
```

**Коди відповіді:**

- 200 — Пароль успішно змінено
- 400 — Некоректний або прострочений токен
- 422 — Паролі не співпадають
- 500 — Помилка сервера

## Особистий кабінет користувача

### GET /api/user/{id}

**Призначення:** отримання даних профілю користувача (по ID).

**Метод:** GET

**Параметри запиту:**

- `{id}` - унікальний ідентифікатор користувача (в URL).

**Приклад запиту:**

```bash
GET /api/user/{id}
```

**Приклад відповіді:**

- Успішно:

  ```json
  {
    "name": "Alex Smith",
    "email": "alexsmith@example.com",
    "phone": "+380673244890",
    "orders": [
      {
        "id": "b213f8e7a8b13d4c975e8d7b",
        "date": "2024-11-15T14:32:45.123Z",
        "items": [
          {
            "product": "Smartwatch Alpha",
            "price": 2500,
            "quantity": 1,
            "totalItemPrice": 2500
          }
        ],
        "total": 2500,
        "status": "Delivered",
        "delivery_address": {
          "city": "Одеса",
          "street": "вул. Дерибасівська",
          "house_number": "12",
          "apartment": "3",
          "recipient_name": "Олексій Степанов",
          "phone": "+380673244890"
        },
        "payment_method": "card",
        "notes": "Leave at the door"
      },
      {
        "id": "e4327f9a7b2c44d8a4c6d9f4",
        "date": "2024-11-10T10:25:30.456Z",
        "items": [
          {
            "product": "Bluetooth Earphones Pro",
            "price": 900,
            "quantity": 2,
            "totalItemPrice": 1800
          }
        ],
        "total": 1800,
        "status": "In Progress",
        "delivery_address": {
          "city": "Львів",
          "street": "вул. Шевченка",
          "house_number": "23",
          "apartment": "7",
          "recipient_name": "Марина Іванова",
          "phone": "+380673244891"
        },
        "payment_method": "cash",
        "notes": "Delivery after 5 PM"
      }
    ]
  }
  ```

- Помилка:
  ```json
  {
    "message": "Unauthorized"
  }
  ```

**Коди відповіді:**

- 200 — Дані про замовлення успішно отримано.
- 401 — Неавторизований доступ.
- 500 — Помилка сервера.

### PUT /api/user/{id}

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
  "phone": "+380501234567",
  "role": "seller"
}
```

**Приклад відповіді:**

- Успішно:

  ```bash
  {
  "message": "Profile updated successfully"
  }
  ```

- Помилка:

  ```json
  {
    "message": "Invalid data provided"
  }
  ```

**Коди відповіді:**

- 200 — Дані профілю успішно оновлено.
- 400 — Некоректні дані.
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
```

**Приклад відповіді:**

- Успішно:

  ```json
  {
    "message": "User account deleted successfully"
  }
  ```

- Помилка:

  ```json
  {
    "message": "User not found"
  }
  ```

  **Коди відповіді:**

- 200 — Акаунт успішно видалено.
- 401 — Неавторизований доступ.
- 404 — Користувача не знайдено.
- 500 — Помилка сервера.

## Товари

### POST /api/product

**Призначення:** додавання нового товару (назва, опис, фото, категорія, ціна, кількість).

**Метод:** POST

**Параметри запиту:**

- `seller_id` - id продавця, який створив продукт
- `name` — назва товару
- `description` — опис товару
- `photo_url` — посилання на фото збереженого на сервері
- `category` — категорія товару
- `price` — ціна товару

**Приклад запиту:**

```bash
POST api/product
Content-Type: multipart/form-data

{
    "seller_id": "1",
    "name": "Смартфон XYZ",
    "description": "Новий смартфон з потужним процесором",
    "photo_url": "http:localhost:5000/uploads/products/photos.jpg",
    "category": "electronics",
    "price": 15000
}
```

**Приклад відповіді:**

- Успішно

```json
{
  "message": "Product successfully created"
}
```

- Помилка

```json
{
  "message": "Invalid product data"
}
```

**Коди відповіді:**

- 201 — Товар успішно створено
- 400 — Некоректні дані товару
- 401 — Не авторизований
- 500 — Помилка сервера

### GET /api/product/{id}

**Призначення:** Отримання товару за id.

**Метод:** GET

**Параметри запиту:**

- `id` — ідентифікатор товару (обов'язковий параметр).

**Приклад запиту:**

```bash
GET /api/product/1
```

**Приклад відповіді:**

- Успішно:

```json
{
  "_id": "1",
  "seller_id": "1",
  "name": "Смартфон XYZ Pro",
  "description": "Оновлений смартфон з потужним процесором",
  "photo_url": "http://localhost:5000/uploads/products/photo.jpg",
  "category": "electronics",
  "price": 18000,
  "createdAt": "2024-11-30T16:45:36.260Z",
  "updatedAt": "2024-11-30T16:45:36.263Z",
  "__v": 0
}
```

- Помилка (товар не знайдено):

```json
{
  "message": "Product not found"
}
```

- Помилка (відсутній `id`):

```json
{
  "message": "Product ID is required"
}
```

**Коди відповіді:**

- 200 — Товар знайдено.
- 400 — Некоректні параметри запиту (відсутній `id`).
- 404 — Товар не знайдено.
- 500 — Помилка сервера.

### GET /api/products

**Призначення:** Отримання всіх товарів.

**Метод:** GET

**Параметри запиту:**

- Немає параметрів запиту.

**Приклад запиту:**

```bash
GET /api/products
```

**Приклад відповіді:**

- Успішно:

```json
[
  {
    "_id": "1",
    "seller_id": "1",
    "name": "Смартфон XYZ Pro",
    "description": "Оновлений смартфон з потужним процесором",
    "photo_url": "http://localhost:5000/uploads/products/photo_updated.jpg",
    "category": "electronics",
    "price": 18000,
    "createdAt": "2024-11-30T16:45:36.260Z",
    "updatedAt": "2024-11-30T16:45:36.263Z",
    "__v": 0
  },
  {
    "_id": "2",
    "seller_id": "1",
    "name": "Смартфон XYZ",
    "description": "Новий смартфон з потужним процесором",
    "photo_url": "http://localhost:5000/uploads/products/photo.jpg",
    "category": "electronics",
    "price": 15000,
    "createdAt": "2024-11-30T18:41:38.266Z",
    "updatedAt": "2024-11-30T18:41:38.271Z",
    "__v": 0
  }
]
```

- Помилка (немає товарів):

```json
{
  "message": "No products found"
}
```

**Коди відповіді:**

- 200 — Успішно знайдено товари.
- 404 — Товари не знайдено.
- 500 — Помилка сервера.

### PUT /api/product/{id}

**Призначення:** редагування інформації про товар (за ID товару).

**Метод:** PUT

**Параметри запиту:**

- `seller_id` - id продавця, який створив продукт
- `id` - унікальний ідентифікатор товару
- `name` — назва товару
- `description` — опис товару
- `photo_url` — посилання на зображення збережене на сервері
- `category` — категорія товару
- `price` — ціна товару

**Приклад запиту:**

```bash
PUT api/product/1
Content-Type: multipart/form-data

{
  "seller_id": "1",
  "name": "Смартфон XYZ",
  "description": "Новий смартфон з потужним процесором",
  "photo_url": "http:localhost:5000/uploads/products/photos.jpg",
  "category": "electronics",
  "price": 14000,
}
```

**Приклад відповіді:**

- Успішно

```json
{
  "message": "Product successfully updated"
}
```

- Помилка

```json
{
  "message": "Product not found"
}
```

**Коди відповіді:**

- 200 — Товар успішно оновлено
- 400 — Некоректні дані товару
- 401 — Не авторизований
- 404 — Товар не знайдено
- 500 — Помилка сервера

### DELETE /api/product/{id}

**Призначення:** видалення товару (за ID товару).

**Метод:** DELETE

**Параметри запиту:**

- `id` — ідентифікатор товару (в URL)

**Приклад запиту:**

```bash
DELETE api/product/1
```

**Приклад відповіді:**

- Успішно

```json
{
  "message": "Product successfully deleted"
}
```

- Помилка

```json
{
  "message": "Product not found"
}
```

**Коди відповіді:**

- 200 — Товар успішно видалено
- 401 — Не авторизований
- 404 — Товар не знайдено
- 500 — Помилка сервера

## Замовлення

### POST /api/order

**Призначення:** оформлення нового замовлення.

**Метод:** POST

**Параметри запиту:**

- `delivery_address` — об'єкт з адресою доставки:
  - `city` — місто
  - `street` — вулиця
  - `house_number` — номер будинку
  - `apartment` (опціонально) — номер квартири
  - `recipient_name` — ім'я отримувача
  - `phone` — номер телефону
- `payment_method` — спосіб оплати (card, cash)
- `items` — масив товарів:
  - `product_id` — ідентифікатор товару
- `notes` (опціонально) — примітки до замовлення

**Приклад запиту:**

```bash
POST api/order
Content-Type: application/json
```

```json
{
  "customer": "2",
  "seller": "1",
  "delivery_address": {
    "city": "Київ",
    "street": "вул. Хрещатик",
    "house_number": "1",
    "apartment": "5",
    "recipient_name": "Іван Петренко",
    "phone": "+380501234567"
  },
  "payment_method": "cash",
  "items": [
    {
      "product": "1",
      "quantity": 2
    }
  ],
  "total": 200,
  "status": "Pending",
  "note": "Зателефонуйте за 30 хвилин до доставки"
}
```

**Приклад відповіді:**

- Успішно

```json
{
  "message": "Order successfully created"
}
```

- Помилка

```json
{
  "message": "Invalid order data"
}
```

**Коди відповіді:**

- 201 — Замовлення успішно створено
- 400 — Некоректні дані замовлення
- 401 — Не авторизований
- 422 — Недостатня кількість товару на складі
- 500 — Помилка сервера

### GET /api/order/{id}

**Призначення:** отримання детальної інформації про замовлення (по ID).

**Метод:** GET

**Параметри запиту:**

- `id` — ідентифікатор замовлення (в URL)

**Приклад запиту:**

```bash
GET api/order/12345
```

**Приклад відповіді:**

- Успішно

```json
{
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
      "phone": "+380501234567"
    },
    "payment_method": "card",
    "payment_status": false,
    "items": [
      {
        "product_id": "1",
        "name": "Смартфон XYZ",
        "price": 15000,
        "subtotal": 30000
      },
      {
        "product_id": "3",
        "name": "Навушники ABC",
        "price": 14000,
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
  "message": "Order not found"
}
```

**Коди відповіді:**

- 200 — Успішно отримано інформацію про замовлення
- 401 — Не авторизований
- 403 — Немає прав для перегляду цього замовлення
- 404 — Замовлення не знайдено
- 500 — Помилка сервера

### DELETE /api/order/{id}

**Призначення:** видалити замовлення (за ID).

**Метод:** DELETE

**Параметри запиту:**

- `{id}` — унікальний ідентифікатор замовлення (в URL).

**Приклад запиту:**

```bash
DELETE /api/order/12345
```

**Приклад відповіді:**

- Успішно:

  ```json
  {
    "message": "Order deleted successfully"
  }
  ```

- Помилка:

  ```json
  {
    "message": "Order not found"
  }
  ```

  **Коди відповіді:**

- 200 — Акаунт успішно видалено.
- 401 — Неавторизований доступ.
- 404 — Користувача не знайдено.
- 500 — Помилка сервера.

## Пошук товарів

### GET /api/products/search

**Призначення:** пошук товарів за ключовими словами.

**Метод:** GET

**Параметри запиту (query parameters):**

- `q` — пошуковий запит (ключові слова)
- `category` (опціонально) — фільтр за категорією
- `min_price` (опціонально) — мінімальна ціна
- `max_price` (опціонально) — максимальна ціна

**Приклад запиту:**

```bash
GET /api/products/search?q=смартфон&category=electronics&min_price=10000&max_price=20000
```

**Приклад відповіді:**

- Успішно

```json
{
  "products": [
    {
      "_id": "674b4130d610f247670ab1ce",
      "seller_id": "674a20082f2ac342ca1e2086",
      "name": "Смартфон XYZ Pro",
      "description": "Оновлений смартфон з потужним процесором",
      "photo_url": "http://localhost:5000/uploads/products/photo_updated.jpg",
      "category": "electronics",
      "price": 18000,
      "createdAt": "2024-11-30T16:45:36.260Z",
      "updatedAt": "2024-11-30T16:45:36.263Z",
      "__v": 0
    },
    {
      "_id": "674b5c62ee16e47d6da93a23",
      "seller_id": "674a20082f2ac342ca1e2086",
      "name": "Смартфон XYZ",
      "description": "Новий смартфон з потужним процесором",
      "photo_url": "http://localhost:5000/uploads/products/photo.jpg",
      "category": "electronics",
      "price": 15000,
      "createdAt": "2024-11-30T18:41:38.266Z",
      "updatedAt": "2024-11-30T18:41:38.271Z",
      "__v": 0
    }
  ]
}
```

- Помилка

```json
{
  "message": "Invalid price range"
}
```

**Коди відповіді:**

- 200 — Успішно знайдено товари
- 400 — Некоректні параметри пошуку
- 500 — Помилка сервера

## Завантаження зображень

### POST /api/upload

**Призначення:** Завантаження зображення та збереження його в теку `uploads`.

**Метод:** POST

**Параметри запиту:**

- `image` — файл зображення, який завантажується (тип файлу: зображення, наприклад .jpg, .png).

**Приклад запиту:**

```bash
POST http://localhost:5000/api/upload
Content-Type: multipart/form-data

image=@/path/to/your/image.jpg
```

**Приклад відповіді:**

- Успішно

  ```json
  {
    "message": "File uploaded successfully",
    "path": "uploads/image_2024-11-30_12-34-56.jpg"
  }
  ```

- Помилка — файл не завантажено

  ```json
  {
    "message": "No file uploaded"
  }
  ```

**Коди відповіді:**

- 200 — Файл успішно завантажено.
- 400 — Не було завантажено жодного файлу.
- 500 — Помилка сервера під час обробки файлу.
