require("dotenv").config();
const mongoose = require("mongoose");
const connectionDB = require("../config/dbConfig");
const { User } = require("../models/userModel");
const { Product } = require("../models/productModel");
const { Order } = require("../models/orderModel");

const seedUser = [
  {
    _id: "638c9bbf8b3b3f5ad5f9b9c8",
    name: "Ivan Petrov",
    role: "customer",
    email: "ivan.petrov@example.com",
    phone: "+380501234567",
    avatar_url: "http://localhost:3001/uploads/avatar_ivan.jpg",
    password: "password123"
  },
  {
    _id: "638c9bbf8b3b3f5ad5f9b9c9",
    name: "Maria Ivanova",
    role: "seller",
    email: "maria.ivanova@example.com",
    phone: "+380961234567",
    avatar_url: "http://localhost:3001/uploads/avatar_maria.jpg",
    password: "password456"
  },
  {
    _id: "638c9bbf8b3b3f5ad5f9b9ca",
    name: "Olga Sidorova",
    role: "customer",
    email: "olga.sidorova@example.com",
    phone: "+380971234567",
    avatar_url: "http://localhost:3001/uploads/avatar_olga.jpg",
    password: "password789"
  },
  {
    _id: "638c9bbf8b3b3f5ad5f9b9cb",
    name: "Dmytro Kovalenko",
    role: "customer",
    email: "dmytro.kovalenko@example.com",
    phone: "+380931234567",
    avatar_url: "http://localhost:3001/uploads/avatar_dmytro.jpg",
    password: "password101"
  },
  {
    _id: "638c9bbf8b3b3f5ad5f9b9cc",
    name: "Anna Orlova",
    role: "seller",
    email: "anna.orlova@example.com",
    phone: "+380671234567",
    avatar_url: "http://localhost:3001/uploads/avatar_anna.jpg",
    password: "password202"
  },
  {
    _id: "638c9bbf8b3b3f5ad5f9b9cd",
    name: "Igor Petrov",
    role: "customer",
    email: "igor.petrov@example.com",
    phone: "+380631234567",
    avatar_url: "http://localhost:3001/uploads/avatar_igor.jpg",
    password: "password303"
  }
];

const seedProduct = [
  {
    _id: "638c9bbf8b3b3f5ad5f9b9d0",
    seller_id: "638c9bbf8b3b3f5ad5f9b9c9",
    name: "Smartphone",
    description: "Смартфон з 6.5-дюймовим екраном і потужним процесором.",
    photo_url: "http://localhost:3001/uploads/smartphone.jpg",
    category: "electronics",
    price: 12000
  },
  {
    _id: "638c9bbf8b3b3f5ad5f9b9d1",
    seller_id: "638c9bbf8b3b3f5ad5f9b9c9",
    name: "T-shirt",
    description: "Футболка з високоякісного матеріалу.",
    photo_url: "http://localhost:3001/uploads/tshirt.jpg",
    category: "clothing",
    price: 500
  },
  {
    _id: "638c9bbf8b3b3f5ad5f9b9d2",
    seller_id: "638c9bbf8b3b3f5ad5f9b9c9",
    name: "Wooden Chair",
    description: "Дерев'яний стілець для дому або офісу.",
    photo_url: "http://localhost:3001/uploads/chair.jpg",
    category: "furniture",
    price: 1500
  },
  {
    _id: "638c9bbf8b3b3f5ad5f9b9d3",
    seller_id: "638c9bbf8b3b3f5ad5f9b9cc",
    name: "Leather Wallet",
    description: "Елегантний шкіряний гаманця.",
    photo_url: "http://localhost:3001/uploads/wallet.jpg",
    category: "accessories",
    price: 800
  },
  {
    _id: "638c9bbf8b3b3f5ad5f9b9d4",
    seller_id: "638c9bbf8b3b3f5ad5f9b9cc",
    name: "Running Shoes",
    description: "Комфортні кросівки для бігу.",
    photo_url: "http://localhost:3001/uploads/shoes.jpg",
    category: "sports",
    price: 2000
  },
  {
    _id: "638c9bbf8b3b3f5ad5f9b9d5",
    seller_id: "638c9bbf8b3b3f5ad5f9b9cc",
    name: "Office Desk",
    description: "Сучасний офісний стіл з міцного дерева.",
    photo_url: "http://localhost:3001/uploads/desk.jpg",
    category: "furniture",
    price: 3500
  }
];

const seedOrder = [
  {
    _id: "638c9bbf8b3b3f5ad5f9b9e0",
    customer: "638c9bbf8b3b3f5ad5f9b9c8",
    seller: "638c9bbf8b3b3f5ad5f9b9c9",
    date: "2024-12-07T10:30:00Z",
    delivery_address: {
      city: "Kyiv",
      street: "Shevchenka Street",
      house_number: "25",
      apartment: "10",
      recipient_name: "Ivan Petrov",
      phone: "+380501234567"
    },
    payment_method: "card",
    payment_status: true,
    items: [
      {
        product: "638c9bbf8b3b3f5ad5f9b9d0",
        quantity: 1
      }
    ],
    total: 12000,
    status: "Pending"
  },
  {
    _id: "638c9bbf8b3b3f5ad5f9b9e1",
    customer: "638c9bbf8b3b3f5ad5f9b9ca",
    seller: "638c9bbf8b3b3f5ad5f9b9c9",
    date: "2024-12-07T12:00:00Z",
    delivery_address: {
      city: "Lviv",
      street: "Franko Street",
      house_number: "12",
      apartment: "5",
      recipient_name: "Maria Ivanova",
      phone: "+380961234567"
    },
    payment_method: "cash",
    payment_status: false,
    items: [
      {
        product: "638c9bbf8b3b3f5ad5f9b9d0",
        quantity: 2
      }
    ],
    total: 1000,
    status: "In Progress"
  },
  {
    _id: "638c9bbf8b3b3f5ad5f9b9e2",
    customer: "638c9bbf8b3b3f5ad5f9b9cb",
    seller: "638c9bbf8b3b3f5ad5f9b9cc",
    date: "2024-12-07T14:00:00Z",
    delivery_address: {
      city: "Kharkiv",
      street: "Pushkina Street",
      house_number: "34",
      apartment: "2",
      recipient_name: "Dmytro Kovalenko",
      phone: "+380931234567"
    },
    payment_method: "card",
    payment_status: true,
    items: [
      {
        product: "638c9bbf8b3b3f5ad5f9b9d3",
        quantity: 1
      },
      {
        product: "638c9bbf8b3b3f5ad5f9b9d4",
        quantity: 1
      }
    ],
    total: 2800,
    status: "Pending"
  },
  {
    _id: "638c9bbf8b3b3f5ad5f9b9e3",
    customer: "638c9bbf8b3b3f5ad5f9b9cd",
    seller: "638c9bbf8b3b3f5ad5f9b9cc",
    date: "2024-12-07T15:00:00Z",
    delivery_address: {
      city: "Odessa",
      street: "Pushkina Street",
      house_number: "12",
      apartment: "3",
      recipient_name: "Igor Petrov",
      phone: "+380631234567"
    },
    payment_method: "cash",
    payment_status: false,
    items: [
      {
        product: "638c9bbf8b3b3f5ad5f9b9d5",
        quantity: 1
      }
    ],
    total: 3500,
    status: "In Progress"
  }
];

const seedUserData = async () => {
  try {
    await connectionDB();

    let successfulCount = 0;
    for (const data of seedUser) {
      const newUser = new User({
        _id: data._id || new mongoose.Types.ObjectId(),
        name: data.name,
        role: data.role,
        email: data.email,
        phone: data.phone,
        avatar_url: data.avatar_url,
        password: data.password
      });

      await newUser.save();
      successfulCount++;
    }

    mongoose.connection.close();
    console.log(`${successfulCount} користувач(ів) успішно додано.`);
  } catch (error) {
    console.error("Помилка заповнення бази даних:", error);
    process.exit(1);
  }
};

const seedProductData = async () => {
  try {
    await connectionDB();

    let successfulCount = 0;
    for (const data of seedProduct) {
      const newProduct = new Product({
        seller_id: data.seller_id,
        name: data.name,
        description: data.description,
        photo_url: data.photo_url,
        category: data.category,
        price: data.price
      });

      await newProduct.save();
      successfulCount++;
    }

    mongoose.connection.close();
    console.log(`${successfulCount} продукт(ів) успішно додано.`);
  } catch (error) {
    console.error("Помилка заповнення бази даних:", error);
    process.exit(1);
  }
};

const seedOrderData = async () => {
  try {
    await connectionDB();

    let successfulCount = 0;
    for (const data of seedOrder) {
      const newOrder = new Order({
        customer: data.customer,
        seller: data.seller,
        date: data.date,
        delivery_address: data.delivery_address,
        payment_method: data.payment_method,
        payment_status: data.payment_status,
        items: data.items,
        total: data.total,
        status: data.status
      });

      await newOrder.save();
      successfulCount++;
    }

    mongoose.connection.close();
    console.log(`${successfulCount} замовлень успішно додано.`);
  } catch (error) {
    console.error("Помилка заповнення бази даних:", error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  await seedUserData();
  await seedProductData();
  await seedOrderData();
};

module.exports = { seedDatabase };
