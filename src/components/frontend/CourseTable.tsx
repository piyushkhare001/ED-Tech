import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Course {
  _id: string;
  title: string;
  imageUrl?: string;
  description?: string;
  openToEveryone: boolean;
  price: number;
  publish: boolean;
}

interface CourseTableProps {
  search: string;
  page: number;
  id: string;
  setPage: (page: number) => void;
}

export default function CourseTable({
  search,
  page,
  id,
  setPage,
}: CourseTableProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const route = useRouter();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(
          `/api/course/search?id=${id}&title=${search}`
        );
        const data = await response.json();

        if (data.data) {
          setCourses(data.data);
          setTotal(data.totalPages);
        } else {
          // route.push('/')
        }
      } catch (e) {
        alert("Error loading courses");
      }
    }
    fetchCourses();
  }, [search, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full rounded-md shadow-md border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Created By</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Open to Everyone</th>
            <th className="p-2 border">Published</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td
                className="p-2 border cursor-pointer"
                onClick={() => {
                  route.push(`/admin/course?id=${course._id}`);
                }}
              >
                {course.title}
              </td>
              <td className="p-2 border text-center">{course._id}</td>
              <td className="p-2 border">
                {course.description?.slice(0, 50)}
                {String(course.description)?.length > 50 ? "..." : ""}
              </td>
              <td className="p-2 border">
                {course.imageUrl ? (
                  <div className="flex justify-center items-center">
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="h-12 w-12 object-cover"
                    />
                  </div>
                ) : (
                  "No Image"
                )}
              </td>
              <td className="p-2 border text-center">Rs. {course.price} /-</td>
              <td className="p-2 border text-center">
                {course.openToEveryone ? "Yes" : "No"}
              </td>
              <td className="p-2 border text-center">
                {course.publish ? "Published" : "Not Published"}
              </td>
              <td className="p-2 border text-center">
                {course.publish ? (
                  <button
                    onClick={() => {
                      route.push(`/admin/course?id=${course._id}`);
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Unpublish
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      route.push(`/admin/course?id=${course._id}`);
                    }}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Publish
                  </button>
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
