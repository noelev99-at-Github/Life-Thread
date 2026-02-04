import react from 'react';
import './LifeLesson.css'

function LifeLesson({isOpen, onClose}) {

    if(!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Life Lesson </h2>
                <p>Life Lesson Content</p>
                
                <button onClick={onClose} className="close-btn">
                    Close
                </button>
            </div>
        </div>
    );
}

export default LifeLesson;