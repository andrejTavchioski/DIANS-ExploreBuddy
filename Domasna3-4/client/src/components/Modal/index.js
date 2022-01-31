import { Wrapper } from './styles';

const Modal = ({ children, isOpen }) => {
    return isOpen ? <Wrapper>{children}</Wrapper> : null;
};

export default Modal;
