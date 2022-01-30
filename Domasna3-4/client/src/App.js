import { useState } from 'react';
import Main from './components/Main';
import { UserContext } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
    const [user, setUser] = useState(null);
    return (
        <>
            <ToastContainer />
            <UserContext.Provider value={{ user, setUser }}>
                <Main />
            </UserContext.Provider>
        </>
    );
};

export default App;
