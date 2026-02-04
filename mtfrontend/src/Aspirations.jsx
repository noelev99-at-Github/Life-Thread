import react from 'react';
import './LifeLesson.css'

function Aspirations({isOpen, onClose}) {

    if(!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Aspirations </h2>
                <p>Aspirations Content</p>
                
                <button onClick={onClose} className="close-btn">
                    Close
                </button>
            </div>
        </div>
    );
}

export default Aspirations;