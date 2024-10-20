"use client";
import React, { useState } from 'react';

interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  branchName: string;
  ifscCode: string;
  upiId: string;

}

const BankDetailsForm: React.FC = () => {
  const [formData, setFormData] = useState<BankDetails>({
    bankName: '',
    accountNumber: '',
    accountHolderName: '',
    branchName: '',
    ifscCode: '',
    upiId: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center pt-16">
      <div className="w-full max-w-lg p-6 bg-gray-800 rounded-md shadow-md pt-4 mb-12 ">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Bank Details Form</h2>

        {submitted ? (
          <div className="text-center">
            <h3 className="text-lg text-green-500">Form Submitted Successfully!</h3>
            <p className="mt-4 text-gray-300">Thank you for providing your bank details.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Bank Name */}
            <div>
              <label className="block text-sm font-medium text-gray-100">
                Bank Name
              </label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                required
                placeholder="Enter your bank name"
                className="mt-1 block w-full p-2 border border-gray-200 bg-transparent rounded-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-200"
              />
            </div>
            {/* Account Number */}
            <div>
              <label className="block text-sm font-medium text-gray-100">
                Account Number
              </label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                required
                placeholder="Enter your account number"
                className="mt-1 block w-full p-2 border border-gray-200 rounded-full bg-transparent focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-200"
              />
            </div>

           {/* Account Holder Name */}
           <div>
              <label className="block text-sm font-medium text-gray-100">
                Account Holder Name
              </label>
              <input
                type="text"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
                required
                placeholder="Enter account holder name"
                className="mt-1 block w-full p-2 border border-gray-200 bg-transparent rounded-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-200"
              />
            </div>

            {/* Branch Name */}
            <div>
              <label className="block text-sm font-medium text-gray-100">
                Branch Name
              </label>
              <input
                type="text"
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
                required
                placeholder="Enter your branch name"
                className="mt-1 block w-full p-2 border border-gray-200 bg-transparent rounded-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-200"
              />
            </div>

            {/* IFSC Code */}
            <div>
              <label className="block text-sm font-medium text-gray-100">
                IFSC Code
              </label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                required
                placeholder="Enter IFSC code"
                className="mt-1 block w-full p-2 border border-gray-200 rounded-full bg-transparent focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-200"
              />
            </div>

            {/* UPI ID */}
            <div>
              <label className="block text-sm font-medium text-gray-100">
                UPI ID
              </label>
              <input
                type="text"
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
                placeholder="Enter your UPI ID (Optional)"
                className="mt-1 block w-full p-2 border border-gray-200 rounded-full bg-transparent focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-200"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BankDetailsForm;
