import { useState } from "react";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { 
    FieldGroup, 
    FieldSet, 
    Field, 
    FieldLabel 
} from "@/components/ui/field";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";

export function AddUserDialog({ onSave }) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        birthdate: "",
        gender: "",
        email: "",
        password: "",
        phone: "",
        specialization: "",
        licenseNumber: "",
        affiliation: "",
        role: ""
    });

    // Update a specific field
    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const isFormValid = () => {
        return (
            formData.firstname.trim() &&
            formData.lastname.trim() &&
            formData.birthdate &&
            formData.gender &&
            formData.email.trim() &&
            formData.password &&
            formData.phone.trim() &&
            formData.role &&
            formData.specialization.trim() &&
            formData.licenseNumber.trim() &&
            formData.affiliation.trim()
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isFormValid() || isSubmitting) return;
        
        setIsSubmitting(true);
        
        try {
            const newUser = {
                userid: Date.now(), // Better: generate a unique ID
                firstname: formData.firstname.trim(),
                lastname: formData.lastname.trim(),
                contactnum: formData.phone.trim(),
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
                birthdate: formData.birthdate,
                role: formData.role,
                gender: formData.gender,
                specialization: formData.specialization.trim(),
                licensenum: formData.licenseNumber.trim(),
                affiliation: formData.affiliation.trim()
            };

            console.log("Submitting user:", newUser);
            
            // Call onSave if provided
            if (onSave) {
                // Assuming onSave might be async
                await onSave(newUser);
            }

            // Reset form
            setFormData({
                firstname: "",
                lastname: "",
                birthdate: "",
                gender: "",
                email: "",
                password: "",
                phone: "",
                specialization: "",
                licenseNumber: "",
                affiliation: "",
                role: ""
            });

            // Close dialog
            setOpen(false);
        } catch (error) {
            console.error("Error saving user:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add User
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create a New User</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <FieldGroup className="grid grid-cols-2 gap-6">
                        <FieldSet className="flex flex-col gap-4">
                            <Field>
                                <FieldLabel className="text-sm font-medium">First Name*</FieldLabel>
                                <Input
                                    type="text"
                                    value={formData.firstname}
                                    onChange={(e) => handleChange("firstname", e.target.value)}
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">Last Name*</FieldLabel>
                                <Input
                                    type="text"
                                    value={formData.lastname}
                                    onChange={(e) => handleChange("lastname", e.target.value)}
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">Date of Birth*</FieldLabel>
                                <Input
                                    type="date"
                                    value={formData.birthdate}
                                    onChange={(e) => handleChange("birthdate", e.target.value)}
                                    max={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">Email*</FieldLabel>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    required
                                />
                            </Field>
                        </FieldSet>

                        <FieldSet className="flex flex-col gap-4">
                            <Field>
                                <FieldLabel className="text-sm font-medium">Phone Number*</FieldLabel>
                                <Input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                    placeholder="09171234567"
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">Password*</FieldLabel>
                                <Input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => handleChange("password", e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">Gender*</FieldLabel>
                                <Input
                                    value={formData.gender}
                                    onChange={(e) => handleChange("gender", e.target.value)}
                                    placeholder="Male, Female, Others"
                                    required
                                >
                                </Input>
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">Role*</FieldLabel>
                                <Select
                                    value={formData.role}
                                    onValueChange={(value) => handleChange("role", value)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pharmacist">Pharmacist</SelectItem>
                                        <SelectItem value="doctor">Doctor</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                        </FieldSet>

                        <FieldSet className="col-span-2 grid grid-cols-3 gap-4">
                            <Field>
                                <FieldLabel className="text-sm font-medium">Specialization</FieldLabel>
                                <Input
                                    type="text"
                                    value={formData.specialization}
                                    onChange={(e) => handleChange("specialization", e.target.value)}
                                    placeholder="e.g., Cardiology, Pediatrics"
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">License Number</FieldLabel>
                                <Input
                                    type="text"
                                    value={formData.licenseNumber}
                                    onChange={(e) => handleChange("licenseNumber", e.target.value)}
                                    placeholder="e.g., PRC-123456"
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">Affiliation/Hospital</FieldLabel>
                                <Input
                                    type="text"
                                    value={formData.affiliation}
                                    onChange={(e) => handleChange("affiliation", e.target.value)}
                                    placeholder="e.g., St. Luke's Medical Center"
                                />
                            </Field>
                        </FieldSet>

                        <div className="col-span-2 flex justify-end gap-3">
                            <Button 
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={!isFormValid() || isSubmitting}
                            >
                                {isSubmitting ? "Saving..." : (
                                    <>
                                        <Plus className="mr-2 h-4 w-4" /> Save User
                                    </>
                                )}
                            </Button>
                        </div>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    );
}