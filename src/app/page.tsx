import { getContent } from "@/lib/content";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import USP from "@/components/USP";
import Business from "@/components/Business";
import Assortment from "@/components/Assortment";
import PrivateClients from "@/components/PrivateClients";
import Gallery from "@/components/Gallery";
import Portfolio from "@/components/Portfolio";
import Guarantees from "@/components/Guarantees";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";

export const dynamic = "force-dynamic";

export default function Home() {
  const c = getContent();

  return (
    <>
      <Header company={c.company} />
      <main>
        <Hero hero={c.hero} stats={c.stats} company={c.company} />
        <USP />
        <Business />
        <Assortment />
        <PrivateClients />
        <Gallery />
        <Portfolio projects={c.portfolio} />
        <Guarantees items={c.guarantees} />
        <About />
        <Reviews reviews={c.reviews} />
        <FAQ faqs={c.faq} />
        <CTA />
        <ContactForm />
      </main>
      <Footer company={c.company} />
      <MobileBar company={c.company} />
    </>
  );
}
