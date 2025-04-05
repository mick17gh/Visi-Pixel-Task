
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"

interface modalProps {
    isOpen:boolean;
    handleClose:()=>void;
    title:string;
    children:React.ReactNode;
}

export const Modal = ({
    isOpen,
    handleClose,
    title,
    children
}:modalProps) =>{
    // const [open, setOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                    <div>{children}</div>
                </DialogHeader>
            </DialogContent>
            </Dialog>
    )
}