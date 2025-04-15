'use client'

import Input from "@/components/InputFormulario/Input"
import Select from "@/components/InputFormulario/Select"
import Template from "@/components/template/Template"
import useAuth from "@/data/hook/useAuth"
import Image from "next/image"
import { useState } from "react"

export default function Home() {

	const { cadastrar, login } = useAuth()
	const [modo, setModo] = useState<'cadastro' | 'login'>('cadastro')
	const [, setErro] = useState<string | null>(null)

	
	const [nome, setNome] = useState('')
	const [nomeDoNegocio, setNomeDoNegocio] = useState('')
	const [telefone, setTelefone] = useState('')
	const [tamanhoDaEmpresa, setTamanhoDaEmpresa] = useState('')
	const [cidade, setCidade] = useState('')
	const [email, setEmail] = useState('')
	const [senha, setSenha] = useState('')
	
	console.log(tamanhoDaEmpresa, cidade)

	async function submeter(e?: React.MouseEvent<HTMLButtonElement>) {
		e?.preventDefault()
		if (!cadastrar) return;

		if (modo === "login") {
			if (email && senha) {
				if (!login) {
					exibirErro("O login ainda não está disponível. Tente novamente mais tarde.")
					return
				}
				try {
					// Aguarda a execução do login e trata qualquer erro
					await login(email, senha)
					console.log("Login realizado com sucesso")
				} catch (error) {
					console.error("Erro ao fazer login:", error)
					exibirErro("Ocorreu um erro no login. Verifique suas credenciais.")
				}
			} else {
				exibirErro("Preencha todos os campos!")
			}
		} else {
			if (email && senha) {
				try {
					await cadastrar(email, senha, nomeDoNegocio, telefone, tamanhoDaEmpresa, cidade, nome)
					console.log("Cadastro realizado com sucesso")
				} catch (error) {
					console.error("Erro ao cadastrar:", error)
					exibirErro("Ocorreu um erro no cadastro")
				}
			} else {
				exibirErro("Preencha todos os campos!")
			}
		}
	}

	function exibirErro(msg: string, tempoEmSegundos: number = 5) {
		console.log("Erro definido:", msg); // Verifica se o erro foi atualizado
		setErro(msg);
		setTimeout(() => setErro(null), tempoEmSegundos * 1000);
	}

	return (
		<Template>
			<div className="font-poppins p-4 flex justify-center items-center md:min-h-[50vh] lg:min-h-[75vh] xl:min-h-[78vh]">
				{
					modo === 'cadastro' ? (
						<div className="max-w-[825px] rounded-lg md:grid md:grid-cols-2 md:gap-4 md:border-2 md:p-4">
							<div className="relative w-full h-full max-w-[370px] rounded-lg overflow-hidden">
								<Image alt="Banner mini Finance" src={'/banner.png'} fill className="object-contain"></Image>
							</div>
							<form action="" className="flex flex-col w-full maw-w-[95%] p-4 border-2 gap-3 md:border-0 md:p-0">
								<Input
									id="nome"
									textoLabel="Informe seu nome completo:"
									tipo="text"
									valor={nome}
									setValor={setNome}
								/>
								<Input
									id="nomeDoNegocio"
									textoLabel="Informe o nome do seu negócio:"
									tipo="text"
									valor={nomeDoNegocio}
									setValor={setNomeDoNegocio}
								/>
								<Input
									id="telefone"
									textoLabel="Informe seu telefone:"
									tipo="text"
									valor={telefone}
									setValor={setTelefone}
								/>
								<div className="md:grid md:grid-cols-2 md:gap-2">
									<Select
										id="porteDaEmpresa"
										textoLabel="Porte da Empresa"
										options={[{texto: 'Selecione', valor: ''}, {texto: 'Micro', valor: 'micro'}, {texto: 'Pequena', valor: 'pequena'}, {texto: 'Média', valor: 'media'}, {texto: 'Grande', valor: 'grande'}]}
										valor={tamanhoDaEmpresa}
										setValor={setTamanhoDaEmpresa}
									/>
									<Select
										id="cidade"
										textoLabel="Informe a cidade:"
										options={[{texto: 'Selecione', valor: ''}, {texto: 'PR', valor: 'pr'},{texto: 'RS', valor: 'rs'}, {texto: 'SC', valor: 'sc'},]}
										valor={cidade}
										setValor={setCidade}
									/>
								</div>
								<div className="md:grid md:grid-cols-2 md:gap-2">
									<Input
										id="email"
										textoLabel="Informe seu email:"
										tipo="email"
										valor={email}
										setValor={setEmail}
									/>
									<Input
										id="senha"
										textoLabel="Escolha uma senha:"
										tipo="password"
										valor={senha}
										setValor={setSenha}
									/>
								</div>
								<button
									onClick={(e) => submeter(e)}
									className="uppercase font-bold text-2xl py-1 bg-blue-900"
									style={{ boxShadow: '0 0 2px 1	px black' }}>
									Inscreva-se
								</button>
							</form>
							<button
								onClick={() => setModo('login')}
								className="flex items-center text-2xl col-start-1 col-end-3 mt-3 justify-center"
							>
								Já é login??? Entre agora mesmo!
							</button>
						</div>
					) : (
						<div className="max-w-[370px] rounded-lg md:border-2 md:p-4">
							<form action="" className="flex flex-col w-full rounded-lg maw-w-[95%] p-4 border-2 gap-3 md:border-0 md:p-0">
								<Input
									id="email"
									textoLabel="Informe seu email:"
									tipo="email"
									valor={email}
									setValor={setEmail}
								/>
								<Input
									id="senha"
									textoLabel="Escolha uma senha:"
									tipo="password"
									valor={senha}
									setValor={setSenha}
								/>
								<button
									onClick={(e) => submeter(e)}
									className="uppercase font-bold text-2xl py-1 bg-blue-900"
									style={{ boxShadow: '0 0 2px 1	px black' }}>
									Entrar
								</button>
							</form>
							<button
								onClick={() => setModo('cadastro')}
								className="flex items-center text-2xl col-start-1 col-end-3 gap-2 mt-3"
							>
								Ainda não é login?? cadastro!
							</button>
						</div>
					)
				}
			</div>
		</Template>
	)
}
