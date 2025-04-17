'use client'
import useAuth from "@/data/hook/useAuth";
import Image from "next/image";
import Link from "next/link";
import { FaGears } from "react-icons/fa6";
import { MdAttachMoney, MdLogout, MdOutlineDashboard } from "react-icons/md";
import { SlNote } from "react-icons/sl";
import { TiClipboard } from "react-icons/ti";

export default function Header() {
    const { logout, usuario } = useAuth()

    return (
        <header className="p-2 flex items-center gap-2">
            <Image alt="Logo Mini Finance" src={'/logo-mini-finance.png'} width={45} height={45}></Image>
            <h1 className="text-4xl uppercase font-bold"></h1>
            {
                usuario?.uid ? (
                    <ul className="hidden grid-cols-5 mx-auto lg:grid">
                        <li>
                            <Link href={'/home/dashboard'} className="flex items-center gap-1 font-semibold">
                                <MdOutlineDashboard />
                                <p>Dashboard</p>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/home/cadastro'} className="flex items-center gap-1 font-semibold">
                                <TiClipboard />
                                <p>Cadastro</p>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'} className="flex items-center gap-1 font-semibold">
                                <MdAttachMoney />
                                <p>Transações</p>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'} className="flex items-center gap-1 font-semibold">
                                <SlNote />
                                <p>Relatórios</p>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'} className="flex items-center gap-1 font-semibold">
                                <FaGears />
                                <p>Configurações</p>
                            </Link>
                        </li>
                    </ul>
                ) : ''
            }
            {
                usuario?.uid ? (
                    <button onClick={logout} className="hidden items-center gap-1 font-semibold ml-auto mr-4 bg-red-600 px-2 py-1 rounded-md lg:flex">
                        <MdLogout />
                        Sair
                    </button>
                ) : ''
            }
        </header>
    )
}