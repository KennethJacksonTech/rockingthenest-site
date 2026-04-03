import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-inverse text-text-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-2">
              Rocking The Nest
            </h3>
            <p className="text-text-light/70 font-body text-sm">
              Adventures in Empty Nesting
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4 text-text-light/70">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/blog", label: "Blog" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-light/70 hover:text-text-light transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4 text-text-light/70">
              Get In Touch
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="mailto:maggie@rockingthenest.com"
                  className="text-text-light/70 hover:text-text-light transition-colors text-sm"
                >
                  maggie@rockingthenest.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:brad@rockingthenest.com"
                  className="text-text-light/70 hover:text-text-light transition-colors text-sm"
                >
                  brad@rockingthenest.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-text-muted text-xs">
            Made in Amarillo, Texas by KennethJackson.Tech
          </p>
          <p className="text-text-muted text-xs">
            &copy; 2024 Rocking The Nest
          </p>
        </div>
      </div>
    </footer>
  );
}
