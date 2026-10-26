interface JsonLdProps {
  data: unknown;
}

export function JsonLd({ data }: JsonLdProps) {
  const serialized = JSON.stringify(data);

  if (serialized === undefined) {
    throw new TypeError("JSON-LD data must be JSON serializable.");
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serialized.replace(/</g, "\\u003c"),
      }}
    />
  );
}
