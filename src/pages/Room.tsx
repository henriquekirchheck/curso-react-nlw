import { FormEvent, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { ShowGoogleAccount } from '../components/ShowGoogleAccount'

import '../styles/room.scss'
import { useEffect } from 'react'

type FirebaseQuestions = Record<string, {
    author: {
        nome: string;
        avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type Question = {
    id: string;
    author: {
        nome: string;
        avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

type RoomParams = {
    id: string;
}

export function Room() {
    const params = useParams<RoomParams>()
    const roomId = params.id

    const { user, signInWithGoogle } = useAuth()
    const [newQuestion, setNewQuestion] = useState('')
    const [questions, setQuestions] = useState<Question[]>([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.once('value', room => {
            const databaseRoom = room.val()
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions  ?? {}

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                }
            })

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })
    }, [roomId])

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault()

        if(newQuestion.trim() === '') {
            toast.error('Digite algo na sua pergunta')
            return
        }

        if (!user) {
            toast.error('O usuario não está logado')
            throw new Error('You must be logged in')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswerd: false,
        }

        await database.ref(`/rooms/${roomId}/questions`).push(question)

        setNewQuestion('')
    }

    return (
        <div id="page-room">
            <Toaster position="top-left"/>
            <header>
                <div className="content">
                    <img src={logoImg} alt="LetMeAsk" />
                    <RoomCode code={roomId}/> 
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && (<span>{questions.length} pergunta(s)</span>) }
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                     placeholder='O que você quer perguntar'
                     onChange={event => setNewQuestion(event.target.value)}
                     value={newQuestion}
                    />

                    <div className="form-footer">
                        { user ? (
                            <ShowGoogleAccount border={false}/>
                        ) : (
                            <span>Para enviar uma pergunta, <button onClick={signInWithGoogle}>Faça seu login</button></span>
                        )}
                        <Button type='submit' disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                {JSON.stringify(questions)}
            </main>
        </div>
    )
}