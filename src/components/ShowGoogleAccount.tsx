import { useAuth } from '../hooks/useAuth'

import '../styles/showGoogleAccount.scss'

type ShowGoogleAccountProps = {
    location?: string;
    border?: boolean;
}

export function ShowGoogleAccount(props:ShowGoogleAccountProps) {
    const { user } = useAuth() 
    let location
    let border

    if(props.location === 'top-left' || props.location === 'top-right' || props.location === 'bottom-left' || props.location === 'bottom-right') {
        location = props.location
    } else if(props.location === undefined) {
        location = 'free'
    }

    if(props.border === undefined) {
        border = 'show-account-border'
    } else if(props.border === true){
        border = 'show-account-border'
    } else {
        border = 'show-account'
    }

    if(user) {
        return (
            <div id={location} className={border}>
                <p>{user.name}</p>
                <button type='button'>
                    <img src={user.avatar} alt="avatar" />
                </button>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}