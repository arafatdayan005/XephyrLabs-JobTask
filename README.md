# **TStore Webapp**

A simple CRUD application that allows users to manage a list of products for your store. This project includes a **frontend** built with React and a **backend** built with Express.js, connected to a MongoDB database.

---

## **Features**

### **Frontend**
- View a list of products.
- Add a new product.
- Update the existing product.
- Delete product.
- Responsive and user-friendly design.

### **Backend**
- RESTful API endpoints for CRUD operations.
- Maintainable modular code pattern.
- Input validation and error handling.
- Integration with MongoDB for data persistence.

---

## **Technology Stack**

### **Frontend**
- React
- Redux
- Tailwind CSS
- JavaScript

### **Backend**
- Express.js
- MongoDB with Mongoose
- TypeScript
- JWT

---

## **Getting Started**

### **Prerequisites**
- Node.js (v16 or later)
- npm or yarn
- MongoDB (local or cloud-based)

---

### **Backend Setup**

```bash
git clone https://github.com/arafatdayan005/XephyrLabs-JobTask
cd Backend
npm install
echo. > .env
```
---

### **Environment Variable Setup**
Put the following code in the .env file:
```bash
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb+srv://<your-username>:<your-password>@cluster0.<your-DBID>.mongodb.net/Tstore?retryWrites=true&w=majority
JWT_SECRET=<Any 32-Bit Hex String>
```
---

### **Start the Development Server**

```bash
npm run start:dev
```
Server access: **http://localhost:5000/**

---

### **Frontend Setup**

```bash
git clone https://github.com/arafatdayan005/XephyrLabs-JobTask
cd Frontend
npm install
echo. > .env.local
```
---

### **Environment Variable Setup**
Put the following code in the .env.local file:
```bash
VITE_SERVER_BASE_URL=http://localhost:5000
```
---

### **Start the Development Server**

```bash
npm run dev
```
Client access: **http://localhost:5173/**

---

## **API Documentation**

### **Authentication**
- POST **/auth/login**: Log in and generate token.

### **User Management**
- POST **/user/register**: Registration for new account.

### **Product Management**
- POST **/product**: Add a new product.
- GET **/product/:email**: Retrieve all products based on user email.
- PUT **/product/:productId**: Update a product by ID.
- DELETE **/product/:productId**: Delete a product by ID.

---

## **Project Structure**

### **Frontend**
```bash
frontend/
├── src/
│   ├── assets/            # Assets folder
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page components
│   ├── redux/             # Redux store and APIs
│   ├── routes/            # Routes handler
│   ├── App.jsx            # Main application file
│   └── Main.jsx           # Root application file
├── package.json           # Frontend dependencies
└── .env.local             # Environment variable
```

### **Backend**
```bash
backend/
├── src/
│   ├── app/               # App folder
│   │   ├── config/        # Config folder
│   │   ├── errors/        # Error handlers
│   │   ├── modules/       # Modular files
│   │   │   ├── Auth/      # Authentication Route Handlers
│   │   │   ├── Product/   # Product Route Handlers
│   │   │   └── User/      # User Route Handlers
│   │   └── utils/         # Utilities folder
│   ├── app.ts             # Main application file
│   └── server.ts          # Root application file
├── package.json           # Frontend dependencies
└── .env             # Environment variable
```

---

## **Screenshots**
Dashboard Page:
![Dashboard Page Screenshot](https://testfrontendupload.s3.eu-north-1.amazonaws.com/other/Dashboard.png)
Login Page:
![Login Page Screenshot](https://testfrontendupload.s3.eu-north-1.amazonaws.com/other/Login.png)
Register Page:
![Register Page Screenshot](https://testfrontendupload.s3.eu-north-1.amazonaws.com/other/Register.png)