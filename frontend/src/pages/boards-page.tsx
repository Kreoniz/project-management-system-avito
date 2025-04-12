import { useEffect, useState } from 'react';
import { IBoard } from '@/types';
import { Board } from '@/components/boards/';
import { useAppStore } from '@/stores';
import { BoardSkeleton } from '@/components/skeletons';

export function BoardsPage() {
  const { boards, fetchBoards } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      await fetchBoards();
      setIsLoading(false);
    }

    load();
  }, [fetchBoards]);

  return (
    <div className="flex flex-col gap-3">
      {isLoading
        ? [...Array(5)].map((_, index) => <BoardSkeleton key={index} />)
        : boards.map((board: IBoard) => <Board key={board.id} {...board} />)}
    </div>
  );
}
