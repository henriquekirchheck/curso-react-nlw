import { useAuth } from '../hooks/useAuth'

import '../styles/showGoogleAccount.scss'

type ShowGoogleAccountProps = {
    location?: string;
    border?: boolean;
}

export function ShowGoogleAccount({location='free', border=false}:ShowGoogleAccountProps) {
    const { user } = useAuth() 
    let locationButton
    let borderButton

    if(location === 'top-left' || location === 'top-right' || location === 'bottom-left' || location === 'bottom-right') {
        locationButton = location
    } else if(location === undefined) {
        locationButton = 'free'
    }

    if(border === undefined) {
        borderButton = 'show-account-border'
    } else if(border === true){
        borderButton = 'show-account-border'
    } else {
        borderButton = 'show-account'
    }

    if(user) {
        return (
            <div id={locationButton} className={borderButton}>
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