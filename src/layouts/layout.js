import { Outlet } from "react-router-dom";
import Header from "../components/commons/Header";
import Footer from "../components/commons/Footer";
import { ChatDataProvider } from "../pages/chatbot/ChatDataContext";

function Layout() {

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout;