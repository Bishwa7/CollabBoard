import Link from "next/link";

export default function LobbyPage() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">
                    Welcome
                </h1>

                <Link
                    href="/create-room"
                    className="block rounded bg-blue-600 px-6 py-3 text-white"
                >
                    Create Room
                </Link>

                <Link
                    href="/join-room"
                    className="block rounded bg-green-600 px-6 py-3 text-white"
                >
                    Join Room
                </Link>
            </div>
        </div>
    );
}