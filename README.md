# Strada — Bus Ticket Reservation API

A RESTful API for managing bus routes, buses, departures, seat reservations, and passenger boarding.

## Project Overview

Strada is a backend application designed to manage the main operations of a bus ticket reservation system. It provides a structured API for authentication, catalogue management, reservations, and boarding validation.

The project is developed collaboratively by a team of four developers using a modular architecture.

## Tech Stack

- **Runtime:** Node.js
- **Backend:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcrypt
- **Request Validation:** Zod
- **Testing:** Jest and Supertest
- **API Documentation:** OpenAPI
- **Containerization:** Docker and Docker Compose

*Note: The technologies listed above describe the planned stack. Confirm the installed dependencies and actual implementation as development progresses.*

## Project Structure

```text
Strada/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   ├── modules/
│   │   ├── auth/
│   │   ├── routes/
│   │   ├── buses/
│   │   ├── departures/
│   │   ├── reservations/
│   │   └── boarding/
│   └── shared/
│       ├── middlewares/
│       ├── errors/
│       └── utils/
├── tests/
│   ├── unit/
│   └── integration/
├── docs/
│   └── openapi.yaml
├── postman/
│   └── collection.json
├── scripts/
│   └── seed.js
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
└── README.md
```

Each module is organized into routes, controllers, services, models, and validators. This structure separates HTTP handling, business logic, data access, and input validation.

## Main Modules

### 1. Authentication and Security
- User registration and login.
- Password hashing with bcrypt.
- JWT-based authentication.
- Protected routes and request validation.

### 2. Catalogue
- Bus routes management.
- Bus management.
- Departures listing.
- Seat availability information.

### 3. Reservations
- Seat reservation.
- Reservation cancellation.
- Prevention of duplicate seat bookings.
- Safe handling of concurrent booking requests.
- Database consistency and transaction handling where supported.

### 4. Boarding
- Ticket and reservation validation.
- Boarding status management.
- Prevention of duplicate boarding.
- Rejection of invalid or cancelled reservations.

### 5. Testing and Delivery
- Unit and integration tests.
- OpenAPI documentation.
- Postman collection.
- Project setup instructions.
- Docker Compose configuration.

## Getting Started

### Prerequisites

Install the following tools:

- Node.js and npm.
- MongoDB locally, or Docker and Docker Compose.
- Git.

### Installation

Clone the repository:

```bash
git clone <https://github.com/khalil-elqaddabi/strada.git>
cd Strada
```

Install the project dependencies after the team has configured `package.json`:

```bash
npm install
```

### Environment Configuration

Create your local environment file:

```bash
cp .env.example .env
```

Configure the required variables according to the actual application setup. For example:

```dotenv
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/bus_reservation
JWT_SECRET=replace_with_a_secure_random_secret
JWT_EXPIRES_IN=1d
```

Never commit `.env` or real secrets to the repository.

### Running the Application

Once the startup scripts and application code are implemented, use the commands configured in `package.json`, for example:

```bash
npm run dev
```

The API is intended to run locally at:

```text
http://localhost:5000
```

Health endpoint planned:

```http
GET /api/health
```

These commands and endpoints should be verified against the implemented application before release.

## Testing

Run the available test suite using the configured npm script:

```bash
npm test
```

Tests should cover authentication, catalogue operations, reservation creation and cancellation, concurrent booking attempts, and boarding validation.

## API Documentation

The OpenAPI specification will be maintained in:

```text
docs/openapi.yaml
```

A Postman collection will be maintained in:

```text
postman/collection.json
```

These files should be updated as endpoints are implemented.

## Team Responsibilities

The work is divided into five functional modules and shared delivery tasks:

| Team Member | Responsibility | Jira Epic |
|---|---|---|
| Person 1 | Identity and Security | ST-1 |
| Person 2 | Catalogue | ST-2 |
| Person 3 | Reservations | ST-3 |
| Person 4 | Boarding and Integration | ST-4, ST-5 |

Team members should coordinate shared API contracts and data models before integrating their modules.

## Git Workflow

Create a feature branch for each module:

```bash
git checkout -b feature/auth
```

Suggested branches:

- `feature/auth`
- `feature/catalogue`
- `feature/reservations`
- `feature/boarding-testing`

Commit changes with clear messages:

```bash
git add .
git commit -m "feat: implement authentication module"
git push -u origin feature/auth
```

Open a Pull Request to merge changes into `main`. Avoid direct pushes to `main`.

## Development Principles

- Keep business logic inside services.
- Keep controllers focused on HTTP request and response handling.
- Validate incoming data.
- Use consistent error responses.
- Protect sensitive information.
- Prevent duplicate seat reservations and duplicate boarding.
- Write tests for critical business rules.
- Keep module interfaces documented and stable.

## Project Status

**Current stage:** Project structure and module planning.

Features, tests, documentation, and deployment configuration should be marked complete only after they have been implemented and verified.

## License

Add the project's chosen license before public distribution.
