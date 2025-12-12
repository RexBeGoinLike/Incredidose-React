import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function PatientViewRenderer({ data }) {
    const {
        userid,
        firstname,
        lastname,
        contactnum,
        email,
        password,
        birthdate,
        createdat,
        role,
        gender
    } = data;

    const [firstName, setFName] = useState(firstname);
    const [lastName, setLName] = useState(lastname);
    const [contactNum, setCNum] = useState(contactnum);
    const [emailAddress, setEmailAddress] = useState(email);
    const [birthDate, setBirthdate] = useState(birthdate);
    const [gndr, setGender] = useState(gender);

    const isChanged = () => {
        return (
            firstName != firstname ||
            lastName != lastname ||
            contactNum != contactnum ||
            emailAddress != email ||
            birthDate != birthdate ||
            gndr != gender
        );
    };

    const navigate = useNavigate();

    return (
        <Dialog>
        <DialogTrigger className="flex h-1/1 items-center justify-center">
            <Eye />
        </DialogTrigger>

        <DialogContent className="max-w-xl">
            <DialogHeader>
            <DialogTitle>View and Edit Patient Information</DialogTitle>
            <DialogDescription>
                A detailed view of the patient's information.
            </DialogDescription>
            </DialogHeader>

            <Button onClick={() => {navigate(`/common/prescriptionlist/1/${userid}`)}} className="mb-4">Manage Prescriptions</Button>

            <form className="grid grid-cols-2 gap-6">
            
                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="text-sm font-medium">First Name</h3>
                        <Input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFName(e.target.value)}
                        />
                    </div>

                    <div>
                        <h3 className="text-sm font-medium">Birthdate</h3>
                        <Input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthdate(e.target.value)}
                        />
                    </div>

                    <div>
                        <h3 className="text-sm font-medium">Mobile Number</h3>
                        <Input
                            type="text"
                            value={contactNum}
                            onChange={(e) => setCNum(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="text-sm font-medium">Last Name</h3>
                        <Input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLName(e.target.value)}
                        />
                    </div>

                    <div>
                        <h3 className="text-sm font-medium">Gender</h3>
                        <Input
                            type="text"
                            value={gndr}
                            onChange={(e) => setGender(e.target.value)}
                        />
                    </div>

                    <div>
                        <h3 className="text-sm font-medium">Email</h3>
                        <Input
                            type="email"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                        />
                    </div>
                </div>

                <Button className="col-span-2" type="submit" disabled={!isChanged()}>Edit</Button>

            </form>

        </DialogContent>
        </Dialog>
    );
}