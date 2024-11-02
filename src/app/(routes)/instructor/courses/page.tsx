"use client";
import CourseTable from "@/components/frontend/CourseTable";
import Navbar from "@/components/frontend/Navbar";
import Sidebar from "@/components/frontend/Sidebar";
import TeacherTable from "@/components/frontend/TeacherTable";
import React, { useEffect, useState } from "react";

export default function page() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [id, setid] = useState('')
  useEffect(() => {
    const loc = new URL(window.location.href);
    
    // chnage the id accorgind to user

  }, [])
  
  return (
    <div>
      <Navbar />
      {/* <Sidebar /> */}
      <div className="m-6">
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search by Title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <CourseTable
          search={search}
          id={id}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
