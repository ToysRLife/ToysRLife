import { useContext } from "react";
import { X } from 'lucide-react';
import { useForm } from '../hooks/useForm';
import { CartSummary } from './CartSummary';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: any[];
  total: number;
  onSubmit: (formData: CheckoutFormData) => void;
}

export interface CheckoutFormData {
  name: string;
  email: string;
  mobile: string;
}

export function Checkout({ isOpen, onClose, cartItems, total, onSubmit }: CheckoutProps) {
  const { values, errors, handleChange, handleSubmit } = useForm<CheckoutFormData>({
    initialValues: { name: '', email: '', mobile: '' },
    validate: (values) => {
      const errors: Partial<CheckoutFormData> = {};
      if (!values.name) errors.name = 'Name is required';
      if (!values.email) errors.email = 'Email is required';
      if (!values.mobile) errors.mobile = 'Mobile number is required';
      return errors;
    },
    onSubmit,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl">
          <div className="p-6 border-b dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Checkout</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Contact Information</h3>
              <form action="https://formspree.io/f/mbljewbe" method="POST" className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg 
                      focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg 
                      focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg 
                      focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  {errors.mobile && <p className="mt-1 text-sm text-red-500">{errors.mobile}</p>}
                </div>

                <textarea
                name="message"
                id="message"
                cols="52"
                rows="7"
                defaultValue={
                  "Interested in following items :\n" +
                  cartItems.map(
                    (item) =>
                      item.name + " " + item.quantity + " " + item.price + "\n"
                  )
                }
                hidden
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Place Order
                </button>
              </form>
            </div>

            <CartSummary items={cartItems} total={total} />
          </div>
        </div>
      </div>
    </div>
  );
}