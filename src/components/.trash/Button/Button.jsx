import './Button.scss'

export const Button = ({ children, onClick, type, className }) => {
    return (
        <div className="button-container">
            <button type={type} className={className ? "neon" : className + " neon"} onClick={onClick} >
                {children}
            </button>
        </div>
    );
}
