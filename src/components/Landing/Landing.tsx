import { profile } from '../../data/profile'
import './landing.css'

// EDIT ME: role line — single placeholder role shown under the name.
const ROLE = 'Systems Support Engineer'

export default function Landing() {
  return (
    <header className="landing" aria-label="Introduction">
      <div className="landing-inner">
        <p className="landing-prompt">
          <span className="landing-prompt-glyph">~ $</span> whoami
        </p>

        <h1 className="landing-name">{profile.name}</h1>

        <p className="landing-role">{ROLE}</p>

        <p className="landing-summary">{profile.summary}</p>
      </div>

      <a className="landing-scroll-cue" href="#terminal" aria-label="Scroll to terminal">
        <span className="landing-scroll-label">scroll</span>
        <span className="landing-scroll-chevron" aria-hidden="true" />
      </a>
    </header>
  )
}
