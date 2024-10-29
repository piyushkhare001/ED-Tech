"use client";
import Navbar from "@/components/frontend/Navbar";
import Sidebar from "@/components/frontend/Sidebar";
import TeacherTable from "@/components/frontend/TeacherTable";
import React, { useState } from "react";

export default function page() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all"); // "all", "verified", "unverified"
  const [page, setPage] = useState(1);
  return (
    <div>
      <Navbar />
      {/* <Sidebar /> */}
      <div className="m-6">
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search by email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>
        </div>
        <TeacherTable
          search={search}
          status={status}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
