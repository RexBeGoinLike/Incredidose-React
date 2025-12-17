import { Header } from "@/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/datatable";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export function PharmacistDashboard(){
    const navigate = useNavigate();
    const [value, setValue] = useState("patient");
    const [originalRowData, setOriginalRowData] = useState([
    ]);
    const [rowData, setRowData] = useState();

    const searchFunction = (value) => {
        setRowData( originalRowData.filter(user => user.firstname.includes(value.trim()) || user.lastname.includes(value.trim())));
    };



    useEffect(() => {
        if(value == "patient"){
            fetch('/server/includes/patient_manager.php?action=getAllPatients')
                .then(res => res.json())
                .then(data => {
                    setRowData(data);
                    setOriginalRowData(data);
            });
        }else{
            fetch('/server/includes/doctor_manager.php')
                .then(res => res.json())
                .then(data => {
                    setRowData(data);
                    setOriginalRowData(data);
                });
        }
    }, [value]);


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
            <Tabs value={value} onValueChange={setValue} >
                <div className="pt-3 pl-5 pr-10">
                    <TabsList >
                        <TabsTrigger value="patient">Patient</TabsTrigger>
                        <TabsTrigger value="doctor">Doctor</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="patient">
                    <DataTable rowData={rowData} colDefs={patientColDefs} searchFunction={searchFunction} searchPlaceholder={"Enter a patient's name..."} />
                </TabsContent>
                <TabsContent value="doctor">
                    <DataTable rowData={rowData} colDefs={doctorColDefs} searchFunction={searchFunction} searchPlaceholder={"Enter a doctor's name..."}/>
                </TabsContent>
            </Tabs>
        </>
    )
}