import Footer from "./footer/Footer"
import Header from "./header/Header"

interface TemplateProps {
    children: React.ReactElement
}
export default function Template({ children }: TemplateProps) {
    return (
        <div className="bg-dark-gradient bg-[length:200%_200%] animate-gradient-x">
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}