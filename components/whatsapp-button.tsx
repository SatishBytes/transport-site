import { Fragment } from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppHref } from "@/lib/site-config";
import { Button } from "./button";

interface WhatsAppButtonProps {
  label?: string;
  message?: string;
  className?: string;
}

export function WhatsAppButton({
  label = "Message us on WhatsApp",
  message,
  className = "",
}: WhatsAppButtonProps) {
  const href = getWhatsAppHref(message);

  if (!href) {
    return (
      <Fragment>
        <Button type="button" variant="outline" className={className} disabled>
          <MessageCircle aria-hidden="true" size={18} />
          WhatsApp not configured
        </Button>
        <p className="text-sm leading-6 text-slate-600">
          The WhatsApp number is a placeholder. Use the{" "}
          <a
            href="/get-a-quote"
            className="font-semibold underline underline-offset-4"
          >
            enquiry form
          </a>{" "}
          after the business contact details are configured.
        </p>
      </Fragment>
    );
  }

  return (
    <Button
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant="outline"
      className={className}
    >
      <MessageCircle aria-hidden="true" size={18} />
      {label}
    </Button>
  );
}
