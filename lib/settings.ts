import { prisma } from "@/lib/prisma";

export type SiteSettings = {
  logoUrl?: string | null;
  faviconUrl?: string | null;
  founderUrl?: string | null;
  team: Array<{
    name: string;
    title?: string;
    bio?: string;
    image: string;
    socials?: { label: string; href: string }[];
  }>;
  aboutGallery: string[];
};

const defaults: SiteSettings = {
  logoUrl: undefined,
  faviconUrl: undefined,
  founderUrl: undefined,
  team: [],
  aboutGallery: [],
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { id: "singleton" } });
    if (!row) return defaults;
    return {
      logoUrl: row.logoUrl ?? undefined,
      faviconUrl: row.faviconUrl ?? undefined,
      founderUrl: row.founderUrl ?? undefined,
      team: (row.team as any) ?? [],
      aboutGallery: (row.aboutGallery as any) ?? [],
    };
  } catch {
    // Likely prisma not migrated yet; return defaults to avoid crashing public pages
    return defaults;
  }
}

export async function upsertSiteSettings(patch: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const next: SiteSettings = {
    ...current,
    ...patch,
    team: patch.team ?? current.team,
    aboutGallery: patch.aboutGallery ?? current.aboutGallery,
  };
  const saved = await prisma.siteSetting.upsert({
    where: { id: "singleton" },
    update: {
      logoUrl: next.logoUrl ?? null,
      faviconUrl: next.faviconUrl ?? null,
      founderUrl: next.founderUrl ?? null,
      team: next.team as any,
      aboutGallery: next.aboutGallery as any,
    },
    create: {
      id: "singleton",
      logoUrl: next.logoUrl ?? null,
      faviconUrl: next.faviconUrl ?? null,
      founderUrl: next.founderUrl ?? null,
      team: next.team as any,
      aboutGallery: next.aboutGallery as any,
    },
  });
  return {
    logoUrl: saved.logoUrl ?? undefined,
    faviconUrl: saved.faviconUrl ?? undefined,
    founderUrl: saved.founderUrl ?? undefined,
    team: (saved.team as any) ?? [],
    aboutGallery: (saved.aboutGallery as any) ?? [],
  };
}
