'use client'

import { createContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // Usando o useRouter corretamente
import { auth, db } from "@/lib/firebase"; // Importando a instância do Firebase auth
import { User, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import Cookies from 'js-cookie';
import { FirebaseError } from "firebase/app";
import Usuario from "@/interfaces/Usuario";
import { doc, setDoc } from "firebase/firestore";

interface AuthContextProps {
    usuario?: Usuario | null;
    children?: React.ReactNode;
    carregando?: boolean
    login?: (email: string, senha: string) => Promise<void>;
    cadastrar?: (
        email: string,
        senha: string,
        tipoDeLoja: string,
        nomeDoNegocio?: string,
        telefone?: string,
        tamanhoDaEmpresa?: string,
        cidade?: string,
        nome?: string
    ) => Promise<void>;
    logout?: () => Promise<void>;

}

const AuthContext = createContext<AuthContextProps>({});

async function usuarioNormalizado(usuarioFirebase: User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken();
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName || "",
        email: usuarioFirebase.email || "",
        token,
        provedor: usuarioFirebase.providerData[0]?.providerId || "",
        imagemURL: usuarioFirebase.photoURL || "",
    };
}

export function AuthProvider({ children }: AuthContextProps) {
    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const router = useRouter(); // Usando useRouter corretamente

    async function configurarSessao(usuarioFirebase: User | null) {
        if (usuarioFirebase && usuarioFirebase.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        } else {
            gerenciarCookie(false)
            setUsuario(null)
            setCarregando(false)
            return false
        }
    }

    async function logout() {
        try {
            setCarregando(true)
            await auth.signOut()
            await configurarSessao(null)
        } finally {
            setCarregando(false)
        }
    }

    async function login(email: string, senha: string) {
        try {
            setCarregando(true);

            // Tentando realizar o login
            const result = await signInWithEmailAndPassword(auth, email, senha);

            if (result.user) {
                // Login bem-sucedido, configurando a sessão
                configurarSessao(result.user);
                router.push('/home/dashboard');
                console.log("Usuário logado:", result.user);
            } else {
                // Se o usuário não for encontrado, lançamos um erro
                throw new Error("Usuário não encontrado.");
            }
        } catch (error) {
            // Caso o login falhe, atualizamos o erro
            console.error("Erro ao autenticar:", error);
            throw error;  // Relança o erro para ser capturado no `submeter`
        } finally {
            setCarregando(false); // Finaliza o carregamento
        }
    }

    async function cadastrar(
        email: string,
        senha: string,
        tipoDeLoja: string,
        nomeDoNegocio?: string,
        telefone?: string,
        tamanhoDaEmpresa?: string,
        cidade?: string,
        nome?: string
    ) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const uid = userCredential.user.uid;

            // Criar o objeto de dados a ser salvo, filtrando campos undefined
            const dados: Record<string, string> = {
                email,
                tipoDeLoja
            };

            if (nome) dados.nome = nome;
            if (telefone) dados.telefone = telefone;
            if (nomeDoNegocio) dados.nomeDoNegocio = nomeDoNegocio;
            if (tamanhoDaEmpresa) dados.tamanhoDaEmpresa = tamanhoDaEmpresa;
            if (cidade) dados.cidade = cidade;

            // Salva os dados no Firestore
            await setDoc(doc(db, "usuarios", uid), dados);

            setCarregando(true);

            // Já tem o user aqui
            configurarSessao(userCredential.user);
            router.push("/home/dashboard");
            console.log("Usuário logado:", userCredential.user);
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                if (error.code === "auth/weak-password") {
                    console.error("Erro ao cadastrar: Senha fraca.");
                    throw new Error("A senha deve ter pelo menos 6 caracteres.");
                }

                if (error.code === "auth/email-already-in-use") {
                    console.error("Erro ao cadastrar: E-mail já está em uso.");
                    throw new Error("Este e-mail já está em uso. Tente outro.");
                }

                console.error("Erro ao autenticar:", error.message);
                throw new Error("Ocorreu um erro ao tentar cadastrar. Tente novamente.");
            } else {
                console.error("Erro desconhecido:", error);
                throw new Error("Erro desconhecido durante o cadastro.");
            }
        } finally {
            setCarregando(false);
        }
    }

    function gerenciarCookie(logado: boolean) {
        if (logado) {
            Cookies.set('admin-auth', JSON.stringify(logado), {
                expires: 7
            })
        } else {
            Cookies.remove('admin-auth')
        }
    }

    // Recuperando o usuário do cookie ou localStorage na inicialização
    useEffect(() => {
        // Verificando se o cookie contém informações de autenticação
        const usuarioAuth = Cookies.get('admin-auth');
        if (usuarioAuth) {
            // Aqui você poderia adicionar a lógica para recuperar o token do Firebase
            auth.onIdTokenChanged((user) => {
                if (user) {
                    configurarSessao(user);
                } else {
                    setCarregando(false);
                }
            });
        } else {
            setCarregando(false); // Se não houver usuário no cookie, termina o carregamento
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            usuario, carregando, logout, login, cadastrar
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
