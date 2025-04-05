
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                    <div>{children}</div>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
            </Dialog>
    )
}