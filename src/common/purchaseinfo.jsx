import { Header } from "./header";
import { Table, TableRow, TableHead, TableHeader } from "@/components/ui/table";

export function PurchaseInfo(){
    return(
        <>
          <Header />
          <div className="flex flex-col p-10 gap-4">
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Dosage</TableHead>
                        <TableHead>Reference Number</TableHead>
                    </TableRow>
                </TableHeader>
              </Table>
          </div>
        </>
    );
}