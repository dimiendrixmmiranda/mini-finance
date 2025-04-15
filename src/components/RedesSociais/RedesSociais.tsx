'use client';
import listaDeRedesSociais from "@/constants/listaDeRedesSocias"
import Link from "next/link"
import styles from './style.module.css'

export default function RedesSociais() {
    return (
        <ul className={styles.rede}>
            {
                listaDeRedesSociais.map((rede, i) => {
                    return (
                        <li key={i} className="h-[50px] w-full relative" data-nome={rede.nome}>
                            <Link href={rede.link} className="h-[25px] text-3xl absolute bottom-2 left-[50%] hover:bottom-4 hover:transition-all hover:duration-500" style={{ transform: 'translate(-50%)' }}>
                                {rede.icone}
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}