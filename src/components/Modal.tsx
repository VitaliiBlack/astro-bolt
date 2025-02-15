import type React from 'react';
import { useTranslation } from '@astro-monorepo/i18n';
import {Image} from 'astro:assets';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: string;
  count: number;
  onContinue: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, product, count, onContinue }) => {
    const lang = process.env.LANG || "en";
    const t = useTranslation(lang);

  if (!isOpen) return null;

  // Подстановка плейсхолдеров
  const reserveText = t.modal.reserve.replace('{count}', String(count)).replace('{product}', product);
  const howToGetText = t.modal.how_to_get.replace('{product}', product);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <form action="{offer}" method="POST">
          <input type="hidden" name="sub_id_15" value="90" />
          <div className="modal-header">
            <Image src="/assets/Barilla_brand_logo.png" alt="logo" width={100} height={100} />
            <button type="button" onClick={onClose}>×</button>
          </div>
          <hr />
          <div className="modal-body">
            <p>
              <strong>{t.modal.congrats}</strong> {reserveText}
            </p>
            <p>{howToGetText}</p>
            <ol>
              {t.modal.steps.map((step: string, idx: number) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="modal-footer">
            <button type="submit" onClick={onContinue}>{t.modal.continue}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
