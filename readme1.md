TO Run this file
  1. Npm install
  2. Npm Install parcel
  3. Npx parcel index.html

to run the frontend
  1. Npx parcel index.html

to start the backend
  1. cd server
  2. npm start

google drive:- https://drive.google.com/drive/folders/1XEUNQJf-0Gf7wKliCFYvKErsJ9gdtirs




⚡ Step 3: Deploy Backend (Render)
Because your backend is inside a server folder, you must tell Render exactly where to look.

Go to Render → New → Web Service.

Connect your svsuQBank GitHub repository.

Configure the settings:

Name: qbank-backend (or similar)

Root Directory: server (This is the most important part!)

Environment: Node

Build Command: npm install

Start Command: npm start

Environment Variables: Scroll down and add all the variables from your server/.env file (e.g., Client ID, Client Secret, Refresh Token, etc.).

Click Deploy Web Service.

Once deployed, copy the URL (it will look like https://qbank-backend-xxxx.onrender.com).

🌐 Step 4: Deploy Frontend (Vercel)
Go to Vercel → Add New → Project.

Import the same GitHub repository.

Configure the settings:

Framework Preset: Select Other (or Parcel).

Root Directory: ./ (Leave it as the default root).

Build Command: npx parcel build index.html (or npm run build if you added the script we discussed).

Output Directory: dist

Environment Variables: If you updated your frontend to use an API URL variable, add it here. (e.g., API_URL = the Render URL from Step 3).

Click Deploy.

🔗 Step 5: Connect the Frontend and Backend (Crucial)
Right now, your frontend is trying to talk to http://localhost:5000, which won't work on the live internet.

Update Frontend: Look in your src folder (likely in logic.jsx or similar). Replace http://localhost:5000 with your live Render backend URL (https://qbank-backend-xxxx.onrender.com).

Update Backend CORS: Open server/server.js. Make sure your CORS setup allows requests from your new Vercel URL:

javascript
const cors = require('cors');
app.use(cors({
    origin: 'https://your-vercel-app-url.vercel.app' // Replace with your actual Vercel URL
}));
Push the updates: Commit these changes and push to GitHub. Vercel and Render will automatically detect the changes and redeploy your apps!