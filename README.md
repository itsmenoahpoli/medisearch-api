<h1>MediSearch Server API & Database</h1>

<p>Built with Nodejs, Expressjs, Prisma, MySQL, TypeScript</p>

<h3>Installation Guide</h3>

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

### To-do

- [ ] Authentication API (Login, logout, register, reset password)
- [ ] ADMIN - Pharmacy Account Verification API
- [ ] ADMIN - Map Assigning (coordinates) API
- [ ] PHARMACY - POS API
- [ ] PHARMACY - Reservation API
- [ ] PHARMACY - Manage My Account API
- [ ] MOBILE - Medicine Search API
- [ ] MOBILE - Available items in every store API
- [ ] MOBILE - Medicine Reservation API
- [ ] MOBILE - Track Reservation API
- [ ] MOBILE - Add/Edit My Addresses API
- [ ] MOBILE - Manage My Account API
