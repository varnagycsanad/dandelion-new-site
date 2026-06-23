export type GuideLocale = "hu" | "en" | "cs" | "de" | "sk";

export interface GuideSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  steps?: string[];
  important?: string;
}

export interface GuideLocaleContent {
  title: string;
  subtitle: string;
  intro: string;
  keyPoints: string[];
  backLabel: string;
  sections: GuideSection[];
  manualImageSrc?: string;
  manualPdfSrc?: string;
  manualImageAlt?: string;
  manualButtonLabel?: string;
  manualFallbackNote?: string;
}

export interface GuideContent {
  slug: string;
  houseSlug: string;
  houseName: string;
  path: string;
  qrTarget: string;
  dePreparedTitle: string;
  content: Partial<Record<GuideLocale, GuideLocaleContent>>;
}
