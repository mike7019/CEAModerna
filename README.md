# CEA Moderna — Sitio Web y Portal Estudiantil

Landing page y portal de agendamiento de clases para **CEA Moderna**, escuela de conducción ubicada en Medellín, Colombia. Construido con Next.js 16, PostgreSQL y NextAuth.

---

## Tabla de contenidos

- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Configuración inicial](#configuración-inicial)
- [Variables de entorno](#variables-de-entorno)
- [Base de datos](#base-de-datos)
- [Funcionalidades](#funcionalidades)
- [Comandos disponibles](#comandos-disponibles)
- [Credenciales de prueba](#credenciales-de-prueba)

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| Animaciones | Framer Motion |
| Iconos | Lucide React |
| Base de datos | PostgreSQL 16 (Docker) |
| ORM | Prisma v5 |
| Autenticación | NextAuth.js v4 (Credentials) |
| Emails | Nodemailer + Gmail |
| Contenedor BD | Docker Compose |

---

## Estructura del proyecto

```
cea-moderna/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/   # Handler de NextAuth
│   │   ├── clases/[id]/
│   │   │   ├── agendar/          # POST: agendar una clase
│   │   │   └── cancelar/         # POST: cancelar una clase
│   │   └── slots/                # GET: horarios disponibles
│   ├── estudiantes/
│   │   ├── login/                # Página de login
│   │   ├── dashboard/            # Dashboard protegido
│   │   └── page.tsx              # Redirect login/dashboard
│   ├── layout.tsx
│   ├── page.tsx                  # Landing page principal
│   └── globals.css
├── components/
│   ├── estudiantes/
│   │   ├── StudentDashboard.tsx  # Dashboard completo (client)
│   │   ├── ClaseCard.tsx         # Tarjeta de clase con estados
│   │   └── AgendarModal.tsx      # Modal de selección de horario
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Stats.tsx
│   ├── Courses.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Locations.tsx
│   ├── Testimonials.tsx
│   ├── ContactCTA.tsx
│   ├── Footer.tsx
│   └── SessionProvider.tsx
├── lib/
│   ├── auth.ts                   # Configuración NextAuth
│   ├── db.ts                     # Instancia global de Prisma
│   └── email.ts                  # Nodemailer + plantilla HTML
├── prisma/
│   ├── schema.prisma             # Modelos de la BD
│   └── seed.ts                   # Datos de prueba
├── types/
│   └── next-auth.d.ts            # Extensión de tipos de sesión
├── docker-compose.yml
├── .env                          # Variables para Prisma CLI
└── .env.local                    # Variables para Next.js
```

---

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (para la base de datos)
- Cuenta de Gmail con [App Password](https://myaccount.google.com/apppasswords) habilitada

---

## Configuración inicial

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea los dos archivos de entorno con los valores correctos (ver sección [Variables de entorno](#variables-de-entorno)):

```bash
# .env        → leído por Prisma CLI
# .env.local  → leído por Next.js
```

### 3. Levantar la base de datos

```bash
docker compose up -d
```

Verifica que el contenedor esté corriendo:

```bash
docker ps
```

### 4. Aplicar el schema y cargar datos de prueba

```bash
npm run db:push   # Crea las tablas en PostgreSQL
npm run db:seed   # Carga clases, slots y estudiante de prueba
```

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Variables de entorno

El proyecto usa **dos archivos de entorno** con propósitos distintos:

| Archivo | Leído por |
|---|---|
| `.env` | Prisma CLI (`db push`, `db seed`, `studio`) |
| `.env.local` | Next.js (servidor de desarrollo y producción) |

### `.env`

```env
DATABASE_URL="postgresql://ceamoderna:ceamoderna_pass@localhost:5432/ceamoderna"
```

### `.env.local`

```env
# Base de datos
DATABASE_URL="postgresql://ceamoderna:ceamoderna_pass@localhost:5432/ceamoderna"

# NextAuth — genera un secreto con: openssl rand -base64 32
NEXTAUTH_SECRET="tu-string-aleatorio-aqui"
NEXTAUTH_URL="http://localhost:3000"

# Gmail (ver instrucciones abajo)
GMAIL_USER="tu-correo@gmail.com"
GMAIL_APP_PASSWORD="xxxx xxxx xxxx xxxx"
```

### Configurar Gmail App Password

1. Activa la **verificación en 2 pasos** en tu cuenta Google
2. Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Selecciona **"Otra aplicación"**, escribe `CEA Moderna`
4. Copia la contraseña de 16 caracteres generada
5. Pégala en `GMAIL_APP_PASSWORD`

---

## Base de datos

### Docker Compose

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: ceamoderna_db
    restart: unless-stopped
    environment:
      POSTGRES_USER: ceamoderna
      POSTGRES_PASSWORD: ceamoderna_pass
      POSTGRES_DB: ceamoderna
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ceamoderna -d ceamoderna"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

### Modelos Prisma

```
Estudiante         — Datos del estudiante (cédula, contraseña, curso, deuda)
Clase              — Catálogo de clases (número, nombre, horas, tipo)
SlotDisponible     — Horarios disponibles para agendar (fecha, hora, aula)
ClaseEstudiante    — Relación estudiante ↔ clase con estado y slot asignado
```

### Estados de una clase

| Estado | Descripción |
|---|---|
| `pendiente` | Sin agendar — muestra botón "Agendar Clase" |
| `agendada` | Tiene fecha asignada — muestra opciones "Reprogramar" y "Cancelar" |
| `completada` | Clase realizada — muestra si hubo asistencia o no |
| `cancelada` | Cancelada por el estudiante |

---

## Funcionalidades

### Landing page

- Navbar con scroll transparente → sólido, link a portal de estudiantes
- Hero full-screen con animaciones (Framer Motion)
- Contadores animados al entrar al viewport (IntersectionObserver)
- Sección de cursos: A1, A2, B1, B2, C1, Renovación
- Sección "Quiénes somos" con métricas
- 6 servicios disponibles
- 4 sedes con dirección y horarios
- 6 testimonios de estudiantes
- CTA con botón de WhatsApp
- Footer con redes sociales y datos de contacto

### Portal estudiantil (`/estudiantes`)

- **Login** con número de cédula y contraseña (campo con mostrar/ocultar)
- **Redirect automático**: si ya hay sesión activa, va directo al dashboard
- **Dashboard** con:
  - Header fijo con avatar (iniciales), nombre completo, cédula y botón de cerrar sesión
  - Tarjetas de información: curso, saldo pendiente (con alerta visual si hay deuda) y correo
  - Barra de progreso del curso con porcentaje
  - Estadísticas: clases completadas, agendadas y pendientes
  - Filtros por tipo de clase: Todas / Teóricas / Prácticas
  - Grid responsivo de tarjetas (1 col mobile, 2 tablet, 3-4 desktop)
- **Tarjetas de clase** con tres estados visuales:
  - ✅ **Completada** — verde, muestra fecha, hora, aula y badge de asistencia
  - 📅 **Agendada** — azul, muestra detalles, link a Google Calendar, botones Reprogramar/Cancelar
  - ⏳ **Pendiente** — gris, botón "Agendar Clase" naranja
- **Modal de agendamiento**: slots agrupados por fecha, selección con radio, confirmación con loading
- **Reprogramar**: abre el mismo modal y reemplaza el slot existente
- **Cancelar**: confirmación y liberación del slot (vuelve a `pendiente`)
- **Email de confirmación** al agendar con:
  - Plantilla HTML con branding de CEA Moderna
  - Detalles completos de la clase
  - Botón para agregar a **Google Calendar** (sin OAuth, solo URL)

---

## Comandos disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo en localhost:3000

# Producción
npm run build        # Build de producción
npm run start        # Servidor de producción

# Base de datos
npm run db:push      # Aplica el schema a la BD (sin migraciones)
npm run db:seed      # Carga datos de prueba
npm run db:studio    # Abre Prisma Studio en localhost:5555

# Docker
docker compose up -d      # Levanta PostgreSQL en background
docker compose down       # Detiene el contenedor
docker compose down -v    # Detiene y elimina el volumen (borra todos los datos)
docker logs ceamoderna_db # Ver logs del contenedor
```

---

## Credenciales de prueba

El seed carga automáticamente un estudiante con el siguiente estado:

| Campo | Valor |
|---|---|
| Cédula | `12345678` |
| Contraseña | `Password123!` |
| Nombre | María Fernanda García López |
| Curso | CURSOB1+3ROS |
| Deuda | $549.000 |
| Clases completadas | 10 (clases 1–10, con asistencia) |
| Clases agendadas | 3 (clases 11–13, con slots futuros en junio 2026) |
| Clases pendientes | 3 (clases 14–16, listas para agendar) |
| Slots disponibles | 12 horarios en junio 2026 |

URL del portal: [http://localhost:3000/estudiantes/login](http://localhost:3000/estudiantes/login)
