import { Header } from './header'
import { useNavigate, useParams } from 'react-router-dom';
import { Receipt } from 'lucide-react'
import { useState } from 'react';
import { DataTable } from '@/components/ui/datatable';
import { Button } from '@/components/ui/button';

export function PurchaseInfo(){

    const { purchaseid } = useParams();
    const [originalRowData, setOriginalRowData] = useState(
        [
            {name: "Ibuprofen", brand: "Alaxan", quantity: 10, dosage: 20, price: 100},
            {name: "Paracetamol", brand: "Generic", quantity: 10, dosage: 20, price: 200}
        ]
    )

    const [rowData, setRowData] = useState(originalRowData);

    const [colDefs, setColDefs] = useState(
        [
            { headerName: "Name", field: "name", flex: 2.5, filter: true },
            { headerName: "Brand", field: "brand", flex: 2.5, filter: true  },
            { headerName: "Quantity", field: "quantity", flex: 1, filter: true },
            { headerName: "Dosage", field: "dosage", flex: 1, filter: true  },
            { headerName: "Price (Php)", field: "price", flex: 1, filter: true  }
        ]
    );
    
    const pinnedBottomRowData = [{name: "Total", price: originalRowData.reduce((sum, item) => sum + item.price, 0)}]

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