import { useEffect, useState } from 'react';
import { getBoards } from '@/api';
import { IBoard } from '@/types';
import { Board } from '@/components/boards/';

export function BoardsPage() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const data = await getBoards();
        setBoards(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBoards();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {boards.map((board: IBoard) => (
        <Board key={board.id} {...board} />
      ))}
    </div>
  );
}
