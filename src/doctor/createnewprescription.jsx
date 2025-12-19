import { Header } from './../common/header'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { DataTable } from '@/components/ui/datatable';
import { AddPrescriptionDialog } from './subcomponents/addprescriptionitem';
import { EditPrescriptionDialog } from './subcomponents/editprescriptionitem';
import { Button } from '@/components/ui/button';
import { Pencil, ShoppingBag, TrashIcon } from 'lucide-react';
import { useAuth } from '@/common/authentication/auth';

export function CreateNewPrescription(){

    const { patientid } = useParams();
    const { user } = useAuth();

    const location = useLocation();

    const [originalRowData, setOriginalRowData] = useState([location.state.data]);
    const [rowData, setRowData] = useState([location.state.data]);

    const editData = (data) => {
        setOriginalRowData(prev => prev.map(item => item.id != data.id ? item : data));
        setRowData(prev => prev.map(item => item.id != data.id ? item : data));

    }

    const deleteData = (id, e) => {
        if(originalRowData.length - 1 == 0) navigate(`/doctor/prescriptionlist/${patientid}`);
        setOriginalRowData(prev => prev.filter(item => item.id !== id));
        setRowData(prev => prev.filter(item => item.id !== id));
    }

    const [colDefs, setColDefs] = useState([
        { headerName: "Name", field: "name", flex: 2.5, filter: true },
        { headerName: "Brand", field: "brand", flex: 2.5, filter: true  },
        { headerName: "Available", field: "quantity", flex: 1, filter: true},
        { headerName: "Quantity", field: "quantity", flex: 1, filter: true },
        { headerName: "Dosage", field: "dosage", flex: 1, filter: true  },
        { headerName: "Action",
            cellRenderer: props => {return(
                <div className="flex flex-row gap-4 items-center ">
                    <EditPrescriptionDialog props={props} onSave={(data) => editData(data)}/>
                    <Button variant="ghost" onClick={(e) => deleteData(props.data.id, e)}><TrashIcon /></Button>
                </div>
            )}
        }
    ]);
    
    const navigate = useNavigate();

    const handleSave = (data) => {
        const newArray = [...originalRowData, data];
        setOriginalRowData(newArray);
        setRowData(newArray);
    }
    

    const handleSubmit = () => {
        fetch(`/server/includes/prescription_manager.php?action=addPrescription&patientid=${patientid}`)
        .then(res => res.json())    
        .then(data => {
            originalRowData.map(prescriptionitems => {
                prescriptionitems['prescriptionid'] = data.id;
                  fetch(`/server/includes/prescriptionitem_manager.php?action=addPrescriptionItem`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(prescriptionitems),
                    credentials: 'include'
                }).then(navigate(`/doctor/prescriptionlist/${patientid}`));
            })
        });
    }

    const searchFunction = (value) => {
        setRowData(originalRowData.filter(item => item.name.includes(value.trim()) || item.brand.includes(value.trim())));
    };

    return(
        <>  
            <Header />
            <DataTable rowData={rowData} colDefs={colDefs} searchFunction={searchFunction} searchPlaceholder={"Enter brand or medicine name..."}>
                <AddPrescriptionDialog onSave={data => handleSave(data)}/>
                <Button onClick={() => handleSubmit()}><Pencil />Save</Button>
            </DataTable>
        </>
    );
}