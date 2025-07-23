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

export type SourceStateKey = "withOriginal" | "withoutOriginal";

export type FontSizeKey = "default" | "large";

export interface AuthorInfo {
  icon: string;
  altText: string;
  name: string;
  textColor: string;
}

type FontSizeMap = Record<FontSizeKey, string>;

export interface FontSizeConfig {
  title: {
    heading: FontSizeMap;
    meta: FontSizeMap;
  };
  main: {
    subtitle: FontSizeMap;
    body: FontSizeMap;
  };
}
