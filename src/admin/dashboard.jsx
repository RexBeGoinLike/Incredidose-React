import { Header } from "@/common/header";
import { Eye, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState, useReducer } from "react";
import { DataTable } from "@/components/ui/datatable";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AddUserDialog } from "./subcomponents/adduser";
import { EditUserDialog } from "./subcomponents/edituser";

export function AdminDashboard() {
    const navigate = useNavigate();
    const [tab, setTab] = useState("doctor");
    const [originalRowData, setOriginalRowData] = useState([])
    const [rowData, setRowData] = useState([]);
    
    const handleAddUser = async (newUser) => {
        console.log("Adding user:", newUser);
        
        try {
            const path = (newUser.role == 'doctor') 
                ? `/node/admin/doctors` 
                : `/node/admin/pharmacists`;
            
            const response = await fetch(path, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
                credentials: 'include'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log("User added successfully:", result);
            
            // Refresh the data based on current tab
            switch(tab) {
                case "doctor":
                    getDoctors();
                    break;
                case "pharmacist":
                    getPharmacists();
                    break;
            }
            
        } catch (error) {
            console.error("Error adding user:", error);
            alert("Failed to add user. Please try again.");
        }
    };

    useEffect(() => {
        switch(tab){
            case "doctor":
                getDoctors();
                break;
            case "pharmacist":
                getPharmacists();
                break;
            case "patient":
                getPatients();
                break;
        }
    }, [tab]);

    function getDoctors(){
        fetch(`/node/admin/doctors`, {
            method: 'GET',
            credentials: 'include'  
        })
        .then(res => res.json())
        .then(data => {
            if (data.doctors) {
                setRowData(data.doctors);
                setOriginalRowData(data.doctors);
            }
        })
        .catch(error => console.error("Error fetching doctors:", error));
    }
    
    function getPharmacists(){
        fetch(`/node/admin/pharmacists`, {
            method: 'GET',
            credentials: 'include'  
        })
        .then(res => res.json())
        .then(data => {
            if (data.pharmacists) {
                setRowData(data.pharmacists);
                setOriginalRowData(data.pharmacists);
            }
        })
        .catch(error => console.error("Error fetching pharmacists:", error));
    }

    function getPatients(){
        fetch(`/server/includes/patient_manager.php?action=getAllPatients`)
        .then(res => res.json())
        .then(data => {
            setRowData(data);
            setOriginalRowData(data);
        })
        .catch(error => console.error("Error fetching patients:", error));
    }

    const handleEditUser = (updatedUser) => {
        console.log("Editing user:", updatedUser);
        const path = (tab == 'doctor') 
            ? `/node/admin/doctors/${updatedUser.userid}` 
            : `/node/admin/pharmacists/${updatedUser.userid}`;
        
        fetch(path, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser),
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
                // Refresh data
                switch(tab) {
                    case "doctor":
                        getDoctors();
                        break;
                    case "pharmacist":
                        getPharmacists();
                        break;
                }
            }
        })
        .catch(error => console.error("Error updating user:", error));
    };

    const doctorColDefs = [
        { 
            headerName: "Name", 
            flex: 1, 
            filter: true,
            cellRenderer: props => { 
                return props.data.firstname + " " + props.data.lastname; 
            }
        },
        { headerName: "Contact Info", field: "contactnum", flex: 1, filter: true },
        { headerName: "Email", field: "email", flex: 1, filter: true },
        { headerName: "Specialization", field: "specialization", flex: 1, filter: true },
        { 
            headerName: "Action", 
            flex: 0.5,
            cellRenderer: props => {
                return (
                    <div className="flex gap-2">
                        <EditUserDialog
                            onSave={handleEditUser}
                            userData={props.data}
                        />
                        <Button variant="ghost" onClick={() => navigate(`/admin/viewpatients/${props.data.userid}`)}><Eye /></Button>
                    </div>
                );
            }
        }
    ];

    const pharmacistColDefs = [
        { 
            headerName: "Name", 
            flex: 1, 
            filter: true,
            cellRenderer: props => { 
                return props.data.firstname + " " + props.data.lastname; 
            }
        },
        { headerName: "Contact Info", field: "contactnum", flex: 1, filter: true },
        { headerName: "Email", field: "email", flex: 1, filter: true },
        { headerName: "Specialization", field: "specialization", flex: 1, filter: true },
        { 
            headerName: "Action", 
            flex: 0.5,
            cellRenderer: props => {
                return (
                    <div className="flex gap-2">
                        <EditUserDialog
                            onSave={handleEditUser}
                            userData={props.data}
                        />
                        <Button variant="ghost" onClick={() => navigate(`/admin/viewpurchases/${props.data.userid}`)}><Eye /></Button>
                    </div>
                );
            }
        }
    ];

    const patientColDefs = [
        { 
            headerName: "Name", 
            flex: 1, 
            filter: true,
            cellRenderer: props => { 
                return props.data.firstname + " " + props.data.lastname; 
            }
        },
        { headerName: "Contact Info", field: "contactnum", flex: 1, filter: true },
        { headerName: "Email", field: "email", flex: 1, filter: true },
            { 
            headerName: "Action", 
            flex: 0.5,
            cellRenderer: props => {
                return (
                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={() => navigate(`/patient/dashboard/${props.data.userid}`)}><Eye /></Button>
                    </div>
                );
            }
        }
    ];

    return (
        <>
            <Header />
            <Tabs value={tab} onValueChange={setTab}>
                <div className="flex justify-start gap-4 items-center pt-5 pl-5 pr-10 flex-wrap">
                    <TabsList>
                        <TabsTrigger value="doctor">Doctor</TabsTrigger>
                        <TabsTrigger value="pharmacist">Pharmacist</TabsTrigger>
                        <TabsTrigger value="patient">Patient</TabsTrigger>
                    </TabsList>
                    
                    <Button 
                        variant="outline" 
                        onClick={() => navigate('/admin/logs')}
                    >
                        <FileText className="mr-2 h-4 w-4" />
                        View Logs
                    </Button>

                    {/* FIXED: Pass onSave prop correctly */}
                    <AddUserDialog onSave={handleAddUser} />
                </div>
                
                <TabsContent value="doctor">
                    <DataTable rowData={rowData} colDefs={doctorColDefs} />
                </TabsContent>
                <TabsContent value="pharmacist">
                    <DataTable rowData={rowData} colDefs={pharmacistColDefs} />
                </TabsContent>
                <TabsContent value="patient">
                    <DataTable rowData={rowData} colDefs={patientColDefs} />
                </TabsContent>
            </Tabs>
        </>
    );
}