// /src/components/HeroSection.tsx
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { clinicConfig } from "@/config/clinic";
import heroImage from "@/assets/hero-family.jpg";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react"; // ← plugin

type FormData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  location?: string;
  date?: string;
  householdSize?: number | string;
  notes?: string;
  botcheck?: string; // honeypot
};

const HeroSection = () => {
  const { heroStats, bookingForm, areasServed = [], clinicName } = clinicConfig;

  // RHF setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting }
  } = useForm<FormData>({
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      date: "",
      householdSize: "",
      notes: "",
      botcheck: ""
    }
  });

  // Build a human subject + from name; plugin will send email for you
  const settings = useMemo(
    () => ({
      from_name: clinicName, // shown as sender name if needed
      subject: `New Booking — ${clinicName}`, // your email subject
      // You can add other settings here if needed
    }),
    [clinicName]
  );

  // Wire Web3Forms
  const { submit: onSubmit } = useWeb3Forms({
    access_key: import.meta.env.VITE_WEB3FORMS_KEY, // Vite env
    settings,
    onSuccess: (msg) => {
      toast.success(msg || "Appointment request sent! We’ll be in touch soon.");
      reset();
    },
    onError: (msg) => {
      toast.error(msg || "Something went wrong. Please try again.");
    }
  });

  // Required fields based on config
  const showLocationField =
    bookingForm.fields.includes("location") &&
    bookingForm.requiresLocation &&
    areasServed.length > 0;

  const requiredFields = useMemo(
    () =>
      bookingForm.fields.filter((f) => {
        if (f === "location") return bookingForm.requiresLocation && showLocationField;
        if (f === "notes") return false;
        return true;
      }),
    [bookingForm.fields, bookingForm.requiresLocation, showLocationField]
  );

  // RHF validation rules derived from config
  const req = (name: keyof FormData) =>
    requiredFields.includes(name as any) ? { required: true } : {};

  // Submit handler: we’ll enrich the payload with replyto, subject, etc.
  const submitHandler = handleSubmit(async (data) => {
    // Attach email meta so replies go to the submitter
    const payload = {
      ...data,
      // Web3Forms looks for `email` by default for Reply-To, but we can be explicit:
      replyto: data.email,
      // A readable sender name for the inbox preview
      from_name:
        `${(data.firstName || "").trim()} ${(data.lastName || "").trim()}`.trim() ||
        clinicName,
      submittedAt: new Date().toISOString(),
      page: typeof window !== "undefined" ? window.location.href : undefined,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined
    };

    // Hand off to Web3Forms hook
    await onSubmit(payload);
  });

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background to-accent/20">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left copy */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-text-gradient bg-clip-text text-transparent">
                  FAST. EFFECTIVE.
                </span>
                <br />
                <span className="text-secondary font-extrabold">GUARANTEED</span>
              </h1>

              <div className="text-xl text-muted-foreground max-w-lg">
                Our network of lice removal professionals has treated over{" "}
                <span className="font-bold text-primary">
                  {heroStats.patientsHelped.toLocaleString()} cases
                </span>{" "}
                of lice, many near you!
              </div>

              {heroStats.customMessage && (
                <div className="text-2xl font-bold text-secondary">
                  {heroStats.customMessage}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                asChild
              >
                <a href="#booking-form">Book Appointment</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#benefits">Learn More</a>
              </Button>
            </div>
          </div>

          {/* Booking Form */}
          <Card
            id="booking-form"
            className="scroll-mt-24 p-8 bg-background/95 backdrop-blur-sm shadow-form border-0"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Book an Appointment
              </h3>
              <p className="text-muted-foreground">
                Get rid of lice in just one treatment
              </p>
            </div>

            <form onSubmit={submitHandler} className="space-y-4">
              {/* Honeypot */}
              <input
                type="text"
                {...register("botcheck")}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="grid grid-cols-2 gap-4">
                {bookingForm.fields.includes("firstName") && (
                  <Input
                    placeholder="First Name*"
                    className="bg-background"
                    {...register("firstName", req("firstName"))}
                  />
                )}
                {bookingForm.fields.includes("lastName") && (
                  <Input
                    placeholder="Last Name*"
                    className="bg-background"
                    {...register("lastName", req("lastName"))}
                  />
                )}
              </div>

              {bookingForm.fields.includes("email") && (
                <Input
                  type="email"
                  placeholder="Email Address*"
                  className="bg-background"
                  {...register("email", { ...req("email") })}
                />
              )}

              {bookingForm.fields.includes("phone") && (
                <Input
                  type="tel"
                  placeholder="Mobile Number"
                  className="bg-background"
                  {...register("phone")}
                />
              )}

              {showLocationField && (
                <Select
                  value={watch("location") || ""}
                  onValueChange={(v) => setValue("location", v, { shouldValidate: true })}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select Area*" />
                  </SelectTrigger>
                  <SelectContent>
                    {areasServed.map((area, idx) => (
                      <SelectItem key={idx} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {bookingForm.fields.includes("date") && (
                <Input
                  type="date"
                  placeholder="Preferred Date*"
                  className="bg-background"
                  {...register("date", req("date"))}
                />
              )}

              {bookingForm.fields.includes("householdSize") && (
                <Input
                  type="number"
                  min={1}
                  placeholder="Number of household members?*"
                  className="bg-background"
                  {...register("householdSize", req("householdSize"))}
                />
              )}

              {bookingForm.fields.includes("notes") && (
                <Input
                  placeholder="Additional Notes"
                  className="bg-background"
                  {...register("notes")}
                />
              )}
              <input type="hidden" name="replyto" value="mark@thinkpb.com" />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                {isSubmitting ? "Submitting..." : "SUBMIT"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
