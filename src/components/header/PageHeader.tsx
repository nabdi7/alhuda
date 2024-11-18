import React from "react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  breadcrumb: string;
}

const PageHeader = ({ title, breadcrumb }: PageHeaderProps) => {
  return (
    <div className="relative bg-green-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-green-700/20" />
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-green-700/20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <h1 className="text-5xl font-serif font-bold mb-4">{title}</h1>
          <nav className="text-green-100">
            <Link href="/" className="hover:text-green-300 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-green-300">{breadcrumb}</span>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
