import { useDraggable } from '@dnd-kit/core';
import { PropsWithChildren } from 'react';

interface Props {
  id: string | number;
  data?: Record<string, any>;
}

export const Draggable = ({ id, data, children }: PropsWithChildren<Props>) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data,
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    cursor: 'grabbing',
    zIndex: 10,
    boxShadow: transform ? '0 4px 10px rgba(0, 0, 0, 0.15)' : undefined,
    borderRadius: '0.5rem',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};
