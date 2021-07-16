import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button'
import { ShowGoogleAccount } from '../components/ShowGoogleAccount'

import '../styles/auth.scss'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'
import { Toaster } from 'react-hot-toast'

export function NewRoom() {
    const { user } = useAuth()
    const history = useHistory()

    const [newRoom, setNewRoom] = useState('')

    async function HandleCreateRoom(event: FormEvent) {
        event.preventDefault()

        if(newRoom.trim() === '') {
            return
        }

        const roomRef = database.ref('rooms')

        const firebaseRoom = roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/admin/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id='page-auth'>
            <Toaster position="top-left"/>
            <div><ShowGoogleAccount location='top-right'/></div>
            <aside>
                <img src={illustrationImg} alt="Illustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire duvidas da sua audiencia em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="LetMeAsk" />
                    <h2>Crie uma nova sala</h2>
                    <form onSubmit={HandleCreateRoom}>
                        <input 
                        type="text" 
                        placeholder='Nome da sala'
                        onChange={event => setNewRoom(event.target.value)}
                        value={newRoom}
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