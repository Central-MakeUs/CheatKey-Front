export type ContentCategory = "알려드림" | "인터뷰";

export interface ContentSectionType {
  subtitle: string;
  contents: string;
}

export interface ContentType {
  id: number;
  title: string;
  original: string | null;
  date: string;
  image: string;
  sections: ContentSectionType[];
}
