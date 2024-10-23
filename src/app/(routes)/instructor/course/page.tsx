"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../Sidebar/page";
import Alert from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import ButtonSpinner from "@/components/ui/buttonSpinner";
import { FaTimesCircle } from "react-icons/fa"; // Import a remove icon (react-icons library)
import DocumentEditor from "@/components/ui/documentEditor";
import { color } from "framer-motion";
import axios from "axios";
import { IoCode } from "react-icons/io5";
import "../../../g.css";
import Navbar from "@/components/frontend/Navbar";
import removeHtmlTags from "@/lib/utility/removeHTML";
interface Lecture {
  type: { type: String };
  title: { type: String };
  hidden: { type: Boolean };
  description: { type: String };
  thumbnail: { type: String };
  createdAt: { type: Date };
  video: { type: String };
  _id: { type: String };
}

const AddCourse = () => {
  const route = useRouter();
  const [coursePrice, setCoursePrice] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [openToEveryone, setOpenToEveryone] = useState(false);
  const [publish, setPublish] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailLink, setThumbnailLink] = useState<String | null>("");
  const [status, setstatus] = useState(1);
  const [drafted, setDrafted] = useState(false);

  // Lectures
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [lType, setlType] = useState("");
  const [lTitle, setlTitle] = useState("");
  const [lHidden, setlHidden] = useState<Boolean>(false);
  const [lDescription, setlDescription] = useState("");
  const [lThumbnailLink, setlThumbnailLink] = useState("");
  const [lVideoLink, setlVideoLink] = useState("");
  const [progress, setProgress] = useState(0); // Track upload progress

  //   Routing States
  const [id, setId] = useState("");
  const [lid, setlid] = useState("");

  //   Components States
  const [handleAlert, setHandleAlert] = useState({
    color: "",
    message: "",
    visible: false,
  });
  const [loader, setLoader] = useState(true);
  const [buttonLoader, setButtonLoader] = useState({ id: 0, status: false });
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "Modal Title",
    desc: "This is the modal description.",
    id: "",
    couse: true,
  });
  const handleLecture = async () => {
    const formData = new FormData();
    formData.append("title", lTitle);
    formData.append("type", lType);
    formData.append("description", lDescription);
    formData.append("thumbnail", lThumbnailLink);
    formData.append("video", lVideoLink);
    formData.append("hidden", lHidden == false ? "false" : "true");
    formData.append("courseId", id);

    let search = new URL(window.location.href).search.split("&");
    if (!search[1]) {
      search[1] = "";
    }
    if (lid === "" && search[1].slice(0, 3) !== "lid") {
      try {
        const req = await fetch("/api/instructor/lecture/create-lecture", {
          method: "POST",
          body: formData,
        });
        const res = await req.json();

        if (req.status == 200) {
          route.push(`/instructor/course?id=${id}&lid=${res.lecture._id}`);
          setlid(res._id);
          handleLocationDraft(null);
          setHandleAlert({
            color: "green",
            message: res.message,
            visible: true,
          });
        } else {
          setHandleAlert({
            color: "red",
            message: res.message,
            visible: true,
          });
        }
      } catch (error) {
        setHandleAlert({
          color: "red",
          message: "An error occurred in Server kindly try again",
          visible: true,
        });
      }
    } else if (lid !== "" || search[1].slice(0, 3) === "lid") {
      try {
        formData.append("lectureId", lid ? lid : search[1].slice(4));
        const req = await fetch("/api/instructor/lecture/update-lecture", {
          method: "PUT",
          body: formData,
        });
        const res = await req.json();

        if (req.status == 200) {
          setHandleAlert({
            color: "green",
            message: res.message,
            visible: true,
          });
        } else {
          setHandleAlert({
            color: "red",
            message:
              res.message || "An error occurred in Server kindly try again",
            visible: true,
          });
        }
      } catch (error) {
        console.log(error);

        setHandleAlert({
          color: "red",
          message: "An error occurred in Server kindly try again",
          visible: true,
        });
      }
    }
  };
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setThumbnail(e.target.files[0]);
    }
  };
  const handleThumbnailChangeLecture = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setButtonLoader({ id: 2, status: true });
      const formData = new FormData();
      formData.append("thumbnail", e.target.files[0]);

      const search = new URL(window.location.href).search.split("&");
      if (lid || search[1]) {
        formData.append("lid", lid || search[1].slice(4));
      }
      const req = await fetch("/api/instructor/lecture/upload-image", {
        method: "POST",
        body: formData,
      });
      const res = await req.json();
      if (req.status == 201) {
        setlThumbnailLink(res.img);
        handleLecture();
        setHandleAlert({
          color: "green",
          message: res.message,
          visible: true,
        });
      } else {
        setHandleAlert({ color: "red", message: res.message, visible: true });
      }
      setButtonLoader({ id: 2, status: false });
    }
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const search = new URL(window.location.href).search.split("&");
      if (lid || search[1]) {
        formData.append("lid", lid || search[1].slice(4));
      } else {
        return;
      }
      try {
        const response = await axios.post(
          "/api/instructor/lecture/upload-video",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted); // Update progress bar
            },
          }
        );
        const url = await response.data.secure_url;
        setlVideoLink(url);
        await handleLecture();
        setHandleAlert({
          color: "green",
          message: "Video uploaded successfully.",
          visible: true,
        });
        setProgress(0); // Reset progress
        return;
      } catch (error) {
        console.error("Error uploading video:", error);
        setProgress(0); // Reset progress on error
      }
    }
    setHandleAlert({
      color: "red",
      message: "please select a file",
      visible: true,
    });
    return;
  };
  const handleLocationDraft = async (lectid: any) => {
    try {
      const search = new URL(window.location.href).search.split("&");
      if (search) {
        if (search[0].slice(0, 3) == "?id") {
          const id = search[0].slice(4);
          const req = await fetch(`/api/instructor/course`, {
            method: "POST",
            body: JSON.stringify({ id }),
            headers: { "Content-Type": "multipart/" },
          });
          const res = await req.json();
          console.log(res);

          if (res.course) {
            setDrafted(true);
            setTitle(res.course.title);
            setDescription(res.course.description);
            setCoursePrice(res.course.price);
            setOpenToEveryone(res.course.openToEveryone);
            setPublish(res.course.publish);
            setThumbnailLink(res.course.imageUrl);
            setId(res.course._id);
            setLectures(res.lectures);
          } else {
            await route.push("/instructor/course");
            setHandleAlert({
              color: "red",
              message: "Error from server while loading course",
              visible: true,
            });
          }
        }

        if (search[1] || lectid) {
          let id = lectid;
          if (!lectid) {
            id = search[1].slice(4);
          }
          const req = await fetch(`/api/instructor/lecture`, {
            method: "POST",
            body: JSON.stringify({ id }),
            headers: { "Content-Type": "application/json" },
          });
          const res = await req.json();
          if (res.lecture) {
            setlTitle(res.lecture.title);
            setlType(res.lecture.type);
            setlHidden(res.lecture.hidden);
            setlDescription(res.lecture.description);
            setlThumbnailLink(res.lecture.thumbnail);
            setlVideoLink(res.lecture.video);
            setlid(res.lecture._id);
            return;
          }
          route.push(`/instructor/course?id=${id}`);

          setHandleAlert({
            color: "red",
            message: "Error from server while loading lecture",
            visible: true,
          });
        }
        setLoader(false);
      }
    } catch (e) {
      console.log(e);

      setHandleAlert({
        color: "red",
        message: "Something went worng in server.",
        visible: true,
      });
    }
  };

  useEffect(() => {
    setLoader(true);
    handleLocationDraft(null);
    setLoader(false);
  }, []);

  const handleDraft = async () => {
    try {
      // Course part
      const formData = new FormData();
      formData.append("title", title); // Assuming title is a state variable
      formData.append("description", description); // Assuming description is a state variable
      formData.append("category", category); // Assuming category is a state variable
      formData.append("price", coursePrice); // Assuming coursePrice is a state variable
      formData.append("openToEveryone", openToEveryone);
      formData.append("publish", publish);
      formData.append("lectures", lectures);
      if (status === 1 || status === 2) {
        setButtonLoader({ id: 1, status: true });
        if (thumbnail) {
          formData.append("thumbnail", thumbnail); // Assuming thumbnail is a file object
        }
        if (!id) {
          const req = await fetch("/api/instructor/course/create-course", {
            method: "POST",
            body: formData,
          });

          const res = await req.json();
          setButtonLoader({ id: 1, status: false });
          if (req.status == 201) {
            setDrafted(true);
            setThumbnailLink(res.course.imageUrl || "");
            setPublish(res.course.publish);
            setThumbnailLink(res.course.imageUrl);
            setId(res.course._id);
            setLectures(res.lectures);
            route.push(`/instructor/course?id=${res.course._id}`);
            return setHandleAlert({
              color: "green",
              message: "Course created successfully!",
              visible: true,
            });
          }
          // } else if (search[0].slice(0, 3) == "?id") {
        } else if (id) {
          formData.append("id", id);
          const req = await fetch("/api/instructor/course/update-course", {
            method: "POST",
            body: formData,
          });

          const res = await req.json();
          setButtonLoader({ id: 1, status: false });

          if (req.status == 200) {
            setDrafted(true);
            setThumbnailLink(res.imageUrl || "");
            setPublish(res.course.publish);
            setId(res.course._id);
            setLectures(res.lectures);
            return setHandleAlert({
              color: "green",
              message: "Course updated successfully!",
              visible: true,
            });
          }
        }
        return setHandleAlert({
          color: "red",
          message: "An error occurred in Server kindly try again",
          visible: true,
        });
      }
    } catch (err) {
      console.log(err);

      setHandleAlert({
        color: "red",
        message: "An error occurred in Server kindly try again",
        visible: true,
      });
    }
  };

  const handleCourseDelete = async (id: any) => {
    setHandleAlert({
      message: "Deleting process will take time please wait.",
      color: "yellow",
      visible: true,
    });
    const req = await fetch("/api/instructor/course/delete-course", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    const res = await req.json();
    if (req.status == 200) {
      setModalState({ ...modalState, isOpen: false });
      setHandleAlert({
        color: "green",
        message: res.message,
        visible: true,
      });
      route.push("/instructor/courses");
    } else {
      setHandleAlert({
        color: "red",
        message: res.message,
        visible: true,
      });
    }
  };
  const handleLectureDelete = async (lid: any) => {
    try {
      const req = await fetch("/api/instructor/lecture/delete-lecture", {
        method: "POST",
        body: JSON.stringify({ id, lid }),
      });
      const res = await req.json();

      if (req.status == 200) {
        setModalState({ ...modalState, isOpen: false });
        setHandleAlert({
          color: "green",
          message: res.message,
          visible: true,
        });
        route.push(`/instructor/course?id=${id}`);
        handleLocationDraft(null);
      } else {
        setHandleAlert({
          color: "red",
          message: res.message,
          visible: true,
        });
      }
    } catch (error) {
      setHandleAlert({
        color: "red",
        message: "Server error failed to delete",
        visible: true,
      });
    }
  };

  return (
    <>
      <Navbar openNav={() => {}} />
      <div className="min-h-screen flex bg-white">
        {/* Sidebar */}
        <Sidebar />
        <Alert
          message={handleAlert.message}
          visible={handleAlert.visible}
          color={handleAlert.color}
        />
        {/* Modal */}
        <>
          {/* Modal content */}
          {modalState.isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-red-500 p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-between">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {modalState.title}
                  </h2>
                  <button
                    className="bg-white text-red-500 font-bold py-2 px-2 w-fit h-fit rounded"
                    onClick={(e) =>
                      setModalState({ ...modalState, isOpen: false })
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x-lg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                  </button>
                </div>
                <p className="text-white mb-4">{modalState.desc}</p>
                <button
                  onClick={(e) => {
                    modalState.couse
                      ? handleCourseDelete(id)
                      : handleLectureDelete(modalState.id);
                  }}
                  className="bg-red-500 border-solid border-2 border-white text-white font-bold py-2 px-2 w-fit h-fit rounded"
                >
                  Delete
                </button>
                <button
                  className="mx-2 bg-white text-red-500 font-bold py-2 px-2 w-fit h-fit rounded"
                  onClick={(e) =>
                    setModalState({ ...modalState, isOpen: false })
                  }
                >
                  Cancel
                </button>
                {/* Close button */}
              </div>
            </div>
          )}
        </>
        {/* Main Content */}

        {!loader ? (
          <main className="flex-1 p-6">
            <div className="container mx-auto">
              {/* Page Title */}
              {status == 1 ? (
                <h1 className="text-3xl font-semibold text-black mb-8">
                  Course Information
                </h1>
              ) : status == 2 ? (
                <h3 className="text-3xl font-semibold text-black mb-8">
                  Lecture Information
                </h3>
              ) : status == 3 ? (
                <h3 className="text-3xl font-semibold text-black mb-8">
                  Total Lectures
                </h3>
              ) : (
                <h3 className="text-3xl font-semibold text-black mb-8">
                  Publish
                </h3>
              )}
              {/* Progress Bar */}
              <div className="flex items-center mb-8 space-x-4">
                <div className="relative">
                  <div
                    className={`w-10 h-10 rounded-full bg-gray-${
                      status === 1 ? "900" : "500"
                    } flex items-center justify-center text-white cursor-pointer`}
                    onClick={(e) => setstatus(1)}
                  >
                    1
                  </div>
                  <span
                    className={`absolute top-12 w-24 text-center left-1/2 transform -translate-x-1/2 text-gray-${
                      status == 1 ? "900" : "400"
                    }`}
                  >
                    Course Information
                  </span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-900 shadow-md"></div>
                <div className="relative">
                  <div
                    className={`w-10 h-10 rounded-full bg-gray-${
                      status === 2 ? "900" : "500"
                    } flex items-center justify-center text-white cursor-pointer`}
                    onClick={(e) => setstatus(2)}
                  >
                    2
                  </div>
                  <span
                    className={`absolute top-12 w-24 text-center left-1/2 transform -translate-x-1/2 text-gray-${
                      status == 2 ? "900" : "400"
                    }`}
                  >
                    Lecture Information
                  </span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-900 shadow-md"></div>
                <div className="relative">
                  <div
                    className={`w-10 h-10 rounded-full bg-gray-${
                      status === 3 ? "900" : "500"
                    } flex items-center justify-center text-white cursor-pointer`}
                    onClick={(e) => setstatus(3)}
                  >
                    3
                  </div>
                  <span
                    className={`absolute top-12 w-24 text-center left-1/2 transform -translate-x-1/2 text-gray-${
                      status == 3 ? "900" : "400"
                    }`}
                  >
                    {`Total Lectures (${lectures ? lectures.length : 0})`}
                  </span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-900 shadow-md"></div>
                <div className="relative">
                  <div
                    className={`w-10 h-10 rounded-full bg-gray-${
                      status === 4 ? "900" : "500"
                    } flex items-center justify-center text-white cursor-pointer`}
                    onClick={(e) => setstatus(4)}
                  >
                    4
                  </div>
                  <span
                    className={`absolute top-12 w-24 text-center left-1/2 transform -translate-x-1/2 text-gray-${
                      status == 4 ? "900" : "400"
                    }`}
                  >
                    Publish
                  </span>
                </div>
              </div>

              {/* Course Form */}
              {status === 1 ? (
                // Course
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {/* Course Title */}
                    <div className="pt-12">
                      <label className="block text-gray-900 mb-2">
                        Course Title <span className="text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Course Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 rounded-lg bg-gray-100 shadow-md text-gray-900 border border-gray-700 focus:border-yellow-500 focus:outline-none"
                      />
                    </div>

                    {/* Course Short Description */}
                    <div>
                      <label className="block text-gray-900 mb-2">
                        Course Short Description{" "}
                        <span className="text-red-500"> *</span>
                      </label>
                      <textarea
                        placeholder="Enter Description"
                        className="w-full p-3 rounded-lg bg-gray-100 shadow-md text-gray-900 border border-gray-700 focus:border-yellow-500 focus:outline-none"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    {/* Course Price */}
                    <div className="mb-4">
                      <label
                        className="block text-gray-900 mb-2"
                        htmlFor="coursePrice"
                      >
                        Course Price <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="coursePrice"
                        type="number"
                        value={coursePrice}
                        onChange={(e) => setCoursePrice(e.target.value)}
                        placeholder="Enter Course Price"
                        className="w-full p-3 rounded-lg bg-gray-100 shadow-md text-gray-900 border border-gray-700 focus:border-yellow-500 focus:outline-none"
                      />
                    </div>
                    {/* Course Category */}
                    <div className="flex justify-between">
                      <div className="mb-4 w-1/2">
                        <label
                          className="block text-gray-900 mb-2"
                          htmlFor="category"
                        >
                          Open to everyone{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={openToEveryone}
                              onChange={() =>
                                setOpenToEveryone(!openToEveryone)
                              }
                            />
                            <div
                              className={`w-11 h-6 bg-gray-300 shadow-md rounded-full ${
                                openToEveryone
                                  ? "bg-green-500"
                                  : "bg-gray-300 shadow-md"
                              } peer peer-focus:ring-green-300 peer-checked:bg-green-500 transition duration-300 ease-in-out`}
                            >
                              <span
                                className={`absolute w-5 h-5 bg-white mt-[2px] mx-[2px] rounded-full shadow-md transform transition ${
                                  openToEveryone ? "translate-x-5" : ""
                                }`}
                              ></span>
                            </div>
                          </label>
                          <h4 className="ml-4 text-gray-900">
                            {openToEveryone ? "Open" : "Not Open"}
                          </h4>
                        </div>
                      </div>
                      {/* <div className="mb-4 w-1/2">
                        <label
                          className="block text-gray-900 mb-2"
                          htmlFor="category"
                        >
                          Open to every one{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={openToEveryone}
                              onChange={() =>
                                setOpenToEveryone(!openToEveryone)
                              }
                            />
                            <div
                              className={`w-11 h-6 bg-gray-300 shadow-md rounded-full ${
                                openToEveryone
                                  ? "bg-green-500"
                                  : "bg-gray-300 shadow-md"
                              } peer peer-focus:ring-green-300 peer-checked:bg-green-500 transition duration-300 ease-in-out`}
                            >
                              <span
                                className={`absolute w-5 h-5 bg-white mt-[2px] mx-[2px] rounded-full shadow-md transform transition ${
                                  openToEveryone ? "translate-x-5" : ""
                                }`}
                              ></span>
                            </div>
                          </label>
                          <h4 className="ml-4 text-gray-900">
                            {lHidden
                              ? "Lecture is hidden."
                              : "Lecture is visible."}
                          </h4>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  {/* Course Thumbnail */}
                  <div className="mb-4">
                    <label
                      className="block text-gray-900 mb-2  mt-12"
                      htmlFor="Thumbnail"
                    >
                      Thumbnail <span className="text-red-500">*</span>
                    </label>
                    {thumbnailLink ? (
                      <div className="relative inline-block flex justfy-center w-full mb-2">
                        <img
                          src={String(thumbnailLink)}
                          alt="Thumbnail"
                          className="rounded-md border border-gray-700 w-full"
                        />
                      </div>
                    ) : null}

                    {/* Hidden File Input */}
                    <input
                      id="thumbnail"
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="hidden"
                    />

                    {/* Upload Button (only visible when there's no image or after removal) */}
                    {
                      <label
                        htmlFor="thumbnail"
                        className="cursor-pointer flex flex-col items-center justify-center w-full p-3 rounded-lg bg-gray-100 shadow-md text-gray-900 border border-gray-700 hover:bg-gray-100 shadow-md focus:bg-gray-100 shadow-md focus:outline-none"
                      >
                        {/* Change this text dynamically if a new file is selected */}
                        {thumbnail?.name ? (
                          <span>{thumbnail?.name}</span>
                        ) : (
                          <>
                            <span className="mb-1">
                              {thumbnailLink ? "Change" : "Upload"} Thumbnail
                            </span>
                            <span className="text-sm text-gray-500">
                              Only image files allowed
                            </span>
                          </>
                        )}
                      </label>
                    }
                  </div>
                </div>
              ) : status === 2 ? (
                // Lectures
                <div className="block">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6 ">
                      {/* Lecture Title */}
                      <div className="pt-12">
                        <label className="block text-gray-900 mb-2">
                          Lecture Title <span className="text-red-500"> *</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Lecture Title"
                          value={lTitle}
                          onChange={(e) => setlTitle(e.target.value)}
                          className="w-full p-3 rounded-lg bg-gray-100 shadow-md text-gray-900 border border-gray-700 focus:border-yellow-500 focus:outline-none"
                        />
                      </div>
                      {/* Lecture Thumbnail */}
                      <div className="mb-4">
                        {lThumbnailLink ? (
                          <img
                            src={lThumbnailLink}
                            alt=""
                            className="w-full rounded-lg mb-2"
                          />
                        ) : null}

                        <input
                          id="thumbnail"
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailChangeLecture}
                          className="hidden"
                        />

                        <label
                          htmlFor="thumbnail"
                          className="cursor-pointer flex flex-col items-center justify-center w-full p-3 rounded-lg bg-gray-100 shadow-md text-gray-900 border border-gray-700 hover:bg-gray-100 shadow-md focus:bg-gray-100 shadow-md focus:outline-none"
                        >
                          {buttonLoader.id === 2 &&
                          buttonLoader.status === true ? (
                            <ButtonSpinner />
                          ) : (
                            <>
                              <span className="mb-1">
                                {lThumbnailLink !== ""
                                  ? "Update Thumbnail"
                                  : "Upload Thumbnail"}
                              </span>
                              <span className="text-sm text-gray-500">
                                Only image files allowed
                              </span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="space-y-6 ">
                      {/* Lecture Type */}
                      <div className="mb-4 mt-12">
                        <label
                          className="block text-gray-900 mb-2"
                          htmlFor="type"
                        >
                          Select Lecture Type{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="type"
                            name="type"
                            value={lType}
                            onChange={(e) => setlType(e.target.value)}
                            className="block w-full p-3 bg-gray-100 shadow-md text-gray-900 border border-gray-700 rounded-lg appearance-none focus:outline-none focus:border-yellow-500"
                          >
                            <option value="page">Reading</option>
                            <option value="video">Video</option>
                          </select>
                          {/* Custom arrow for select */}
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06 0L10 10.757l3.71-3.547a.75.75 0 111.04 1.08l-4 3.75a.75.75 0 01-1.04 0l-4-3.75a.75.75 0 010-1.08z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Lecture Video */}
                      {lType == "video" ? (
                        <div className="mb-4">
                          {lVideoLink !== "" ? (
                            <video
                              controls
                              width="600"
                              className="mb-2 rounded-lg"
                            >
                              <source src={lVideoLink} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          ) : null}
                          <input
                            id="file"
                            type="file"
                            accept="video/*" // Change this if you want to limit to specific file types
                            onChange={handleFileChange}
                            className="hidden"
                          />

                          <label
                            htmlFor="file"
                            className="cursor-pointer flex flex-col items-center justify-center w-full p-3 rounded-lg bg-gray-100 shadow-md text-gray-900 border border-gray-700 hover:bg-gray-100 shadow-md focus:bg-gray-100 shadow-md focus:outline-none"
                          >
                            <>
                              <span className="mb-1">
                                {progress > 0
                                  ? `Uploaded:${progress}%`
                                  : lVideoLink == ""
                                  ? "Upload Video"
                                  : "Update Video"}
                              </span>
                              <span className="text-sm text-gray-500">
                                Only files allowed
                              </span>
                            </>
                          </label>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {/* Lecture Description */}
                  <div className="mt-12">
                    <label className="block text-gray-900 mb-2">
                      Lecture Description{" "}
                      <span className="text-red-500"> *</span>
                    </label>
                    <DocumentEditor
                      content={lDescription}
                      setContent={setlDescription}
                    />
                  </div>
                  {/* Lecture check box*/}
                  <div className="w-1/2">
                    <div className="mb-4">
                      <label
                        className="block text-gray-900 mb-2"
                        htmlFor="category"
                      >
                        Disable this Lecture{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={lHidden}
                            onChange={() => setlHidden(!lHidden)}
                          />
                          <div
                            className={`w-11 h-6 bg-gray-300 shadow-md rounded-full ${
                              lHidden ? "bg-green-500" : "bg-gray-300 shadow-md"
                            } peer peer-focus:ring-green-300 peer-checked:bg-green-500 transition duration-300 ease-in-out`}
                          >
                            <span
                              className={`absolute w-5 h-5 bg-white mt-[2px] mx-[2px] rounded-full shadow-md transform transition ${
                                lHidden ? "translate-x-5" : ""
                              }`}
                            ></span>
                          </div>
                        </label>
                        <h4 className="ml-4 text-gray-900">
                          {lHidden
                            ? "Lecture is hidden."
                            : "Lecture is visible."}
                        </h4>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex">
                        <button
                          className={`w-full bg-${
                            lid !== "" ? "yellow" : "green"
                          }-500 mx-2 text-black hover:bg-${
                            lid !== "" ? "yellow" : "green"
                          }-600 rounded-lg p-3`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleLecture();
                          }}
                        >
                          {lid !== "" ? "Update Lecture" : "Add Lecture"}
                        </button>
                        {lid !== "" ? (
                          <button
                            className="w-full bg-green-500 mx-2 text-black hover:bg-green-600 rounded-lg p-3"
                            onClick={(e) => {
                              e.preventDefault();
                              route.replace(`course?id=${id}`);
                              setlDescription("");
                              setlTitle("");
                              setlHidden(false);
                              setlThumbnailLink("");
                              setlVideoLink("");
                              setlType("page");
                              setlid("");
                            }}
                          >
                            Create a New Lecture
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ) : status === 3 ? (
                <div className="w-full mt-24">
                  <ul className="w-full">
                    {lectures
                      ? lectures.map((e, i) => {
                          return (
                            <>
                              <li
                                className="text-gray-100 flex w-full mb-6"
                                key={String(Date.now()) + e._id}
                              >
                                {e.thumbnail ? (
                                  <img
                                    src={e.thumbnail}
                                    alt=""
                                    className="max-w-64 w-64 max-h-1/2 rounded-md"
                                  />
                                ) : (
                                  <div className="max-w-64 min-w-64 w-64 h-full h-32 flex justify-center items-center">
                                    <IoCode className="text-gray-900 w-5 h-5" />
                                  </div>
                                )}
                                <div className="flex flex-col mx-10 justify-between w-full">
                                  <div>
                                    <h3 className="text-xl mt-2 text-gray-900 font-bold">
                                      {e.title || "Untitled Lecture"}
                                    </h3>
                                    <h3 className="text-md text-gray-900">
                                      {String(
                                        removeHtmlTags(
                                          e.description || "No Description "
                                        )
                                      ).slice(0, 150)}
                                      {String(removeHtmlTags(e.description))
                                        .length > 150
                                        ? "..."
                                        : null}
                                    </h3>
                                    <h3 className="text-sm mt-2 text-gray-100 bg-gray-900 rounded px-2 py-1 w-fit ">
                                      {e.type}
                                    </h3>
                                  </div>
                                  <div className="flex w-64">
                                    <button
                                      className="m-2 mx-0 w-full py-2 rounded bg-green-500 "
                                      onClick={(ele) => {
                                        route.push(
                                          `/instructor/course?id=${id}&lid=${e._id}`
                                        );
                                        handleLocationDraft(e._id);
                                        setstatus(2);
                                      }}
                                    >
                                      Update
                                    </button>
                                    <button
                                      className="m-2 w-full py-2 rounded bg-red-500 "
                                      onClick={(ele) =>
                                        setModalState({
                                          desc: "Are Sure you want to delete this Lecture once the Lecture been deleted it can not be retrived.",
                                          isOpen: true,
                                          title: "Delete Lecture",
                                          id: String(e._id),
                                          couse: false,
                                        })
                                      }
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </li>
                              {e.thumbnail ? (
                                <hr className="w-full m-2 mb-6" />
                              ) : null}
                            </>
                          );
                        })
                      : null}
                    {lectures.length == 0 ? (
                      <li className="text-center flex justify-center items-center p-4 text-gray-800">
                        <h2>No Lecture found</h2>
                      </li>
                    ) : null}
                  </ul>
                </div>
              ) : (
                <div className="w-full mt-24">
                  <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 max-w-md mx-auto mt-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                      Important: Review Your Information
                    </h2>
                    <p className="text-gray-700 mb-4">
                      Before proceeding, we kindly request that you take a
                      moment to review the information you have entered.
                    </p>
                    <p className="text-gray-700 mb-4">
                      Please ensure that all details are accurate. If any
                      information is incorrect or needs updating, you can make
                      the necessary changes.
                    </p>
                    <p className="text-gray-700">
                      Your attention to detail is crucial for ensuring a smooth
                      process. Thank you for your cooperation!
                    </p>
                  </div>
                </div>
              )}
              {/* Navigation Buttons */}
              <div className="flex justfy-between w-full">
                <div className="w-full"></div>
                <div className="flex justify-end mt-8 space-x-4">
                  {status == 1 ? (
                    <>
                      <button
                        onClick={handleDraft}
                        className="py-2 px-6 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
                      >
                        {buttonLoader.status && buttonLoader.id === 1 ? (
                          <ButtonSpinner />
                        ) : drafted ? (
                          "Update"
                        ) : (
                          "Draft"
                        )}
                      </button>
                    </>
                  ) : null}

                  {status !== 1 ? (
                    <button
                      onClick={(e) => setstatus(status - 1)}
                      className="py-2 px-6 rounded-lg bg-gray-800 shadow-md text-white hover:bg-gray-800"
                    >
                      Back
                    </button>
                  ) : null}

                  {status !== 4 ? (
                    <button
                      onClick={(e) => setstatus(status + 1)}
                      className="py-2 px-6 rounded-lg bg-gray-800 text-white hover:bg-gray-900"
                    >
                      Next
                    </button>
                  ) : null}
                  {status === 4 ? (
                    <>
                      {id !== "" ? (
                        <button
                          onClick={(ele) => {
                            setModalState({
                              desc: "Are Sure you want to delete this course once the course been deleted it can not be retrived.",
                              isOpen: true,
                              title: "Delete Course",
                              id: id,
                              couse: true,
                            });
                          }}
                          className="py-2 px-6 rounded-lg bg-red-500 text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      ) : null}
                    </>
                  ) : null}
                  {status === 4 ? (
                    !publish ? (
                      <button
                        onClick={(e) => {
                          setPublish(true);
                          handleDraft();
                        }}
                        className="py-2 px-6 rounded-lg bg-green-500 text-white hover:bg-green-600"
                      >
                        Publish
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          setPublish(false);
                          handleDraft();
                        }}
                        className="py-2 px-6 rounded-lg bg-green-500 text-white hover:bg-green-600"
                      >
                        Un Publish
                      </button>
                    )
                  ) : null}
                </div>
              </div>
            </div>
          </main>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default AddCourse;
