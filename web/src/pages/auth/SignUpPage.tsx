import { AppHeader } from "@/components/common/AppHeader";
import Footer from "@/components/common/Footer";

export const SignUpPage = () => {
  const test = () => {
    console.log(123);
  };
  return (
    <div className="relative flex h-full w-full flex-1 flex-col">
      <AppHeader
        title="커뮤니티"
        onPrev={test}
        //onSkip={test}
        onNotification={test}
        onWrite={test}
      />
      <Footer />
    </div>
  );
};
