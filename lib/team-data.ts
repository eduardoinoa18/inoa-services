// Simple data source you can edit to manage the "Meet the Team" section.
// Add new members or update fields; images should be placed under /public/images/team/ or another public path.

export type TeamMember = {
  name: string;
  title?: string;
  bio?: string;
  image: string; // public path, e.g. "/images/team/jane.jpg"
  socials?: { label: string; href: string }[];
};

export const team: TeamMember[] = [
  {
    name: "Founder",
    title: "Founder · REALTOR® · Senior Tax Specialist · Notary Public",
    bio: "Leads with a client‑first mindset, making complex processes simple and actionable.",
    image: "/images/founder.png", // Put your real photo here; falls back in UI if missing
    socials: [
      // { label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle" },
    ],
  },
  // Add future team members here
];
