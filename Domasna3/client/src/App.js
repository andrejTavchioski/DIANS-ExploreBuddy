import { useState } from 'react';
import Main from './components/Main';
import { UserContext } from './context/UserContext';

const App = () => {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Main />
        </UserContext.Provider>
    );
};

export default App;
