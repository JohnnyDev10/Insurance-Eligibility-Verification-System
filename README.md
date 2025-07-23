# Insurance Eligibility Verification System

A full-stack web application designed to simulate insurance eligibility checks and manage patient eligibility history. This system features a Next.js frontend, a NestJS backend, and a PostgreSQL database.

## Features

- Accepts patient and insurance input for eligibility checks
- Simulates eligibility verification via a mock service
- Stores eligibility results including status, coverage info, and errors
- Retrieves and displays a comprehensive history of eligibility checks by patient ID
- Intuitive user interface for submitting new checks and viewing results/history

## Tech Stack

- **Frontend**: Next.js (React)
- **Backend**: NestJS (Node.js)
- **Database**: PostgreSQL (via TypeORM)

## Project Structure

```
.
├── backend/                # NestJS backend application
│   ├── src/                # Backend source code
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   ├── entities/       # TypeORM entities (Patient, EligibilityCheck)
│   │   └── eligibility/    # Eligibility module (controller, service, DTOs)
│   └── .env                # Environment variables for backend
├── app/                    # Next.js frontend application pages
│   ├── page.tsx            # Main application page
│   └── layout.tsx          # Root layout
├── components/             # React components for frontend
│   ├── eligibility-form.tsx
│   ├── eligibility-result.tsx
│   └── eligibility-history.tsx
├── shared/                 # Shared types/interfaces
│   └── types.ts
├── .env.local              # Environment variables for frontend
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database server (running locally or accessible)
- DBeaver (or any PostgreSQL client)

### Backend Setup

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the `backend/` directory and add your PostgreSQL connection string.
   Example:
   ```
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/your_database_name
   ```
   *Replace `your_password` and `your_database_name` with your actual credentials.*

4. **Start the backend server:**

   ```bash
   npm run start:dev
   ```
   The backend will run on `http://localhost:3000`.

### Frontend Setup

1. **Navigate to the project root directory:**

   ```bash
   cd ..
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the project root directory and add the API base URL.
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3001`.

## API Endpoints

### POST /api/eligibility/check
Create a new eligibility check.

**Request Body:**
```json
{
  "patientId": "PAT-001",
  "name": "John Doe",
  "dateOfBirth": "1990-01-01",
  "memberNumber": "123456789",
  "insuranceCompany": "Blue Cross",
  "serviceDate": "2025-01-07"
}
```

**Response:**
```json
{
  "id": "uuid",
  "patientId": "PAT-001",
  "status": "Active",
  "timestamp": "2025-01-07T10:30:00.000Z",
  "coverageInfo": {
    "deductible": 1000,
    "copay": 25,
    "outOfPocketMax": 5000
  },
  "errors": [],
  "memberNumber": "123456789",
  "insuranceCompany": "Blue Cross",
  "serviceDate": "2025-01-07"
}
```

### GET /api/eligibility/history/:patientId
Retrieve eligibility check history for a specific patient.

**Response:**
```json
{
  "patientId": "PAT-001",
  "checks": [
    {
      "id": "uuid",
      "patientId": "PAT-001",
      "status": "Active",
      "timestamp": "2025-01-07T10:30:00.000Z",
      "coverageInfo": {
        "deductible": 1000,
        "copay": 25,
        "outOfPocketMax": 5000
      },
      "errors": [],
      "memberNumber": "123456789",
      "insuranceCompany": "Blue Cross",
      "serviceDate": "2025-01-07"
    }
  ]
}
```

## Usage

1. **Access the application**: Open your web browser and navigate to `http://localhost:3001`.
2. **Perform an Eligibility Check**: Use the "New Check" tab to input patient and insurance details and submit the form.
3. **View Results**: After submitting, switch to the "Results" tab to see the outcome of the latest eligibility check.
4. **Check History**: Use the "History" tab to search for past eligibility checks by patient ID.

## Test Data

Use the following test data to verify different scenarios:

### Active Coverage
- **Patient ID**: `PAT-001`
- **Member Number**: `123456789` (any number not starting with "INACTIVE" or "ERROR")
- **Expected**: Status `Active` with coverage details

### Inactive Coverage
- **Patient ID**: `PAT-002`
- **Member Number**: `INACTIVE-98765` (must start with "INACTIVE")
- **Expected**: Status `Inactive` with error message

### Unknown Status
- **Patient ID**: `PAT-003`
- **Member Number**: `ERROR-54321` (must start with "ERROR")
- **Expected**: Status `Unknown` with error messages

## Development

- Frontend runs on `http://localhost:3001`
- Backend runs on `http://localhost:3000`
- Database tables are automatically created via TypeORM synchronization

## Database Schema

The system uses two main entities:

### Patients Table
- `id` (UUID, Primary Key)
- `name` (String)
- `date_of_birth` (String)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Eligibility Checks Table
- `id` (UUID, Primary Key)
- `patient_id` (UUID, Foreign Key)
- `status` (Enum: Active, Inactive, Unknown)
- `member_number` (String)
- `insurance_company` (String)
- `service_date` (String)
- `deductible` (Decimal, nullable)
- `copay` (Decimal, nullable)
- `out_of_pocket_max` (Decimal, nullable)
- `errors` (Text Array, nullable)
- `created_at` (Timestamp)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository.