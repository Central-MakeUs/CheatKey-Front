/**
 * ISO 형식의 날짜 문자열(UTC)을 한국 시간 기준 'YYYY.MM.DD' 형식으로 변환
 * @param dateString - API로부터 받은 날짜/시간 문자열 (예: "2025-08-08T04:13:26")
 * @returns {string} 변환된 날짜 문자열 (예: "2025.08.08")
 */
export const formatUTCtoKR = (dateString: string): string => {
  const date = new Date(
    dateString.endsWith("Z") ? dateString : dateString + "Z",
  );

  if (isNaN(date.getTime())) {
    return "유효하지 않은 날짜";
  }

  return date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\. /g, ".")
    .slice(0, -1);
};

/**
 * 상세 페이지용으로 날짜 문자열(UTC)을 상황에 맞게 변환
 * - 같은 날짜: "HH:MM"
 * - 하루 이상 차이: "YYYY.MM.DD"
 * @param dateString - API로부터 받은 날짜/시간 문자열
 * @returns {string} 변환된 시간 또는 날짜 문자열
 */

export const formatDetailDate = (dateString: string): string => {
  const date = new Date(
    dateString.endsWith("Z") ? dateString : dateString + "Z",
  );
  const now = new Date();

  if (isNaN(date.getTime())) {
    return "유효하지 않은 날짜";
  }

  const isSameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (isSameDay) {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } else {
    return date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, ".")
      .slice(0, -1);
  }
};
