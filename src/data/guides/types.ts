export type GuideLocale = "hu" | "en" | "cs";

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
}

export interface GuideContent {
  slug: string;
  houseSlug: string;
  houseName: string;
  path: string;
  qrTarget: string;
  dePreparedTitle: string;
  content: Record<GuideLocale, GuideLocaleContent>;
}
