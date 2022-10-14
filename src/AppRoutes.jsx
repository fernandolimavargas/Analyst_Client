import {
    BrowserRouter as Router, 
    Route,
    Routes, 
    Navigate, 
} from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import LoginPage from "./pages/login"
import RegistrationAnalyst from "./pages/registration/analyst"
import RegistrationDatabase from "./pages/registration/database"
import RegistrationHelper from "./pages/registration/helper"
import RegistrationManager from "./pages/registration/manager"
import RegistrationTeam from "./pages/registration/team"
import ManagementAnalystPerformance from "./pages/management/analystPerformance"
import ManagementCallSearch from "./pages/management/callSearch"
import ManagementServiceReport from "./pages/management/serviceReport"
import ManagementServiceSearch from "./pages/management/serviceSearch"
import AnalystRequestAlteration from "./pages/requests/analystsPagesRequests/alteration"
import AnalystRequestCustomization from "./pages/requests/analystsPagesRequests/customization"
import AnalystRequestError from "./pages/requests/analystsPagesRequests/error"
import AnalystRequestHelp from "./pages/requests/analystsPagesRequests/help"
import AnalystRequestImport from "./pages/requests/analystsPagesRequests/import"
import AnalystRequestInternalIssue from "./pages/requests/analystsPagesRequests/internalIssue"
import AnalystRequestScript from "./pages/requests/analystsPagesRequests/script"
import AnalystRequestService from "./pages/requests/analystsPagesRequests/service"
import AnalystRequestShare from "./pages/requests/analystsPagesRequests/share"
import AnalystRequestTicket from "./pages/requests/analystsPagesRequests/ticket"
import GeneralListingAlteration from "./pages/requests/generalListings/alteration"
import GeneralListingCustomization from "./pages/requests/generalListings/customization"
import GeneralListingError from "./pages/requests/generalListings/error"
import GeneralListingHelp from "./pages/requests/generalListings/help"
import GeneralListingImport from "./pages/requests/generalListings/import"
import GeneralListingInternalIssue from "./pages/requests/generalListings/internalIssue"
import GeneralListingScript from "./pages/requests/generalListings/script"
import GeneralListingService from "./pages/requests/generalListings/service"
import GeneralListingShare from "./pages/requests/generalListings/share"
import GeneralListingTicket from "./pages/requests/generalListings/ticket"


import React, {useContext} from "react"

import { AuthContext, AuthProvider }from "./contexts/auth"


const AppRoutes = ()  => {  
    const Private = ({children}) => {  
        const { authenticated, loading } = useContext(AuthContext)

        if (loading) {
            return <div> Carregando... </div>;
        }

        if (!authenticated) {
            return <Navigate to="/" /> 
        }
        
        return children;
    };

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route 
                        path="/"
                        element={<LoginPage/>}
                    />
                    <Route 
                        path="/dashboard"
                        element={<Private>
                                    <Dashboard/>
                                </Private>}
                    />
                    <Route 
                        path="/registration/Analyst"
                        element={<Private>
                                    <RegistrationAnalyst/>
                                </Private>}
                    />
                    <Route 
                        path="/registration/Database"
                        element={<Private>
                                    <RegistrationDatabase/>
                                </Private>}
                    />
                    <Route 
                        path="/registration/Helper"
                        element={<Private>
                                    <RegistrationHelper/>
                                </Private>}
                    />
                    <Route 
                        path="/registration/Manager"
                        element={<Private>
                                    <RegistrationManager/>
                                </Private>}
                    />
                    <Route 
                        path="/registration/Team"
                        element={<Private>
                                    <RegistrationTeam/>
                                </Private>}
                    />
                    <Route 
                        path="/management/AnalystPerformance"
                        element={<Private>
                                    <ManagementAnalystPerformance/>
                                </Private>}
                    />
                    <Route 
                        path="/management/CallSearch"
                        element={<Private>
                                    <ManagementCallSearch/>
                                </Private>}
                    />
                    <Route 
                        path="/management/ServiceReport"
                        element={<Private>
                                    <ManagementServiceReport/>
                                </Private>}
                    />
                    <Route 
                        path="/management/ServiceSearch"
                        element={<Private>
                                    <ManagementServiceSearch/>
                                </Private>}
                    />
                    <Route 
                        path="/request/analyst/Alteration"
                        element={<Private>
                                    <AnalystRequestAlteration/>
                                </Private>}
                    />
                    <Route 
                        path="/request/analyst/Customization"
                        element={<Private>
                                    <AnalystRequestCustomization/>
                                </Private>}
                    />
                    <Route 
                        path="/request/analyst/Error"
                        element={<Private>
                                    <AnalystRequestError/>
                                </Private>}
                    />
                    <Route 
                        path="/request/analyst/Help"
                        element={<Private>
                                    <AnalystRequestHelp/>
                                </Private>}
                    />
                    <Route 
                        path="/request/analyst/Import"
                        element={<Private>
                                    <AnalystRequestImport/>
                                </Private>}
                    />
                    <Route 
                        path="/request/analyst/InternalIssue"
                        element={<Private>
                                    <AnalystRequestInternalIssue/>
                                </Private>}
                    />
                    <Route 
                        path="/request/analyst/Script"
                        element={<Private>
                                    <AnalystRequestScript/>
                                </Private>}
                    />
                    <Route 
                        path="/request/analyst/Service"
                        element={<Private>
                                    <AnalystRequestService/>
                                </Private>}
                    />
                    <Route 
                        path="/request/analyst/Share"
                        element={<Private>
                                    <AnalystRequestShare/>
                                </Private>}
                    />
                    <Route 
                        path="/request/analyst/Ticket"
                        element={<Private>
                                    <AnalystRequestTicket/>
                                </Private>}
                    />
                    <Route 
                        path="/request/listing/Alteration"
                        element={<Private>
                                    <GeneralListingAlteration/>
                                </Private>}
                    />
                    <Route 
                        path="/request/listing/Customization"
                        element={<Private>
                                    <GeneralListingCustomization/>
                                </Private>}
                    />
                    <Route 
                        path="/request/listing/Error"
                        element={<Private>
                                    <GeneralListingError/>
                                </Private>}
                    />
                    <Route 
                        path="/request/listing/Help"
                        element={<Private>
                                    <GeneralListingHelp/>
                                </Private>}
                    />
                    <Route 
                        path="/request/listing/Import"
                        element={<Private>
                                    <GeneralListingImport/>
                                </Private>}
                    />
                    <Route 
                        path="/request/listing/InternalIssue"
                        element={<Private>
                                    <GeneralListingInternalIssue/>
                                </Private>}
                    />
                    <Route 
                        path="/request/listing/Script"
                        element={<Private>
                                    <GeneralListingScript/>
                                </Private>}
                    />
                    <Route 
                        path="/request/listing/Service"
                        element={<Private>
                                    <GeneralListingService/>
                                </Private>}
                    />
                    <Route 
                        path="/request/listing/Share"
                        element={<Private>
                                    <GeneralListingShare/>
                                </Private>}
                    />
                    <Route 
                        path="/request/listing/Ticket"
                        element={<Private>
                                    <GeneralListingTicket/>
                                </Private>}
                    />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes;