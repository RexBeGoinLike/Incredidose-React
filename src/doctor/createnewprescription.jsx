import { Header } from './../common/header'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { DataTable } from '@/components/ui/datatable';
import { AddPrescriptionDialog } from './subcomponents/addprescriptionitem';
import { EditPrescriptionDialog } from './subcomponents/editprescriptionitem';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';

export function CreateNewPrescription(props){

    const { prescriptionid } = useParams();

    const location = useLocation();

    const [originalRowData, setOriginalRowData] = useState([location.state.data]);
    console.log(originalRowData)

    const [rowData, setRowData] = useState([location.state.data]);

    const editData = (data) => {
        const filteredRow = originalRowData.filter(item => item.id != data.id);
        const newArray = [...filteredRow, data];
        setOriginalRowData(newArray);
        setRowData(newArray)

    }

    const deleteData = (id, e) => {
        e.preventDefault();
        if (originalRowData.length <= 1){
            alert("Unable to delete")
        } else  {
            const newArray = originalRowData.filter(item => item.id != id);
            setOriginalRowData(newArray);
            setRowData(newArray);
        }
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
                    <Button variant="ghost" onClick={(e) => deleteData(props.id, e)}><TrashIcon /></Button>
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

    const searchFunction = (value) => {
        setRowData(originalRowData.filter(item => item.name.includes(value.trim()) || item.brand.includes(value.trim())));
    };

    return(
        <>
            <Header />
            <DataTable rowData={rowData} colDefs={colDefs} searchFunction={searchFunction} searchPlaceholder={"Enter brand or medicine name..."}>
                <AddPrescriptionDialog onSave={(data) => handleSave(data)}/>
            </DataTable>
        </>
    );
}