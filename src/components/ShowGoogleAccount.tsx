import { useAuth } from '../hooks/useAuth'

import '../styles/showGoogleAccount.scss'

export function ShowGoogleAccount() {
    const { user } = useAuth() 
    let responce

    if(user) {
        responce = (
            <div className='show-account'>
                <p>{user.name}</p>
                <button>
                    <img src={user.avatar} alt="" />
                </button>
            </div>
        )
    } else {
        responce = (
            <div></div>
        )
    }

    return responce
}