'use client';

import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/solid';

type ConfirmDeleteModalProps = {
  disabled?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

function ConfirmDeleteModal({
  disabled = false,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-primary-950/80 px-4 backdrop-blur-sm'>
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='confirm-delete-title'
        className='w-full max-w-md border border-primary-800 bg-primary-900 shadow-xl'
      >
        <div className='flex items-start gap-4 border-b border-primary-800 px-6 py-5'>
          <ExclamationTriangleIcon className='mt-1 h-7 w-7 flex-none text-accent-400' />
          <div>
            <h2
              id='confirm-delete-title'
              className='text-xl font-semibold text-primary-100'
            >
              Delete reservation?
            </h2>
            <p className='mt-2 text-sm leading-6 text-primary-300'>
              This action permanently removes this reservation from your account.
            </p>
          </div>
          <button
            type='button'
            onClick={onClose}
            disabled={disabled}
            aria-label='Close'
            className='ml-auto text-primary-400 transition-colors hover:text-primary-100 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <XMarkIcon className='h-5 w-5' />
          </button>
        </div>

        <div className='flex justify-end gap-3 px-6 py-4'>
          <button
            type='button'
            onClick={onClose}
            disabled={disabled}
            className='px-4 py-2 text-sm font-semibold text-primary-200 transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={onConfirm}
            disabled={disabled}
            className='bg-accent-500 px-4 py-2 text-sm font-semibold text-primary-900 transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-50'
          >
            {disabled ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
