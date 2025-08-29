// If you have a logo inside /src/assets, import it like this:
import clinicLogo from "@/assets/logo.png";
import networkBadge from "@/assets/network-badge.png"; // ← add your badge image here

export interface ClinicConfig {
  clinicName: string;
  logo?: string;

  phone: string;
  email: string;

  // NEW: public site
  website?: string;

  // NEW: areas served
  areasServed?: string[];

  locations: Array<{
    name: string;
    address: string;
    phone?: string;
  }>;

  theme: {
    primary: string;
    secondary: string;
  };

  heroStats: {
    yearsInBusiness: number;
    patientsHelped: number;
    customMessage?: string;
  };

  bookingForm: {
    fields: Array<'firstName' | 'lastName' | 'email' | 'phone' | 'location' | 'date' | 'householdSize' | 'notes'>;
    submitUrl: string;
    requiresLocation: boolean;
  };

  socialLinks?: {
    facebook?: string;
    instagram?: string;
    google?: string;
  };

  networkMembership?: {
    isVerified: boolean;
    networkName: string;
    memberId?: string;
    memberSince?: number;
    certificationLevel?: 'certified' | 'verified' | 'premium';
    showBadge: boolean;
    showStats: boolean;
    localArea: string;
    certificationBlurb: string;
    // NEW: badge image for use in footer
    badgeImage?: string;
  };

  legal?: {
    privacy?: {
      /** ISO date string like "2025-08-29" or any human-readable date */
      effectiveDate?: string;
      /** Simple text or a URL describing where this policy derives from */
      source?: string;
    };
  };
}

export const clinicConfig: ClinicConfig = {
  clinicName: "Lice Treatment Center",
  logo: clinicLogo,

  phone: "(555) 123-4567",
  email: "info@licetreatment.com",

  // NEW
  website: "https://www.licetreatment.com",

  // NEW
  areasServed: [
    "Downtown",
    "Northside",
    "Riverside",
    "West Valley",
  ],

  locations: [
    {
      name: "Main Location",
      address: "123 Main Street, Your City, State 12345",
      phone: "(555) 123-4567",
    },
  ],

  theme: {
    primary: "200 95% 45%",
    secondary: "150 60% 55%",
  },

  heroStats: {
    yearsInBusiness: 8,
    patientsHelped: 400000,
    customMessage: "Lice Removal Near You",
  },

  bookingForm: {
    fields: ["firstName", "lastName", "email", "phone", "location", "date", "householdSize"],
    submitUrl: "/api/book-appointment",
    requiresLocation: true,
  },

  networkMembership: {
    isVerified: true,
    networkName: "Lice Removal Network",
    memberId: "LRN-001",
    memberSince: 2020,
    certificationLevel: "certified",
    showBadge: true,
    showStats: true,
    localArea: "Area Name",
    certificationBlurb: "Lice Removal Professional",
    // NEW
    badgeImage: networkBadge,
  },

  legal: {
    privacy: {
      effectiveDate: "2025-08-29",          // ← set your actual date
      source: "Firstrive standard template" // ← text or a URL
    }
  }
};
