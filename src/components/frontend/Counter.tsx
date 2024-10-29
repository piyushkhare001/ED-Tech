import React, { useState, useEffect } from "react";
 
const StatCard = ({ end, label, color }: any) => {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      let start = 0;
      const duration = Math.floor(2000 / end); 
      const counter = setInterval(() => {
        start += 1;
        if (start > end) {
          clearInterval(counter);
        } else {
          setCount(start);
        }
      }, duration);
  
      return () => clearInterval(counter);
    }, [end]);
  
    return (
      <div className="p-4">
        <h3 className={`text-3xl font-bold ${color}`}>{count}K+</h3>
        <p className="text-gray-500">{label}</p>
      </div>
    );
  };
  
  const Counter = () => {
    return (
      <div className="bg-gray-100 sm:h-[590px] lg:h-[250px]  p-8">
        {/* Stats Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg text-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Stats Cards */}
            <StatCard  
              end={300} 
              label="Companies Hiring" 
              color="text-green-500"
            />
            <StatCard  
              end={10} 
              label="New Openings Everyday" 
              color="text-red-500" 
            />
            <StatCard  
              end={21} 
              label="Active Students" 
              color="text-purple-500" 
            />
            <StatCard  
              end={600} 
              label="Learners" 
              color="text-yellow-500" 
            />
          </div>
        </section>
      </div>
    );
  };
  
  export default Counter;