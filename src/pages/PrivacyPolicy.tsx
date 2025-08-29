// /src/pages/PrivacyPolicy.tsx
import { useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { clinicConfig } from "@/config/clinic";

const isUrl = (v?: string) => !!v && /^(https?:)?\/\//i.test(v);

const SectionCard: React.FC<{ title: string; id?: string; children: React.ReactNode }> = ({
  title,
  id,
  children,
}) => (
  <section
    id={id}
    className="rounded-2xl border bg-card text-card-foreground shadow-sm p-6 md:p-8"
  >
    <h2 className="text-lg md:text-xl font-semibold tracking-tight">{title}</h2>
    <div className="mt-3 text-[15px] leading-7 text-muted-foreground space-y-3">
      {children}
    </div>
  </section>
);

const List: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ul className="list-disc pl-5 space-y-2 marker:text-primary">{children}</ul>
);

const PrivacyPolicy = () => {
  const { clinicName, email, phone, locations, website, legal } = clinicConfig;

  const primaryAddress = locations?.[0]?.address ?? "";
  const rawEffective = legal?.privacy?.effectiveDate;

  const effectiveDate = useMemo(() => {
    if (!rawEffective) {
      return new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    const d = new Date(rawEffective);
    if (isNaN(d.getTime())) return rawEffective; // already human-readable
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [rawEffective]);

  useEffect(() => {
    document.title = `Privacy Policy — ${clinicName}`;
  }, [clinicName]);

  return (
    <>
      <Header />

      {/* Title / Meta */}
      <div className="bg-gradient-to-br from-muted/40 to-background border-b">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Privacy Policy</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>Effective Date: {effectiveDate}</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="bg-background">
        <div className="container mx-auto px-4 py-10">
          <div className="mx-auto max-w-3xl space-y-6">
            <SectionCard title="1. Introduction" id="introduction">
              <p>
                {clinicName} (“we,” “us,” or “our”) is committed to protecting your privacy.
                This Privacy Policy explains what information we collect, how we use it, and your
                choices.
              </p>
            </SectionCard>

            <SectionCard title="2. Information We Collect" id="information-we-collect">
              <List>
                <li>
                  <strong>Contact Details:</strong> name, email, phone number, location selection.
                </li>
                <li>
                  <strong>Appointment Info:</strong> preferred date/time, household size, notes you provide.
                </li>
                <li>
                  <strong>Technical Data:</strong> basic analytics and device data (e.g., browser type, pages visited).
                </li>
              </List>
            </SectionCard>

            <SectionCard title="3. How We Use Your Information" id="how-we-use">
              <List>
                <li>To schedule and manage appointments.</li>
                <li>To communicate with you about services, confirmations, and reminders.</li>
                <li>To improve our website, services, and customer experience.</li>
                <li>To comply with legal obligations and enforce our terms.</li>
              </List>
            </SectionCard>

            <SectionCard title="4. Legal Bases (where applicable)" id="legal-bases">
              <List>
                <li>Consent (e.g., when you submit a booking form).</li>
                <li>Contract (to provide requested services).</li>
                <li>Legitimate interests (service quality, site security, analytics).</li>
                <li>Legal obligations (record keeping, compliance).</li>
              </List>
            </SectionCard>

            <SectionCard title="5. Sharing of Information" id="sharing">
              <p>
                We do not sell your personal information. We may share limited data with service
                providers (e.g., scheduling, email, hosting) under confidentiality obligations, and
                when required by law.
              </p>
            </SectionCard>

            <SectionCard title="6. Data Retention" id="retention">
              <p>
                We retain information only as long as necessary to provide services and comply with
                legal requirements. Retention periods may vary depending on the type of data.
              </p>
            </SectionCard>

            <SectionCard title="7. Your Rights" id="your-rights">
              <p>
                Depending on your location, you may have rights to access, correct, delete, or
                restrict the use of your personal information. To exercise these rights, contact us
                using the details below.
              </p>
            </SectionCard>

            <SectionCard title="8. Cookies & Similar Technologies" id="cookies">
              <p>
                We may use essential and analytic cookies to operate and improve the site. You can
                control cookies through your browser settings.
              </p>
            </SectionCard>

            <SectionCard title="9. Children’s Privacy" id="children">
              <p>
                Our services are intended for families and guardians. We collect information from
                adults/guardians booking appointments on behalf of minors.
              </p>
            </SectionCard>

            <SectionCard title="10. Security" id="security">
              <p>
                We use reasonable administrative, technical, and physical safeguards to protect your
                information. No method of transmission or storage is 100% secure.
              </p>
            </SectionCard>

            <SectionCard title="11. International Transfers" id="transfers">
              <p>
                If we process data outside your country, we take appropriate measures to protect it
                in accordance with applicable laws.
              </p>
            </SectionCard>

            <SectionCard title="12. Contact Us" id="contact-us">
              <address className="not-italic">
                <div>
                  <strong>{clinicName}</strong>
                </div>
                {primaryAddress && <div>{primaryAddress}</div>}
                <div>{phone}</div>
                <div>{email}</div>
              </address>
            </SectionCard>

            <SectionCard title="13. Updates to This Policy" id="updates">
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this
                page with a new effective date.
              </p>
            </SectionCard>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
