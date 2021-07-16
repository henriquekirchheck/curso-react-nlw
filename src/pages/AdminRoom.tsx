// import toast, { Toaster } from 'react-hot-toast'
import { useHistory, useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import '../styles/room.scss'
import { Questions } from '../components/Questions'

import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'



type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const params = useParams<RoomParams>()
    const roomId = params.id

    const history = useHistory()
    // const { user } = useAuth()
    const { questions, title } = useRoom(roomId)

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/')
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Você tem certeza que deseja excluir essa pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }
    
    return (
        <div id="page-room">
            {/* <Toaster position="top-left"/> */}
            <header>
                <div className="content">
                    <img src={logoImg} alt="LetMeAsk" />
                    <div>
                        <RoomCode code={roomId}/> 
                        <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && (<span>{questions.length} pergunta(s)</span>) }
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Questions 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >
                                <button
                                type='button'
                                onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Questions>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}