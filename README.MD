# VaultPay - Digital Wallet Application

A full-stack digital wallet application that allows users to send and receive money seamlessly. Built with modern web technologies, this project demonstrates secure user authentication, real-time balance management, and transaction handling.

## What This Project Does

This is a simplified version of a digital payment platform where users can:

- Create an account with email and password
- Sign in securely to access their wallet
- View their current balance
- Search for other users on the platform
- Transfer money to other users instantly
- All transactions are atomic (either fully complete or fully rollback)

## Technology Stack

### Backend
- **Node.js** with Express.js for the server
- **MongoDB** for database with Mongoose ODM
- **JWT** for secure authentication
- **Bcrypt** for password hashing
- **Zod** for request validation
- **CORS** enabled for cross-origin requests

### Frontend
- **React 18** for building the user interface
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls

## Project Structure

```
VaultPay/
├── backend/              # Server-side application
│   ├── config.js        # Configuration (JWT secret, etc.)
│   ├── index.js         # Express server entry point
│   ├── db/              # Database models and connection
│   ├── middlewares/     # Authentication middleware
│   └── routes/          # API endpoints
│       ├── user.js      # User signup, signin, update
│       └── account.js   # Balance and transfer operations
│
└── frontend/            # Client-side application
    ├── src/
    │   ├── components/  # Reusable UI components
    │   └── pages/       # Application pages
    ├── index.html
    └── vite.config.js
```

## Getting Started

### Prerequisites

Make sure you have these installed on your machine:
- Node.js (version 14 or higher)
- MongoDB (running locally or a MongoDB Atlas account)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/moin1777/VaultPay.git
   cd VaultPay
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   ```

   Create a `config.js` file in the backend directory:
   ```javascript
   module.exports = {
     JWT_SECRET: "your-secret-key-here",
     MONGODB_URL: "your-mongodb-connection-string"
   };
   ```

3. **Set up the Frontend**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   node index.js
   ```
   The server will start on http://localhost:3000

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The app will open on http://localhost:5173

## API Endpoints

### User Routes (`/api/v1/user`)

- **POST /signup** - Create a new user account
  - Body: `{ username, password, firstName, lastName }`
  - Returns: JWT token

- **POST /signin** - Authenticate existing user
  - Body: `{ username, password }`
  - Returns: JWT token

- **PUT /** - Update user information (protected)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ password?, firstName?, lastName? }`

- **GET /bulk** - Search users (protected)
  - Query: `?filter=<search-term>`
  - Returns: List of matching users

### Account Routes (`/api/v1/account`)

- **GET /balance** - Get user's current balance (protected)
  - Headers: `Authorization: Bearer <token>`
  - Returns: Balance information

- **POST /transfer** - Transfer money to another user (protected)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ to: userId, amount: number }`
  - Uses MongoDB transactions for atomicity

## Key Features

### Security
- Passwords are hashed using bcrypt before storage
- JWT-based authentication for protected routes
- Input validation using Zod schemas
- Authorization middleware to protect sensitive endpoints

### Database Transactions
- Money transfers use MongoDB sessions and transactions
- Ensures that transfers are atomic (both debit and credit happen or neither does)
- Prevents race conditions and partial transfers

### User Experience
- Clean and responsive UI with Tailwind CSS
- Real-time user search functionality
- Instant balance updates after transactions
- Error handling and user feedback

## How Money Transfers Work

1. User initiates a transfer from the dashboard
2. Backend validates the request and checks balance
3. A MongoDB session is created
4. Both debit (sender) and credit (receiver) operations happen within the transaction
5. If any step fails, the entire transaction is rolled back
6. On success, both accounts are updated atomically

## Development Notes

- Balance is stored in the smallest currency unit (paise) to avoid floating-point precision issues
- All amounts are multiplied by 100 before storage
- The frontend assumes amounts are in rupees and the backend handles conversion

## Future Enhancements

Potential features that could be added:
- Transaction history and receipts
- Profile pictures and user preferences
- Email notifications for transactions
- Two-factor authentication
- Recurring payments
- QR code-based payments
- Admin dashboard for monitoring

## Contributing

Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is part of a learning cohort and is intended for educational purposes.

## Contact

If you have questions or suggestions, feel free to reach out or open an issue on the repository.
