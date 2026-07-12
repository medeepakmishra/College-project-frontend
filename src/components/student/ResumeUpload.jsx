import { useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";


const ResumeUpload = () => {

    const [resume, setResume] = useState(null);

    const [uploading, setUploading] = useState(false);

    const [uploadedResume, setUploadedResume] = useState(null);

    const [uploadStatus, setUploadStatus] = useState("idle");

    const [previewUrl, setPreviewUrl] = useState(null);



    // ================================
    // SELECT PDF
    // ================================

    const handleFileChange = (e) => {

        const file = e.target.files[0];


        if (!file) return;



        // PDF validation

        if (file.type !== "application/pdf") {

            toast.error(
                "Only PDF files are allowed"
            );

            return;
        }



        // Size validation 5MB

        if (file.size > 5 * 1024 * 1024) {

            toast.error(
                "Resume size should be less than 5MB"
            );

            return;
        }



        setResume(file);



        // PDF Preview

        const url = URL.createObjectURL(file);

        setPreviewUrl(url);



        setUploadStatus("ready");

    };





    // ================================
    // UPLOAD RESUME
    // ================================

    const handleUpload = async () => {


        if (!resume) {

            toast.error(
                "Please select a resume"
            );

            return;
        }



        const formData = new FormData();


        formData.append(
            "resume",
            resume
        );



        try {


            setUploading(true);


            setUploadStatus(
                "uploading"
            );



            const response = await api.post(

                "/upload/resume",

                formData,

                {

                    headers:{

                        "Content-Type":
                        "multipart/form-data"

                    }

                }

            );



            console.log(
                response.data
            );



            setUploadedResume(

                response.data.resume

            );



            setUploadStatus(
                "uploaded"
            );



            toast.success(
                "Resume uploaded successfully"
            );


        }


        catch(error){


            console.log(error);



            setUploadStatus(
                "failed"
            );



            toast.error(

                error.response?.data?.message ||

                "Resume upload failed"

            );


        }


        finally{


            setUploading(false);


        }


    };





    return (

        <div
        className="
        bg-[#171717]
        border
        border-zinc-800
        rounded-2xl
        p-6
        "
        >


            <h2 className="
            text-xl
            font-semibold
            mb-5
            ">
                Resume
            </h2>




            {/* Upload Box */}

            <label

            className="
            flex
            flex-col
            items-center
            justify-center
            border-2
            border-dashed
            border-zinc-700
            rounded-xl
            p-8
            cursor-pointer
            hover:border-blue-500
            transition
            "

            >


                <div className="text-5xl mb-3">

                    📄

                </div>



                <p className="
                text-lg
                font-medium
                ">

                {

                resume

                ?

                resume.name

                :

                "Click to upload resume"

                }

                </p>



                <p className="
                text-sm
                text-zinc-500
                mt-2
                ">

                PDF only • Maximum 5MB

                </p>



                <input

                type="file"

                accept="application/pdf"

                className="hidden"

                onChange={handleFileChange}

                />


            </label>





            {/* STATUS */}

            {

            uploadStatus === "ready" && (

                <p className="
                mt-4
                text-yellow-400
                ">

                🟡 Ready to upload

                </p>

            )

            }



            {

            uploadStatus === "uploading" && (

                <p className="
                mt-4
                text-blue-400
                ">

                🔵 Uploading resume...

                </p>

            )

            }




            {

            uploadStatus === "uploaded" && (

                <p className="
                mt-4
                text-green-400
                ">

                🟢 Resume uploaded successfully

                </p>

            )

            }




            {

            uploadStatus === "failed" && (

                <p className="
                mt-4
                text-red-400
                ">

                🔴 Upload failed

                </p>

            )

            }





            {/* PREVIEW */}

            {

            previewUrl && (

                <div className="mt-6">


                    <h3 className="
                    font-semibold
                    mb-3
                    ">
                        Preview
                    </h3>



                    <iframe

                    src={previewUrl}

                    title="Resume Preview"

                    className="
                    w-full
                    h-[500px]
                    rounded-xl
                    border
                    border-zinc-700
                    "

                    />


                </div>

            )

            }







            {/* UPLOAD BUTTON */}

            <button

            type="button"

            onClick={handleUpload}

            disabled={uploading}

            className="
            mt-6
            px-6
            py-3
            bg-blue-600
            hover:bg-blue-700
            text-white
            rounded-lg
            disabled:opacity-50
            "

            >


            {

            uploading

            ?

            "Uploading..."

            :

            "Upload Resume"

            }


            </button>






            {/* AFTER UPLOAD */}

            {

            uploadedResume && (

                <div className="
                mt-5
                ">


                    <a

                    href={uploadedResume.url}

                    target="_blank"

                    rel="noreferrer"

                    className="
                    text-blue-400
                    underline
                    "

                    >

                    Open Uploaded Resume

                    </a>


                </div>

            )

            }




        </div>

    );

};


export default ResumeUpload;