import type { Metadata } from "next";
import ServicePage from "@/components/sections/ServicePage";

export const metadata: Metadata = {
  title: "Slabbing",
  description:
    "Get your cards professionally graded by PSA, CGC or BGS through Slabhead. South Africa's trusted submission service.",
};

export default function SlabbingPage() {
  return (
    <ServicePage
      title="Slabbing"
      tagline="Protect. Authenticate. Grade."
      description="Want your raw cards professionally graded? We handle the entire submission process — intake, careful packaging, international shipment, grader liaison and return delivery. Choose PSA, CGC or BGS. Sleep well knowing your cards never leave our chain of custody."
      missionLabel="// AUTHENTICATION_LAB"
      roomTheme="lab"
      protocol={[
        {
          phase: "PHASE_1: INTAKE",
          title: "Submit Your Cards",
          description:
            "Drop off or courier your raw cards. We catalogue, photograph, and prepare them for international submission.",
        },
        {
          phase: "PHASE_2: SUBMISSION",
          title: "We Handle the Process",
          description:
            "Cards travel insured to PSA, CGC or BGS. We track every step and keep you updated through the queue.",
        },
        {
          phase: "PHASE_3: RETURN & DELIVERY",
          title: "Graded & Returned",
          description:
            "Once slabbed, your cards return to us. We verify, repack, and ship them safely to you in South Africa.",
        },
      ]}
      ctaText="SUBMIT_FOR_GRADING"
      ctaHref="/contact-us"
    />
  );
}
