import type {
  AuthorInfo,
  ContentCategory,
  FontSizeConfig,
  SourceStateKey,
} from "@/types/content/content.types";

import report from "@/assets/icons/report.svg";
import authorProfile from "@/assets/icons/temporary_profile_pic.png";

/**
 * @description 원본 출처(original) 유무와 카테고리에 따른 저자 정보
 */
export const AUTHOR_INFO_CONFIG: {
  [key in ContentCategory]: Record<SourceStateKey, AuthorInfo>;
} = {
  알려드림: {
    withOriginal: {
      icon: report,
      altText: "참고자료 아이콘",
      name: "참고자료",
      textColor: "text-gray-system-200",
    },
    withoutOriginal: {
      icon: authorProfile,
      altText: "콘텐츠 작성자의 프로필",
      name: "커팅이",
      textColor: "text-primary-200",
    },
  },
  // 현재 인터뷰는 원본 경로가 없어서 동일하게 넣어놓았습니다
  인터뷰: {
    withOriginal: {
      icon: authorProfile,
      altText: "콘텐츠 작성자의 프로필",
      name: "커팅이 리포터",
      textColor: "text-primary-200",
    },
    withoutOriginal: {
      icon: authorProfile,
      altText: "콘텐츠 작성자의 프로필",
      name: "커팅이 리포터",
      textColor: "text-primary-200",
    },
  },
};

/**
 * @description 콘텐츠 상세 페이지의 카테고리별 스타일
 */
export const DETAIL_MAIN_STYLE_CONFIG: {
  [key in ContentCategory]: { sectionGap: string; subtitleColor: string };
} = {
  알려드림: {
    sectionGap: "gap-5",
    subtitleColor: "text-gray-system-100",
  },
  인터뷰: {
    sectionGap: "gap-3.5",
    subtitleColor: "text-primary-100",
  },
};

/**
 * @description 폰트 크기 설정에 따른 타이포그래피 스타일
 */
export const FONT_SIZE_CONFIG: FontSizeConfig = {
  title: {
    heading: {
      default: "head-3-bold",
      large: "head-2-semibold",
    },
    meta: {
      default: "caption-2-regular",
      large: "body-5-regular",
    },
  },
  main: {
    subtitle: {
      default: "head-4-semibold",
      large: "head-3-bold",
    },
    body: {
      default: "body-5-regular",
      large: "body-3-regular",
    },
  },
};
