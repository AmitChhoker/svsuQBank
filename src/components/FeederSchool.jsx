import React, { useState } from "react";
import './Header.css';
import '../../footer.css';
import './FeederSchool.css';
import Footer from "./footer";
import SocialMediaBar from "./SocialMediaBar";
import AIFloatingButton from "./AIFloatingButton";
import Header from "./Header";

export default function FeederSchool() {
  const [showFeeder, setShowFeeder] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const classes = ["9th", "10th", "11th", "12th"];
  const feederYears = [2023, 2024];

  const subjectsByClass = {
    "9th": ["Math", "Science", "English"],
    "10th": ["Math", "Science", "English"],
    "11th": ["Math", "Physics", "Chemistry"],
    "12th": ["Math", "Physics", "Biology"]
  };

  const driveLinks = {
    "9th-Math-2023": "https://example.com/9th-math-2023.pdf",
    "10th-Science-2024": "https://example.com/10th-science-2024.pdf"
    // Add more real links here
  };

  return (
    <>
      <Header />
      <div className="top-trends">
        <h1>Shree Vishawakarma Skill University <br /> Feeder School</h1>
      </div>

      <div className="feeder-section">
        <h3 onClick={() => setShowFeeder(!showFeeder)} className="feeder-toggle">
          📚 Feeder School {showFeeder ? "▲" : "▼"}
        </h3>

        {showFeeder && (
          <div className="feeder-content">
            <div className="feeder-classes">
              <h4>Classes</h4>
              {classes.map((cls, index) => (
                <button
                  key={index}
                  className="feeder-class-button"
                  onClick={() => {
                    setSelectedClass(cls === selectedClass ? null : cls);
                    setSelectedYear(null);
                    setSelectedSubject(null);
                  }}
                >
                  {cls} Class
                </button>
              ))}
            </div>

            {selectedClass && (
              <div className="feeder-years">
                <h4>Years for {selectedClass}</h4>
                {feederYears.map((year, idx) => (
                  <button
                    key={idx}
                    className="feeder-year-button"
                    onClick={() => {
                      setSelectedYear(year === selectedYear ? null : year);
                      setSelectedSubject(null);
                    }}
                  >
                    📅 {year}
                  </button>
                ))}
              </div>
            )}

            {selectedClass && selectedYear && (
              <div className="feeder-subjects">
                <h4>Subjects for {selectedClass} - {selectedYear}</h4>
                {subjectsByClass[selectedClass].map((subject, index) => {
                  const key = `${selectedClass}-${subject}-${selectedYear}`;
                  const link = driveLinks[key];
                  return (
                    <div key={index}>
                      <a
                        href={link || "#"}
                        className={`subject-link ${link ? "" : "disabled"}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link ? `📄 ${subject}` : `❌ ${subject}`}
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
      <SocialMediaBar />
      <AIFloatingButton />
      <Footer />
    </>
  );
}








//***********code fo feeder schools papers*************** */
// import { useState } from "react";
// import './ProgramCard.css';
// import { Link } from "react-router";
// import '../components/FeederSchool.css';
// import driveLinks from "../data/driveLinks";

// export default function FeederSchool() {
//   const [showFeeder, setShowFeeder] = useState(false);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [selectedSubject, setSelectedSubject] = useState(null);

//   const classes = ["9th", "10th", "11th", "12th"];

//   const subjectsByClass = {
//     "9th": ["Math", "Science", "English"],
//     "10th": ["Math", "Science", "English"],
//     "11th": ["Math", "Physics", "Chemistry"],
//     "12th": ["Math", "Physics", "Biology"]
//   };

//   const feederYears = [2023, 2024, 2025];

//   return (
//     <>
//       <div className="top-trends"><h2>Top Trends</h2></div>
//       <div className="feeder-section">
//         <h3 onClick={() => setShowFeeder(!showFeeder)} className="feeder-toggle">
//           📚 Feeder School {showFeeder ? "▲" : "▼"}
//         </h3>

//         {showFeeder && (
//           <div>
//             {classes.map((cls, index) => (
//               <div key={index}>
//                 <button
//                   className="feeder-class-button"
//                   onClick={() => {
//                     setSelectedClass(selectedClass === cls ? null : cls);
//                     setSelectedSubject(null);
//                   }}
//                 >
//                   {cls} Class
//                 </button>

//                 {selectedClass === cls && (
//                   <div className="feeder-subjects">
//                     <h4 className="class">➡ {cls} Subjects </h4>
//                     {subjectsByClass[cls].map((subject, idx) => (
//                       <div key={idx}>
//                         <button
//                           className="feeder-subject-button"
//                           onClick={() => setSelectedSubject(selectedSubject === subject ? null : subject)}
//                         >
//                           {subject}
//                         </button>

//                         {selectedSubject === subject && (
//                           <div className="feeder-years">
//                             <h4>➡ {subject} PDFs ({cls})</h4>
//                             <ul>
//                               {feederYears.map((year) => {
//                                 const key = `${cls}-${subject}-${year}`;
//                                 const link = driveLinks[key];
//                                 return (
//                                   <li key={year}>
//                                     {link ? (
//                                       <a href={link} className="subject-link" target="_blank" rel="noopener noreferrer">
//                                         📄 {year}
//                                       </a>
//                                     ) : (
//                                       <span className="subject-link disabled">❌ {year}</span>
//                                     )}
//                                   </li>
//                                 );
//                               })}
//                             </ul>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="admin-link">
//           <Link to="/Admin" className="admin-button">🔧 Admin Panel</Link>
//         </div>
//       </div>
//     </>
//   );
// }









//*****************old code******************* */
// import { useState } from "react";
// import './ProgramCard.css';
// import { Link } from "react-router";
// import '../components/FeederSchool.css';
// import driveLinks from "../data/driveLinks";

// export default function FeederSchool() {
//   const [showFeeder, setShowFeeder] = useState(false);
//   const [selectedFeederSubject, setSelectedFeederSubject] = useState(null);

//   const feederSubjects = ["Math", "Physics", "Chemistry"];
//   const feederYears = [2023, 2024, 2025];

//   return (
//     <>
//     <div className="top-trends"><h2>Top Trends</h2></div>
//     <div className="feeder-section">
//       <h3 onClick={() => setShowFeeder(!showFeeder)} className="feeder-toggle">
//         📚 Feeder School {showFeeder ? "▲" : "▼"}
//       </h3>

//       {showFeeder && (
//         <div className="feeder-subjects">
//           {feederSubjects.map((subject, index) => (
//             <button key={index} className="feeder-subject-button" onClick={() => setSelectedFeederSubject(selectedFeederSubject === subject ? null : subject)}>
//               {subject}
//             </button>
//           ))}

//           {selectedFeederSubject && (
//             <div className="feeder-years">
//               <h4>{selectedFeederSubject} PDFs</h4>
//               <ul>
//                 {feederYears.map((year) => {
//                   const key = `${selectedFeederSubject}-${year}`;
//                   const link = driveLinks[key];
//                   return (
//                     <li key={year}>
//                       {link ?(
//                         <a href={link} className="subject-link"  target="_blank"  rel="noopener noreferrer" >
//                           📄 {year}
//                         </a>
//                       ) : (
//                         <span className="subject-link disabled">🚫 {year}</span>
//                       )}
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}

//       <div className="admin-link">
//         <Link to="/Admin" className="admin-button">🔧 Admin Panel</Link>
//       </div>
//     </div>
//     </>
//   );
// }
