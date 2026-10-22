import { FAQ } from "@/lib/faq";
import { FEATURES } from "@/lib/features";
import { SITE } from "@/lib/site";

// ILUSTRATIF: domain placeholder, ganti dengan domain dan email asli sebelum rilis.
export function JsonLd() {
  const graph = {
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#org`,
        name: "ProStaff",
        url: SITE.url,
        logo: `${SITE.url}/icon.svg`,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        inLanguage: "id-ID",
        publisher: { "@id": `${SITE.url}/#org` },
      },
      {
        "@type": "SoftwareApplication",
        name: "ProStaff HRIS",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: SITE.description,
        provider: { "@id": `${SITE.url}/#org` },
        featureList: FEATURES.flatMap((g) => g.items),
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
