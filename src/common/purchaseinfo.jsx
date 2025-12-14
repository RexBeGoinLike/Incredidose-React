import { Header } from './header'
import { useNavigate, useParams } from 'react-router-dom';
import { Receipt } from 'lucide-react'
import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/datatable';
import { Button } from '@/components/ui/button';

export function PurchaseInfo(){

    const { prescriptionid } = useParams();
    const [originalRowData, setOriginalRowData] = useState();
    const [rowData, setRowData] = useState();
    const [pinnedBottomRowData, setPinnedBottomRowData] = useState();

    useEffect(() => {
        fetch(`/server/includes/purchase_manager.php?action=getPurchasesByPrescription&prescriptionid=${prescriptionid}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setOriginalRowData(data);
            setRowData(data)
            setPinnedBottomRowData([{name: "Total", price: [data].reduce((sum, item) => sum + item.price, 0)}])
        });
    }, [])

    const [colDefs, setColDefs] = useState(
        [
            { headerName: "Name", field: "name", flex: 2.5, filter: true },
            { headerName: "Brand", field: "brand", flex: 2.5, filter: true  },
            { headerName: "Quantity", field: "quantity", flex: 1, filter: true },
            { headerName: "Dosage", field: "dosage", flex: 1, filter: true  },
            { headerName: "Unit Price (Php)", field: "unitprice", flex: 1, filter: true  }
        ]
    );
    
    
    const navigate = useNavigate();

    const searchFunction = (value) => {
        setRowData(originalRowData.filter(item => item.name.includes(value.trim()) || item.brand.includes(value.trim())));
    };

    return(
        <>
            <Header />
            <DataTable rowData={rowData} colDefs={colDefs} pinnedBottomRowData={pinnedBottomRowData} searchFunction={searchFunction} searchPlaceholder={"Enter brand or medicine name..."}>
                <Button onClick={() => navigate(`/common/payments/${purchaseid}`)}><Receipt /> View Payments</Button>
            </DataTable>
        </>
    );
}