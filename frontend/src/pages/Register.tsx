
import { useForm } from "react-hook-form";


type RegisterFormData={
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    confirmPassword:string
}


const Register = () => {


 
    const {register,
        watch,
        handleSubmit,
        formState:{errors}
       }=useForm<RegisterFormData>();


const fetchFormData = async (data:RegisterFormData)=>{
    const {firstName,lastName,email,password}=data;

    const result=await fetch("http://localhost:3000/api/users/register",{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({firstName,lastName,email,password})
        
    });

}



const  handleFormData=handleSubmit ((data)=>{
     fetchFormData(data)

})



 





  return (
    <form onSubmit={handleFormData}
    className="flex flex-col gap-5">
   <h2 className="text-3xl font-bold">Create an Account</h2>

   <div className="flex flex-col md:flex-row gap-5">

    <label className="text-gray-700 text-sm font-bold flex-1">
        First Name
    <input  {...register("firstName",{required:"Thie field is required"})}
    className="border rounded w-full py-1 px-2 font-normal"/>
    {errors.firstName && (
        <span className="text-red-500">{errors.firstName.message}</span>
    )}
    </label>

    <label className="text-gray-700 text-sm font-bold flex-1">
        Last Name

    <input {...register("lastName",{required:"Thie field is required"})}

    className="border rounded w-full py-1 px-2 font-normal" />
         {errors.lastName && (
        <span className="text-red-500">{errors.lastName.message}</span>
    )}
    </label>

   </div>

   <label className="text-gray-700 text-sm font-bold flex-1">
        Email

    <input {...register("email",{required:"Thie field is required"})}

    type="email" 
    className="border rounded w-full py-1 px-2 font-normal"/>
      {errors.email && (
        <span className="text-red-500">{errors.email.message}</span>
      )}
    </label>

    <label className="text-gray-700 text-sm font-bold flex-1">
        Password

    <input {...register("password",{required:"Thie field is required",minLength:{
        value:6,
        message:"Password must be 6 or more characters"
    }})}

    type="password" 
    className="border rounded w-full py-1 px-2 font-normal"/>
      {errors.password && (
        <span className="text-red-500">{errors.password.message}</span>
      )}
    </label>
  
    <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password

   <input {...register("confirmPassword",{
         validate:(val)=>{
          if(!val){
            return "This field is required"
          }else if(watch("password")!=val){
            return "password must be same"
          }
   }})}
   type="password" 
   className="border rounded w-full py-1 px-2 font-normal" />
     {errors.confirmPassword && (
        <span className="text-red-500">{errors.confirmPassword.message}</span>
     )}
    </label>

    <span>
        <button 
        className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl ">Create Account</button>
    </span>


    </form>
  );
}

export default Register