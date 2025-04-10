import { useEffect, useState } from 'react';
import { getBoards } from '@/api';
import { IBoard } from '@/types';

export function BoardPage() {
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
    <div>
      {boards.map((board: IBoard) => (
        <div className="mb-2 text-lg" key={board.id}>
          {board.name}
        </div>
      ))}
    </div>
  );
}
