export default function Card({ class: className, style, children }) {
    return (
        <div
            className={`relative h-full rounded-lg dark:bg-muted-900 transition-all duration-300 ${className ?? ''}`}
            style={style}
        >
            {children}
        </div>
    );
}
