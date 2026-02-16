import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const GenericModal = ({
  isOpen,
  onOpenChange,
  title = "Formulário",
  description,
  trigger,
  onSubmit,
  submitLabel = "Salvar",
  cancelLabel = "Cancelar",
  children: formFields,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <form onSubmit={onSubmit}>
        {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description ? (
              <DialogDescription>{description}</DialogDescription>
            ) : null}
          </DialogHeader>

          {formFields}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                {cancelLabel}
              </Button>
            </DialogClose>
            <Button type="submit">{submitLabel}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default GenericModal;
