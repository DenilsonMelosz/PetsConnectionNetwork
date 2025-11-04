// "use client"

// import { SignupForm } from "@/components/signup-form"
// import { useEffect } from "react"
// import { Brain } from "lucide-react"

// export function SignupPage() {
//   useEffect(() => {
//     const rootElement = document.getElementById("root")
//     if (rootElement) {
//       rootElement.style.maxWidth = "100%"
//       rootElement.style.padding = "0"

//       return () => {
//         rootElement.style.maxWidth = "1280px"
//         rootElement.style.padding = "2rem"
//       }
//     }
//   }, [])

//   return (
//     <div className="flex flex-col md:flex-row h-screen w-full">
//       <div className="hidden md:flex md:w-1/2 items-center justify-center bg-blue-800">
//         <div className="text-center w-11/12 lg:w-3/4 px-4">
//           <img
//             src="/placeholder.svg?height=300&width=400"
//             alt="Psychology appointment illustration"
//             className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
//           />
//           <h2 className="text-white text-xl sm:text-2xl mt-6 font-semibold">MindCare Connect</h2>
//           <p className="text-blue-100 mt-2">Begin your wellness journey with us</p>
//         </div>
//       </div>

//       <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-blue-50 p-4 sm:p-6 py-8 md:py-12 overflow-y-auto min-h-screen md:min-h-0">
//         <div className="md:hidden flex flex-col items-center mb-6">
//           <Brain className="h-10 w-10 text-blue-600" />
//           <h2 className="text-blue-800 text-xl font-semibold mt-2">MindCare Connect</h2>
//         </div>
//         <SignupForm />
//       </div>
//     </div>
//   )
// }
