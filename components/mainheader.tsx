"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const logout = () => {
  localStorage.removeItem("token");
  window.location.reload();
  window.location.href = "/login";
};

const Header = () => {
  return (
    <header className="md:bg-white/95 md:z-50 dark:bg-gray-800 py-2.5 md:border-b-2 md:border-white/80 md:sticky md:top-0 ">
      <nav className="container mx-auto px-4 lg:px-0 flex justify-between items-center">
        <div className="flex items-center lg:order-2">
          <button
            data-collapse-toggle="mobile-menu"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-between mt-4 font-medium w-full">
          <div className="flex space-x-5 items-center">
            {/* Home Link with Dynamic Navigation */}
            <Link
              href={"/dashboard"}
              className="cursor-pointer md:text-purple-900 md:hover:scale-105 md:font-semibold group inline-block py-2 pr-4 pl-3 text-[20px] text-white/80 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
            >
              Home
            </Link>
            <Link
              href={"/profile"}
              className="cursor-pointer md:text-purple-900 md:hover:scale-105 md:font-semibold group inline-block py-2 pr-4 pl-3 text-[20px] text-white/80 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
            >
              Profile
            </Link>
            <Link
              href={"/profile/mysubmission"}
              className="cursor-pointer md:text-purple-900 md:hover:scale-105 md:font-semibold group inline-block py-2 pr-4 pl-3 text-[20px] text-white/80 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
            >
              Submission Stats
            </Link>
          </div>
          <div className="cursor-pointer group inline-block py-2 pr-4 pl-3 text-[20px] text-red-500 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
            <Button
              onClick={logout}
              className="font-semibold hover:scale-110 md:border-purple-900 hover:font-bold hover:text-red-600"
              variant="outline"
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
