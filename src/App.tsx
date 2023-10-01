import { useState } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";

const categories = [
  { id: 1, name: "All Categories" },
  { id: 2, name: "Utilities" },
  { id: 3, name: "Groceries" },
  { id: 4, name: "Entertainment" },
];

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, description: "hello world", amount: 100, category: "Utilities" },
    { id: 2, description: "hello world", amount: 100, category: "Utilities" },
    { id: 3, description: "hello world", amount: 100, category: "Utilities" },
  ]);
  const [selected, setSelected] = useState(categories[0]);

  // filter expenses based on the selected category
  const visibleExpenses =
    selected.name === "All Categories"
      ? expenses
      : expenses.filter((e) => e.category === selected.name);

  return (
    <div className="container mx-auto min-h-screen overflow-hidden p-8">
      <h1 className="text-3xl font-bold tracking-wider text-center">
        Expense Tracker
      </h1>
      <div className="grid grid-cols-2 gap-8 mt-16">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg p-4 self-start">
          <ExpenseForm
            onSubmit={(expense) =>
              setExpenses([
                ...expenses,
                { ...expense, id: expenses.length + 1 },
              ])
            }
            categories={categories}
          />
        </div>

        <div>
          <ExpenseFilter
            selected={selected}
            categories={categories}
            onSelectCategory={(category) => setSelected(category)}
          />
          <ExpenseList
            expenses={visibleExpenses}
            onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
