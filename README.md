# Panduan Setup Pertama Kali

Ikuti langkah-langkah berikut secara berurutan saat setup project untuk pertama kali.

## Prasyarat

Pastikan Anda sudah menginstall:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Bun](https://bun.sh/) (untuk menjalankan script secara lokal)

##  Langkah Demi Langkah Setup

### Clone dan Navigate ke Project
```bash
git clone https://github.com/ItPohgero/akp-tech-test
cd akp-tech-test
```

### Cara Cepat Rekomendasi
Jalankan di terminal: `make dev-first`
Ini akan menjalankan semua langkah setup di bawah ini secara otomatis.

### 1. Copy `env.example` ke `.env.development`
```bash
cp env.example .env.development
```

### 2. Jalankan Docker Containers
```bash
bun run docker:dev
```
Ini akan:
- Build dan menjalankan semua Docker containers
- Setup database
- Menjalankan aplikasi

**Tunggu hingga semua container siap** (lihat logs yang menunjukkan services yang sedang berjalan)

### 3. Generate Prisma Client
```bash
bun run docker:prisma:generate
```
Ini membuat Prisma client berdasarkan schema.

### 4. Buat Schema Database
```bash
bun run docker:prisma:db:push
```
Ini akan:
- Membuat semua tabel di database
- Menerapkan Prisma schema ke database

### 5. Seed Database (Opsional)
```bash
bun run docker:prisma:db:seed
```
Ini mengisi database Anda dengan data awal/contoh.

### 6. Verifikasi Setup
Buka browser Anda dan navigate ke:
- **Aplikasi**: http://localhost:5173
- **Prisma Studio** (GUI Database): Jalankan `bun run docker:prisma:studio` kemudian buka http://localhost:5555

## 🎯 Quick Start (Semua dalam Satu)

Jika Anda ingin menjalankan semuanya sekaligus setelah cloning:

```bash
# Jalankan containers
bun run docker:dev

# Di terminal lain, jalankan perintah setup
bun run docker:prisma:generate && \
bun run docker:prisma:db:push && \
bun run docker:prisma:db:seed
```

## 🛠️ Perintah Umum

### Development
```bash
# Jalankan environment development
bun run docker:dev

# Lihat logs
bun run docker:dev:logs

# Hentikan containers
bun run docker:dev:down
```

### Manajemen Database
```bash
# Generate Prisma client
bun run docker:prisma:generate

# Push perubahan schema ke database
bun run docker:prisma:db:push

# Reset database ( Ini akan menghapus semua data)
bun run docker:prisma:db:reset

# Seed database dengan data contoh
bun run docker:prisma:db:seed

# Buka Prisma Studio (GUI Database)
bun run docker:prisma:studio

# Jalankan migrasi database
bun run docker:prisma:migrate
```

### Kualitas Kode
```bash
# Format dan lint kode
bun run format

# Type checking
bun run typecheck
```

## 🧹 Setup Bersih (Jika Ada Masalah)

Jika Anda mengalami masalah, coba setup bersih:

```bash
# Hentikan dan hapus semua containers, volumes, dan networks
bun run docker:dev:clean

# Mulai fresh
bun run docker:dev

# Kemudian ulangi langkah 3-5 di atas
```

## 🐛 Troubleshooting

### Masalah Koneksi Database
- Pastikan Docker containers berjalan: `docker-compose ps`
- Cek logs: `bun run docker:dev:logs`

### Masalah Prisma
- Selalu jalankan `docker:prisma:generate` setelah perubahan schema
- Gunakan `docker:prisma:db:push` untuk menerapkan perubahan schema
- Gunakan `docker:prisma:db:reset` untuk mulai fresh (⚠️ menghapus data)

### Peringatan OpenSSL
Jika Anda melihat peringatan OpenSSL, biasanya aman untuk diabaikan dalam development. Untuk memperbaikinya, update Dockerfile Anda untuk include:
```dockerfile
RUN apt-get update -y && apt-get install -y openssl
```

## 📁 Struktur Project

```
├── prisma/
│   ├── schema.prisma    # Schema database
│   └── seed.ts         # Script seeding database
├── app/                # Kode aplikasi
├── docker-compose.yml  # Konfigurasi Docker
└── package.json       # Script dan dependencies
```

## 🎉 Anda Siap!

Setelah menyelesaikan langkah-langkah ini, environment development Anda seharusnya sudah fully setup dan siap untuk development!