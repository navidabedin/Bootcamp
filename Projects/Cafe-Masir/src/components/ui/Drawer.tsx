import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useEscapeKey } from '../../hooks';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
}

/**
 * پوسته‌ی عمومی دراور:
 * پورتال به body، بستن با ESC، تله‌ی فوکوس، بازگرداندن فوکوس، انیمیشن خروج.
 */
export function Drawer({ open, onClose, labelledBy, children }: DrawerProps) {
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEscapeKey(open, onClose);

  /* نگه‌داشتن دراور در DOM تا انیمیشن بستن تمام شود */
  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
      return;
    }
    if (!mounted) return;
    setClosing(true);
    const timer = window.setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, 220);
    return () => window.clearTimeout(timer);
  }, [open, mounted]);

  /* فوکوس اولیه + بازگرداندن فوکوس */
  useEffect(() => {
    if (!mounted) return;
    lastFocused.current = document.activeElement as HTMLElement | null;

    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>(
      'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
    );
    first?.focus();

    return () => {
      lastFocused.current?.focus?.();
    };
  }, [mounted]);

  /* تله‌ی فوکوس با Tab */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <div className="drawer-root">
      <div className="drawer__scrim" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        className={`drawer__panel${closing ? ' drawer__panel--closing' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
