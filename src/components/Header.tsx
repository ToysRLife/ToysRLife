
import { Search, ShoppingCart } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
// HOOKS
import useMobileDetect from "../hooks/useMobileDetect.js";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartItemsCount: number;
  onCartClick: () => void;
}

export function Header({ searchQuery, onSearchChange, cartItemsCount, onCartClick }: HeaderProps) {
  const device = useMobileDetect();
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* <ShoppingBag className="h-8 w-8 text-blue-500" /> */}
              {device.type === "desktop" &&
                  <img alt="Toys R Life" src={process.env.PUBLIC_URL + "/" + "logo192.png"} margin="1rem" width="40" height="40" />
                }
              {device.type === "desktop" &&
                  <h1 className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">Toys R Life</h1>
              }
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search toys..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full w-50 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 
                    bg-white/90 dark:bg-gray-700/90 text-gray-900 dark:text-white
                    placeholder-gray-500 dark:placeholder-gray-400"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <ThemeToggle />
              <button
                onClick={onCartClick}
                className="relative p-2 hover:bg-white/20 dark:hover:bg-gray-700/50 rounded-full transition-colors"
              >
                <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}