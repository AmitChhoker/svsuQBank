import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
  FaGithub,
} from "react-icons/fa";
import "../styles/SocialMediaBar.css";

const SocialMediaBar = () => {
  const links = [
    {
      name: "WhatsApp",
      href: "https://chat.whatsapp.com/GoFHxo0Yk2xDC3qJJ5682i",
      icon: <FaWhatsapp />,
      className: "smb-whatsapp",
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: <FaInstagram />,
      className: "smb-instagram",
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      icon: <FaYoutube />,
      className: "smb-youtube",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: <FaLinkedinIn />,
      className: "smb-linkedin",
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: <FaFacebookF />,
      className: "smb-facebook",
    },
    {
      name: "GitHub",
      href: "https://github.com/AmitChhoker/svsuQBank",
      icon: <FaGithub />,
      className: "smb-github",
    },
  ];

  return (
    <aside className="smb" aria-label="Social media links">
      <span className="smb-line smb-line-top" aria-hidden="true" />

      <ul className="smb-list">
        {links.map((link) => (
          <li key={link.name} className="smb-item">
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`smb-link ${link.className}`}
              aria-label={link.name}
            >
              <span className="smb-icon">{link.icon}</span>
              <span className="smb-tooltip">{link.name}</span>
            </a>
          </li>
        ))}
      </ul>

      <span className="smb-line smb-line-bottom" aria-hidden="true" />
    </aside>
  );
};

export default SocialMediaBar;