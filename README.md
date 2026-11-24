# MoveInSync – Trip Feedback Form & Driver Dashboard

A responsive Angular application developed as part of the **MoveInSync Frontend SDE-1 Technical Assessment**.

The application allows employees to submit feedback about their cab trips and provides Transport Managers with a dashboard to monitor driver performance through aggregated ratings and feedback.

The application uses mock data and client-side state management to demonstrate component-based architecture, form validation, data handling, and real-time UI updates.

## 🚀 Features

### 1. Trip Feedback Form

- **Trip Selection:** Select a trip from the predefined list of available trips.
- **Star Rating:** Interactive 5-star rating component for submitting driver ratings.
- **On-Time Status:** Record whether the driver arrived on time using a Yes/No selection.
- **Optional Comments:** Allow users to provide additional feedback.
- **Character Limit:** Restrict comments to 200 characters with a live character counter.
- **Form Validation:** Prevent submission until all required fields are completed.
- **Duplicate Submission Prevention:** Prevent users from submitting feedback more than once for the same trip.
- **Form Reset:** Reset the form after successful feedback submission.

### 2. Driver Dashboard

- Display a list of drivers and their performance statistics.
- Show the total number of trips assigned to each driver.
- Display the number of feedback submissions received.
- Calculate average driver ratings dynamically.
- Display average ratings with two decimal precision.
- Highlight drivers with an average rating below 3.5.
- Update dashboard statistics immediately after a new feedback submission.
- Handle drivers with no feedback submissions gracefully.

### 3. User Experience

- Component-based Angular architecture.
- Clean and intuitive user interface.
- Reusable UI components.
- Client-side data handling without requiring a backend.
- Responsive layout for different screen sizes.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Angular | Frontend framework |
| TypeScript | Application logic and type safety |
| HTML5 | Application structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Application functionality |
| Node.js | Development environment |
| npm | Package management |

## 📂 Project Structure

```text
MoveInSyncAssessment/
│
└── TripFeedBackForm/
    ├── src/
    │   ├── app/
    │   │   ├── feedback-form/
    │   │   ├── driver-dashboard/
    │   │   ├── star-rating/
    │   │   ├── app.ts
    │   │   └── ...
    │   │
    │   ├── index.html
    │   ├── main.ts
    │   └── styles.css
    │
    ├── angular.json
    ├── package.json
    ├── package-lock.json
    └── tsconfig.json
```

*Note: The structure above is representative. Update folder names if they differ from the actual project.*

## ⚙️ Getting Started

Follow these instructions to run the application locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm (comes with Node.js)
- Angular CLI (optional)

### 1. Clone the Repository

```bash
git clone https://github.com/Rajesh-Korikani/MoveInSyncAssessment.git
```

### 2. Navigate to the Angular Project

```bash
cd MoveInSyncAssessment/TripFeedBackForm
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npx ng serve
```

### 5. Open the Application

Navigate to:

```text
http://localhost:4200/
```

The application will automatically reload when source files are modified.

## 📊 Mock Data

The application uses the predefined trip data provided in the assessment.

```typescript
const trips = [
  {
    tripId: "TRIP-2041",
    driverId: "DRV-88",
    driverName: "Ramesh K"
  },
  {
    tripId: "TRIP-2042",
    driverId: "DRV-88",
    driverName: "Ramesh K"
  },
  {
    tripId: "TRIP-2043",
    driverId: "DRV-12",
    driverName: "Suresh P"
  }
];
```

Feedback submissions follow this data structure:

```typescript
{
  tripId: string;
  rating: number;
  onTime: boolean;
  comment?: string;
}
```

## 🧮 Driver Rating Calculation

Driver performance statistics are calculated from the feedback submissions.

**Average Rating:**

```text
Average Rating = Sum of All Ratings / Number of Ratings
```

For example, if a driver receives ratings of 4 and 5:

```text
Average Rating = (4 + 5) / 2 = 4.50
```

Drivers with an average rating below **3.5** are highlighted for attention.

Drivers without any feedback submissions display `—` instead of an invalid numeric value.

## 🔄 Application Workflow

1. The application loads the predefined trip data.
2. An employee selects a trip.
3. The employee provides a star rating and on-time status.
4. An optional comment can be added.
5. The application validates the submitted information.
6. Feedback is added to the in-memory submissions list.
7. The submitted trip is marked as already rated.
8. The Driver Dashboard recalculates driver statistics.
9. Updated ratings are displayed without reloading the application.

## 🧪 Validation & Edge Cases

The application addresses the following assessment scenarios:

- Prevent submission without selecting a trip.
- Prevent submission without selecting a rating.
- Restrict comments to a maximum of 200 characters.
- Prevent duplicate feedback submissions for the same trip.
- Handle drivers with zero ratings.
- Reset the feedback form after successful submission.
- Keep dashboard calculations synchronized with feedback submissions.

## 🏗️ Technical Approach

The application is organized into reusable Angular components to maintain separation of concerns.

- **FeedbackForm:** Responsible for collecting and validating trip feedback.
- **StarRating:** Handles interactive star-based rating selection.
- **DriverDashboard:** Displays driver statistics calculated from feedback submissions.

The application uses mock data and client-side state, as specified in the assessment. No backend API or authentication is required.

## 🚧 Future Enhancements

- Integrate backend APIs for persistent feedback storage.
- Add authentication and role-based access.
- Introduce date-based feedback filtering.
- Add driver performance charts and analytics.
- Implement automated unit and integration tests.
- Improve accessibility and keyboard navigation.

## 👨‍💻 Author

**Rajesh Korikani**

GitHub: [Rajesh-Korikani](https://github.com/Rajesh-Korikani)

---

Developed as part of the **MoveInSync Frontend SDE-1 Technical Assessment**.
