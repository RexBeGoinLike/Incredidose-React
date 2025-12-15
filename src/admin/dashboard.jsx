import { Header } from "@/common/header";
import { FileText, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
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
    const [originalRowData, setOriginalRowData] = useState([])
     
    const [rowData, setRowData] = useState(originalRowData);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddUser = (newUser) => {
        
        setRowData(prev => [...prev, newUser]);
        setOriginalRowData(prev => [...prev, newUser]);
           
        setIsDialogOpen(false);
    };

    useEffect(() => {
        fetch(`/node/admin/doctors`,{
             method: 'GET',
            credentials: 'include'  
        })
        .then(res => res.json())
        .then(data=> {
            console.log(data.doctors)
            setRowData(data.doctors);
            setOriginalRowData(data.doctors);
        });
    }, []);

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
            { headerName: "Specialization", field: "specialization", flex: 1, filter: true},
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
                    <DataTable rowData={rowData} colDefs={doctorColDefs} />
                </TabsContent>
                <TabsContent value="pharmacist">
                    <DataTable rowData={rowData} colDefs={doctorColDefs} />
                </TabsContent>
                <TabsContent value="patient">
                    <DataTable rowData={rowData} colDefs={doctorColDefs} />
                </TabsContent>
            </Tabs>
        </>
    );
}