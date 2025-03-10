import type { LinkItem } from "@/models/link-item";

export const getLinksTree = async (): Promise<LinkItem[] | null> => {
  const res = await fetch("/api/nav");
  if (!res.ok) {
    throw new Error("Failed to fetch links tree");
  }
  return res.json();
};

export const saveLinksTree = async (items: LinkItem[]) => {
  const res = await fetch("/api/nav", {
    method: "POST",
    body: JSON.stringify(items),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch links tree");
  }
  return res;
};

export const trackDragandDrop = async ({
  id,
  from,
  to,
}: {
  id: LinkItem["id"];
  from: number;
  to: number;
}) => {
  const res = await fetch("/api/track", {
    method: "POST",
    body: JSON.stringify({ id, from, to }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch links tree");
  }
  return res;
};
