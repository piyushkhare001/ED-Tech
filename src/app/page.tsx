'use client';
import RazorpayButton from '@/components/frontend/TestingPaymentPage';

export default function Home() {
  return (
    <div className="text-center text-4xl font-sans mt-8 ">
      Welcome to DESIZNIDEAZ
      <p className="text-center text-4xl font-sans mt-8">
        Piyush is a very good guy, he always helps me. I really want to thank him!
      </p>
      <RazorpayButton amount={1} />
    </div>
  );
}
