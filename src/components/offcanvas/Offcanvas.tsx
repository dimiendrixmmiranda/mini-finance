'use client'
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { GiHamburgerMenu } from 'react-icons/gi';
import Link from 'next/link';
import { MdAttachMoney, MdLogout, MdOutlineDashboard } from 'react-icons/md';
import { TiClipboard } from 'react-icons/ti';
import { SlNote } from 'react-icons/sl';
import { FaGears } from 'react-icons/fa6';
import useAuth from '@/data/hook/useAuth';

export default function Offcanvas() {
    const [visible, setVisible] = useState(false);
    const { logout } = useAuth()

    return (
        <div className="card flex justify-content-center lg:hidden">
            <Sidebar header={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.6rem', color: 'black' }}>Menu</span>
                </div>
            }
                visible={visible}
                onHide={() => setVisible(false)}>
                <div className='w-full h-full flex flex-col'>
                    <h2></h2>
                    <ul className="flex flex-col text-xl gap-2 text-black">
                        <li className="flex items-center justify-self-center rounded-md p-1 transition-all duration-300 hover:bg-[--cor-5] hover:text-white">
                            <Link href={'/home/dashboard'} className="flex items-center justify-center gap-1 font-semibold xl:text-lg">
                                <MdOutlineDashboard />
                                <p>Dashboard</p>
                            </Link>
                        </li>
                        <li className="flex items-center justify-self-center rounded-md p-1 transition-all duration-300 hover:bg-[--cor-5] hover:text-white">
                            <Link href={'/home/cadastro'} className="flex items-center justify-center gap-1 font-semibold xl:text-lg">
                                <TiClipboard />
                                <p>Cadastro</p>
                            </Link>
                        </li>
                        <li className="flex items-center justify-self-center rounded-md p-1 transition-all duration-300 hover:bg-[--cor-5] hover:text-white">
                            <Link href={'/home/transacoes'} className="flex items-center justify-center gap-1 font-semibold xl:text-lg">
                                <MdAttachMoney />
                                <p>Transações</p>
                            </Link>
                        </li>
                        <li className="flex items-center justify-self-center rounded-md p-1 transition-all duration-300 hover:bg-[--cor-5] hover:text-white">
                            <Link href={'/home/relatorios'} className="flex items-center justify-center gap-1 font-semibold xl:text-lg">
                                <SlNote />
                                <p>Relatórios</p>
                            </Link>
                        </li>
                        <li className="flex items-center justify-self-center rounded-md p-1 transition-all duration-300 hover:bg-[--cor-5] hover:text-white">
                            <Link href={'/home/configuracoes'} className="flex items-center justify-center gap-1 font-semibold xl:text-lg">
                                <FaGears />
                                <p>Configurações</p>
                            </Link>
                        </li>
                    </ul>
                    <button onClick={logout} className="mt-auto self-start text-white bg-red-600 flex items-center justify-center py-2 px-4 gap-1 text-lg uppercase font-bold rounded-md">
                        <MdLogout />
                        <p className="">Sair</p>
                    </button>
                </div>
            </Sidebar>
            <Button onClick={() => setVisible(true)} className='w-full flex justify-center items-center'>
                <GiHamburgerMenu className='text-3xl' />
            </Button>
        </div>
    )
}
