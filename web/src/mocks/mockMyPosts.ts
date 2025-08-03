import CommunityTestImage1 from "@/assets/images/community_test_image_1.jpg";
import CommunityTestImage2 from "@/assets/images/community_test_image_2.jpg";
import CommunityTestImage3 from "@/assets/images/community_test_image_3.jpg";

export const mockMyPosts = [
  {
    id: 1,
    nickname: "본인닉네임",
    date: "2025.06.30",
    category: "신고합니다",
    title: "택배 사칭 스팸 문자 조심 와... 당할뻔 했네요",
    content:
      "택배 지연 문자를 클릭하자 악성 앱이 설치되어 개인정보가 유출됐어요. 조심하세요 택배 지연 문자를 클릭하자 악성 앱이 설치되어 개인정보가 유출됐어요.",
    commentCount: 10,
    images: [CommunityTestImage1, CommunityTestImage3],
  },
  {
    id: 2,
    nickname: "본인닉네임",
    date: "2025.03.01",
    category: "",
    title: "중고 거래 사기 당했습니다",
    content:
      "물건을 보낸다고 하고 돈만 받았습니다. 거래 전에 꼭 전화 통화하고 후기 검색해보세요.",
    commentCount: 5,
    images: [CommunityTestImage2],
  },
  {
    id: 3,
    nickname: "본인닉네임",
    date: "2022.03.01",
    category: "내 사례 공유",
    title: "중고 거래 사기 당했습니다",
    content:
      "물건을 보낸다고 하고 돈만 받았습니다. 거래 전에 꼭 전화 통화하고 후기 검색해보세요.",
    commentCount: 5,
    images: [
      CommunityTestImage2,
      CommunityTestImage2,
      CommunityTestImage2,
      CommunityTestImage2,
      CommunityTestImage2,
    ],
  },
  {
    id: 4,
    nickname: "본인닉네임",
    date: "2025.02.01",
    category: "내 사례 공유",
    title: "중고 거래 사기 당했습니다",
    content:
      "물건을 보낸다고 하고 돈만 받았습니다. 거래 전에 꼭 전화 통화하고 후기 검색해보세요.",
    commentCount: 5,
  },
];
