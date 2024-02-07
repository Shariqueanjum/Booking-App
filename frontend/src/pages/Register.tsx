import { useState } from "react";


type RegisterFormData={
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    confirmPassword:string
}


const Register = () => {

    const [formData,setFormData]=useState<RegisterFormData>({
         firstName:"",
         lastName:"",
         email:"",
         password:"",
         confirmPassword:""
    });
 



    const handleInputChange=((e:React.ChangeEvent<HTMLInputElement>,field:keyof RegisterFormData)=>{
        const value=e.target.value;
       
        setFormData((prevData)=>{
           return {...prevData,[field]:value}
        })

    })





    const handleForm=async()=>{
        const {firstName,lastName,email,password}=formData;
        if(formData.confirmPassword!==formData.password)return(alert("Password and Confirm Password must be same"))

      const result=await fetch("http://localhost:3000/api/users/register",{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({firstName,lastName,email,password})
        
    });

    const data=await result.json();
    if(result.ok){


    console.log(data);

 
    setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
   
    }else{
        alert(data.msg[0].msg)
    }
     
    }





  return (
    <form onSubmit={(e)=>e.preventDefault()}
    className="flex flex-col gap-5">
   <h2 className="text-3xl font-bold">Create an Account</h2>

   <div className="flex flex-col md:flex-row gap-5">

    <label className="text-gray-700 text-sm font-bold flex-1">
        First Name
    <input onChange={(e)=>handleInputChange(e,"firstName")}
     value={formData.firstName}
    className="border rounded w-full py-1 px-2 font-normal"/>

    </label>

    <label className="text-gray-700 text-sm font-bold flex-1">
        Last Name

    <input onChange={(e)=>handleInputChange(e,"lastName")}
     value={formData.lastName}
    className="border rounded w-full py-1 px-2 font-normal" />

    </label>

   </div>

   <label className="text-gray-700 text-sm font-bold flex-1">
        Email

    <input onChange={(e)=>handleInputChange(e,"email")}
    value={formData.email}
    type="email" 
    className="border rounded w-full py-1 px-2 font-normal"/>

    </label>

    <label className="text-gray-700 text-sm font-bold flex-1">
        Password

    <input onChange={(e)=>handleInputChange(e,"password")}
    value={formData.password}
    type="password" 
    className="border rounded w-full py-1 px-2 font-normal"/>

    </label>
  
    <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password

   <input onChange={(e)=>handleInputChange(e,"confirmPassword")}
   value={formData.confirmPassword}
   type="password" 
   className="border rounded w-full py-1 px-2 font-normal" />

    </label>

    <span>
        <button onClick={handleForm}
        className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl ">Create Account</button>
    </span>


    </form>
  );
}

export default Register