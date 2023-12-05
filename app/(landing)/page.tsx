import Card from "@/components/Card";
// import Navbar from "@/components/Navbar";
// import SignOutButton from "@/components/utils/Logout";

import StatusIcons from "@/components/StatusIcons";

const dashboard = () => {
  return (
    <div className="min-h-screen w-full min-w-[100px] flex flex-col items-center justify-center gap-10 mt-10">
      {/* <Navbar /> */}
      <StatusIcons />
      <Card />
    </div>
  );
};

export default dashboard;
