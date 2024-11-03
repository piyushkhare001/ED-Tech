import {
  BookText,
  ChevronLeft,
  ChevronRight,
  House,
  SquarePlay,
} from "lucide-react";
import "../../app/g.css";
import CustomVideoPlayer from "../ui/CustomVideoPlayer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
interface lectures {
  title: string;
  type: string;
  duration: string;
  completed: boolean;
  _id: string;
}
const CourseMain = () => {
  const route = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lectures, setLectures] = useState<lectures[]>([]);
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");
  const [lid, setLid] = useState("");
  const [ctitle, setCtitle] = useState("");
  const [Loader, setLoader] = useState(false)
  const handleRequestId = async (id: string) => {
    setLoader(true)
    try {
      const response = await fetch("/api/course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      const data = await response.json();
      setTitle(data.course.title);
      setDescription(data.course.description);
      setLectures(data.lectures);
      setThumbnail(data.course.imageUrl);
      setCtitle(data.course.title);
    } catch (error) {}
    setLoader(false)

  };
  const handleRequestLid = async (id: string) => {
    setLoader(true)
    try {
      const response = await fetch("/api/lecture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      const data = await response.json();
      setTitle(data.lecture.title);
      setDescription(data.lecture.description);
      setThumbnail(data.lecture.thumbnail);
      setVideo(data.lecture.video);
      setLid(data.lecture._id);
    } catch (error) {}
    setLoader(false)
    
  };
  const handleNextLecture = async (id: number) => {
    if (id == lectures.length) {
      return;
    }
    setLid(lectures[id + 1]._id);
    await handleRequestLid(lectures[id + 1]._id);
  };
  const handlePreviousLecture = async (id: number) => {
    if (id == 0) {
      return;
    }
    setLid(lectures[id - 1]._id);
    await handleRequestLid(lectures[id - 1]._id);
  };
  const handleClick = async (lid: string) => {
    setLid(lid);
    const data = new URL(window.location.href);
    route.push(`?id=${String(data.search.split("&")[0].slice(4))}&lid=${lid}`);
    await handleRequestLid(lid);
  };
  useEffect(() => {
    setLoader(true)
    const data = new URL(window.location.href);

    const id = String(data.search.split("&")[0].slice(0, 4));
    let lid = "";
    if (data.search.split("&")[1]) {
      lid = String(data.search.split("&")[1].slice(4));
    }
    if (id === "?id=") {
      handleRequestId(data.search.split("&")[0].slice(4));
      if (lid && lid != "") {
          handleRequestLid(lid);
      }
    } else {
      route.push("/dashboard");
    }
  }, []);

  return (
    <div className="w-full p-4 mt-4">
      <div className="lg:flex w-full lg:mx-4">
        <div className="w-full mx-4">
          <nav className="flex">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li>
                <div className="flex items-center ">
                  <House
                    className="text-gray-400 h-5 w-5 mx-2 mb-1"
                    size={18}
                  />
                  <a href="#" className="text-gray-400">
                    Home
                  </a>
                  <ChevronRight className="text-gray-400 h-5 w-5" size={18} />
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <a href="#" className="text-gray-400">
                    Course
                  </a>
                  <ChevronRight className="text-gray-400 h-5 w-5" size={18} />
                </div>
              </li>

              {lid!=='' ? (
                <div className="flex items-center w-full">
                  <li>
                    <div className="flex items-center">
                      <a className="text-gray-400">{ctitle}</a>
                      <ChevronRight
                        className="text-gray-400 h-5 w-5"
                        size={18}
                      />
                    </div>
                  </li>
                  <span className="text-gray-700">{title}</span>
                </div>
              ) : (
                <li>
                  <span className="text-gray-700">{ctitle}</span>
                </li>
              )}
            </ol>
          </nav>
          <div>
            {lid!==''  ? (
              <div className={`shadow-md w-full mb-4 ${video ?'mt-6':null}`}>
                <div>
                {video ? (
                    <CustomVideoPlayer poster={thumbnail} src={video} />
                ) : null}
                </div>
              </div>
            ) : (
              <img
                src={thumbnail}
                alt="course image"
                className={`w-full object-cover rounded-md shadow ${lid==""?"mt-6":null}`}
              />
            )}
          </div>
          <div className=" my-6 shadow-md border  border-gray-400 rounded-md p-4">

            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: description }} />
            <div className="w-full">
              {lid===''  ? (
                <button className="text-white bg-black w-full py-2 my-2 rounded-md">
                  Start / Continue
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="w-full lg:max-w-[460px] mt-12">
          <div className="shadow-md min-h-1/2  m-2 my-0 p-2 border border-gray-400  rounded-md bg-white">
            <h2 className="text-xl font-bold mx-3 my-2">Lectures</h2>
            <hr className="mb-4" />
            <div className="max-h-[420px] overflow-auto">
              {lectures.map((e, i) => {
                return (
                  <div key={i} className="mx-3 my-2">
                    <div
                      onClick={() => handleClick(e._id)}
                      className={`w-full p-2 cursor-pointer ${
                        e._id == lid ? "bg-black text-white" : null
                      } border border-gray-900 border-dashed shadow-md rounded-md`}
                    >
                      <div className="mx-2 flex justify-between">
                        <div className="flex w-full">
                          {e.type != "video" ? (
                            <BookText
                              style={{ width: 24, height: 24 }}
                              className="mt-1 mr-2"
                            />
                          ) : (
                            <SquarePlay
                              style={{ width: 24, height: 24 }}
                              className="mt-1 mr-2"
                            />
                          )}
                          <div>
                            <h2 className="font-bold mx-1">{e.title}</h2>
                            <h2 className="font-semibold text-gray-600 text-sm">
                              1 hr
                            </h2>
                          </div>
                        </div>

                        {/* <CircleCheck
                          size={18}
                          className="text-green-500 mt-1"
                        /> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <hr className="mt-2" />
            <div className="flex justify-end mt-2">
              <button
                onClick={(e) =>
                  handlePreviousLecture(
                    lectures.findIndex((ele) => ele._id == lid)
                  )
                }
                className={`p-2 mr-2 shadow rounded-md text-${
                  lectures.findIndex((ele) => ele._id == lid) == 0
                    ? "gray-700"
                    : "white"
                } bg-black`}
                disabled={lectures.findIndex((ele) => ele._id == lid) == 0}
              >
                <ChevronLeft />
              </button>
              <button
                onClick={(e) =>
                  handleNextLecture(lectures.findIndex((ele) => ele._id == lid))
                }
                className={`p-2 mr-2 shadow rounded-md text-${
                  lectures.findIndex((ele) => ele._id == lid) ==
                  lectures.length - 1
                    ? "gray-700"
                    : "white"
                } bg-black`}
                disabled={
                  lectures.findIndex((ele) => ele._id == lid) ==
                  lectures.length - 1
                }
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseMain;
