# 🏦 KodBank — Modern Digital Banking Application

A production-ready, full-stack banking web application built with **Next.js 14**, **Prisma**, **MySQL (Aiven)**, **JWT Authentication**, **Tailwind CSS**, and **Framer Motion**.

---

## 📁 Folder Structure

```
kodbank/
├── app/
│   ├── api/
│   │   ├── register/
│   │   │   └── route.ts          # POST /api/register
│   │   ├── login/
│   │   │   └── route.ts          # POST /api/login
│   │   └── getBalance/
│   │       └── route.ts          # GET /api/getBalance
│   ├── register/
│   │   └── page.tsx              # Registration page
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── dashboard/
│   │   └── page.tsx              # Protected dashboard page
│   ├── globals.css               # Global styles + Tailwind
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── lib/
│   ├── prisma.ts                 # Prisma client singleton
│   ├── auth.ts                   # JWT helper functions
│   └── middleware.ts             # Token verification middleware
├── prisma/
│   └── schema.prisma             # Database schema
├── .env                          # Environment variables (local)
├── .env.example                  # Environment variables template
├── vercel.json                   # Vercel deployment config
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🛠️ Tech Stack

| Technology       | Purpose                        |
| ---------------- | ------------------------------ |
| Next.js 14       | Frontend + API Routes          |
| TypeScript       | Type safety                    |
| Prisma           | ORM for MySQL                  |
| MySQL (Aiven)    | Cloud Database                 |
| JWT              | Authentication tokens          |
| bcrypt           | Password hashing               |
| Tailwind CSS     | Styling                        |
| Framer Motion    | Animations & celebrations      |

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
# Aiven MySQL connection string
DATABASE_URL="mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE?ssl-mode=REQUIRED"

# Strong secret key for JWT signing (min 64 characters recommended)
JWT_SECRET="your-super-strong-secret-key-at-least-64-characters-long-for-production"

# Base URL of the application
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### How to get each variable:

1. **DATABASE_URL** — From your Aiven MySQL service dashboard:
   - Go to [Aiven Console](https://console.aiven.io)
   - Select your MySQL service
   - Copy the connection URI from the "Overview" tab
   - Format: `mysql://user:password@host:port/database?ssl-mode=REQUIRED`

2. **JWT_SECRET** — Generate a strong random string:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

3. **NEXT_PUBLIC_BASE_URL** — Your deployment URL (e.g., `https://kodbank.vercel.app`)

---

## 🗄️ Aiven MySQL Setup Instructions

### Step 1: Create Aiven MySQL Service
1. Sign up at [aiven.io](https://aiven.io)
2. Create a new **MySQL** service
3. Choose your cloud provider and region
4. Wait for the service to be "Running"

### Step 2: Get Connection Details
1. Go to your MySQL service overview
2. Copy the **Service URI** — this is your `DATABASE_URL`
3. Download the **CA Certificate** if needed for SSL connections

### Step 3: Sync Database Schema
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (creates tables)
npx prisma db push

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### SQL Equivalent (if doing manually):
```sql
CREATE TABLE KodUser (
  uid INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(191) NOT NULL UNIQUE,
  email VARCHAR(191) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  role ENUM('CUSTOMER', 'MANAGER', 'ADMIN') DEFAULT 'CUSTOMER',
  balance DOUBLE DEFAULT 100000
);

CREATE TABLE UserToken (
  tid INT AUTO_INCREMENT PRIMARY KEY,
  token LONGTEXT NOT NULL,
  uid INT NOT NULL,
  expiry DATETIME NOT NULL,
  FOREIGN KEY (uid) REFERENCES KodUser(uid) ON DELETE CASCADE
);

CREATE INDEX idx_usertoken_uid ON UserToken(uid);
CREATE INDEX idx_usertoken_token ON UserToken(token(255));
```

---

## 🚀 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your Aiven MySQL credentials and JWT secret

# 3. Generate Prisma client
npx prisma generate

# 4. Push schema to database
npx prisma db push

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🌐 Vercel Deployment

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: KodBank application"
git remote add origin https://github.com/YOUR_USERNAME/kodbank.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repository
4. Add **Environment Variables** in the Vercel dashboard:
   - `DATABASE_URL` = your Aiven MySQL connection string
   - `JWT_SECRET` = your strong secret key
   - `NEXT_PUBLIC_BASE_URL` = `https://your-app.vercel.app`
5. Click **Deploy**

### Step 3: Post-Deployment
After the first deployment, the database tables need to exist. You can either:
- Run `npx prisma db push` locally with the production `DATABASE_URL`, or
- Use Aiven's web console to run the SQL setup manually

---

## 📮 API Testing (Postman Examples)

### 1. Register a New User

**POST** `{{BASE_URL}}/api/register`

Headers:
```
Content-Type: application/json
```

Body (JSON):
```json
{
  "username": "john_doe",
  "password": "secure123",
  "email": "john@example.com",
  "phone": "+919876543210"
}
```

Expected Response (201):
```json
{
  "message": "Registration successful! Please login."
}
```

---

### 2. Login

**POST** `{{BASE_URL}}/api/login`

Headers:
```
Content-Type: application/json
```

Body (JSON):
```json
{
  "username": "john_doe",
  "password": "secure123"
}
```

Expected Response (200):
```json
{
  "message": "Login successful",
  "username": "john_doe"
}
```

> **Note:** The JWT token is automatically set as an HTTP-only cookie named `token`.

---

### 3. Get Balance (Authenticated)

**GET** `{{BASE_URL}}/api/getBalance`

> The `token` cookie must be included in the request. In Postman, this is handled automatically if cookies are enabled.

Expected Response (200):
```json
{
  "balance": 100000,
  "username": "john_doe"
}
```

Expected Error Response (401):
```json
{
  "error": "Authentication required"
}
```

---

### Postman Collection Variables

| Variable   | Value                          |
| ---------- | ------------------------------ |
| BASE_URL   | `http://localhost:3000`        |

---

## 🔒 Security Features

- ✅ **HTTP-only cookies** — JWT tokens cannot be accessed via JavaScript
- ✅ **bcrypt hashing** — Passwords are hashed with 12 salt rounds
- ✅ **JWT verification** — Tokens are verified on every protected request
- ✅ **Database token validation** — Tokens are cross-checked against the database
- ✅ **Token expiry** — Both JWT and database records have 1-hour expiry
- ✅ **Secure cookie flags** — `secure`, `sameSite`, and `httpOnly` flags set
- ✅ **No hardcoded secrets** — All secrets are in environment variables
- ✅ **Input validation** — All inputs are validated before processing
- ✅ **Error handling** — Clean error responses with proper HTTP status codes

---

## 📋 Database Schema (Prisma)

```prisma
model KodUser {
  uid      Int        @id @default(autoincrement())
  username String     @unique
  email    String     @unique
  password String
  phone    String
  role     Role       @default(CUSTOMER)
  balance  Float      @default(100000)
  tokens   UserToken[]
}

model UserToken {
  tid    Int      @id @default(autoincrement())
  token  String   @db.LongText
  uid    Int
  expiry DateTime
  user   KodUser  @relation(fields: [uid], references: [uid], onDelete: Cascade)
}

enum Role {
  CUSTOMER
  MANAGER
  ADMIN
}
```

---

## 🎨 UI Features

- 🌌 Deep space gradient backgrounds
- 💎 Glassmorphism card design
- ✨ Smooth Framer Motion animations
- 🎉 Party popper celebration on balance reveal
- 📱 Fully responsive design
- 🔤 Modern typography (Inter + Outfit fonts)
- 🎨 Curated color palette with HSL-tuned gradients
- ⏳ Loading spinners and states
- 🔔 Toast notifications for feedback

---

## 📝 License

This project is private and proprietary.
