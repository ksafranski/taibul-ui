import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Text } from './Typography';
import { Input } from './Input';
import { Divider } from './Divider';

interface ConfirmProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onCancel'> {
  isOpen: boolean;
  title: string;
  prompt: string;
  okText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  width?: string | number;
  confirmTextInput?: string;
}

export const Confirm = React.forwardRef<HTMLDivElement, ConfirmProps>(({ 
  isOpen, 
  title, 
  prompt, 
  okText = "Ok", 
  cancelText = "Cancel", 
  onConfirm, 
  onCancel,
  width = '24rem',
  confirmTextInput,
  ...props
}, ref) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (isOpen) {
      setInputValue('');
    }
  }, [isOpen]);

  const isConfirmDisabled = confirmTextInput ? inputValue !== confirmTextInput : false;

  return (
    <Modal isOpen={isOpen} onClose={onCancel} width={width} ref={ref} {...props}>
      <Modal.Header onClose={onCancel}>{title}</Modal.Header>
      <Modal.Content>
        <Text>{prompt}</Text>
        {confirmTextInput && (
            <div className="mt-4">
                <Divider className="my-4" />
                <Text className="mb-2 text-sm text-muted-foreground">
                    Please enter <span className="font-bold text-foreground select-all">{confirmTextInput}</span> below to continue
                </Text>
                <Input 
                    value={inputValue} 
                    onChange={(val: string) => setInputValue(val)}
                    placeholder={confirmTextInput}
                    autoFocus
                />
            </div>
        )}
      </Modal.Content>
      <Modal.Footer>
        <Button variant="outline" onClick={onCancel}>{cancelText}</Button>
        <Button onClick={onConfirm} disabled={isConfirmDisabled}>{okText}</Button>
      </Modal.Footer>
    </Modal>
  );
});

Confirm.displayName = "Confirm";
