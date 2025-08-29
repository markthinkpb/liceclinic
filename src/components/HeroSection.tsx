// /src/components/HeroSection.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { clinicConfig } from "@/config/clinic";
import heroImage from "@/assets/hero-family.jpg";
// Optional toast (shadcn sonner). If not installed, comment this out and we’ll use alert().
import { toast } from "sonner";

type FormData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  location?: string;
  date?: string;
  householdSize?: number | string;
  notes?: string;
};

const HeroSection = () => {
  const { heroStats, bookingForm, areasServed = [] } = clinicConfig;
  const [formData, setFormData] = useState<FormData>({});
  const [submitting, setSubmitting] = useState(false);

  const showLocationField =
    bookingForm.fields.includes("location") &&
    bookingForm.requiresLocation &&
    areasServed.length > 0;

  const requiredFields = bookingForm.fields.filter((f) => {
    if (f === "location") return bookingForm.requiresLocation && showLocationField;
    if (f === "notes") return false; // usually optional
    return true;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend validation from config
    const missing = requiredFields.filter((f) => {
      const v = (formData as any)[f];
      return v === undefined || v === null || String(v).trim() === "";
    });

    if (missing.length) {
      const msg = `Please fill: ${missing.join(", ")}`;
      try { toast?.error?.(msg); } catch { alert(msg); }
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(bookingForm.submitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          // normalize types:
          householdSize: formData.householdSize ? Number(formData.householdSize) : undefined,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Submission failed (${res.status})`);
      }

      try { toast?.success?.("Appointment request sent! We’ll be in touch soon."); } catch { alert("Appointment request sent!"); }
      setFormData({});
      // If you use controlled inputs with value=..., reset them here or reload
    } catch (err: any) {
      try { toast?.error?.(err.message || "Something went wrong."); } catch { alert(err.message || "Something went wrong."); }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background to-accent/20">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15" style={{ backgroundImage: `url(${heroImage})` }} />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left copy ... unchanged */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-text-gradient bg-clip-text text-transparent">FAST. EFFECTIVE.</span><br />
                <span className="text-secondary font-extrabold">GUARANTEED</span>
              </h1>

              <div className="text-xl text-muted-foreground max-w-lg">
                Our network of lice removal professionals has treated over{" "}
                <span className="font-bold text-primary">{heroStats.patientsHelped.toLocaleString()} cases</span> of lice, many near you!
              </div>

              {heroStats.customMessage && (
                <div className="text-2xl font-bold text-secondary">{heroStats.customMessage}</div>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <a href="#booking-form">Book Appointment</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#benefits">Learn More</a>
              </Button>
            </div>
          </div>

          {/* Booking Form */}
          <Card id="booking-form" className="scroll-mt-24 p-8 bg-background/95 backdrop-blur-sm shadow-form border-0">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">Book an Appointment</h3>
              <p className="text-muted-foreground">Get rid of lice in just one treatment</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {bookingForm.fields.includes("firstName") && (
                  <Input placeholder="First Name*" required className="bg-background"
                    value={formData.firstName ?? ""} onChange={(e) => setFormData((s) => ({ ...s, firstName: e.target.value }))} />
                )}
                {bookingForm.fields.includes("lastName") && (
                  <Input placeholder="Last Name*" required className="bg-background"
                    value={formData.lastName ?? ""} onChange={(e) => setFormData((s) => ({ ...s, lastName: e.target.value }))} />
                )}
              </div>

              {bookingForm.fields.includes("email") && (
                <Input type="email" placeholder="Email Address*" required className="bg-background"
                  value={formData.email ?? ""} onChange={(e) => setFormData((s) => ({ ...s, email: e.target.value }))} />
              )}

              {bookingForm.fields.includes("phone") && (
                <Input type="tel" placeholder="Mobile Number" className="bg-background"
                  value={formData.phone ?? ""} onChange={(e) => setFormData((s) => ({ ...s, phone: e.target.value }))} />
              )}

              {showLocationField && (
                <Select
                  value={formData.location}
                  onValueChange={(v) => setFormData((s) => ({ ...s, location: v }))}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select Area*" />
                  </SelectTrigger>
                  <SelectContent>
                    {areasServed.map((area, idx) => (
                      <SelectItem key={idx} value={area}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {bookingForm.fields.includes("date") && (
                <Input type="date" placeholder="Preferred Date*" required className="bg-background"
                  value={formData.date ?? ""} onChange={(e) => setFormData((s) => ({ ...s, date: e.target.value }))} />
              )}

              {bookingForm.fields.includes("householdSize") && (
                <Input type="number" placeholder="Number of household members?*" required min={1} className="bg-background"
                  value={formData.householdSize ?? ""} onChange={(e) => setFormData((s) => ({ ...s, householdSize: e.target.value }))} />
              )}

              {bookingForm.fields.includes("notes") && (
                <Input placeholder="Additional Notes" className="bg-background"
                  value={formData.notes ?? ""} onChange={(e) => setFormData((s) => ({ ...s, notes: e.target.value }))} />
              )}

              <Button type="submit" disabled={submitting}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                {submitting ? "Submitting..." : "SUBMIT"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
