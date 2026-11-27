import { useLayoutEffect, useRef, type ReactNode } from 'react';

interface StudioDialogProps {
  children: ReactNode;
  className: string;
  label?: string;
  labelledBy?: string;
  onDismiss: () => void;
  dismissOnBackdrop?: boolean;
}

const tabbable = 'button, a[href], input, select, textarea, summary, [tabindex], [contenteditable="true"]';

export function StudioDialog({
  children,
  className,
  label,
  labelledBy,
  onDismiss,
  dismissOnBackdrop = false,
}: StudioDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    const opener = document.activeElement;
    dialog.showModal();
    dialog.querySelector<HTMLElement>('[data-dialog-initial-focus]')?.focus({ preventScroll: true });

    return () => {
      dialog.close();
      if (opener instanceof HTMLElement && opener.isConnected) {
        opener.focus({ preventScroll: true });
      } else if (!document.querySelector('dialog:modal')) {
        document.getElementById('main-content')?.focus({ preventScroll: true });
      }
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      aria-labelledby={labelledBy}
      className={`aera-dialog fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 p-0 text-[#2A2028] ${className}`}
      onCancel={(event) => {
        event.preventDefault();
        onDismiss();
      }}
      onClick={(event) => {
        if (dismissOnBackdrop && event.target === event.currentTarget) onDismiss();
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;

        const controls = [...event.currentTarget.querySelectorAll<HTMLElement>(tabbable)].filter(
          (control) => control.tabIndex >= 0 && !control.matches(':disabled') &&
            control.getClientRects().length > 0 && getComputedStyle(control).visibility === 'visible'
        );
        const first = controls[0];
        const last = controls.at(-1);
        if (!first || !last) {
          event.preventDefault();
          return;
        }

        const current = document.activeElement;
        if (!controls.includes(current as HTMLElement) || current === (event.shiftKey ? first : last)) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        }
      }}
    >
      {children}
    </dialog>
  );
}
