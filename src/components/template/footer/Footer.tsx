import RedesSociais from "@/components/RedesSociais/RedesSociais";

export default function Footer() {
    return (
        <footer>
            <div className="mt-auto bg-black p-3 text-center lg:text-xl">
                <p>Projeto desenvolvido por <b>Dimi Endrix Martins Miranda</b> como parte da avaliação da disciplina <b>Administração e Economia para Engenheiros</b>.</p>
                <RedesSociais />
            </div>
        </footer>
    )
}