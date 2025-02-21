import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

type EditDialogProps<T> = {
  isOpen: boolean;
  item: T | null;
  onClose: () => void;
  onSave: (data: T) => void;
  fields: { key: keyof T; label: string }[];
};

export function EditDialog<T>({ isOpen, item, onClose, onSave, fields }: EditDialogProps<T>) {
  const [formData, setFormData] = useState(item || {} as T);

  useEffect(() => { if (item) setFormData(item); }, [item]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          {fields.map(({ key, label }) => (
            <div key={key as string}>
              <Label>{label}</Label>
              <Input value={formData[key] as string} onChange={e => setFormData({ ...formData, [key]: e.target.value })} />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Отмена</Button>
          <Button variant="default" onClick={() => onSave(formData)}>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
