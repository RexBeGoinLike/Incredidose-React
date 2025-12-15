import { Header } from "@/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/datatable";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export function PharmacistDashboard(){
    const navigate = useNavigate();
    const [originalPatientData, setOriginalPatientData] = useState([
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

    const [doctorData, setDoctorData] = useState();

    useEffect(() => {
        fetch('/server/includes/doctor_manager.php')
        .then(res => res.json())
        .then(data => {
            setDoctorData(data);
            setOriginalRowData(data);
        });
    }, []);

    const [doctorColDefs, setDoctorColDefs] = useState(
        [
            { headerName: "Name", flex: 1, filter: true,
                cellRenderer: props => { return props.data.firstname + " " + props.data.lastname;}
            },
            { headerName: "Contact Info", field: "contactnum", flex: 1, filter: true  },
            { headerName: "Specialization", field: "specialization", flex: 1, filter: true  },
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
                <div className="pt-3 pl-10 pr-10">
                    <TabsList >
                        <TabsTrigger value="patient">Patient</TabsTrigger>
                        <TabsTrigger value="doctor">Doctor</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="patient">
                    <DataTable rowData={patientData} colDefs={patientColDefs} searchFunction={searchFunction} searchPlaceholder={"Enter a patient's name..."} />
                </TabsContent>
                <TabsContent value="doctor">
                    <DataTable rowData={doctorData} colDefs={doctorColDefs} searchFunction={searchFunction} searchPlaceholder={"Enter a doctor's name..."}/>
                </TabsContent>
            </Tabs>
        </>
    )
}