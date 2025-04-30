'use client'
import Offcanvas from "@/components/offcanvas/Offcanvas";
import useAuth from "@/data/hook/useAuth";
import Image from "next/image";
import Link from "next/link";
import { FaGears } from "react-icons/fa6";
import { MdAttachMoney, MdLogout, MdOutlineDashboard } from "react-icons/md";
import { SlNote } from "react-icons/sl";
import { TiClipboard } from "react-icons/ti";
import styles from './style.module.css'

export default function Header() {
    const { logout, usuario } = useAuth()

    return (
        <header className={styles.cabecalho}>
            <Link href={usuario?.uid ? '/home/dashboard' : '/'} className="flex h-[50px] items-center w-full max-w-[330px]">
                <div className="relative w-full max-w-[40px] h-[40px] sm:max-w-[50px] sm:h-[50px]">
                    <Image alt="Logo Mini Finance" src={'/logo-mini-finance.png'} fill className="object-cover"></Image>
                </div>
                <div className="relative w-full max-w-[290px] h-[40px] sm:h-[50px]">
                    <Image alt="Texto Mini Finance" src={'/texto-mini-finance.png'} fill className="object-cover"></Image>
                </div>
            </Link>
            {
                usuario?.uid ? (
                    <Offcanvas />
                ) : ''
            }

            {
                usuario?.uid ? (
                    <ul className="hidden grid-cols-5 mx-auto lg:grid lg:mx-0 lg:mr-auto lg:ml-4">
                        <li className="flex items-center justify-self-center rounded-md p-1 transition-all duration-300 hover:bg-[--cor-5]">
                            <Link href={'/home/dashboard'} className="flex items-center justify-center gap-1 font-semibold xl:text-lg">
                                <MdOutlineDashboard />
                                <p>Dashboard</p>
                            </Link>
                        </li>
                        <li className="flex items-center justify-self-center rounded-md p-1 transition-all duration-300 hover:bg-[--cor-5]">
                            <Link href={'/home/cadastro'} className="flex items-center justify-center gap-1 font-semibold xl:text-lg">
                                <TiClipboard />
                                <p>Cadastro</p>
                            </Link>
                        </li>
                        <li className="flex items-center justify-self-center rounded-md p-1 transition-all duration-300 hover:bg-[--cor-5]">
                            <Link href={'/home/transacoes'} className="flex items-center justify-center gap-1 font-semibold xl:text-lg">
                                <MdAttachMoney />
                                <p>Transações</p>
                            </Link>
                        </li>
                        <li className="flex items-center justify-self-center rounded-md p-1 transition-all duration-300 hover:bg-[--cor-5]">
                            <Link href={'/home/relatorios'} className="flex items-center justify-center gap-1 font-semibold xl:text-lg">
                                <SlNote />
                                <p>Relatórios</p>
                            </Link>
                        </li>
                        <li className="flex items-center justify-self-center rounded-md p-1 transition-all duration-300 hover:bg-[--cor-5]">
                            <Link href={'/home/configuracoes'} className="flex items-center justify-center gap-1 font-semibold xl:text-lg">
                                <FaGears />
                                <p>Configurações</p>
                            </Link>
                        </li>
                    </ul>
                ) : ''
            }

            {
                usuario?.uid ? (
                    <button onClick={logout} className="hidden items-center justify-center p-2 gap-1 text-lg uppercase font-bold rounded-md transition-all duration-300 lg:flex hover:bg-red-500">
                        <MdLogout />
                        <p className="hidden xl:block">Sair</p>
                    </button>
                ) : ''
            }
        </header>
    )
}