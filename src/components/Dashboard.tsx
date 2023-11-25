import WidgetGroup from "./Dashboard/WidgetGroup";
import IncomePie from "./Dashboard/Widgets/IncomePie";
import ExpensesPie from "./Dashboard/Widgets/ExpensesPie";
import OnlineUserCounter from "./Dashboard/Widgets/OnlineUsersCounter";
import PurchasesCounter from "./Dashboard/Widgets/PurchasesCounter";
import YearlyIncomeChart from "./Dashboard/Widgets/YearlyIncomeChart";
import ProductRankingList from "./Dashboard/Widgets/ProductRankingList";
import "./Dashboard.scss";

export default function Dashboard() {
  return (
    <main className="dashboard">
      <WidgetGroup>
        <IncomePie />
        <ExpensesPie />
        <OnlineUserCounter />
        <PurchasesCounter />
      </WidgetGroup>
      <YearlyIncomeChart />
      <ProductRankingList />
    </main>
  );
}
