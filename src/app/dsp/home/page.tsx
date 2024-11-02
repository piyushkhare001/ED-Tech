"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Wallet, PiggyBank, Copy, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Enhanced Banner Component with Gradient
const Banner = ({ message }) => (
  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-8 px-6 rounded-lg shadow-lg mb-8">
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-2">Student Partner Dashboard</h1>
      <p className="text-emerald-100">{message}</p>
    </div>
  </div>
);

// Enhanced Stats Cards with Hover Effects
const StatsCards = ({ totalSavings, couponCode }) => {
  const handleCopy = () => navigator.clipboard.writeText(couponCode);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="transform transition-all hover:scale-105 bg-white shadow-xl">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-emerald-800">
            Your Coupon Code
          </CardTitle>
          <PiggyBank className="h-5 w-5 text-emerald-600" />
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-2xl font-bold text-emerald-700">
            {couponCode}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleCopy}>
                  <Copy className="h-5 w-5 text-emerald-500 hover:text-emerald-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy Code</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>

      <Card className="transform transition-all hover:scale-105 bg-white shadow-xl">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-emerald-800">
            Total Savings
          </CardTitle>
          <Wallet className="h-5 w-5 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-700">
            ₹{totalSavings}
          </div>
          <p className="text-sm text-emerald-600 mt-1">Lifetime earnings</p>
        </CardContent>
      </Card>

      <Card className="transform transition-all hover:scale-105 bg-white shadow-xl">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-emerald-800">
            Active Referrals
          </CardTitle>
          <TrendingUp className="h-5 w-5 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-700">12</div>
          <p className="text-sm text-emerald-600 mt-1">This month</p>
        </CardContent>
      </Card>
    </div>
  );
};

// Enhanced Bank Details Form
const BankDetailsForm = ({ bankDetails, onSubmit }) => {
  const [formData, setFormData] = useState(bankDetails || {});

  return (
    <Card className="shadow-xl bg-white">
      <CardHeader>
        <CardTitle className="text-emerald-800">Bank Account Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "accountHolderName",
              "bankName",
              "accountNumber",
              "ifscCode",
              "upiId",
              "panCardNumber",
            ].map((field) => (
              <div className="space-y-2" key={field}>
                <Label htmlFor={field} className="text-emerald-700">
                  {field.replace(/([A-Z])/g, " $1").toLowerCase()}
                </Label>
                <Input
                  id={field}
                  value={formData[field] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className="border-emerald-200 focus:border-emerald-500"
                  required
                />
              </div>
            ))}
          </div>
          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            Save Bank Details
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Enhanced Tables
const ReferralsTable = ({ referrals, onFilterChange }) => (
  <Card className="shadow-xl bg-white">
    <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
      <CardTitle className="text-emerald-800">Recent Referrals</CardTitle>
      <select
        onChange={(e) => onFilterChange(e.target.value)}
        className="p-2 border rounded-md shadow-sm border-emerald-200 focus:border-emerald-500"
      >
        <option value="all">All Status</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </select>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-emerald-50">
              <TableHead className="text-emerald-700">Date</TableHead>
              <TableHead className="text-emerald-700">User</TableHead>
              <TableHead className="text-emerald-700">Course</TableHead>
              <TableHead className="text-emerald-700">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {referrals.length > 0 ? (
              referrals.map((referral) => (
                <TableRow key={referral._id} className="hover:bg-emerald-50">
                  <TableCell>
                    {new Date(referral.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{referral.takenBy.email}</TableCell>
                  <TableCell>{referral.course.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        referral.paymentStatus === "Completed"
                          ? "default"
                          : "destructive"
                      }
                      className={
                        referral.paymentStatus === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {referral.paymentStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-gray-500"
                >
                  No referrals found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
);

// Enhanced Main Dashboard Component
const StudentPartnerDashboard = () => {
  const [bankDetails, setBankDetails] = useState({ accountNumber: 999 });
  const [referrals, setReferrals] = useState([]);
  const [withdrawalDialogOpen, setWithdrawalDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner message="Welcome back! Thank you for being our valued partner." />

      <main className="container mx-auto py-6 px-4">
        <StatsCards couponCode="PARTNER123" totalSavings={5000} />

        <div className="flex justify-end mb-8">
          <Button
            onClick={() => setWithdrawalDialogOpen(true)}
            disabled={!bankDetails}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Withdraw Money
          </Button>
        </div>

        <Tabs defaultValue="referrals" className="space-y-8">
          <TabsList className="bg-emerald-100 p-1">
            <TabsTrigger
              value="referrals"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              Referrals
            </TabsTrigger>
            <TabsTrigger
              value="bankDetails"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              Bank Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="referrals">
            <ReferralsTable referrals={referrals} onFilterChange={() => {}} />
          </TabsContent>

          <TabsContent value="bankDetails">
            <BankDetailsForm
              bankDetails={bankDetails}
              onSubmit={(updatedDetails) => setBankDetails(updatedDetails)}
            />
          </TabsContent>
        </Tabs>
      </main>

      <Dialog
        open={withdrawalDialogOpen}
        onOpenChange={setWithdrawalDialogOpen}
      >
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-emerald-800">
              Withdraw Money
            </DialogTitle>
            <DialogDescription>
              Please confirm your withdrawal details below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between p-4 bg-emerald-50 rounded-lg">
              <span className="font-medium text-emerald-800">Amount</span>
              <span className="text-emerald-700">₹5000</span>
            </div>
            <div className="flex justify-between p-4 bg-emerald-50 rounded-lg">
              <span className="font-medium text-emerald-800">Bank Account</span>
              <span className="text-emerald-700">
                {bankDetails?.accountNumber || "N/A"}
              </span>
            </div>
          </div>
          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700 mt-6"
            onClick={() => {
              setWithdrawalDialogOpen(false);
              setConfirmationDialogOpen(true);
            }}
          >
            Confirm Withdrawal
          </Button>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={confirmationDialogOpen}
        onOpenChange={setConfirmationDialogOpen}
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-emerald-800">
              Withdrawal Requested
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your withdrawal request has been successfully submitted. It may
              take 2-3 business days to process.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-emerald-600 hover:bg-emerald-700">
              Got it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StudentPartnerDashboard;
