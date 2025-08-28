export default function Card({ class: className, style, children }) {
    return (
        <div
            className={`relative h-full rounded-lg transition-all duration-300 ${className ?? ''}`}
            style={style}
        >
            {children}
        </div>
    );
}
