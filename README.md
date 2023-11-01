<h1>MediSearch Server API & Database</h1>

<p>Built with Nodejs, Expressjs, Prisma, MySQL, TypeScript</p>

### Pre-requisites

You must have the following installed:

- [x] - NodeJS v18
- [x] - MySQL (XAMPP)
- [x] - Postman (for API testing)
- [x] - Visual Studio Code (IDE)

### Installation Guide

```bash
git clone https://github.com/itsmenoahpoli/medisearch-api.git

cd medisearch-api

npm install

cp .env.example .env

# Set database credentials in .env (DATABASE_URL=)

npx prisma db push

npx prisma db seed

npm run dev
```

### How to manual reset database

- [x] Go to localhost database
- [x] Drop all tables
- [x] Open terminal in project folder directory
- [x] Run `npx prisma db push`
- [x] Run `npx prisma db seed`

### To-do

- [x] Authentication API (Login, logout, register, reset password)
- [ ] ADMIN - Pharmacy Account Verification API
- [x] ADMIN - Map Assigning (coordinates) API
- [x] ADMIN - Medicines CRUD API
- [x] ADMIN - Pharmacies CRUD API
- [ ] PHARMACY - POS API
- [ ] PHARMACY - Reservation API
- [x] PHARMACY - Manage My Account API
- [x] MOBILE - Medicine Search API
- [x] MOBILE - Available items in every store API
- [ ] MOBILE - Medicine Reservation API
- [ ] MOBILE - Track Reservation API
- [x] MOBILE - Add/Edit My Addresses API
- [x] MOBILE - Manage My Account API
