// /src/config/clinic.ts
import clinicLogo from "@/assets/logo.png";
import networkBadge from "@/assets/network-badge.png";

export interface ClinicConfig {
  clinicName: string;
  logo?: string;

  phone: string;
  email: string;

  website?: string;
  mainArea?: string;

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
    fields: Array<
      | "firstName"
      | "lastName"
      | "email"
      | "phone"
      | "location"
      | "date"
      | "householdSize"
      | "notes"
    >;
    /** Leave blank to use Web3Forms fallback */
    submitUrl: string; // <- keep as empty string
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
    certificationLevel?: "certified" | "verified" | "premium";
    showBadge: boolean;
    showStats: boolean;
    localArea: string;
    certificationBlurb: string;
    badgeImage?: string;
  };

  legal?: {
    privacy?: {
      effectiveDate?: string;
      source?: string;
    };
  };
}

export const clinicConfig: ClinicConfig = {
  clinicName: "Lice Treatment Center",
  logo: clinicLogo,

  phone: "(555) 123-4567",
  email: "info@licetreatment.com",

  website: "https://www.licetreatment.com",
  mainArea: "Downtown",

  areasServed: ["Downtown", "Northside", "Riverside", "West Valley"],

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
    submitUrl: "",             // ⬅️ turn OFF custom endpoint
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
    badgeImage: networkBadge,
  },

  legal: {
    privacy: {
      effectiveDate: "2025-08-29",
      source: "Firstrive standard template",
    },
  },
};
