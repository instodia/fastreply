import type { Metadata } from "next";
import LegalShell from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Terms of Service - FastReply",
  description:
    "Terms for using FastReply's Instagram comment-to-DM campaign software.",
};

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of Service"
      description="These terms define acceptable use for FastReply's Instagram comment-to-DM campaign service."
      updatedAt="May 24, 2026"
    >
      <section>
        <h2 className="text-xl font-bold text-white">Authorized Use</h2>
        <p className="mt-3">
          You may use FastReply only with Instagram professional accounts you
          own or are authorized to manage. You are responsible for the campaigns,
          keywords, links, and messages you configure.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Platform Compliance</h2>
        <p className="mt-3">
          You agree to follow Meta Platform Terms, Instagram policies, applicable
          messaging rules, privacy laws, advertising rules, and anti-spam laws.
          FastReply may rate-limit, pause, or disable campaigns that create
          compliance, abuse, security, or deliverability risk.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Availability</h2>
        <p className="mt-3">
          FastReply depends on third-party platforms including Meta, email,
          hosting, database, and queue providers. We work to operate the
          service reliably, but uninterrupted availability is not guaranteed.
        </p>
      </section>
    </LegalShell>
  );
}
