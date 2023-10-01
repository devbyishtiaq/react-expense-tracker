import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Category {
  id: number;
  name: string;
}

interface Props {
  categories: Category[];
  onSubmit: (data: ExpenseFormData) => void;
}

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be at least 3 characters long." }),
  amount: z
    .number({ invalid_type_error: "Amount is required." })
    .min(1)
    .max(100_000),
  category: z.enum(
    ["All Categories", "Groceries", "Utilities", "Entertainment"],
    { errorMap: () => ({ message: "Category is required." }) }
  ),
});

type ExpenseFormData = z.infer<typeof schema>;

const ExpenseForm = ({ categories, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });
  return (
    <div>
      <h2 className="font-bold mb-8">Add Expense</h2>
      <form
        className="space-y-2 flex flex-col"
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
      >
        {/* description */}
        <label
          htmlFor="description"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          {...register("description")}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {errors.description && (
          <p className="text-red-500 text-xs">{errors.description.message}</p>
        )}
        {/* amount */}
        <label
          htmlFor="amount"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Amount
        </label>
        <input
          type="number"
          id="amount"
          {...register("amount", { valueAsNumber: true })}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {errors.amount && (
          <p className="text-red-500 text-xs">{errors.amount.message}</p>
        )}

        {/* category */}
        <label
          htmlFor="category"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Category
        </label>
        <select
          id="category"
          {...register("category")}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value=""></option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-xs">{errors.category.message}</p>
        )}

        <button className="bg-indigo-600 px-3 py-2 rounded text-white !mt-6">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
