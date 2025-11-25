import { Link as RouterLink } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-xl mt-24">
      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-semibold text-lg text-white">Mesh</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Unified AI-powered data layer connecting fire, police, EMS, and emergency management for real-time public safety interoperability.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <RouterLink to="/platform" className="text-slate-400 hover:text-red-400 transition-colors text-sm">
                  Mesh Core
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/platform" className="text-slate-400 hover:text-red-400 transition-colors text-sm">
                  Insight Engine
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/platform" className="text-slate-400 hover:text-red-400 transition-colors text-sm">
                  Integration Services
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/platform" className="text-slate-400 hover:text-red-400 transition-colors text-sm">
                  Training Programs
                </RouterLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <RouterLink to="/about" className="text-slate-400 hover:text-red-400 transition-colors text-sm">
                  About Us
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/about" className="text-slate-400 hover:text-red-400 transition-colors text-sm">
                  How It Works
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/contact" className="text-slate-400 hover:text-red-400 transition-colors text-sm">
                  Contact
                </RouterLink>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-red-400 transition-colors text-sm">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-red-500 flex-shrink-0" />
                <a href="mailto:info@meshplatform.io" className="text-slate-400 hover:text-red-400 transition-colors text-sm">
                  info@meshplatform.io
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-red-500 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-slate-400 hover:text-red-400 transition-colors text-sm">
                  (205) 555-0100
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">
                  Birmingham, AL
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {currentYear} Mesh. All rights reserved. Powering public safety interoperability in Birmingham.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-500 hover:text-red-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-500 hover:text-red-400 transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
