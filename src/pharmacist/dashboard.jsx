import { Header } from "@/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/datatable";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export function PharmacistDashboard(){
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
    
    const searchFunction = (value) => {
        setOriginalRowData(prev => prev.filter(user => user.firstname.includes(value.trim()) || user.lastname.includes(value.trim())));
    };

    const [patientData, setPatientData] = useState();

    useEffect(() => {
        fetch('/server/includes/patient_manager.php?action=getAllPatients')
        .then(res => res.json())
        .then(data => {
            setPatientData(data);
            setOriginalRowData(data);
        });
    }, []);

    const [doctorColDefs, setDoctorColDefs] = useState(
        [
            { headerName: "Name", flex: 1, filter: true,
                cellRenderer: props => { return props.data.firstname + " " + props.data.lastname;}
            },
            { headerName: "Contact Info", field: "contactnum", flex: 1, filter: true  },
            { headerName: "Email", field: "email", flex: 1, filter: true }
        ]
    );

    const [patientColDefs, setPatientColDefs] = useState(
        [
            { headerName: "Name", flex: 1, filter: true,
                cellRenderer: props => { return props.data.firstname + " " + props.data.lastname;}
            },
            { headerName: "Contact Info", field: "contactnum", flex: 1, filter: true  },
            { headerName: "Email", field: "email", flex: 1, filter: true },
            { headerName: "Action", flex: 0.25,
                cellRenderer: props => {return(
                    <Button variant="ghost" onClick={() => navigate(`/pharmacist/viewprescriptions/${props.data.userid}`)} ><Eye /></Button>
                )}
            }
        ]
    );

    return (
        <>
            <Header />
            <Tabs defaultValue="patient" >
                <div className="p-10 -mb-10">
                    <TabsList >
                        <TabsTrigger value="patient">Patient</TabsTrigger>
                        <TabsTrigger value="doctor">Doctor</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="patient">
                    <DataTable rowData={patientData} colDefs={patientColDefs} searchFunction={searchFunction} searchPlaceholder={"Enter a patient's name..."} />
                </TabsContent>
                <TabsContent value="doctor">
                    <DataTable rowData={patientData} colDefs={doctorColDefs} searchFunction={searchFunction} searchPlaceholder={"Enter a doctor's name..."}/>
                </TabsContent>
            </Tabs>
        </>
    )
}