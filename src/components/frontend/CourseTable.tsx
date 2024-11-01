// src/app/components/TeacherTable.tsx
import { useEffect, useState } from "react";

interface User {
  email: string;
  verified: boolean;
  courses: any;
}

interface UserTableProps {
  search: string;
  status: string;
  page: number;
  setPage: (page: number) => void;
}

export default function TeacherTable({
  search,
  status,
  page,
  setPage,
}: UserTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api/admin/instructor?search=${search}&status=${status}&page=${page}`
        );
        const data = await response.json();
        setUsers(data.data)
        setTotal(data.total);
      } catch (e) {console.log(e)
      ;alert('error in user table')}
    }
    fetchData();
  }, [search, status, page]);

  const totalPages = Math.ceil(total / limit);
  const handleApproval = async()=>{
    try{
      const req = await fetch('/api/admin/instructor')

    }catch(e){
alert('smo on handle approval')
    }

  }

  return (
    <div className="">
      <table className="table-auto w-full rounded-md shadow-md border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Verified</th>
            <th className="p-2 border">Courses</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border text-center">{user.verified ? "Yes" : "No"}</td>
              <td className="p-2 border text-center">{user.courses?user.courses.length:0}</td>
              <td className="p-2 border text-center">
                {user.verified ? (
                  <button className="bg-red-500 text-white px-2 py-1 rounded">
                    Block
                  </button>
                ) : (
                  <div>
                    <button className="bg-green-500 text-white px-2 py-1 mr-2 rounded">
                      Approve
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 mr-2 rounded">
                      Decline
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 border rounded"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className="px-4 py-2 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
