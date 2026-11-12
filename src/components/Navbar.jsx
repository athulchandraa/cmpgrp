import { useState } from 'react'
import { href, Link } from 'react-router-dom'
import { Landmark, Menu, X } from 'lucide-react'


const navigationLinks = [
  { label: 'Home', href:'#Hero' },
  { label: 'About Us', href: '#about' },
  { label: 'How It Works', href: '#how' },
  { label: 'Departments', href: '#department' },
  { label: 'Contact', href: '#footer' },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Close the mobile menu after a visitor chooses a destination.
  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className="relative z-50 bg-[#145B43] text-white shadow-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
      >
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/10">
            <Landmark aria-hidden="true" size={25} strokeWidth={1.8} />
          </span>
          <span className="flex flex-col">
            <span className="text-lg font-bold leading-tight tracking-wide">
              CM Kerala
            </span>
            <span className="text-xs leading-tight text-white/80">
              Public Grievance Portal
            </span>
          </span>
        </Link>

        <button
          type="button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
        >
          {isMenuOpen ? (
            <X aria-hidden="true" size={25} />
          ) : (
            <Menu aria-hidden="true" size={25} />
          )}
        </button>

        <div
          id="primary-navigation"
          className={`${isMenuOpen ? 'flex' : 'hidden'} w-full flex-col gap-4 pt-4 md:flex md:w-auto md:flex-row md:items-center md:gap-7 md:pt-0`}
        >
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-6">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="rounded px-2 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:px-0"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 border-t border-white/20 pt-3 sm:flex-row md:border-0 md:pt-0">
            <Link
              to="/login"
              onClick={closeMenu}
              className="rounded-md border border-white px-5 py-2 text-center text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={closeMenu}
              className="rounded-md bg-white px-5 py-2 text-center text-sm font-semibold text-[#145B43] transition hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
