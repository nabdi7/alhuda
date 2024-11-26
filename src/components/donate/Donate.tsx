"use client";
import React, { useState } from "react";
import {
  QrCode,
  CreditCard,
  DollarSign,
  Copy,
  Check,
  Wallet,
} from "lucide-react";
import PageHeader from "../header/PageHeader";
const PaymentMethodCard = ({ icon, title, qrCodeSrc, number }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center space-x-4">
        {icon}
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      </div>

      <div className="flex flex-col space-y-6">
        {/* QR Code Section */}
        <div className="flex justify-center items-center bg-gray-50 rounded-xl p-4">
          <div className="w-64 h-64 bg-white p-4 rounded-xl shadow-md">
            <img
              src={qrCodeSrc}
              alt={`${title} QR Code`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Payment Details</p>
              <p className="font-medium text-gray-800">{number}</p>
            </div>
            <button
              onClick={handleCopy}
              className="text-green-600 hover:bg-green-50 p-2 rounded-full transition-colors"
            >
              {copied ? (
                <Check className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Scan QR or use provided details for donation
          </p>
        </div>
      </div>
    </div>
  );
};

const DonationForm = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Donation submitted", { amount, name, email });
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
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

const DonationPage = () => {
  const paymentMethods = [
    {
      icon: <QrCode className="w-10 h-10 text-green-600" />,
      title: "Zelle",
      qrCodeSrc: "/qr.png",
      number: "(XXX) XXX-XXXX",
    },
    {
      icon: <CreditCard className="w-10 h-10 text-green-600" />,
      title: "PayPal",
      qrCodeSrc: "/qr.png",
      number: "donations@alhudacenter.org",
    },
    {
      icon: <Wallet className="w-10 h-10 text-green-600" />,
      title: "Cash App",
      qrCodeSrc: "/cashApp.png",
      number: "$Alhudamasjid",
    },
  ];

  return (
    <>
      <PageHeader title="Donation" breadcrumb="Donate" />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center mb-10">
            <p className="text-gray-600 max-w-2xl mx-auto italic">
              The example of those who spend their wealth in the way of Allah is
              like a seed [of grain] which grows seven spikes; in each spike is
              a hundred grains.
            </p>
            <p className="text-green-600 font-semibold">- Quran 2:261</p>
          </div>

          {/* Payment Methods - Now in 3 columns */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {paymentMethods.map((method, index) => (
              <PaymentMethodCard key={index} {...method} />
            ))}
          </div>

          {/* Donation Form */}
          <div className="max-w-2xl mx-auto w-full">
            <DonationForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationPage;
