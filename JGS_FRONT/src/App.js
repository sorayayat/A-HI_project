import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Recommendation from './pages/recommendation/Recommendation';
import CompanyDetails from './pages/company/CompanyDetails';

function App() {

    return (
        <>
        
        <BrowserRouter>
            <Routes>

                <Route path='/recommendation' element={<Recommendation />} />
                <Route path='/companyDetails' element={<CompanyDetails />} />

            </Routes>

        </BrowserRouter>
        
        </>    
    )
}


export default App;