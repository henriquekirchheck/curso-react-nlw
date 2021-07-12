import { Link } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button'
import { ShowGoogleAccount } from '../components/ShowGoogleAccount'

import '../styles/auth.scss'
// import { useAuth } from '../hooks/useAuth'

// webpack (Snowpack, vite)

export function NewRoom() {
    // const { user } = useAuth()

    return (
        <div id='page-auth'>
            <div><ShowGoogleAccount/></div>
            <aside>
                <img src={illustrationImg} alt="Illustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire duvidas da sua audiencia em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="LetMeAsk" />
                    <h2>Crie uma nova sala</h2>
                    <form>
                        <input 
                        type="text" 
                        placeholder='Nome da sala'
                        />
                        <Button type='submit'>
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to='/'>Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}