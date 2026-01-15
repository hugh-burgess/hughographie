const Button = ({ className, onClick, id, ariaLabel, children }) => {
    return <button
        className={className}
        onClick={onClick}
        id={id}
        aria-label={ariaLabel}
    >
        {children}
    </button>
}

export default Button;