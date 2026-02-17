import React from 'react';
import { Youtube, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

/**
 * Footer Component
 * 
 * Clones the detailed footer containing office contact information,
 * social media links, and required professional disclosures.
 */
const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F1F1F1] text-[#000000] py-16 lg:py-24 border-t border-[#E0E0E0]">
      <div className="container mx-auto px-[6%] max-w-[1600px]">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Contact Column */}
          <div className="space-y-4">
            <h4 className="text-accent-caps text-[0.875rem] font-bold tracking-[0.2em] mb-6">CONTACT</h4>
            <div className="space-y-2">
              <p className="font-body text-[1rem] leading-relaxed">
                Aaron Kirman | CA DRE #01296524
              </p>
              <a 
                href="tel:(424) 249-7162" 
                className="block font-body text-[1rem] hover:text-[#B69E76] transition-colors duration-300"
              >
                (424) 249-7162
              </a>
            </div>
          </div>

          {/* Office Column */}
          <div className="space-y-4">
            <h4 className="text-accent-caps text-[0.875rem] font-bold tracking-[0.2em] mb-6">OFFICE</h4>
            <div className="space-y-2">
              <p className="font-body text-[1rem] leading-relaxed whitespace-pre-line">
                433 N Camden Dr #600{"\n"}
                Beverly Hills, CA 90210
              </p>
            </div>
          </div>

          {/* Navigation Column (placeholder as per requirements/structure) */}
          <div className="space-y-4">
            <h4 className="text-accent-caps text-[0.875rem] font-bold tracking-[0.2em] mb-6">NAVIGATION</h4>
            <ul className="space-y-3">
              <li><a href="/about" className="font-body text-[0.9375rem] hover:text-[#B69E76] transition-colors duration-300">About</a></li>
              <li><a href="/exclusive-listings" className="font-body text-[0.9375rem] hover:text-[#B69E76] transition-colors duration-300">Listings</a></li>
              <li><a href="/media/tv-video/" className="font-body text-[0.9375rem] hover:text-[#B69E76] transition-colors duration-300">Media</a></li>
              <li><a href="/contact-us/" className="font-body text-[0.9375rem] hover:text-[#B69E76] transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Follow Us Column */}
          <div className="space-y-4">
            <h4 className="text-accent-caps text-[0.875rem] font-bold tracking-[0.2em] mb-6">FOLLOW US</h4>
            <div className="flex gap-5">
              <a href="https://www.youtube.com/c/AaronKirmanVlog/videos" target="_blank" rel="noopener noreferrer" className="text-[#000000] hover:text-[#B69E76] transition-colors duration-300" aria-label="YouTube">
                <Youtube size={20} />
              </a>
              <a href="https://www.instagram.com/aaronkirman/" target="_blank" rel="noopener noreferrer" className="text-[#000000] hover:text-[#B69E76] transition-colors duration-300" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/aaronkirmanpage" target="_blank" rel="noopener noreferrer" className="text-[#000000] hover:text-[#B69E76] transition-colors duration-300" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.linkedin.com/in/aaron-kirman-b48a6423" target="_blank" rel="noopener noreferrer" className="text-[#000000] hover:text-[#B69E76] transition-colors duration-300" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com/aaronkirman" target="_blank" rel="noopener noreferrer" className="text-[#000000] hover:text-[#B69E76] transition-colors duration-300" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-[#E0E0E0] mb-8"></div>

        {/* Legal Disclosures */}
        <div className="space-y-6 text-[#737373] text-[0.75rem] leading-[1.8] font-body">
          <p className="font-bold text-[#000000]">
            Christie&apos;s International Real Estate Southern California | CA DRE# 01527644
          </p>
          <p className="max-w-[1200px]">
            All information provided herein has been obtained from sources believed reliable, but may be subject to errors, omissions, change of price, prior sale, or withdrawal without notice. Christie&apos;s International Real Estate and its affiliates make no representation, warranty or guaranty as to accuracy of any information contained herein. You should consult your advisors for an independent verification of any properties.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Accessibility */}
        <div className="mt-12 pt-8 border-t border-[#E0E0E0] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <img 
              src="https://media-production.lp-cdn.com/cdn-cgi/image/format=auto,quality=85,fit=scale-down,width=1280/https://media-production.lp-cdn.com/media/54898a0b-3ff6-46f8-a545-5031b5fe9c5b" 
              alt="Aaron Kirman Logo" 
              className="h-8 w-auto opacity-80"
            />
            <span className="text-[0.75rem] text-[#737373]">
              © {new Date().getFullYear()} Aaron Kirman. All Rights Reserved.
            </span>
          </div>
          
          <div className="flex gap-6 text-[0.75rem] text-[#737373]">
            <a href="#" className="hover:text-[#000000] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#000000] transition-colors">Terms of Use</a>
            <span className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="opacity-60">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              Accessibility
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;