// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import {
//   createProfile,
//   getMyProfile,
//   updateProfile,
// } from "../../services/profile.service";

// import {
//   Loader2,
//   Plus,
//   Trash2,
//   Save,
// } from "lucide-react";


// export default function Profile() {

//   const [loading, setLoading] = useState(false);

//   const [profileExists, setProfileExists] = useState(false);


//   const [formData, setFormData] = useState({

//     rollNumber: "",
//     enrollmentNumber: "",
//     department: "",
//     course: "",
//     batch: "",
//     semester: "",
//     cgpa: "",
//     backlogs: "",

//     skills: [],

//     projects: [
//       {
//         title: "",
//         description: "",
//         link: "",
//       }
//     ],

//     internships: [
//       {
//         company: "",
//         role: "",
//         duration: "",
//       }
//     ],

//     certifications: [
//       {
//         name: "",
//         issuer: "",
//       }
//     ],

//     github: "",
//     linkedin: "",
//     portfolio: "",
//     resume: "",

//   });



//   useEffect(() => {

//     fetchProfile();

//   }, []);



//   const fetchProfile = async () => {

//     try {

//       const res = await getMyProfile();

//       if(res.data.profile){

//         setFormData(res.data.profile);

//         setProfileExists(true);

//       }


//     } catch(error){

//       console.log(error);

//     }

//   };




//   const handleChange = (e)=>{

//     setFormData({

//       ...formData,

//       [e.target.name]: e.target.value,

//     });

//   };





//   // Skills

//   const addSkill = ()=>{

//     setFormData({

//       ...formData,

//       skills:[
//         ...formData.skills,
//         ""
//       ]

//     });

//   };


//   const updateSkill=(index,value)=>{

//     const skills=[...formData.skills];

//     skills[index]=value;


//     setFormData({

//       ...formData,

//       skills

//     });

//   };




//   // Projects

//   const addProject=()=>{

//     setFormData({

//       ...formData,

//       projects:[
//         ...formData.projects,
//         {
//           title:"",
//           description:"",
//           link:""
//         }
//       ]

//     });

//   };


//   const updateProject=(index,key,value)=>{

//     const projects=[...formData.projects];

//     projects[index][key]=value;


//     setFormData({

//       ...formData,

//       projects

//     });

//   };



//   const removeProject=(index)=>{

//     const projects=formData.projects.filter(
//       (_,i)=>i!==index
//     );


//     setFormData({

//       ...formData,

//       projects

//     });

//   };





//   // Save

//   const handleSubmit=async(e)=>{

//     e.preventDefault();


//     try{

//       setLoading(true);


//       if(profileExists){

//         await updateProfile(formData);

//         toast.success(
//           "Profile updated successfully"
//         );

//       }
//       else{

//         await createProfile(formData);

//         toast.success(
//           "Profile created successfully"
//         );


//         setProfileExists(true);

//       }


//     }
//     catch(error){

//       toast.error(
//         error.response?.data?.message ||
//         "Something went wrong"
//       );

//     }
//     finally{

//       setLoading(false);

//     }

//   };



// return (

// <div className="space-y-8 text-white">


// <div>

// <h1 className="text-4xl font-bold">

// Student Profile

// </h1>


// <p className="text-zinc-400 mt-2">

// Complete your profile for placement eligibility

// </p>

// </div>




// <form
// onSubmit={handleSubmit}
// className="space-y-8"
// >


// <div className="grid md:grid-cols-2 gap-6 bg-[#171717] p-6 rounded-2xl border border-zinc-800">


// {
// [
// "rollNumber",
// "enrollmentNumber",
// "department",
// "course",
// "batch",
// "semester",
// "cgpa",
// "backlogs",
// "github",
// "linkedin",
// "portfolio",
// "resume"

// ].map((field)=>(

// <div key={field}>


// <label className="text-sm text-zinc-400 capitalize">

// {field}

// </label>


// <input

// name={field}

// value={formData[field]}

// onChange={handleChange}

// className="w-full mt-2 bg-[#111] border border-zinc-700 rounded-xl px-4 py-3"

// placeholder={field}

// />


// </div>

// ))

// }


// </div>





// {/* Skills */}

// <div className="bg-[#171717] p-6 rounded-2xl border border-zinc-800">


// <div className="flex justify-between mb-5">

// <h2 className="text-xl font-bold">

// Skills

// </h2>


// <button
// type="button"
// onClick={addSkill}
// className="flex gap-2 bg-blue-600 px-4 py-2 rounded-xl"
// >

// <Plus size={18}/>

// Add

// </button>


// </div>



// {
// formData.skills.map((skill,index)=>(

// <input

// key={index}

// value={skill}

// onChange={(e)=>
// updateSkill(index,e.target.value)
// }

// className="w-full mb-3 bg-[#111] border border-zinc-700 rounded-xl px-4 py-3"

// placeholder="React, Java, MongoDB"

// />

// ))

// }


// </div>





// {/* Projects */}

// <div className="bg-[#171717] p-6 rounded-2xl border border-zinc-800">


// <div className="flex justify-between">

// <h2 className="text-xl font-bold">

// Projects

// </h2>


// <button
// type="button"
// onClick={addProject}
// className="bg-blue-600 px-4 py-2 rounded-xl flex gap-2"
// >

// <Plus size={18}/>

// Add

// </button>

// </div>




// {
// formData.projects.map((project,index)=>(


// <div
// key={index}
// className="mt-5 border border-zinc-700 p-4 rounded-xl"
// >


// <div className="flex justify-between">

// <h3>
// Project {index+1}
// </h3>


// <button
// type="button"
// onClick={()=>removeProject(index)}
// >

// <Trash2
// className="text-red-500"
// />

// </button>


// </div>


// <input
// value={project.title}
// onChange={(e)=>
// updateProject(
// index,
// "title",
// e.target.value
// )
// }

// className="w-full mt-3 bg-[#111] border border-zinc-700 rounded-xl px-4 py-3"

// placeholder="Project title"

// />



// <textarea

// value={project.description}

// onChange={(e)=>
// updateProject(
// index,
// "description",
// e.target.value
// )
// }

// className="w-full mt-3 bg-[#111] border border-zinc-700 rounded-xl px-4 py-3"

// placeholder="Description"

// />


// </div>


// ))

// }


// </div>






// <button

// disabled={loading}

// className="flex items-center gap-2 bg-green-600 px-8 py-3 rounded-xl font-semibold"

// >


// {
// loading ?

// <Loader2 className="animate-spin"/>

// :

// <Save/>

// }


// {
// profileExists
// ?
// "Update Profile"
// :
// "Save Profile"
// }


// </button>



// </form>


// </div>

// );


// }

















import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ResumeUpload from "../../components/student/ResumeUpload";

import {
  createProfile,
  getMyProfile,
  updateProfile,
} from "../../services/profile.service";

import {
  Loader2,
  Plus,
  Trash2,
  Save,
} from "lucide-react";


const initialFormData = {
  rollNumber: "",
  enrollmentNumber: "",
  department: "",
  course: "",
  batch: "",

  semester: "",
  cgpa: "",
  backlogs: "",

  skills: [],

  projects: [],

  internships: [],

  certifications: [],

  github: "",
  linkedin: "",
  portfolio: "",

  resume: {
    url: "",
    publicId: "",
  },
};


export default function Profile() {

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  const [profileExists, setProfileExists] =
    useState(false);

  const [formData, setFormData] =
    useState(initialFormData);



  /* =========================================
     FETCH PROFILE
  ========================================= */

  useEffect(() => {

    fetchProfile();

  }, []);



  const fetchProfile = async () => {

    try {

      setPageLoading(true);

      const res = await getMyProfile();

      const profile = res.data.profile;


      if (profile) {

        setFormData({

          rollNumber:
            profile.rollNumber || "",

          enrollmentNumber:
            profile.enrollmentNumber || "",

          department:
            profile.department || "",

          course:
            profile.course || "",

          batch:
            profile.batch || "",

          semester:
            profile.semester ?? "",

          cgpa:
            profile.cgpa ?? "",

          backlogs:
            profile.backlogs ?? "",


          skills:
            Array.isArray(profile.skills)
              ? profile.skills
              : [],


          projects:
            Array.isArray(profile.projects)
              ? profile.projects
              : [],


          internships:
            Array.isArray(profile.internships)
              ? profile.internships
              : [],


          certifications:
            Array.isArray(
              profile.certifications
            )
              ? profile.certifications
              : [],


          github:
            profile.github || "",

          linkedin:
            profile.linkedin || "",

          portfolio:
            profile.portfolio || "",


          // resume: {

          //   url:
          //     profile.resume?.url || "",

          //   publicId:
          //     profile.resume?.publicId || "",

          // },

        });


        setProfileExists(true);

      }

    } catch (error) {

      // 404 means profile not created yet

      if (error.response?.status !== 404) {

        console.error(
          "Fetch profile error:",
          error
        );

        toast.error(
          error.response?.data?.message ||
          "Unable to load profile"
        );

      }

    } finally {

      setPageLoading(false);

    }

  };



  /* =========================================
     BASIC FIELD CHANGE
  ========================================= */

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setFormData((previous) => ({

      ...previous,

      [name]: value,

    }));

  };



  /* =========================================
     RESUME CHANGE
  ========================================= */

  const handleResumeChange = (e) => {

    setFormData((previous) => ({

      ...previous,

      resume: {

        ...previous.resume,

        url: e.target.value,

      },

    }));

  };



  /* =========================================
     SKILLS
  ========================================= */

  const addSkill = () => {

    setFormData((previous) => ({

      ...previous,

      skills: [
        ...previous.skills,
        "",
      ],

    }));

  };


  const updateSkill = (
    index,
    value
  ) => {

    const updatedSkills = [
      ...formData.skills,
    ];

    updatedSkills[index] = value;


    setFormData((previous) => ({

      ...previous,

      skills: updatedSkills,

    }));

  };


  const removeSkill = (index) => {

    setFormData((previous) => ({

      ...previous,

      skills:
        previous.skills.filter(
          (_, i) => i !== index
        ),

    }));

  };



  /* =========================================
     PROJECTS
  ========================================= */

  const addProject = () => {

    setFormData((previous) => ({

      ...previous,

      projects: [

        ...previous.projects,

        {
          title: "",
          description: "",
          link: "",
        },

      ],

    }));

  };


  const updateProject = (
    index,
    key,
    value
  ) => {

    const updatedProjects =
      formData.projects.map(
        (project, i) =>

          i === index

            ? {
                ...project,
                [key]: value,
              }

            : project
      );


    setFormData((previous) => ({

      ...previous,

      projects: updatedProjects,

    }));

  };


  const removeProject = (index) => {

    setFormData((previous) => ({

      ...previous,

      projects:
        previous.projects.filter(
          (_, i) => i !== index
        ),

    }));

  };



  /* =========================================
     INTERNSHIPS
  ========================================= */

  const addInternship = () => {

    setFormData((previous) => ({

      ...previous,

      internships: [

        ...previous.internships,

        {
          company: "",
          role: "",
          duration: "",
        },

      ],

    }));

  };


  const updateInternship = (
    index,
    key,
    value
  ) => {

    const updatedInternships =
      formData.internships.map(
        (internship, i) =>

          i === index

            ? {
                ...internship,
                [key]: value,
              }

            : internship
      );


    setFormData((previous) => ({

      ...previous,

      internships:
        updatedInternships,

    }));

  };


  const removeInternship = (index) => {

    setFormData((previous) => ({

      ...previous,

      internships:
        previous.internships.filter(
          (_, i) => i !== index
        ),

    }));

  };



  /* =========================================
     CERTIFICATIONS
  ========================================= */

  const addCertification = () => {

    setFormData((previous) => ({

      ...previous,

      certifications: [

        ...previous.certifications,

        {
          name: "",
          issuer: "",
        },

      ],

    }));

  };


  const updateCertification = (
    index,
    key,
    value
  ) => {

    const updatedCertifications =
      formData.certifications.map(
        (certification, i) =>

          i === index

            ? {
                ...certification,
                [key]: value,
              }

            : certification
      );


    setFormData((previous) => ({

      ...previous,

      certifications:
        updatedCertifications,

    }));

  };


  const removeCertification = (
    index
  ) => {

    setFormData((previous) => ({

      ...previous,

      certifications:
        previous.certifications.filter(
          (_, i) => i !== index
        ),

    }));

  };



  /* =========================================
     SUBMIT
  ========================================= */

  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      setLoading(true);


      /* -------------------------------------
         CONVERT NUMBER FIELDS
      ------------------------------------- */

      const payload = {

        ...formData,


        semester:
          Number(formData.semester),


        cgpa:
          Number(formData.cgpa),


        backlogs:
          Number(formData.backlogs),


        /* Remove empty skill inputs */

        skills:
          formData.skills.filter(
            (skill) =>
              skill.trim() !== ""
          ),

      };


      console.log(
        "Profile Payload:",
        payload
      );


      if (profileExists) {

        await updateProfile(payload);


        toast.success(
          "Profile updated successfully"
        );

      } else {

        await createProfile(payload);


        toast.success(
          "Profile created successfully"
        );


        setProfileExists(true);

      }


      await fetchProfile();


    } catch (error) {

      console.error(
        "Profile Save Error:",
        error
      );


      toast.error(

        error.response?.data?.message ||

        "Something went wrong"

      );

    } finally {

      setLoading(false);

    }

  };



  /* =========================================
     PAGE LOADING
  ========================================= */

  if (pageLoading) {

    return (

      <div className="
        min-h-[60vh]
        flex
        items-center
        justify-center
        text-white
      ">

        <Loader2
          size={35}
          className="animate-spin text-blue-500"
        />

      </div>

    );

  }



  return (

    <div className="space-y-8 text-white">


      {/* =================================
          HEADER
      ================================= */}

      <div>

        <h1 className="text-4xl font-bold">

          Student Profile

        </h1>


        <p className="text-zinc-400 mt-2">

          Complete your profile for placement
          eligibility

        </p>

      </div>



      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >


        {/* =================================
            BASIC DETAILS
        ================================= */}

        <Section title="Academic & Personal Details">


          <div className="
            grid
            md:grid-cols-2
            gap-6
          ">


            <InputField
              label="Roll Number"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
            />


            <InputField
              label="Enrollment Number"
              name="enrollmentNumber"
              value={
                formData.enrollmentNumber
              }
              onChange={handleChange}
            />


            <InputField
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="CSE"
            />


            <InputField
              label="Course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="B.Tech"
            />


            <InputField
              label="Batch"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              placeholder="2026"
            />



            {/* SEMESTER */}

            <div>

              <label className="
                text-sm
                text-zinc-400
              ">

                Semester

              </label>


              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                required
                className="
                  w-full
                  mt-2
                  bg-[#111]
                  border
                  border-zinc-700
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-blue-500
                "
              >

                <option value="">
                  Select Semester
                </option>

                <option value="1">
                  1st Semester
                </option>

                <option value="2">
                  2nd Semester
                </option>

                <option value="3">
                  3rd Semester
                </option>

                <option value="4">
                  4th Semester
                </option>

                <option value="5">
                  5th Semester
                </option>

                <option value="6">
                  6th Semester
                </option>

                <option value="7">
                  7th Semester
                </option>

                <option value="8">
                  8th Semester
                </option>

              </select>

            </div>



            {/* CGPA */}

            <InputField
              label="CGPA"
              name="cgpa"
              type="number"
              value={formData.cgpa}
              onChange={handleChange}
              min="0"
              max="10"
              step="0.01"
            />



            {/* BACKLOGS */}

            <InputField
              label="Backlogs"
              name="backlogs"
              type="number"
              value={formData.backlogs}
              onChange={handleChange}
              min="0"
              step="1"
            />


            <InputField
              label="GitHub"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="GitHub profile URL"
            />


            <InputField
              label="LinkedIn"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn profile URL"
            />


            <InputField
              label="Portfolio"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              placeholder="Portfolio URL"
            />



            {/* RESUME */}

            {/* <div>

              <label className="
                text-sm
                text-zinc-400
              ">

                Resume URL

              </label>


              <input
                type="text"
                value={
                  formData.resume?.url || ""
                }
                onChange={
                  handleResumeChange
                }
                placeholder="Resume URL"
                className="
                  w-full
                  mt-2
                  bg-[#111]
                  border
                  border-zinc-700
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-blue-500
                "
              />

            </div> */}


          </div>

        </Section>



        
        



        {/* =================================
            SKILLS
        ================================= */}




        <Section
          title="Skills"
          onAdd={addSkill}
        >


          {formData.skills.length === 0 && (

            <p className="text-zinc-500 text-sm">

              No skills added yet.

            </p>

          )}


          <div className="space-y-3">

            {formData.skills.map(
              (skill, index) => (

                <div
                  key={index}
                  className="flex gap-3"
                >

                  <input
                    value={skill}
                    onChange={(e) =>
                      updateSkill(
                        index,
                        e.target.value
                      )
                    }
                    className="
                      flex-1
                      bg-[#111]
                      border
                      border-zinc-700
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      focus:border-blue-500
                    "
                    placeholder="React, Java, MongoDB..."
                  />


                  <DeleteButton
                    onClick={() =>
                      removeSkill(index)
                    }
                  />

                </div>

              )
            )}

          </div>

        </Section>



        {/* =================================
            PROJECTS
        ================================= */}

        <Section
          title="Projects"
          onAdd={addProject}
        >


          {formData.projects.map(
            (project, index) => (

              <div
                key={index}
                className="
                  mt-5
                  border
                  border-zinc-700
                  p-5
                  rounded-xl
                "
              >


                <ItemHeader
                  title={`Project ${index + 1}`}
                  onDelete={() =>
                    removeProject(index)
                  }
                />


                <InputField
                  label="Project Title"
                  value={project.title}
                  onChange={(e) =>
                    updateProject(
                      index,
                      "title",
                      e.target.value
                    )
                  }
                />


                <textarea
                  value={
                    project.description
                  }
                  onChange={(e) =>
                    updateProject(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    mt-4
                    bg-[#111]
                    border
                    border-zinc-700
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:border-blue-500
                  "
                  rows="4"
                  placeholder="Project description"
                />


                <input
                  value={project.link}
                  onChange={(e) =>
                    updateProject(
                      index,
                      "link",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    mt-4
                    bg-[#111]
                    border
                    border-zinc-700
                    rounded-xl
                    px-4
                    py-3
                  "
                  placeholder="Project link"
                />


              </div>

            )
          )}

        </Section>



        {/* =================================
            INTERNSHIPS
        ================================= */}

        <Section
          title="Internships"
          onAdd={addInternship}
        >


          {formData.internships.map(
            (internship, index) => (

              <div
                key={index}
                className="
                  mt-5
                  border
                  border-zinc-700
                  p-5
                  rounded-xl
                "
              >


                <ItemHeader
                  title={`Internship ${index + 1}`}
                  onDelete={() =>
                    removeInternship(index)
                  }
                />


                <div className="
                  grid
                  md:grid-cols-3
                  gap-4
                  mt-4
                ">

                  {[
                    "company",
                    "role",
                    "duration",
                  ].map((field) => (

                    <input
                      key={field}
                      value={
                        internship[field]
                      }
                      onChange={(e) =>
                        updateInternship(
                          index,
                          field,
                          e.target.value
                        )
                      }
                      className="
                        bg-[#111]
                        border
                        border-zinc-700
                        rounded-xl
                        px-4
                        py-3
                      "
                      placeholder={field}
                    />

                  ))}

                </div>


              </div>

            )
          )}

        </Section>



        {/* =================================
            CERTIFICATIONS
        ================================= */}

        <Section
          title="Certifications"
          onAdd={addCertification}
        >


          {formData.certifications.map(
            (certification, index) => (

              <div
                key={index}
                className="
                  mt-5
                  border
                  border-zinc-700
                  p-5
                  rounded-xl
                "
              >


                <ItemHeader
                  title={`Certification ${index + 1}`}
                  onDelete={() =>
                    removeCertification(index)
                  }
                />


                <div className="
                  grid
                  md:grid-cols-2
                  gap-4
                  mt-4
                ">

                  <input
                    value={
                      certification.name
                    }
                    onChange={(e) =>
                      updateCertification(
                        index,
                        "name",
                        e.target.value
                      )
                    }
                    className="
                      bg-[#111]
                      border
                      border-zinc-700
                      rounded-xl
                      px-4
                      py-3
                    "
                    placeholder="Certificate name"
                  />


                  <input
                    value={
                      certification.issuer
                    }
                    onChange={(e) =>
                      updateCertification(
                        index,
                        "issuer",
                        e.target.value
                      )
                    }
                    className="
                      bg-[#111]
                      border
                      border-zinc-700
                      rounded-xl
                      px-4
                      py-3
                    "
                    placeholder="Issuer"
                  />

                </div>


              </div>

            )
          )}

        </Section>



        {/* =================================
            SAVE BUTTON
        ================================= */}

        <button
          type="submit"
          disabled={loading}
          className="
            flex
            items-center
            gap-2
            bg-green-600
            hover:bg-green-700
            disabled:opacity-50
            px-8
            py-3
            rounded-xl
            font-semibold
            cursor-pointer
            transition
          "
        >

          {loading ? (

            <Loader2
              className="animate-spin"
            />

          ) : (

            <Save />

          )}


          {profileExists
            ? "Update Profile"
            : "Save Profile"
          }

        </button>



      </form>


<section
className="
bg-[#171717]
p-6
rounded-2xl
border
border-zinc-800

"
>

<h2 className="text-xl font-bold mb-5 ">
 Resume
</h2>

<ResumeUpload />

</section>

    </div>

  );

}



/* =========================================
   REUSABLE SECTION
========================================= */

function Section({
  title,
  children,
  onAdd,
}) {

  return (

    <div className="
      bg-[#171717]
      p-6
      rounded-2xl
      border
      border-zinc-800
    ">


      <div className="
        flex
        justify-between
        items-center
        mb-5
      ">

        <h2 className="text-xl font-bold">

          {title}

        </h2>


        {onAdd && (

          <button
            type="button"
            onClick={onAdd}
            className="
              flex
              items-center
              gap-2
              bg-blue-600
              hover:bg-blue-700
              px-4
              py-2
              rounded-xl
              cursor-pointer
            "
          >

            <Plus size={18} />

            Add

          </button>

        )}

      </div>


      {children}

    </div>

  );

}



/* =========================================
   INPUT FIELD
========================================= */

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  min,
  max,
  step,
}) {

  return (

    <div>

      {label && (

        <label className="
          text-sm
          text-zinc-400
        ">

          {label}

        </label>

      )}


      <input
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={
          placeholder || label
        }
        min={min}
        max={max}
        step={step}
        className="
          w-full
          mt-2
          bg-[#111]
          border
          border-zinc-700
          rounded-xl
          px-4
          py-3
          outline-none
          focus:border-blue-500
        "
      />

    </div>

  );

}



/* =========================================
   ITEM HEADER
========================================= */

function ItemHeader({
  title,
  onDelete,
}) {

  return (

    <div className="
      flex
      justify-between
      items-center
    ">

      <h3 className="font-semibold">

        {title}

      </h3>


      <DeleteButton
        onClick={onDelete}
      />

    </div>

  );

}



/* =========================================
   DELETE BUTTON
========================================= */

function DeleteButton({
  onClick,
}) {

  return (

    <button
      type="button"
      onClick={onClick}
      className="
        p-2
        text-red-500
        hover:bg-red-500/10
        rounded-lg
        cursor-pointer
      "
    >

      <Trash2 size={19} />

    </button>

  );

}