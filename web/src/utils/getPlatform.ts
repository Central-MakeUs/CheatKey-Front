export const getPlatform = (): "ios" | "android" | "web" => {
  const ua = navigator.userAgent;

  if (/android/i.test(ua)) {
    return "android";
  }

  if (/iPhone|iPad|iPod/i.test(ua)) {
    return "ios";
  }

  return "web";
};
