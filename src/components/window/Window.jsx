

export default function Window({title, children}){
    return (
        <div className="container">
            <h2>{title}</h2>
            {children}
        </div>
    );
}