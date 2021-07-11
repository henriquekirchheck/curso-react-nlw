type ButtonProps = {
    children?: string;
    href?: string;
}

export function Button(link: ButtonProps) {
    function pressButton() {
        window.location.href = (link.href || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    }

    return(
        <button onClick={pressButton}>{link.children || 'Default'}</button>
    )
}
