import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import { Button } from '../components/Button'
import { ShowGoogleAccount } from '../components/ShowGoogleAccount'

import '../styles/auth.scss'
import { database } from '../services/firebase'
import toast, { Toaster } from 'react-hot-toast'

export function Home() {
    const history = useHistory()
    const { user, signInWithGoogle } = useAuth()
    const [roomCode, setRoomCode] = useState('')
    
    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }
        history.push('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()

        if(roomCode.trim() === '') {
            return
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if(!roomRef.exists()) {
            toast('Essa sala não existe!', {
                icon: '⚠️',
            })
            return
        }

        if(roomRef.val().endedAt) {
            toast('Essa sala já foi encerada!', {
                icon: '⚠️',
            })
            return
        }

        history.push(`/rooms/${roomCode}`)
    }

    return (
        <div id='page-auth'>
            <Toaster position="top-left"/>
            <aside>
                <img src={illustrationImg} alt="Illustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire duvidas da sua audiencia em tempo real</p>
            </aside>
            <main>
                <ShowGoogleAccount location='top-right'/>
                <div className="main-content">
                    <img src={logoImg} alt="LetMeAsk" />
                    <button onClick={handleCreateRoom} className='create-room'>
                        <img src={googleIconImg} alt="Google" />
                        Crie Sua sala com o Google
                    </button>
                    <div className='separator'>ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                        type="text" 
                        placeholder='Digite o codigo da sala'
                        onChange={event => setRoomCode(event.target.value)}
                        value={roomCode}
                        />
                        <Button type='submit'>
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}