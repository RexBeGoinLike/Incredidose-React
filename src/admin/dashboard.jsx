import { Header } from "@/common/header";
import { FileText, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { DataTable } from "@/components/ui/datatable";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, Plus, Pencil } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AddUserDialog } from "./subcomponents/adduser";
import { EditUserDialog } from "./subcomponents/edituser";
import { ViewLogs } from "./viewlogs";

export function AdminDashboard() {
    const navigate = useNavigate();
    const [originalRowData, setOriginalRowData] = useState([
        {
            userid: 1,
            firstname: "Marianne",
            lastname: "Dela Cruz",
            contactnum: "09172345890",
            email: "marianne.delacruz@example.com",
            password: "password123",
            birthdate: "1998-04-12",
            createdat: "2025-01-03 10:30:00",
            role: "patient",
            gender: "Female",
            specialization: "",
            licenseNumber: "",
            affiliation: ""
        },
        {
            userid: 2,
            firstname: "Jerome",
            lastname: "Bautista",
            contactnum: "09981234567",
            email: "jerome.bautista@example.com",
            password: "mypassword456",
            birthdate: "1995-09-28",
            createdat: "2025-01-05 14:12:00",
            role: "patient",
            gender: "Male",
            specialization: "",
            licenseNumber: "",
            affiliation: ""
        },
        {
            userid: 3,
            firstname: "Dr. Maria",
            lastname: "Santos",
            contactnum: "09178887777",
            email: "maria.santos@example.com",
            password: "doctorpass789",
            birthdate: "1985-03-15",
            createdat: "2025-01-10 09:45:00",
            role: "doctor",
            gender: "Female",
            specialization: "Cardiology",
            licenseNumber: "PRC-987654",
            affiliation: "St. Luke's Medical Center"
        }
    ]);

    const [rowData, setRowData] = useState(originalRowData);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddUser = (newUser) => {
        
        setRowData(prev => [...prev, newUser]);
        setOriginalRowData(prev => [...prev, newUser]);
           
        setIsDialogOpen(false);
    };

    const handleEditUser = (updatedUser) => {
        setRowData(prev => prev.map(user => 
            user.userid === updatedUser.userid ? updatedUser : user
        ));
        setOriginalRowData(prev => prev.map(user => 
            user.userid === updatedUser.userid ? updatedUser : user
        ));
    };

    const [doctorColDefs, setDoctorColDefs] = useState(
        [
            { 
                headerName: "Name", 
                flex: 1, 
                filter: true,
                cellRenderer: props => { return props.data.firstname + " " + props.data.lastname; }
            },
            { headerName: "Contact Info", field: "contactnum", flex: 1, filter: true  },
            { headerName: "Email", field: "email", flex: 1, filter: true },
            { headerName: "User Role", field: "role", flex: 1, filter: true},
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
                        </div>
                    );
                }
            }
        ]
    );

    const [patientColDefs, setPatientColDefs] = useState(
        [
            { 
                headerName: "Name", 
                flex: 1, 
                filter: true,
                cellRenderer: props => { return props.data.firstname + " " + props.data.lastname; }
            },
            { headerName: "Contact Info", field: "contactnum", flex: 1, filter: true  },
            { headerName: "Email", field: "email", flex: 1, filter: true },
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
                        </div>
                    );
                }
            }
        ]
    );

    return (
        <>
            <Header />
            <Tabs defaultValue="doctor">

                <div className="flex justify-start gap-4 items-center pt-5 pl-10 pr-10">
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

                    <AddUserDialog
                        isOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        onSubmit={handleAddUser}
                        existingUsers={rowData}
                    />
                </div>
                
                <TabsContent value="doctor">
                    <DataTable rowData={rowData.filter(user => user.role === "doctor")} colDefs={doctorColDefs} />
                </TabsContent>
                <TabsContent value="pharmacist">
                    <DataTable rowData={rowData.filter(user => user.role === "pharmacist")} colDefs={doctorColDefs} />
                </TabsContent>
                <TabsContent value="patient">
                    <DataTable rowData={rowData.filter(user => user.role === "ptnt")} colDefs={doctorColDefs} />
                </TabsContent>
            </Tabs>
        </>
    );
}