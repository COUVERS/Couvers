export default function MainContent(props) {
    return (
        <article className="cards">
            <div className="main-image-container">
                <img
                    className="main-image"
                    src={props.img.src}
                    alt={props.img.alt}
                />
            </div>
            <div className="info-container">
                <span className="region">{props.region}</span>
                <h2 className="title">{props.title}</h2>
                <p className="info">Types: {props.type}</p>
                <p className="info">Caffeine: {props.caffeine}</p>
                <p className="text">{props.text}</p>
                <a href={props.shopLink}>Shop here</a>

            </div>

        </article>
    )
}