import Image from "next/image";

export default function Header() {
    return (
        <header className="p-2 flex items-center gap-2">
            <Image alt="Logo Mini Finance" src={'/logo-mini-finance.png'} width={45} height={45}></Image>
            <h1 className="text-4xl uppercase font-bold">Mini Finance</h1>
        </header>
    )
}