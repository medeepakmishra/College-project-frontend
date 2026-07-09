import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Loader2,
  BriefcaseBusiness,
  CheckCircle,
  Clock,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

import { getDrives } from "../../services/drive.service";

export default function Drives() {

    const [drives,setDrives]=useState([]);

    const [loading,setLoading]=useState(true);

    const [search,setSearch]=useState("");

    useEffect(()=>{

        fetchDrives();

    },[]);


    const fetchDrives=async()=>{

        try{

            const res=await getDrives();

            setDrives(res.data.drives || []);

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    };


    const filteredDrives=useMemo(()=>{

        return drives.filter((drive)=>{

            return drive.title
            .toLowerCase()
            .includes(search.toLowerCase());

        });

    },[drives,search]);


    return(

<div className="min-h-screen bg-[#090909] text-white">

<div className="max-w-7xl mx-auto px-8 py-10">

<Link
to="/"
className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-500 mb-8"
>

<ArrowLeft size={18}/>

Back Home

</Link>


<h1 className="text-6xl font-black">

Placement Drives

</h1>

<p className="text-gray-400 mt-4">

Discover all ongoing placement drives.

</p>


<div className="relative mt-10">

<Search
size={20}
className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
/>

<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search drive..."

className="w-full bg-[#111] border border-zinc-700 rounded-xl py-4 pl-12 outline-none focus:border-blue-500"

/>

</div>



{
loading ?

<div className="flex justify-center py-20">

<Loader2
className="animate-spin text-blue-500"
size={45}
/>

</div>

:

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

{

filteredDrives.map((drive)=>(

<div

key={drive._id}

className="bg-[#111111] border border-zinc-800 rounded-2xl p-7 hover:border-blue-500 transition"

>

<div className="flex justify-between items-center">

<div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center">

<BriefcaseBusiness
className="text-blue-500"
/>

</div>


{

drive.status==="Open"

?

<span className="flex items-center gap-2 text-green-500">

<CheckCircle size={18}/>

Open

</span>

:

<span className="flex items-center gap-2 text-yellow-500">

<Clock size={18}/>

Closed

</span>

}

</div>


<h2 className="text-2xl font-bold mt-6">

{drive.title}

</h2>


<p className="text-gray-500 mt-3">

Status :
<span className="text-white ml-2">

{drive.status}

</span>

</p>


<div className="flex gap-3 mt-8">

<Link

to="/login"

className="flex-1 bg-blue-600 hover:bg-blue-700 text-center py-3 rounded-xl"

>

Login to Apply

</Link>


<Link

to={`/drives/${drive._id}`}

className="flex items-center justify-center border border-zinc-700 hover:border-blue-500 rounded-xl px-5"

>

<ArrowRight size={18}/>

</Link>

</div>

</div>

))

}

</div>

}

</div>

</div>

);

}