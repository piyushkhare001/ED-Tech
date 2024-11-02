// src/app/components/TeacherTable.tsx
import { useEffect, useState } from "react";
import Alert from "../ui/alertTeacherCourse";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  verified: string;
  courses: any;
  _id: string;
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
  const [handleAlert, setHandleAlert] = useState({
    color: "",
    message: "",
    visible: false,
  });
  const route = useRouter();

  async function fetchData() {
    try {
      const response = await fetch(
        `/api/admin/instructor?search=${search}&status=${status}&page=${page}`
      );
      const data = await response.json();
      setUsers(data.data);
      setTotal(data.total);
    } catch (e) {
      setHandleAlert({
        color: "red",
        message: "An error occurred in Server kindly try again",
        visible: true,
      });
    }
  }
  useEffect(() => {
    fetchData();
  }, [search, status, page]);

  const totalPages = Math.ceil(total / limit);

  const handleApproval = async (id: string, action: string) => {
    try {
      const req = await fetch("/api/admin/instructor", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          action,
        }),
      });
      const data = await req.json();
      console.log(data);

      if (req.status === 201) {
        setHandleAlert({
          color: "green",
          message: data.message,
          visible: true,
        });
        fetchData();
        return;
      }
      setHandleAlert({
        color: "red",
        message: "An error occurred in Server kindly try again",
        visible: true,
      });
    } catch (e) {
      setHandleAlert({
        color: "red",
        message: "An error occurred in Server kindly try again",
        visible: true,
      });
    }
  };
  // const handleDecline = async (id: string) => {
  //   try {
  //     const req = await fetch("/api/admin/instructor", {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id: id,
  //         action: "approved",
  //       }),
  //     });
  //     const data = await req.json();
  //     console.log(data);

  //     if (req.status === 201) {
  //       setHandleAlert({
  //         color: "green",
  //         message: data.message,
  //         visible: true,
  //       });
  //       fetchData();
  //       return;
  //     }
  //     setHandleAlert({
  //       color: "red",
  //       message: "An error occurred in Server kindly try again",
  //       visible: true,
  //     });
  //   } catch (e) {
  //     setHandleAlert({
  //       color: "red",
  //       message: "An error occurred in Server kindly try again",
  //       visible: true,
  //     });
  //   }
  // };

  return (
    <div className="">
      <Alert
        message={handleAlert.message}
        visible={handleAlert.visible}
        color={handleAlert.color}
      />
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
              <td className="p-2 border text-center">{user.verified}</td>
              <td className="p-2 border text-center">
                {user.courses ? user.courses.length : 0}
              </td>
              <td className="p-2 border text-center">
                {user.verified === "approved" ? (
                  <div>
                    <button onClick={()=>route.push(`/admin/courses?id=${user._id}`)} className="bg-green-500 text-white px-2 py-1 mr-2 rounded">
                      View Courses
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 mr-2 rounded">
                      Delete
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => {
                        handleApproval(user._id, "approved");
                      }}
                      className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                    >
                      Approve
                    </button>
                    <button onClick={() => {
                        handleApproval(user._id, "decline");
                      }} className="bg-red-500 text-white px-2 py-1 mr-2 rounded">
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
