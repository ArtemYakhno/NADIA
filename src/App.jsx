import { BrowserRouter as Router, Routes, Route } from 'р';
import React from 'react';
import './App.css';
import Header from "./components/site_structure/Header.jsx";
import MainSection from "./components/site_structure/MainSection.jsx";
import SearchPage from "./components/search_module/SearchPage.jsx";
import HelpPage from "./components/help_module/HelpPage.jsx";
import Footer from "./components/site_structure/Footer.jsx";
import MyContributions from "./components/contributions_module/MyContributions.jsx";
import Authorization from "./components/authorization_module/Authorization.jsx";
import Account from "./components/account_module/Account.jsx";
import ProtectedRoute from "./components/protection/ProtectedRoute.jsx";
import MissingPerson from "./components/search_module/MissingPerson.jsx";
import MyRequests from "./components/requests_module/MyRequests.jsx";
import { CardProvider } from "./components/store/CardContext.jsx";
import ModeratorRequestSearch from "./components/moderator_module/moderator_search_module/ModeratorRequestSearch.jsx";
import ModeratorRequestHelp from "./components/moderator_module/moderator_help_module/ModeratorRequestHelp.jsx";
import Premium from "./components/premium_module/Premium.jsx";
import Transaction from "./components/transaction_module/Transaction.jsx";
import Register from "./components/register_module/Register.jsx";
import NoPage from "./components/site_structure/NoPage.jsx";
import TechnicalSupport from "./components/tech_support_module/TechnicalSupport.jsx";
import ModeratorTechnicalSupport from "./components/moderator_module/moderator_support_detail_module/ModeratorTechnicalSupport.jsx";
import SupportRequestDetail from "./components/moderator_module/moderator_support_detail_module/SupportRequestDetail.jsx";
import RequestHelpForm from "./components/requests_module/request_help_module/RequestHelpForm.jsx";
import RequestSearchForm from "./components/requests_module/request_search_module/RequestSearchForm.jsx";
import CaseHelp from "./components/help_module/CaseHelp.jsx";

const App = () => {
    return (
        <CardProvider>
            <Router>
                <div className="app-container">
                    <Header />
                    <main className="main-content">
                        <Routes>
                            <Route path="/authorization" element={<Authorization />} />
                            <Route path="/" element={<MainSection />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/search/:page" element={<SearchPage />} />
                            <Route path="/missing-person/:id" element={<MissingPerson />} />
                            <Route path="/case-help/:id" element={<CaseHelp/>} />
                            <Route path="/help/:id" element={<HelpPage />} />
                            <Route path="/request-help" element={<ProtectedRoute component={RequestHelpForm} />} />
                            <Route path="/request-search" element={<ProtectedRoute component={RequestSearchForm} />} />
                            <Route path="/my-contributions" element={<ProtectedRoute component={MyContributions} />} />
                            <Route path="/my-requests" element={<ProtectedRoute component={MyRequests} />} />
                            <Route path="/my-search-requests/:id" element={<ProtectedRoute component={RequestSearchForm} />} />
                            <Route path="/my-request-help/:id" element={<ProtectedRoute component={RequestHelpForm} />} />
                            <Route path="/moderator-request-search" element={<ProtectedRoute isModeratorPage component={ModeratorRequestSearch} />} />
                            <Route path="/moderator-request-help" element={<ProtectedRoute isModeratorPage component={ModeratorRequestHelp} />} />
                            <Route path="/premium" element={<ProtectedRoute component={Premium} />} />
                            <Route path="/transaction/:id" element={<ProtectedRoute component={Transaction} />} />
                            <Route path="/technical-support" element={<ProtectedRoute component={TechnicalSupport} />} />
                            <Route path="/moderator-technical-support" element={<ProtectedRoute isModeratorPage component={ModeratorTechnicalSupport} />} />
                            <Route path="/moderator-request/:id" element={<ProtectedRoute isModeratorPage component={SupportRequestDetail} />} />
                            <Route path='/*' element={<NoPage/>} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </CardProvider>
    );
};

export default App;
