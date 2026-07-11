'use client';

import { deleteReservation } from '@/lib/actions';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useState, useTransition } from 'react';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import SpinnerMini from './SpinnerMini';

function DeleteReservation({ bookingId }: { bookingId: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    setIsModalOpen(false);
    startTransition(async () => {
      await deleteReservation(bookingId);
    });
  }

  return (
    <>
      <button
        type='button'
        onClick={() => setIsModalOpen(true)}
        className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900'
      >
        {isPending ? <span className='mx-auto'>
          <SpinnerMini />
        </span> : <>
          <TrashIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
          <span className='mt-1'>Delete</span></>}
      </button>

      {isModalOpen && (
        <ConfirmDeleteModal
          disabled={isPending}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}

export default DeleteReservation;
