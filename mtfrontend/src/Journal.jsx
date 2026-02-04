import react from 'react';
import './LifeLesson.css'

function Journal({isOpen, onClose}) {

    if(!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Journal </h2>
                <p>Journal Content</p>
                
                <button onClick={onClose} className="close-btn">
                    Close
                </button>
            </div>
        </div>
    );
}

export default Journal;