import { useEffect } from "react";

export function useDocumentEvent<T extends keyof DocumentEventMap>(
  event: T,
  callback: (event: DocumentEventMap[T]) => void
) {
  useEffect(() => {
    document.addEventListener(event, callback);

    return () => {
      document.removeEventListener(event, callback);
    };
  }, [event, callback]);
}
