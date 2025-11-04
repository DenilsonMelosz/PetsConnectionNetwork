// "use client"

// import type React from "react"

// import { useState } from "react"
// import axios from "axios"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Brain, User, Mail, Phone, Lock } from "lucide-react"

// axios.defaults.withCredentials = true

// export function SignupForm() {
//   const [nomeCompleto, setNomeCompleto] = useState("")
//   const [telefone, setTelefone] = useState("")
//   const [email, setEmail] = useState("")
//   const [senha, setSenha] = useState("")
//   const [erro, setErro] = useState("")
//   const [sucesso, setSucesso] = useState("")
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setErro("")
//     setSucesso("")

//     if (!nomeCompleto.trim() || !telefone.trim() || !email.trim() || !senha.trim()) {
//       setErro("Todos os campos são obrigatórios")
//       return
//     }

//     setLoading(true)
//     try {
//       await axios.post("http://localhost:8080/api/auth/register", {
//         nomeCompleto,
//         telefone,
//         email,
//         senha,
//       })

//       setSucesso("Usuário registrado com sucesso!")
//       setNomeCompleto("")
//       setTelefone("")
//       setEmail("")
//       setSenha("")
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err) && err.response?.data?.error) {
//         setErro(err.response.data.error)
//       } else {
//         setErro("Erro ao conectar com o servidor")
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Card className="w-full max-w-md shadow-lg border-blue-100 my-8">
//       <CardHeader className="space-y-1">
//         <div className="flex items-center justify-center mb-2">
//           <Brain className="h-10 w-10 text-blue-600" />
//         </div>
//         <CardTitle className="text-2xl text-center font-bold text-blue-800">Criar conta</CardTitle>
//         <CardDescription className="text-center text-blue-600">
//           Cadastre-se para começar a agendar suas consultas
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="nomeCompleto" className="text-blue-700 flex items-center gap-2">
//               <User className="h-4 w-4" />
//               Nome Completo
//             </Label>
//             <Input
//               id="nomeCompleto"
//               value={nomeCompleto}
//               onChange={(e) => setNomeCompleto(e.target.value)}
//               placeholder="Nome completo"
//               required
//               className="border-blue-200 focus:border-blue-400"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="telefone" className="text-blue-700 flex items-center gap-2">
//               <Phone className="h-4 w-4" />
//               Telefone
//             </Label>
//             <Input
//               id="telefone"
//               value={telefone}
//               onChange={(e) => setTelefone(e.target.value)}
//               placeholder="Telefone"
//               required
//               className="border-blue-200 focus:border-blue-400"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="email" className="text-blue-700 flex items-center gap-2">
//               <Mail className="h-4 w-4" />
//               Email
//             </Label>
//             <Input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               required
//               className="border-blue-200 focus:border-blue-400"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="senha" className="text-blue-700 flex items-center gap-2">
//               <Lock className="h-4 w-4" />
//               Senha
//             </Label>
//             <Input
//               id="senha"
//               type="password"
//               value={senha}
//               onChange={(e) => setSenha(e.target.value)}
//               placeholder="Senha"
//               required
//               className="border-blue-200 focus:border-blue-400"
//             />
//           </div>

//           {erro && <p className="text-red-600 text-sm">{erro}</p>}
//           {sucesso && <p className="text-green-600 text-sm">{sucesso}</p>}

//           <Button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
//           >
//             {loading ? "Cadastrando..." : "Cadastrar"}
//           </Button>
//         </form>
//       </CardContent>
//       <CardFooter className="flex flex-col space-y-2">
//         <div className="text-center text-sm text-blue-600">
//           Já tem uma conta?{" "}
//           <a href="/" className="underline text-blue-700 hover:text-blue-900">
//             Fazer login
//           </a>
//         </div>
//       </CardFooter>
//     </Card>
//   )
// }
