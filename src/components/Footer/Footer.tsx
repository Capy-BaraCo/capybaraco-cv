import { profile } from '../../data/profile'
import './footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p>{profile.name}</p>
          <a href={`mailto:${profile.email}`} className="footer-link">
            {profile.email}
          </a>
        </div>
        <div className="footer-links">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub
          </a>
          <span className="footer-divider">·</span>
          <a
            href={profile.website}
            className="footer-link"
          >
            Website
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-credit">Built with React + TypeScript</p>
      </div>
    </footer>
  )
}
