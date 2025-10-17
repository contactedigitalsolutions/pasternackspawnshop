'use client';
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const DEMO = process.env.NEXT_PUBLIC_DEMO === "true";
const THEME = { orange: "#FB4F14", blue: "#002244", white: "#FFFFFF" };
const CRAIGSLIST_URL = "https://denver.craigslist.org/search/sss?query=pasternack%20pawn";

const BRAND = {
  name: "Pasternack Pawn Shop",
  city: "Denver, CO",
  phone: "+1 (303) 555-0199", // TODO: Replace with official phone
  email: "contact@pasternackpawn.com",
  address: "East Colfax Ave, Denver, CO 80220", // TODO: Replace with exact street number
  primaryCTA: "Get a Cash Offer",
  secondaryCTA: "Shop Deals",
  valueProps: ["Fast, fair cash offers", "No credit checks", "Locally owned on East Colfax"],
  services: [
    { title: "Pawn Loans", desc: "Quick cash with your item as collateral — fair rates, no credit check." },
    { title: "Buy & Sell", desc: "Jewelry, tools, electronics, collectibles — inventory changes daily." },
    { title: "Gold & Jewelry", desc: "Top-dollar for gold, silver, and diamond pieces." },
  ],
  testimonials: [
    { name: "Alex R.", text: "Honest and quick. Walked out with cash in minutes." },
    { name: "Morgan T.", text: "Great selection and prices. Staff was helpful." },
    { name: "Jordan P.", text: "Best experience I’ve had at a pawn shop." },
  ],
  plans: [
    { name: "Basic", price: "$0", period: "", features: ["Free in-store appraisal", "No obligation", "Same-day offers"], cta: "Book Appraisal", featured: false },
    { name: "Pro Seller", price: "10%", period: " consignment fee", features: ["We list for you", "Professional photos", "Craigslist exposure"], cta: "Consign Item", featured: true },
    { name: "VIP Trade", price: "$-$$$", period: " trade-in value", features: ["Priority evaluation", "Top-tier offers", "Instant store credit"], cta: "Start Trade", featured: false },
  ],
  faqs: [
    { q: "How fast can I get cash?", a: "Most loans complete in 15–30 minutes with valid ID and item evaluation." },
    { q: "Do you run credit checks?", a: "No — pawn loans use your item as collateral, no credit check required." },
    { q: "Do you buy gold?", a: "Yes, we buy gold, silver, and jewelry at competitive rates daily." },
  ],
};

function SectionShell({ id, headline, eyebrow, children, actions }: any) {
  return (
    <section id={id} className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {eyebrow && (<div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-500">{eyebrow}</div>)}
        {headline && (<h2 className="text-3xl font-bold tracking-tight md:text-4xl">{headline}</h2>)}
        {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
        <div className="mt-8 grid gap-6">{children}</div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Badge className="rounded-2xl px-3 py-1" style={{background: THEME.orange, color: THEME.white}}>{BRAND.name}</Badge>
          <span className="hidden text-sm text-gray-500 md:inline">{BRAND.city}</span>
        </div>
        <nav className="hidden gap-6 md:flex">
          <a className="text-sm text-gray-500 hover:text-black" href="#services">Services</a>
          <a className="text-sm text-gray-500 hover:text-black" href="#about">About</a>
          <a className="text-sm text-gray-500 hover:text-black" href="#shop">Shop</a>
          <a className="text-sm text-gray-500 hover:text-black" href="#pricing">Pricing</a>
          <a className="text-sm text-gray-500 hover:text-black" href="#faq">FAQ</a>
          <a className="text-sm text-gray-500 hover:text-black" href="#booking">Booking</a>
          <a className="text-sm text-gray-500 hover:text-black" href="#contact">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#contact" className="hidden md:inline">
            <Button className="rounded-2xl" style={{background: THEME.orange, color: THEME.white}}>
              {BRAND.primaryCTA}
            </Button>
          </a>
          <a className="text-sm text-gray-600 md:hidden" href="#contact">Contact</a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="w-full py-20 md:py-28 text-white" style={{background: `linear-gradient(180deg, ${THEME.blue}, #00162e)`}}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Denver’s trusted pawn shop on East Colfax — fair cash offers, classic service.</h1>
          <p className="mt-4 text-lg text-white/90">Buy & sell jewelry, tools, electronics, collectibles — or get a quick pawn loan with no credit check.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contact"><Button size="lg" className="rounded-2xl px-6" style={{background: THEME.orange, color: THEME.white}}>{BRAND.primaryCTA}</Button></a>
            <a href="#shop"><Button size="lg" variant="outline" className="rounded-2xl px-6 text-white" style={{borderColor: THEME.orange}}>{BRAND.secondaryCTA}</Button></a>
          </div>
          <ul className="mt-6 grid gap-2 text-sm text-white/80 md:grid-cols-2">
            {BRAND.valueProps.map((v, i) => (<li key={i} className="flex items-center gap-2"><span>✔</span> {v}</li>))}
          </ul>
        </div>
        <div>
          <Card className="shadow-lg">
            <CardHeader><CardTitle>Quick Contact</CardTitle></CardHeader>
            <CardContent><ContactForm compact /></CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <SectionShell id="services" eyebrow="What we do" headline="Services that help you get cash fast">
      <div className="grid gap-6 md:grid-cols-3">
        {BRAND.services.map((s, i) => (
          <Card key={i} className="rounded-2xl">
            <CardHeader><CardTitle>{s.title}</CardTitle></CardHeader>
            <CardContent><p className="text-gray-600">{s.desc}</p></CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}

function About() {
  return (
    <SectionShell id="about" eyebrow="Who we are" headline="Local experts, straight-talk offers">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-gray-600">We’re a Denver team on East Colfax focused on fair evaluations and quick cash. Bring your items in and walk out with money in minutes.</p>
          <div className="grid gap-1 text-sm text-gray-700">
            <div>Phone: {BRAND.phone}</div>
            <div>Email: {BRAND.email}</div>
            <div>Address: {BRAND.address}</div>
          </div>
        </div>
        <Card className="rounded-2xl">
          <CardHeader><CardTitle>What to expect</CardTitle></CardHeader>
          <CardContent>
            <ul className="grid gap-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">✔ Simple evaluation process</li>
              <li className="flex items-start gap-2">✔ Cash in 15–30 minutes</li>
              <li className="flex items-start gap-2">✔ Buy, sell, or trade options</li>
              <li className="flex items-start gap-2">✔ Friendly service, no pressure</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </SectionShell>
  );
}

function Testimonials() {
  return (
    <SectionShell eyebrow="Social proof" headline="What customers say">
      <div className="grid gap-6 md:grid-cols-3">
        {BRAND.testimonials.map((t, i) => (
          <Card key={i} className="rounded-2xl">
            <CardContent className="pt-6 text-gray-600">“{t.text}”<div className="mt-4 font-medium text-black">— {t.name}</div></CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}

function Booking() {
  const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL;
  return (
    <SectionShell id="booking" eyebrow="Visit us" headline="Book a visit or appraisal" actions={[
      <a key="contact" href="#contact"><Button className="rounded-2xl" style={{background: THEME.orange, color: THEME.white}}>Request Callback</Button></a>,
    ]}>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-gray-600">Choose a time that works for you or send your info and we’ll confirm your visit.</p>
          <ul className="grid gap-2 text-sm text-gray-600">
            <li>✔ Quick evaluations</li>
            <li>✔ No-pressure consultation</li>
            <li>✔ Same-day cash offers</li>
          </ul>
        </div>
        <div className="rounded-2xl border bg-white p-2">
          {calendly ? (
            <iframe src={calendly} className="h-[600px] w-full rounded-xl" title="Book with Calendly"></iframe>
          ) : (
            <div className="p-4 text-sm text-gray-600">
              <div className="mb-2 font-medium">Online scheduling not configured</div>
              <div>Add your Calendly link in <code>NEXT_PUBLIC_CALENDLY_URL</code> or use the contact form to request a callback.</div>
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
}

function Shop() {
  const items = [
    { title: "14K Gold Chain", price: "$899", tag: "Jewelry" },
    { title: "DeWALT Tool Set", price: "$349", tag: "Tools" },
    { title: "4K Smart TV", price: "$279", tag: "Electronics" },
  ];
  async function buyNow() {
    if (DEMO) { alert("Demo mode: checkout disabled."); return; }
  }
  return (
    <SectionShell id="shop" eyebrow="Buy online / see inventory" headline="Shop Pasternack deals">
      <div className="rounded-2xl border bg-white/60 p-4">
        <div className="mb-4 text-sm text-gray-600">Inventory moves fast — visit us in-store or browse current posts on Craigslist.</div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{it.title}</span>
                  <Badge className="text-white" style={{background: THEME.blue}}>{it.tag}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 text-2xl font-semibold">{it.price}</div>
                <div className="flex gap-3">
                  <a href={CRAIGSLIST_URL} target="_blank" rel="noreferrer">
                    <Button className="rounded-2xl" style={{background: THEME.orange, color: THEME.white}}>View on Craigslist</Button>
                  </a>
                  <a href="#contact">
                    <Button variant="outline" className="rounded-2xl" style={{borderColor: THEME.blue, color: THEME.blue}}>Hold Item</Button>
                  </a>
                </div>
                <div className="mt-3">
                  <Button className="rounded-2xl" onClick={buyNow} style={{background: THEME.orange, color: THEME.white}}>Buy Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <a href={CRAIGSLIST_URL} target="_blank" rel="noreferrer">
            <Button size="lg" className="rounded-2xl" style={{background: THEME.blue, color: THEME.white}}>Browse all on Craigslist</Button>
          </a>
        </div>
      </div>
    </SectionShell>
  );
}

function Pricing() {
  return (
    <SectionShell id="pricing" eyebrow="Simple options" headline="Pick what works for you">
      <div className="grid gap-6 md:grid-cols-3">
        {BRAND.plans.map((p, i) => (
          <Card key={i} className={`rounded-2xl ${p.featured ? "border-2" : ""}`} style={p.featured ? {borderColor: THEME.orange} : {}}>
            <CardHeader><CardTitle className="flex items-baseline justify-between"><span>{p.name}</span>{p.featured && <Badge style={{background: THEME.orange, color: THEME.white}}>Most Popular</Badge>}</CardTitle></CardHeader>
            <CardContent>
              <div className="mb-4 text-3xl font-bold">{p.price}<span className="text-base font-normal text-gray-500">{p.period}</span></div>
              <ul className="mb-6 grid gap-2 text-sm text-gray-600">{p.features.map((f, idx) => (<li key={idx} className="flex items-start gap-2">✔ {f}</li>))}</ul>
              <Button className="w-full rounded-2xl" style={{background: THEME.blue, color: THEME.white}}>{p.cta}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}

function FAQ() {
  return (
    <SectionShell id="faq" eyebrow="Answers" headline="Frequently asked questions">
      <Accordion>
        {BRAND.faqs.map((f, i) => (
          <AccordionItem key={i}>
            <AccordionTrigger>{f.q}</AccordionTrigger>
            <AccordionContent>{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionShell>
  );
}

function ContactForm({ compact = false }: { compact?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setOk(null); setError(null);
    const form = new FormData(e.currentTarget as HTMLFormElement);
    const payload = Object.fromEntries(form.entries());

    if (DEMO) {
      setTimeout(() => { setOk(true); setLoading(false); }, 600);
      return;
    }

    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error("Submission failed");
      setOk(true);
    } catch (err:any) {
      setOk(false); setError(err?.message || "Unable to submit. Try again or call us.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className={`grid gap-3 ${compact ? "" : "max-w-xl"}`}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Input name="firstname" placeholder="Your name" required />
        <Input type="email" name="email" placeholder="Email" required />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Input type="tel" name="phone" placeholder="Phone" />
        <Input name="service" placeholder="Item / Service of interest" />
      </div>
      <Textarea name="message" placeholder="Tell us about your item or request" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Input type="date" name="preferred_date" placeholder="Preferred date" />
        <Input type="time" name="preferred_time" placeholder="Preferred time" />
      </div>
      <Button type="submit" className="rounded-2xl" disabled={loading} style={{background: THEME.orange, color: THEME.white}}>
        {loading ? ("Sending...") : (DEMO ? "Send (Demo)" : "Send Request")}
      </Button>
      {ok && <p className="text-sm text-green-600">{DEMO ? "Demo submission recorded locally." : "Thanks! We’ll reach out shortly."}</p>}
      {ok === false && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-gray-500">By submitting, you agree to our terms. We’ll only use your info to contact you about this request.</p>
    </form>
  );
}

function Contact() {
  return (
    <SectionShell id="contact" eyebrow="Get a quote" headline="Tell us about your item">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-gray-600">Share a few details and we’ll send a tailored offer and next steps. Prefer a call? We’re quick.</p>
          <ul className="mt-6 grid gap-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">✔ 24–48h response time</li>
            <li className="flex items-start gap-2">✔ No-pressure consultation</li>
            <li className="flex items-start gap-2">✔ Clear next steps</li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </SectionShell>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t py-10">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
        <div><div className="font-semibold">{BRAND.name}</div><div className="mt-2 text-sm text-gray-600">{BRAND.address}</div></div>
        <div className="text-sm text-gray-600"><div>Phone: {BRAND.phone}</div><div>Email: {BRAND.email}</div></div>
        <div className="text-sm text-gray-600">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
      </div>
    </footer>
  );
}

function JsonLd() {
  const json = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND.name,
    address: { "@type": "PostalAddress", streetAddress: BRAND.address, addressLocality: "Denver", addressRegion: "CO", postalCode: "80220", addressCountry: "US" },
    telephone: BRAND.phone,
    email: BRAND.email,
    areaServed: BRAND.city,
    url: typeof window !== "undefined" ? window.location.href : "https://example.com",
  }), []);

  const faq = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: BRAND.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  }), []);

  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} /></>);
}

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-black">
      <JsonLd />
      <Header />
      <Hero />
      <main>
        <Services />
        <About />
        <Testimonials />
        <Booking />
        <Shop />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
