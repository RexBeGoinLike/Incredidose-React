import { useState } from "react";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription,
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

export function AddUserDialog({ onSave, existingUsers }) {
    const [open, setOpen] = useState(false);
    
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [affiliation, setAffiliation] = useState("");
    const [role, setRole] = useState("");

    const isChanged = () => {
        return (
            firstname.trim() &&
            lastname.trim() &&
            birthdate &&
            gender &&
            email.trim() &&
            password &&
            phone.trim() &&
            role
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newUserId = Math.max(...existingUsers.map(user => user.userid), 0) + 1;
        
        const newUser = {
            userid: newUserId,
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            contactnum: phone.trim(),
            email: email.trim().toLowerCase(),
            password: password,
            birthdate: birthdate,
            createdat: new Date().toISOString().slice(0, 19).replace('T', ' '),
            role: role,
            gender: gender,
            specialization: specialization.trim(),
            licenseNumber: licenseNumber.trim(),
            affiliation: affiliation.trim()
        };

        if (onSave) {
            onSave(newUser);
        }

        setFirstname("");
        setLastname("");
        setBirthdate("");
        setGender("");
        setEmail("");
        setPassword("");
        setPhone("");
        setSpecialization("");
        setLicenseNumber("");
        setAffiliation("");
        setRole("");

        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex items-center" asChild>
                <Button onClick={() => setOpen(true)}>
                    <Plus /> Add User
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Create a New User</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <FieldGroup className="grid grid-cols-2 gap-6">
                        {/* Left Column - Basic Information */}
                        <FieldSet className="flex flex-col gap-4">
                            <Field>
                                <FieldLabel className="text-sm font-medium">First Name*</FieldLabel>
                                <Input
                                    type="text"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">Last Name*</FieldLabel>
                                <Input
                                    type="text"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">Date of Birth*</FieldLabel>
                                <Input
                                    type="date"
                                    value={birthdate}
                                    onChange={(e) => setBirthdate(e.target.value)}
                                    max={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">Email*</FieldLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Field>
                        </FieldSet>

                        <FieldSet className="flex flex-col gap-4">
                            <Field>
                                <FieldLabel className="text-sm font-medium">Phone Number*</FieldLabel>
                                <Input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="09171234567"
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">Password*</FieldLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">Gender*</FieldLabel>
                                <Input
                                    type="text"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    placeholder="e.g., Male, Female, Other"
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">Role*</FieldLabel>
                                <Select
                                    value={role}
                                    onValueChange={(value) => setRole(value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="patient">Patient</SelectItem>
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
                                    value={specialization}
                                    onChange={(e) => setSpecialization(e.target.value)}
                                    placeholder="e.g., Cardiology, Pediatrics"
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">License Number</FieldLabel>
                                <Input
                                    type="text"
                                    value={licenseNumber}
                                    onChange={(e) => setLicenseNumber(e.target.value)}
                                    placeholder="e.g., PRC-123456"
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">Affiliation/Hospital</FieldLabel>
                                <Input
                                    type="text"
                                    value={affiliation}
                                    onChange={(e) => setAffiliation(e.target.value)}
                                    placeholder="e.g., St. Luke's Medical Center"
                                />
                            </Field>
                        </FieldSet>

                        <Button 
                            className="col-span-2" 
                            type="submit" 
                            disabled={!isChanged()}
                        >
                            <Plus /> Save User
                        </Button>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    );
}