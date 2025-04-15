import RedeSocial from "@/interfaces/RedeSocial";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookSquare, FaGithub } from "react-icons/fa";
import { IoLogoTiktok, IoLogoWhatsapp } from "react-icons/io5";

const listaDeRedesSociais: RedeSocial[] = [
    {
        nome: 'Instagram',
        link: 'https://www.instagram.com/eudimimartins/',
        icone: <AiFillInstagram/>
    },
    {
        nome: 'Facebook',
        link: 'https://www.facebook.com/dimi.martins.376',
        icone: <FaFacebookSquare/>
    },
    {
        nome: 'TikTok',
        link: 'https://www.tiktok.com/@dimi.martins5?is_from_webapp=1&sender_device=pc',
        icone: <IoLogoTiktok/>
    },
    {
        nome: 'WhatsApp',
        link: 'https://wa.me/5543988252886',
        icone: <IoLogoWhatsapp/>
    },
    {
        nome: 'GitHub',
        link: 'https://github.com/dimiendrixmmiranda/dimiendrixmmiranda',
        icone: <FaGithub />
    },
]

export default listaDeRedesSociais