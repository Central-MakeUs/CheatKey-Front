import { AppHeader } from "@/components/common/AppHeader";
export const Home = () => {
  return (
    <div>
      <AppHeader logo={true} onNotification={() => console.log(123)} />
    </div>
  );
};
