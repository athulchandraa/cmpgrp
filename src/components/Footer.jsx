

import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  Landmark,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'



import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Departments', to: '/departments' },
]

const importantLinks = [
  { label: 'Submit Grievance', to: '/submit-grievance' },
  { label: 'Track Grievance', to: '/track-grievance' },
  { label: 'Login', to: '/login' },
  { label: 'Register', to: '/register' },
]

function Footer() {
  return (
    <footer className="bg-[#104a36] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-3 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/10">
              <Landmark aria-hidden="true" size={24} />
            </span>
            <span>
              <span className="block text-lg font-bold">CM Kerala</span>
              <span className="block text-xs text-white/70">
                Public Grievance Portal
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/75">
            A public platform to raise grievances, follow progress, and
            strengthen communication between citizens and government services.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-white/75 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide">
            Important Links
          </h2>
          <ul className="mt-4 space-y-3">
            {importantLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-white/75 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide">
            Contact Information
          </h2>
          <p className="mt-2 text-xs font-medium text-emerald-100">
            Fictional demo details — not official contact information
          </p>
          <address className="mt-4 space-y-3 not-italic">
            <p className="flex items-start gap-3 text-sm text-white/75">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-emerald-100"
                size={17}
              />
              Demo Secretariat, Example Road, Thiruvananthapuram
            </p>
            <p className="flex items-center gap-3 text-sm text-white/75">
              <Phone
                aria-hidden="true"
                className="shrink-0 text-emerald-100"
                size={17}
              />
              0471-000-0000 (demo)
            </p>
            <p className="flex items-center gap-3 text-sm text-white/75">
              <Mail
                aria-hidden="true"
                className="shrink-0 text-emerald-100"
                size={17}
              />
              support@example.invalid
            </p>
          </address>

          <div className="mt-5">
            <p className="text-sm font-medium">Social media (demo)</p>
            <div className="mt-3 flex gap-3" aria-label="Demo social media icons">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80">
                <faFacebook aria-hidden="true" size={18} />
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80">
                <faInstagram aria-hidden="true" size={18} />
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80">
                <faYoutube aria-hidden="true" size={18} />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-white/65 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} CM Kerala Public Grievance Portal. Demo
          website content.
        </div>
      </div>
    </footer>
  )
}

export default Footer
