import { NextRequest, NextResponse } from "next/server";
import { Course } from "../../../../../models/Course"; // Adjust the path as necessary
import connectToMongoDB from "@/lib/mongodb";
import { Readable } from "stream"; // Import stream to handle file uploads
import mongoose from "mongoose"; // Import mongoose for ObjectId conversion
import cloudinary from "../../../../config/cloudinary";
import User from "@/models/User";
import { Lecture } from "@/models/Lecture";

export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();

    const formData = await req.formData();
    const courseId = formData.get("id") as string; // Assuming _id is sent in the form data
    const updatedData: any = {}; // Create an object to hold the updated course data

    const course = await Course.findById(new mongoose.Types.ObjectId(courseId));
    const removeImage = formData.get("removeImage");
    if (removeImage === "true") {
      try {
        if (course) {
          const publicId = extractPublicId(course.imageUrl); // Extract public_id from imageUrl
          await cloudinary.uploader.destroy(`course_thumbnails/${publicId}`);
          updatedData.imageUrl = null;
        }
      } catch (e) {}
    } else {
      const thumbnail = formData.get("thumbnail");
      if (thumbnail !== null) {
        // Function to convert a web ReadableStream to a Node.js Readable stream
        function webReadableStreamToNodeReadable(
          webStream: ReadableStream<Uint8Array>
        ): Readable {
          const reader = webStream.getReader();

          return new Readable({
            read(size) {
              // This method is called when data is requested from the stream
              const push = async () => {
                const { done, value } = await reader.read();
                if (done) {
                  this.push(null); // Signal that no more data will be provided
                } else {
                  this.push(value); // Push the chunk of data to the readable stream
                }
              };

              push().catch((err) => {
                console.error("Error reading from web stream:", err);
                this.destroy(err); // Clean up on error
              });
            },
          });
        }

        if (thumbnail || typeof thumbnail === "string") {
          const stream =
            typeof thumbnail === "string"
              ? null
              : webReadableStreamToNodeReadable(thumbnail.stream());

          const uploadThumbnail = async (stream: Readable) => {
            return new Promise((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "course_thumbnails" },
                (error, result) => {
                  if (error) {
                    console.error(
                      "Error uploading thumbnail to Cloudinary:",
                      error
                    );
                    return reject(error);
                  }
                  return resolve(result);
                }
              );

              if (stream) {
                stream.pipe(uploadStream);
              } else {
                reject(new Error("No stream available for upload."));
              }
            });
          };

          if (stream !== null) {
            const thumbnailResponse = await uploadThumbnail(stream);
            updatedData.imageUrl = await String(
              (thumbnailResponse as { secure_url: string }).secure_url
            );

            try {
              if (course) {
                const publicId = extractPublicId(course.imageUrl); // Extract public_id from imageUrl
                await cloudinary.uploader.destroy(
                  `course_thumbnails/${publicId}`
                );
              }
            } catch (e) {}
          }
        }
      }
    }
    // Populate other fields if they exist in the form data
    const title = formData.get("title");
    const appxCourseId = formData.get("appxCourseId");
    const description = formData.get("description");
    const openToEveryone = formData.get("openToEveryone");
    const price = formData.get("price");
    const publish = formData.get("publish");
    if (title) updatedData.title = title;
    if (appxCourseId) updatedData.appxCourseId = appxCourseId;
    if (description) updatedData.description = description;
    if (openToEveryone !== null)
      updatedData.openToEveryone = openToEveryone === "true" ? true : false;
    if (publish !== null)
      updatedData.publish = publish === "true" ? true : false;
    if (price) updatedData.price = price;

    const updatedCourse = await Course.findByIdAndUpdate(
      new mongoose.Types.ObjectId(courseId),
      { $set: { ...updatedData } }
    );
    if (!updatedCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const lectureIds = updatedCourse.content;
    const lectures = await Lecture.find({ _id: { $in: lectureIds } });
    // Return the updated course
    return NextResponse.json(
      { course: updatedCourse, thumbnailLink: updatedData.imgurl, lectures },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}
function extractPublicId(imageUrl: string) {
  if (imageUrl) {
    const urlParts = imageUrl.split("/");
    const publicIdWithExtension = urlParts[urlParts.length - 1];
    const publicId = publicIdWithExtension.split(".")[0]; // Remove the file extension
    return publicId;
  }
  return null;
}
