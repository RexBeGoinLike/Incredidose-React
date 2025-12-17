import { Header } from '../common/header'
import { useParams } from 'react-router-dom';
import { ShoppingBag, Eye, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/datatable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import e from 'cors';

export function EditPrescriptionItems() {
    const { prescriptionid, patientid } = useParams();
    const [items, setItems] = useState([]);
    const [itemsFilter, setItemsFilter] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);

    useEffect(() => {
        fetch(`/server/includes/prescriptionitem_manager.php?action=getPrescriptionItems&prescriptionid=${prescriptionid}`)
            .then(res => res.json())
            .then(data => {
                setItems(data)
                setItemsFilter(data)
            });
    }, []);

    const addToCart = (data) => {
        const originalItem = items.find(item => item.prescriptionitemid === data.prescriptionitemid);
        if (!originalItem) return;
        
        const cartItem = {
            ...data,
            name: originalItem.name,
            brand: originalItem.brand,
            quantity: 1,
            max: originalItem.available,
            totalprice: (data.unitprice || 0) * (data.quantity || 1)
        };
        
        setCart(prev => {
            const existing = prev.findIndex(item => item.prescriptionitemid === data.prescriptionitemid);
            if (existing >= 0) {
                const newCart = [...prev];
                newCart[existing] = cartItem;
                return newCart;
            }
            return [...prev, cartItem];
        });
    };

    const updateCart = (index, field, value) => {
        setCart(prev => {
            const newCart = [...prev];
            const item = newCart[index];
            
            if (field === 'quantity') {
                const qty = parseInt(value);
                if (qty < 1) {
                    return prev.filter((_, i) => i !== index);
                }
                item.quantity = qty;
            } else if (field === 'unitprice') {
                item.unitprice = parseFloat(value) || 0;
            } else if (field === 'brand') {
                item.brand = value.trim();
            }
            
            item.totalprice = item.unitprice * item.quantity;
            return newCart;
        });
    };

    const removeFromCart = (index) => {
        setCart(prev => prev.filter((_, i) => i !== index));
    };

    const columns = [
        { headerName: "Name", field: "name", flex: 1 },
        { headerName: "Brand", field: "brand", flex: 1 },
        { headerName: "Available", field: "available", flex: 0.5 },
        { headerName: "Quantity", field: "quantity", flex: 0.5 },
        { headerName: "Dosage", field: "dosage", flex: 0.5 },
        {
            flex: 0.3,
            cellRenderer: props => {
                const { name, brand, available, quantity, dosage, frequency, substitutions, description } = props.data;
                return (
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
                                        <p className="text-xs">{available} ({quantity})</p>
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
                );
            }
        },
        {
            flex: 0.3,
            cellRenderer: props => {
                return (
                    <Button variant="ghost"onClick={() => addToCart({
                        prescriptionitemid: props.data.prescriptionitemid,
                        quantity: 1,
                        unitprice: 0
                    })} disabled={props.data.available == 0}>
                        <ShoppingCart />
                    </Button>
                );
            }
        }
    ];

    const searchFunction = (value) => {
        setItemsFilter(items.filter(item => item.name.includes(value) || item.brand.includes(value)));
    };

    useEffect(() => {
        if (items.length > 0) {
            localStorage.setItem('originalItems', JSON.stringify(items));
        }
    }, [items]);

    const total = cart.reduce((sum, item) => sum + (item.totalprice || 0), 0);

    function purchaseItems(){
        fetch('/server/includes/purchase_manager.php?action=createPurchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prescriptionid: prescriptionid, patientid: patientid})
        })
        .then(res => res.json())
        .then(data => {
            cart.map(purchaseItems => {
                purchaseItems['purchaseid'] = data.purchaseid;
                fetch(`/server/includes/purchaseitem_manager.php?action=addPurchaseItem`, {            
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(purchaseItems)
                });
            })
        })
    }   

    return (
        <>
            <Header />
            <DataTable rowData={itemsFilter} colDefs={columns} searchFunction={searchFunction} searchPlaceholder="Enter brand or medicine name...">
                <Dialog open={cartOpen} onOpenChange={setCartOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <ShoppingCart className="mr-2 h-4 w-4" /> 
                            View Cart ({cart.length})
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                        <DialogHeader>
                            <DialogTitle>Shopping Cart</DialogTitle>
                            <DialogDescription>Review your items</DialogDescription>
                        </DialogHeader>
                        
                        {cart.length === 0 ? (
                            <div className="py-12 text-center">
                                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium">Your cart is empty</h3>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {cart.map((item, index) => (
                                        <div key={index} className="border p-4 rounded">

                                            <div className="flex justify-between mb-3">
                                                <div>
                                                    <h4 className="font-medium">{item.name}</h4>
                                                    <p className="text-sm text-muted-foreground">{item.brand}</p>
                                                </div>
                                                <Button variant="ghost" size="sm" onClick={() => removeFromCart(index)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            
                                            <div className="grid grid-cols-3 gap-4">

                                                <div>
                                                    <label className="text-xs">Brand</label>
                                                    <Input
                                                        type="text" 
                                                        value={item.brand}
                                                        onChange={(e) => updateCart(index, 'brand', e.target.value)}
                                                        disabled={item.substitutions == false}
                                                        required />
                                                </div>

                                                <div>
                                                    <label className="text-xs">Unit Price</label>
                                                    <Input
                                                        type="number"
                                                        value={item.unitprice}
                                                        onChange={(e) => updateCart(index, 'unitprice', e.target.value)}
                                                    />
                                                </div>
                  
                                                <div>
                                                    <label className="text-xs">Quantity</label>
                                                    <div className="flex gap-1">
                                                        <Button variant="outline" size="icon" onClick={() => updateCart(index, 'quantity', item.quantity - 1)}>
                                                            <Minus size={1} />
                                                        </Button>
                                                        <Input
                                                            value={item.quantity}
                                                            min={1}
                                                            max={item.max}
                                                            onChange={(e) => updateCart(index, 'quantity', e.target.value)}
                                                            className="text-center"
                                                        />
                                                        <Button variant="outline" size="icon" onClick={() => updateCart(index, 'quantity', item.quantity + 1)} disabled={item.quantity >= item.max}>
                                                            <Plus size={1}/>
                                                        </Button>
                                                    </div>
                                                </div>
                                                
                                            </div>

                                            <div className="text-right pt-2">
                                                <p className="font-bold">Subtotal: Php {item.totalprice.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="border-t pt-42">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm">{cart.length} items</p>
                                            <Button variant="outline" onClick={() => setCart([])}>
                                                Clear Cart  
                                            </Button>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold">Php {total.toFixed(2)}</p>
                                            <Button onClick={() => {
                                                purchaseItems();
                                                setCart([]);
                                                setCartOpen(false);
                                            }}>
                                                Complete Purchase
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </DataTable>
        </>
    );
}