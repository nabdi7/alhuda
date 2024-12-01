"use client";
import React, { useState, FormEvent, ChangeEvent, ReactNode } from "react";
import {
  QrCode,
  CreditCard,
  DollarSign,
  Copy,
  Check,
  Wallet,
} from "lucide-react";
import PageHeader from "../header/PageHeader";
import Image from "next/image";

interface PaymentMethodCardProps {
  icon: ReactNode;
  title: string;
  qrCodeSrc?: string;
  number: string;
}

interface DonationFormState {
  amount: string;
  name: string;
  email: string;
}

interface PaymentMethod {
  icon: ReactNode;
  title: string;
  qrCodeSrc: string | "";
  number: string;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  icon,
  title,
  qrCodeSrc,
  number,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (): void => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-4 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center space-x-4">
        {icon}
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>

      <div className="flex flex-col space-y-4">
        {qrCodeSrc && (
          <div className="flex justify-center items-center bg-gray-50 rounded-xl p-3">
            <div className="w-48 h-48 bg-white p-3 rounded-xl shadow-md">
              <Image
                src={qrCodeSrc}
                width={400}
                height={400}
                alt={`${title} QR Code`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Payment Details</p>
              <p className="text-sm font-medium text-gray-800 whitespace-pre-line">
                {number}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="text-green-600 hover:bg-green-50 p-1 rounded-full transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500">
            {title === "Cheque"
              ? "For cheque, please mail to the provided address"
              : "Scan QR or use provided details for donation"}
          </p>
        </div>
      </div>
    </div>
  );
};

const DonationForm: React.FC = () => {
  const [donationState, setDonationState] = useState<DonationFormState>({
    amount: "",
    name: "",
    email: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Donation submitted", donationState);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setDonationState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Make a Donation
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Donation Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              name="amount"
              value={donationState.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
              className="pl-10 block w-full border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={donationState.name}
            onChange={handleChange}
            placeholder="Your full name"
            required
            className="block w-full border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={donationState.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            required
            className="block w-full border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors font-medium"
        >
          Donate Now
        </button>
      </form>
    </div>
  );
};

const DonationPage: React.FC = () => {
  const paymentMethods: PaymentMethod[] = [
    {
      icon: <QrCode className="w-10 h-10 text-green-600" />,
      title: "Zelle",
      qrCodeSrc: "/qr.png",
      number: "(253) 632-2310",
    },
    {
      icon: <CreditCard className="w-10 h-10 text-green-600" />,
      title: "PayPal",
      qrCodeSrc: "/qr.png",
      number: "Coming soon",
    },
    {
      icon: <Wallet className="w-10 h-10 text-green-600" />,
      title: "Cash App",
      qrCodeSrc: "/cashApp.png",
      number: "$Alhudamasjid",
    },
    {
      icon: <Check className="w-10 h-10 text-green-600" />,
      title: "Cheque",
      qrCodeSrc: "",
      number: "Al-Huda Islamic Center\n25650 101st Ave SE \nKent, WA 98030",
    },
  ];

  return (
    <section className="">
      <PageHeader title="Donation" breadcrumb="Donate" />
      <div className="bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center mb-10">
            <p className="text-gray-600 max-w-2xl mx-auto italic">
              The example of those who spend their wealth in the way of Allah is
              like a seed [of grain] which grows seven spikes; in each spike is
              a hundred grains.
            </p>
            <p className="text-green-600 font-semibold">- Quran 2:261</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paymentMethods.map((method, index) => (
              <PaymentMethodCard key={index} {...method} />
            ))}
          </div>

          {/* <div className="max-w-2xl mx-auto w-full">
            <DonationForm />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default DonationPage;
