# 📚 SVSU QnBank (Question Bank)

A centralized, student-driven platform for **Swami Vivekanand Subharti University (SVSU)** students to easily find, access, and share previous year question papers and solutions.

The platform uses **Google Drive** as its primary storage for PDFs, ensuring files are safe and accessible. It features a seamless 4-step paper finder, a native dropdown for course selection, and a dedicated question bank section.

## 🌐 Live Links

*   **🚀 Live Website (Frontend)**: [https://svsu-q-bank-six.vercel.app/](https://svsu-q-bank-six.vercel.app/)
*   **⚙️ Backend API (Server)**: [https://qbankbackend.onrender.com/](https://qbankbackend.onrender.com/)

## ✨ Features

*   **4-Step Paper Finder**: Intuitive flow to find papers by Course → Semester → Subject → Year.
*   **Native Dropdowns**: Fast and mobile-friendly dropdowns for quick course and question bank selection.
*   **Contribute / Upload System**: Students can upload PDF papers (up to 15MB) directly to Google Drive.
*   **Question Bank Section**: Curated, subject-wise question banks accessible via a simple dropdown.
*   **Mobile-First Performance**: Heavily optimized CSS for mobile devices (no heavy shadows/blurs) to ensure a **zero-lag experience**.
*   **In-Browser PDF Viewer**: Papers open directly in a sleek modal without leaving the website.
*   **Smart Upload Wake-Up**: A background ping system wakes up the free Render backend when the upload page is opened, ensuring fast file uploads without the 50-second sleep delay.

## 🛠️ Tech Stack

**Frontend:**
*   React.js (Hooks, Context)
*   Parcel (Bundler)
*   React Router DOM (`HashRouter`)
*   Vanilla CSS (Custom, fully responsive)

**Backend:**
*   Node.js & Express.js
*   Google APIs (`googleapis` - Drive API v3)
*   Multer (File handling)
*   Dotenv (Environment variables)

**Deployment & Hosting:**
*   **Frontend:** Vercel
*   **Backend:** Render
*   **Storage:** Google Drive (Cloud)

## 📁 Project Structure

```text
svsuQBank/
├── src/                  # React frontend source code
│   ├── components/       # Reusable UI components (Upload, Header, etc.)
│   ├── pages/            # Page components (ChatAI)
│   └── utils/            # Helper functions and static data
├── server/               # Node.js backend
│   ├── server.js         # Express server & Google Drive API logic
│   ├── package.json      # Backend dependencies
│   └── .env              # Backend secrets (ignored in Git)
├── index.html            # Parcel entry point
├── package.json          # Frontend dependencies
└── README.md
```
💻 Local Setup (How to run this project)
Follow these steps to run this project on your local machine.

Prerequisites
Make sure you have Node.js installed on your system.

1. Clone the repository
bash
git clone https://github.com/AmitChhoker/svsuQBank.git
cd svsuQBank

3. Setup the Frontend
Install the frontend dependencies and start the Parcel server:

bash
npm install
npx parcel index.html(MAIN FOR ME)
The frontend will be running at http://localhost:1234.

3. Setup the Backend
Open a new terminal window, navigate to the server folder, and install dependencies:

bash
cd server
npm install

4. Configure Environment Variables
Inside the server folder, create a .env file and add your Google OAuth credentials:

env
PORT=5000
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
REFRESH_TOKEN=your_google_refresh_token
DRIVE_FOLDER_ID=your_google_drive_folder_id
5. Start the Backend
bash
npm start
The backend server will run at http://localhost:5000.

🔗 How to get Google OAuth Credentials?
Go to Google Cloud Console.

Create a new project and enable the Google Drive API.

Configure the OAuth Consent Screen (Publish the app to production).

Create OAuth 2.0 Client IDs (Web application) and add https://developers.google.com/oauthplayground as a redirect URI.

Use the OAuth 2.0 Playground to generate a Refresh Token with the https://www.googleapis.com/auth/drive scope.

👨‍💻 Author
Amit Chhoker

GitHub: @AmitChhoker

Project Repository: https://github.com/AmitChhoker/svsuQBank

Made with ❤️ for SVSU Students.
