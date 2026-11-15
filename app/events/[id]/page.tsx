import { redirect } from "next/navigation";
import { rooms } from "@/data";

export function generateStaticParams() {
  return rooms.map((room) => ({ id: room.id }));
}

export default async function LegacyRoomDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/rooms/${id}`);
}
