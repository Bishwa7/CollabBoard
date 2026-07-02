import { createRoom } from "../../../actions/room/createRoom";


export default function CreateRoomPage() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow">
                <h1 className="mb-6 text-center text-3xl font-bold">
                    Create Room
                </h1>

                <form action={createRoom} className="space-y-4">
                    <div>
                        <label className="mb-2 block font-semibold">
                            Room Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter room name"
                            required
                            className="w-full rounded-lg border p-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 py-2 text-white"
                    >
                        Create Room
                    </button>
                </form>
            </div>
        </div>
    );
}