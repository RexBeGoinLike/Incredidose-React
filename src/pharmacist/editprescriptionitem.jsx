import { Header } from '../common/header'
import { useNavigate, useParams } from 'react-router-dom';
import { ShoppingBag, Eye, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/datatable';
import { Button } from '@/components/ui/button';
import { EditPurchaseItemDialog } from './subcomponents/purchaseitem';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export function EditPrescriptionItems(){
    const { prescriptionid } = useParams();
    const [originalRowData, setOriginalRowData] = useState(
        [
            {
                prescriptionitemid: "1",
                name: "Ibuprofen", 
                brand: "Alaxan", 
                available: 10, 
                quantity: 20, 
                dosage: 20, 
                substitutions: true, 
                frequency: 1, 
                description: ""
            },
            {
                prescriptionitemid: "2",
                name: "Paracetamol", 
                brand: "Generic", 
                available: 10, 
                quantity: 20, 
                dosage: 20, 
                substitutions: true, 
                frequency: 1, 
                description: "No king"
            }
        ]
    )

    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleSave = (data) => {
        // Find the original item data to get name and brand
        const originalItem = originalRowData.find(item => 
            item.prescriptionitemid === data.precriptionitemid
        );
        
        if (!originalItem) return;
        
        // Check if item already exists in cart
        const existingIndex = cart.findIndex(item => 
            item.precriptionitemid === data.precriptionitemid
        );
        
        const cartItem = {
            ...data,
            name: originalItem.name,
            brand: originalItem.brand,
            totalprice: data.unitprice * data.quantity
        };
        
        if (existingIndex >= 0) {
            // Update existing item
            setCart(prev => {
                const updatedCart = [...prev];
                updatedCart[existingIndex] = cartItem;
                return updatedCart;
            });
        } else {
            // Add new item
            setCart(prev => [...prev, cartItem]);
        }
    };

    const handleDeleteItem = (index) => {
        setCart(prev => prev.filter((_, i) => i !== index));
    };

    const handleQuantityChange = (index, newQuantity) => {
        if (newQuantity < 1) {
            handleDeleteItem(index);
            return;
        }

        setCart(prev => {
            const updatedCart = [...prev];
            const item = updatedCart[index];
            updatedCart[index] = {
                ...item,
                quantity: newQuantity,
                totalprice: item.unitprice * newQuantity
            };
            return updatedCart;
        });
    };

    const handleUnitPriceChange = (index, newUnitPrice) => {
        setCart(prev => {
            const updatedCart = [...prev];
            const item = updatedCart[index];
            const unitPrice = parseFloat(newUnitPrice) || 0;
            updatedCart[index] = {
                ...item,
                unitprice: unitPrice,
                totalprice: unitPrice * item.quantity
            };
            return updatedCart;
        });
    };

    const calculateTotal = () => {
        return cart.reduce((sum, item) => sum + (item.totalprice || 0), 0);
    };

    const clearCart = () => {
        setCart([]);
        setIsCartOpen(false);
    };

    const [rowData, setRowData] = useState(originalRowData);

    const [colDefs, setColDefs] = useState([
        { headerName: "Name", field: "name", flex: 2.5, filter: true },
        { headerName: "Brand", field: "brand", flex: 2.5, filter: true  },
        { headerName: "Available", field: "available", flex: 1, filter: true},
        { headerName: "Quantity", field: "quantity", flex: 1, filter: true },
        { headerName: "Dosage", field: "dosage", flex: 1, filter: true  },
        { flex: 0.5,
            cellRenderer: props => {
                const { name, brand, available, quantity, dosage, frequency, substitutions, description } = props.data;
                return(<div className="flex items-center h-1/1 w-1/1">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost"><Eye /> </Button>
                        </DialogTrigger>
                        <DialogContent className="w-fit">
                            <DialogHeader>
                                <DialogTitle>Prescription Information</DialogTitle>
                                <DialogDescription>View additional prescription information</DialogDescription>
                            </DialogHeader>
                            <Separator />
                            <div className="flex gap-4 justify-between">
                                <div className="flex flex-col gap-6">
                                    <div>
                                        <h3 className="text-sm">Name</h3>
                                        <p className="text-xs">{name}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm">Brand</h3>
                                        <p className="text-xs">{brand}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm">Frequency</h3>
                                        <p className="text-xs">every {frequency} days</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <div>
                                        <h3 className="text-sm">Quantity</h3>
                                        <p className="text-xs">{available} ({quantity}))</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm">Dosage</h3>
                                        <p className="text-xs">{dosage}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm">Substitutions</h3>
                                        <p className="text-xs">{(substitutions) ? "Allowed" : "Not Allowed"}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {description && (
                                    <>
                                        <h3 className="text-sm">Description</h3>
                                        <p className="whitespace-normal text-xs">{description}</p>
                                    </>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>);
            }
        },
        {
          flex: 0.5,
          cellRenderer: props => {
                const { prescriptionitemid, name, brand, available, quantity } = props.data;

                const params = {
                    availableAmt: available,
                    quantity: quantity,
                    prescriptionitemid: prescriptionitemid
                };

                return (
                    <EditPurchaseItemDialog 
                        props={params} 
                        onSave={(data) => handleSave(data)}
                    />
                )
          }
        }
    ]);

    const navigate = useNavigate();

    const searchFunction = (value) => {
        setRowData(originalRowData.filter(item => 
            item.name.toLowerCase().includes(value.toLowerCase().trim()) || 
            item.brand.toLowerCase().includes(value.toLowerCase().trim())
        ));
    };

    return(
        <>
            <Header />
            <DataTable rowData={rowData} colDefs={colDefs} searchFunction={searchFunction} searchPlaceholder={"Enter brand or medicine name..."}>
                <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
                    <DialogTrigger asChild>
                        <Button className="relative">
                            <ShoppingCart className="mr-2 h-4 w-4" /> 
                            View Cart
                            {cart.length > 0 && (
                                <Badge 
                                    variant="secondary" 
                                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                                >
                                    {cart.length}
                                </Badge>
                            )}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
                        <DialogHeader>
                            <DialogTitle>Shopping Cart</DialogTitle>
                            <DialogDescription>
                                Review and manage your purchase items
                            </DialogDescription>
                        </DialogHeader>
                        
                        <Separator />
                        
                        {cart.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                                <p className="text-sm text-muted-foreground">Add items from the prescription list</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex-1 overflow-y-auto pr-2">
                                    <div className="space-y-4">
                                        {cart.map((item, index) => (
                                            <div 
                                                key={item.purchaseitemid}
                                                className="border rounded-lg p-4"
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <h4 className="font-medium">{item.name}</h4>
                                                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDeleteItem(index)}
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div>
                                                        <label className="text-xs text-muted-foreground mb-1 block">
                                                            Unit Price
                                                        </label>
                                                        <Input
                                                            type="number"
                                                            min="0"
                                                            step="0.01"
                                                            value={item.unitprice}
                                                            onChange={(e) => handleUnitPriceChange(index, e.target.value)}
                                                            className="h-8"
                                                        />
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="text-xs text-muted-foreground mb-1 block">
                                                            Quantity
                                                        </label>
                                                        <div className="flex items-center gap-1">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="h-8 w-8 p-0"
                                                                onClick={() => handleQuantityChange(index, item.quantity - 1)}
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </Button>
                                                            <Input
                                                                type="number"
                                                                min="1"
                                                                value={item.quantity}
                                                                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                                                                className="h-8 text-center"
                                                            />
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="h-8 w-8 p-0"
                                                                onClick={() => handleQuantityChange(index, item.quantity + 1)}
                                                            >
                                                                <Plus className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="text-xs text-muted-foreground mb-1 block">
                                                            Total Price
                                                        </label>
                                                        <div className="h-8 flex items-center justify-end">
                                                            <span className="font-medium">
                                                                ${item.totalprice.toFixed(2)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="pt-4 border-t">
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <div className="text-sm text-muted-foreground">
                                                {cart.length} {cart.length === 1 ? 'item' : 'items'} in cart
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={clearCart}
                                                className="mt-1 h-8 gap-1"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                                Clear Cart
                                            </Button>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold">
                                                ${calculateTotal().toFixed(2)}
                                            </div>
                                            <p className="text-sm text-muted-foreground">Total Amount</p>
                                        </div>
                                    </div>
                                    
                                    <DialogFooter className="gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsCartOpen(false)}
                                        >
                                            Continue Shopping
                                        </Button>
                                        <Button 
                                            onClick={() => {
                                                // Handle checkout logic
                                                console.log('Checkout items:', cart);
                                                setIsCartOpen(false);
                                            }}
                                        >
                                            Complete Purchase
                                        </Button>
                                    </DialogFooter>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </DataTable>
        </>
    );
}