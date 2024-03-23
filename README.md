# User Management System in Node.js
This project is a User Management System implemented using Node.js. It provides functionalities for creating, updating, deleting, and retrieving user information from a database.

## Environment Setup
Before you begin, ensure you have the following installed on your local machine:

- Node.js: [Download and install Node.js](https://nodejs.org/)
- MongoDb: [Download and install MongoDB](https://www.mongodb.com/try/download/community)

## Installation

#### 1. Clone the repository to your local machine:
```bash
git clone https://github.com/siddharth9442/user-management-system.git
```

#### 2. Navigate to the project directory:
```bash
cd user-management-system
```

#### 3. Install dependencies using npm:
```bash
npm install express mongoose
```

## Configuration
#### 1. Rename '.env.example' file to '.env':
```bash
mv .env.example .env
```

#### 2. Open '.env' file and configure the following variables according to your environment:
```plaintext
PORT=8000
MONGODB_URI=mongodb://localhost/user_management
```

## Running the application

#### 1. Start the Node.js server
```bash
npm run dev
```

#### 2. The server should now be running. You can access the application at http://localhost:8000 in your web browser.

## Instruction to perform CRUD Operations:
### API Endpoints

- #### POST /api/users/create-user/ -> Create a new user
- #### GET /api/users/read-user/:id -> Retrive user by ID
- #### PATCH /api/users/update-user/:id -> Update an existing user
- #### DELETE /api/users/delete-user/:id -> Delete a user by ID

## User Data Structure and Validation Rules

### Data Structure
###  The user table should contain at least the following details:
- Name: String
- Email: Email
- Age: Number
- Gender: String
- Address: String
- mobileNo: Number


### Validation Rules
### Name:
- Must be a string.
- Maximum length: 50 characters.

### Email:
- Must be a valid email address.

### Age:
- Must be a number.
- Must be between 18 and 100.

### Gender:
- Must be one of the following values: 'Male', 'Female', or 'Other'.

### Address:
- Must be a string.
- Maximum length: 100 characters.

### Phone Number:
- Must be a valid 10-digit number.
