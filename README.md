# Lice Clinic Website Template

A professional, customizable single-page website template designed specifically for lice removal clinics. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Fully Customizable**: Easy configuration through a single config file
- **Professional Design**: Clean, medical-grade aesthetic that builds trust
- **Conversion Optimized**: Based on proven high-performing lice clinic websites
- **Responsive**: Works perfectly on all devices
- **SEO Optimized**: Built with search engine optimization in mind

## Quick Start

1. **Clone and Install**
```bash
npm install
npm run dev
```

2. **Customize Your Clinic**
Edit `src/config/clinic.ts` with your clinic's information:

```typescript
export const clinicConfig: ClinicConfig = {
  clinicName: "Your Clinic Name",
  phone: "(555) 123-4567",
  email: "info@yourclinic.com",
  
  locations: [
    {
      name: "Main Location",
      address: "123 Main Street, Your City, State 12345"
    }
  ],
  
  theme: {
    primary: "200 95% 45%", // Your brand colors (HSL)
    secondary: "150 60% 55%"
  },
  
  heroStats: {
    yearsInBusiness: 8,
    patientsHelped: 5000
  },
  
  bookingForm: {
    fields: ['firstName', 'lastName', 'email', 'phone', 'location', 'date', 'householdSize'],
    submitUrl: "/api/book-appointment",
    requiresLocation: true
  }
};
```

## Customization Options

### Branding
- Clinic name and logo
- Custom color scheme (primary and secondary colors)
- Contact information (phone, email, locations)

### Content
- Years in business and patient statistics
- Custom messaging and taglines
- Location information (supports multiple locations)

### Booking Form
- Configurable form fields
- Custom submit URL for your booking system
- Location selection (optional)

### Theme Colors
Update the `theme` object in the config to match your brand:
- Colors use HSL format (e.g., "200 95% 45%")
- Primary color: Main brand color
- Secondary color: Accent/action color

## Form Integration

The booking form can be integrated with any backend system by updating the `submitUrl` in the config. The form will POST the following data:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "location": "Main Location",
  "date": "2024-01-15",
  "householdSize": "3"
}
```

## Deployment

Deploy to any static hosting service:

```bash
npm run build
```

The `dist` folder contains your production-ready website.

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Shadcn/ui Components

## Support

This template is designed to be easily customizable by developers and can be white-labeled for multiple clinic locations.