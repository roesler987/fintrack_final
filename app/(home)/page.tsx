import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "../_components/navbar";
import SummuryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM")
  if (monthIsInvalid) {
    redirect("?month=01")
  }
  return (
    <>
      <div className="p=6 space-y-6">
        <NavBar />
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">DashBoard</h1>
          <TimeSelect />
        </div>
        <SummuryCards month={month} />
      </div>
    </>
  );
};

export default Home;
