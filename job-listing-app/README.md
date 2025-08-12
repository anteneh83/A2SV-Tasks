# Job Listing Application

A Next.js-based job board application with a complete authentication system, dynamic job listings, and enhanced bookmark functionality.

---

## Features

### New Authentication System
- Email/Password Signup & Login  
- Google OAuth Integration  
- Protected Routes  
- JWT Token Management  
- Form Validation  

### Job Listings Page
- View all available job opportunities from API  
- Sort by relevance, newest, or oldest  
- Responsive card design with organization avatars  
- Color-coded tags (Education = yellow, IT = blue)  

### Job Detail Page
- Detailed view of each job opportunity  
- Two-column layout for optimal information display  
- Icons for key information (calendar, location, etc.)   

### Bookmark Functionality (Final Task)
- Bookmark toggle button on each job card  
- Bookmark/unbookmark jobs for authenticated users only  
- View bookmarked jobs in a dedicated page  
- Error handling with user feedback  
- Search job positions by title with accurate results  

---

## Technical Features
- Built with **Next.js App Router**  
- NextAuth.js for authentication  
- TypeScript support  
- Tailwind CSS for styling  
- Responsive design (mobile & desktop friendly)  
- API integration with Axios & Fetch  
- Unit testing with Jest  
- End-to-end testing with Cypress  

---

## API Endpoints

**Base URL:** `https://akil-backend.onrender.com/`

| Method | Endpoint                 | Description                       | Auth Required |
|--------|--------------------------|---------------------------------|--------------|
| GET    | `/bookmarks`              | Get all bookmarked jobs for user| ✅           |
| POST   | `/bookmarks/:eventID`     | Create bookmark (empty body)    | ✅           |
| DELETE | `/bookmarks/:eventID`     | Remove bookmark                 | ✅           |

---

## Installation

```bash
git clone https://github.com/anteneh83/A2SV-Tasks.git
cd job-listing-app
npm install 
npm run dev
```

# Screenshots
## Authentication Flow
### Signup Page	
<img width="1004" height="656" alt="image" src="https://github.com/user-attachments/assets/79afc6f8-41a5-442d-a220-c1382f1989e6" />

### OTP verification
<img width="1220" height="672" alt="image" src="https://github.com/user-attachments/assets/89c53315-ce16-4fe7-9dac-722e73259277" />

### Login Page	
<img width="1182" height="650" alt="image" src="https://github.com/user-attachments/assets/ff1c7c75-7b8c-40be-b039-46bdc2f96776" />

### Job Listings
<img width="1031" height="673" alt="image" src="https://github.com/user-attachments/assets/bb5af11c-c042-4dc6-bca3-37d373955ac3" />

### Newest Jobs	
<img width="1066" height="679" alt="image" src="https://github.com/user-attachments/assets/96ec0c61-418e-474e-91c8-ba894cacdc73" />

### Job Detail
<img width="1109" height="683" alt="image" src="https://github.com/user-attachments/assets/78558a95-0d73-4326-9915-198b3f256ef8" />

## Bookmark Functionalty
### Bookmark created and deleted
<img width="1249" height="669" alt="image" src="https://github.com/user-attachments/assets/ba07c1c1-8da1-4e1e-8a9e-3710911c946c" />

## Bookmark page
<img width="1231" height="640" alt="image" src="https://github.com/user-attachments/assets/c7de60f4-ff4e-470f-bceb-296601a2dd27" />


