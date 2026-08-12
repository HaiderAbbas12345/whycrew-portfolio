/**
 * Renders schema.org structured data as a JSON-LD script tag.
 *
 * `<` is escaped so a stray "</script>" inside any string value can never break
 * out of the tag — the serialization Next.js documents for structured data.
 */
export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
