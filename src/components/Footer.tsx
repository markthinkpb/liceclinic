import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { clinicConfig } from "@/config/clinic";

const Footer = () => {
  const {
    clinicName,
    phone,
    email,
    locations,
    socialLinks,
    areasServed = [],
    website,
    networkMembership,
  } = clinicConfig;

  return (
    <footer id="contact" className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        {/* Row 1 */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Clinic Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{clinicName}</h3>
            <p className="text-background/80">
              Professional lice removal services with guaranteed results in a single treatment.
            </p>
            <div className="flex space-x-4">
              {socialLinks?.facebook && (
                <a
                  href={socialLinks.facebook}
                  className="text-background/60 hover:text-background transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              )}
              {socialLinks?.instagram && (
                <a
                  href={socialLinks.instagram}
                  className="text-background/60 hover:text-background transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              )}
              {socialLinks?.google && (
                <a
                  href={socialLinks.google}
                  className="text-background/60 hover:text-background transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google
                </a>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-background/60" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-background/60" />
                <span>{email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-background/60" />
                <span>Mon-Fri: 9AM-6PM</span>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Locations</h4>
            <div className="space-y-4">
              {locations.map((location, index) => (
                <div key={index} className="space-y-2">
                  <div className="font-medium">{location.name}</div>
                  <div className="flex items-start space-x-2 text-sm text-background/80">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{location.address}</span>
                  </div>
                  {location.phone && location.phone !== phone && (
                    <div className="text-sm text-background/80 ml-6">
                      {location.phone}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 (NEW) */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {/* Col 1: Areas We Serve */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Areas We Serve</h4>
            {areasServed.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {areasServed.map((area, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-background/10 text-background/90 text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-background/60 text-sm">Contact us to confirm service coverage in your area.</p>
            )}
          </div>

          {/* Col 2: (reserved / spacer) */}
          <div className="space-y-4" />

          {/* Col 3: Website + Network Badge */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">More</h4>
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 underline underline-offset-4 hover:opacity-80"
              >
                Visit our website <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {networkMembership?.badgeImage && (
              <div className="mt-4">
                <img
                  src={networkMembership.badgeImage}
                  alt={`${networkMembership.networkName} Badge`}
                  className="max-h-16 w-auto"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-background/20 mt-12 pt-8 text-center text-background/60">
          <p>
            &copy; {new Date().getFullYear()} {clinicName}. All rights reserved.{" "}
            <a href="/privacy" className="underline hover:text-background">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
