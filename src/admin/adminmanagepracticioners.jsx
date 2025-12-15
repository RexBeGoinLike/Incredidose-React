import { Header } from "@/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { DataTable } from "@/components/ui/datatable";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AddUserDialog } from "./subcomponents/adduser";

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
            gender: "Female"
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
            gender: "Male"
        }
    ]);

    const [rowData, setRowData] = useState(originalRowData);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddUser = (newUser) => {
        // Add to row data
        setRowData(prev => [...prev, newUser]);
        setOriginalRowData(prev => [...prev, newUser]);
        
        // Close dialog
        setIsDialogOpen(false);
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
            { headerName: "User Role", field: "role", flex: 1, filter: true}
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
                flex: 0.25,
                cellRenderer: props => {
                    return (
                        <Button variant="ghost" onClick={() => navigate('/pharmacist/viewprescriptions')}>
                            <Eye />
                        </Button>
                    );
                }
            }
        ]
    );

    return (
        <>
            <Header />
            <Tabs defaultValue="patient">
                <div className="flex justify-between items-center mb-4">
                    <TabsList>
                        <TabsTrigger value="patient">Patient</TabsTrigger>
                        <TabsTrigger value="doctor">Doctor</TabsTrigger>
                    </TabsList>
                    
                    {/* Add User Button and Dialog */}
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add User
                            </Button>
                        </DialogTrigger>
                        <AddUserDialog
                            isOpen={isDialogOpen}
                            onClose={() => setIsDialogOpen(false)}
                            onSubmit={handleAddUser}
                            existingUsers={rowData}
                        />
                    </Dialog>
                </div>
                
                <TabsContent value="patient">
                    <DataTable rowData={rowData} colDefs={patientColDefs} />
                </TabsContent>
                <TabsContent value="doctor">
                    <DataTable rowData={rowData} colDefs={doctorColDefs} />
                </TabsContent>
            </Tabs>
        </>
    );
}