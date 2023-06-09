import React from 'react'
import "./Dropdown.css";

const Dropdown = props => {
    const [visibilityAnimation, setVisibilityAnimation] = React.useState(false);
    const [repeat, setRepeat] = React.useState(null);

    React.useEffect(() => {                                 {/* ← add */}
        if (props.visibility) {
            clearTimeout(repeat);
            setRepeat(null);
            setVisibilityAnimation(true);
        } else {
            setTimeout(() => {
                setVisibilityAnimation(false);
            }, 400);
        }
    }, [props.visibility]);

    return (
        <article className={`components-dropdown ${props.visibility ? 'slide-fade-in-dropdown' : 'slide-fade-out-dropdown'}`}>
            { visibilityAnimation && props.children }       {/* ← modify */}
        </article>
    )
}

export default Dropdown