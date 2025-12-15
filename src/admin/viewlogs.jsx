import { Header } from "@/common/header";
import { FileText, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { DataTable } from "@/components/ui/datatable";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function ViewLogs() {
    const navigate = useNavigate();

    const [logsData, setLogsData] = useState([
        {
            id: 1,
            user: "Dr. Maria Santos",
            role: "Doctor",
            action: "Created prescription for patient Marianne Dela Cruz",
            activity: "2025-01-15 14:30:00"
        },
        {
            id: 2,
            user: "Admin User",
            role: "Admin",
            action: "Added new user Jerome Bautista",
            activity: "2025-01-14 10:15:00"
        },
        {
            id: 3,
            user: "Pharmacist John",
            role: "Pharmacist",
            action: "Processed prescription #PR-2025-001",
            activity: "2025-01-13 16:45:00"
        },
        {
            id: 4,
            user: "Marianne Dela Cruz",
            role: "Patient",
            action: "Updated profile information",
            activity: "2025-01-12 09:20:00"
        },
    ]);

    const [colDefs, setColDefs] = useState([
        { 
            headerName: "User", 
            field: "user", 
            flex: 1.5, 
            filter: true 
        },
        { 
            headerName: "Role", 
            field: "role", 
            flex: 1, 
            filter: true 
        },
        { 
            headerName: "Action", 
            field: "action", 
            flex: 2, 
            filter: true 
        },
        { 
            headerName: "Activity Date/Time", 
            field: "activity", 
            flex: 1.5, 
            filter: true 
        }
    ]);

    return (
        <>
            <Header />
            
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => navigate('/admin/dashboard')}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold flex items-center gap-2">
                                <FileText className="h-8 w-8" />
                                System Activity Logs
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                View all user activities and system actions performed in the system.
                            </p>
                        </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                        Total Logs: {logsData.length}
                    </div>
                </div>

                {/* Filters section */}
                <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium">Filters</h3>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                Today
                            </Button>
                            <Button variant="outline" size="sm">
                                Last 7 Days
                            </Button>
                            <Button variant="outline" size="sm">
                                All Time
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg">
                    <DataTable 
                        rowData={logsData} 
                        colDefs={colDefs}
                    />
                </div>

            </div>
        </>
    );
}