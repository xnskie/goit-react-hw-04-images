import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom';
import styles from './modal.module.css'

const modalRoot = document.getElementById('modal-root')

const Modal = ({ closeModal, currentImage }) => {
    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                return closeModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [closeModal])

    const handleClickOnBackdrop = e => {
        if (e.target === e.currentTarget) {
            return closeModal();
        }
    };

    return (
        createPortal(
            <div className={styles.Overlay} onClick={handleClickOnBackdrop}>
                <div className={styles.Modal}>
                    <img src={currentImage.src} alt={currentImage.title} />
                </div>
            </div>,
            modalRoot
        )
    )
}

/*
class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.closeModal);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.closeModal);
    }

    closeModal = ({ target, currentTarget, code }) => {
        if (target === currentTarget || code === 'Escape') {
            this.props.closeModal();
        }
    };

    render() {
        const { closeModal } = this;
        const {
            currentImage: { title, src },
        } = this.props;
        return (
            createPortal(
                <div className={styles.Overlay} onClick={closeModal}>
                    <div className={styles.Modal}>
                        <img src={src} alt={title} />
                    </div>
                </div>,
                modalRoot
            )
        )
    }
}
*/

export default Modal;

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
};