/**
 * JSON-LD Structured Data Component — v1.1.0 Phase 2B
 *
 * Renders Restaurant, LocalBusiness, and Organization schemas
 * as a single merged JSON-LD block in the document head.
 *
 * All business data is sourced from the existing components:
 * - LocationFooter.tsx  → address, phone, hours, maps, WhatsApp
 * - Hero.tsx            → brand name, tagline, rating
 * - CTABanner.tsx       → delivery platforms
 *
 * @see https://schema.org/Restaurant
 * @see https://schema.org/LocalBusiness
 * @see https://schema.org/Organization
 */

const SITE_URL = "https://resturaunt.vercel.app";

/* ─── Business Data (extracted from existing components) ─── */
const businessData = {
  name: "شعبيات ابوي",
  alternateName: "Dad's Delicacies",
  description:
    "نكهات الماضي .. على سفرة اليوم. مطعم شعبيات ابوي يقدم أطباق شعبية سعودية أصيلة — فول، تميس، معصوب وأكثر — يومياً في حي قرطبة، الرياض.",
  url: SITE_URL,
  telephone: "+966533158148",
  image: `${SITE_URL}/hero-bg.png`,
  logo: `${SITE_URL}/hero-bg.png`,
  priceRange: "$$",
  servesCuisine: ["Saudi", "Middle Eastern", "Traditional Breakfast"],
  address: {
    "@type": "PostalAddress" as const,
    streetAddress: "حي قرطبة",
    addressLocality: "الرياض",
    addressRegion: "الرياض",
    addressCountry: "SA",
  },
  geo: {
    "@type": "GeoCoordinates" as const,
    latitude: 24.7636,
    longitude: 46.7385,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification" as const,
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "06:00",
    closes: "23:59",
  },
  aggregateRating: {
    "@type": "AggregateRating" as const,
    ratingValue: "4.8",
    reviewCount: "500",
    bestRating: "5",
    worstRating: "1",
  },
  hasMap: "https://maps.google.com/?q=Qurtubah,+Riyadh",
};

/* ─── Schema: Restaurant (primary — extends LocalBusiness) ─── */
const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${SITE_URL}/#restaurant`,
  name: businessData.name,
  alternateName: businessData.alternateName,
  description: businessData.description,
  url: businessData.url,
  telephone: businessData.telephone,
  image: businessData.image,
  logo: businessData.logo,
  priceRange: businessData.priceRange,
  servesCuisine: businessData.servesCuisine,
  acceptsReservations: "false",
  menu: `${SITE_URL}/#menu`,
  address: businessData.address,
  geo: businessData.geo,
  openingHoursSpecification: businessData.openingHoursSpecification,
  aggregateRating: businessData.aggregateRating,
  hasMap: businessData.hasMap,
  currenciesAccepted: "SAR",
  paymentAccepted: "Cash, Credit Card, Apple Pay, mada",
  areaServed: {
    "@type": "City",
    name: "الرياض",
  },
};

/* ─── Schema: Organization ─── */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: businessData.name,
  alternateName: businessData.alternateName,
  url: businessData.url,
  logo: businessData.logo,
  image: businessData.image,
  telephone: businessData.telephone,
  description: businessData.description,
  address: businessData.address,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: businessData.telephone,
    contactType: "customer service",
    areaServed: "SA",
    availableLanguage: ["Arabic", "English"],
  },
};

/* ─── Combined JSON-LD ─── */
const jsonLdData = [restaurantSchema, organizationSchema];

/**
 * Server component that injects JSON-LD structured data into the page.
 * Renders two separate schemas (Restaurant, Organization) in a single
 * <script> tag using the @graph pattern isn't needed — each gets its
 * own @context for maximum crawler compatibility.
 */
export default function StructuredData() {
  return (
    <>
      {jsonLdData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
